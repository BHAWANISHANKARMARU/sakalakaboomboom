// @vitest-environment node
import { afterEach, describe, expect, it, vi } from "vitest";
import { AudioError, convertAudio } from "@/features/youtube-audio/server";
vi.mock("@/features/youtube-audio/server", async (importOriginal) => ({
  ...(await importOriginal<typeof import("@/features/youtube-audio/server")>()),
  convertAudio: vi.fn(),
}));
import { POST } from "@/app/api/youtube-audio/route";

afterEach(() => {
  vi.unstubAllEnvs();
  vi.clearAllMocks();
});
const request = (body: string, headers = {}) =>
  new Request("http://localhost:3000/api/youtube-audio", {
    method: "POST",
    headers: { "content-type": "application/json", ...headers },
    body,
  });

describe("local audio API boundary", () => {
  it("keeps internal diagnostics and unexpected exception details out of responses", async () => {
    vi.mocked(convertAudio).mockRejectedValueOnce(
      Object.assign(new AudioError("Safe public failure", 502), {
        diagnostic: { token: "secret-token", stderr: "secret-cookie" },
      }),
    );
    const response = await POST(
      request('{"url":"https://youtu.be/jNQXAC9IVRw"}'),
    );
    const body = await response.json();
    expect(body).toEqual({
      error: "Safe public failure",
      requestId: expect.stringMatching(/^[a-f0-9-]{36}$/),
    });
    vi.mocked(convertAudio).mockRejectedValueOnce(
      new Error("http://user:secret@proxy"),
    );
    const unknown = await POST(
      request('{"url":"https://youtu.be/jNQXAC9IVRw"}'),
    );
    expect(await unknown.text()).not.toContain("secret");
  });

  it("returns the MP3 and propagates a generated correlation ID", async () => {
    vi.mocked(convertAudio).mockResolvedValueOnce({
      audio: Buffer.from("ID3"),
      filename: "youtube-jNQXAC9IVRw.mp3",
    });
    const response = await POST(
      request('{"url":"https://youtu.be/jNQXAC9IVRw"}'),
    );
    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toBe("audio/mpeg");
    expect(response.headers.get("x-request-id")).toBe(
      vi.mocked(convertAudio).mock.calls[0][2],
    );
    expect(await response.text()).toBe("ID3");
  });

  it("accepts a loopback browser Origin when Next normalizes request.url to localhost", async () => {
    vi.stubEnv("NODE_ENV", "development");
    expect(
      (
        await POST(
          request("{}", {
            host: "127.0.0.1:3000",
            origin: "http://127.0.0.1:3000",
          }),
        )
      ).status,
    ).toBe(400);
  });
  it("rejects nonlocal incoming hosts even when Next normalizes request.url", async () => {
    vi.stubEnv("NODE_ENV", "development");
    expect(
      (await POST(request("{}", { host: "example.com:3000" }))).status,
    ).toBe(403);
  });
  it("accepts production requests for the canonical website instead of rejecting all conversions", async () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("VERCEL", "1");
    expect(
      (
        await POST(
          request("{}", {
            host: "www.sakalakaboomboom.online",
            origin: "https://www.sakalakaboomboom.online",
          }),
        )
      ).status,
    ).toBe(400);
  });
  it("blocks requests originating from other websites", async () => {
    vi.stubEnv("NODE_ENV", "development");
    expect(
      (await POST(request("{}", { origin: "https://elsewhere.example" })))
        .status,
    ).toBe(403);
  });
  it.each(["not json", "null", "{}", '{"url":"https://example.com"}'])(
    "rejects invalid input without invoking conversion: %s",
    async (body) => {
      vi.stubEnv("NODE_ENV", "development");
      expect((await POST(request(body))).status).toBe(400);
    },
  );
  it("bounds the actual body even when no Content-Length is sent", async () => {
    vi.stubEnv("NODE_ENV", "development");
    expect((await POST(request("x".repeat(5000)))).status).toBe(413);
  });
});
