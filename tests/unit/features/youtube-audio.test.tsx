import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { YoutubeAudio } from "@/features/youtube-audio/youtube-audio";

afterEach(() => vi.unstubAllGlobals());

describe("YouTube audio interface", () => {
  it("rejects non-YouTube URLs before contacting the server", async () => {
    const fetcher = vi.fn();
    vi.stubGlobal("fetch", fetcher);
    render(<YoutubeAudio />);
    fireEvent.change(screen.getByLabelText("YouTube video URL"), {
      target: { value: "https://example.com" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Convert to MP3" }));
    expect(await screen.findByRole("alert")).toHaveTextContent("valid YouTube");
    expect(fetcher).not.toHaveBeenCalled();
  });

  it("offers a real MP3 response for download and clears it when the input changes", async () => {
    const revoke = vi.fn();
    Object.defineProperty(URL, "createObjectURL", {
      configurable: true,
      value: vi.fn(() => "blob:audio"),
    });
    Object.defineProperty(URL, "revokeObjectURL", {
      configurable: true,
      value: revoke,
    });
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        headers: new Headers({ "content-type": "audio/mpeg" }),
        blob: async () => new Blob(["ID3audio"], { type: "audio/mpeg" }),
      }),
    );
    render(<YoutubeAudio />);
    fireEvent.change(screen.getByLabelText("YouTube video URL"), {
      target: { value: "https://youtu.be/BaW_jenozKc" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Convert to MP3" }));
    expect(
      await screen.findByRole("link", { name: "Download MP3" }),
    ).toHaveAttribute("href", "blob:audio");
    fireEvent.change(screen.getByLabelText("YouTube video URL"), {
      target: { value: "" },
    });
    expect(
      screen.queryByRole("link", { name: "Download MP3" }),
    ).not.toBeInTheDocument();
    await waitFor(() => expect(revoke).toHaveBeenCalledWith("blob:audio"));
  });

  it("displays server failures without offering a download", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        json: async () => ({
          error: "YouTube is unavailable. Try again later.",
        }),
      }),
    );
    render(<YoutubeAudio />);
    fireEvent.change(screen.getByLabelText("YouTube video URL"), {
      target: { value: "https://youtu.be/BaW_jenozKc" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Convert to MP3" }));
    expect(await screen.findByRole("alert")).toHaveTextContent(
      "YouTube is unavailable",
    );
    expect(
      screen.queryByRole("link", { name: "Download MP3" }),
    ).not.toBeInTheDocument();
  });
});
