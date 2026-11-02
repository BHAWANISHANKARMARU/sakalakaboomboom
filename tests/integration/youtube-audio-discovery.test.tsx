import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Home from "@/app/page";
import Tools from "@/app/tools/page";
import YoutubePage from "@/app/tools/web/youtube-video-to-audio/page";
import sitemap from "@/app/sitemap";
import { POST } from "@/app/api/youtube-audio/route";

vi.mock("next/navigation", () => ({
  notFound: () => {
    throw new Error("NEXT_NOT_FOUND");
  },
}));

const path = "/tools/web/youtube-video-to-audio";

describe("withdrawn YouTube audio tool", () => {
  it.each([
    ["homepage", Home],
    ["tools directory", Tools],
  ] as const)("is not linked from the %s", (_, Page) => {
    render(<Page />);
    expect(
      screen.queryByRole("link", { name: /YouTube to MP3/ }),
    ).not.toBeInTheDocument();
  });

  it("is excluded from the sitemap", () => {
    expect(sitemap().some((item) => item.url.endsWith(path))).toBe(false);
  });

  it("returns not found from the page and API", async () => {
    expect(() => YoutubePage()).toThrow("NEXT_NOT_FOUND");
    const response = await POST(
      new Request("http://localhost:3000/api/youtube-audio", {
        method: "POST",
        body: "{}",
      }),
    );
    expect(response.status).toBe(404);
  });
});
