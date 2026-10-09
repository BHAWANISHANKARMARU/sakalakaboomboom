// @vitest-environment node
import { afterEach, describe, expect, it, vi } from "vitest";
import { POST } from "@/app/api/youtube-audio/route";

afterEach(() => vi.unstubAllEnvs());
const request = (body: string, headers = {}) =>
  new Request("http://localhost:3000/api/youtube-audio", {
    method: "POST",
    headers: { "content-type": "application/json", ...headers },
    body,
  });

describe("local audio API boundary", () => {
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
