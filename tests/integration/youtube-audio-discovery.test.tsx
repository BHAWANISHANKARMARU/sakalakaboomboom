import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import Home from "@/app/page";
import Tools from "@/app/tools/page";
import YoutubePage, {
  metadata,
} from "@/app/tools/web/youtube-video-to-audio/page";
import sitemap from "@/app/sitemap";

const path = "/tools/web/youtube-video-to-audio";
afterEach(() => vi.unstubAllEnvs());

describe("public YouTube audio discovery", () => {
  it.each([
    ["homepage", Home],
    ["tools directory", Tools],
  ] as const)("links from the %s", (_, Page) => {
    render(<Page />);
    expect(
      screen.getByRole("link", { name: /YouTube to MP3/ }),
    ).toHaveAttribute("href", path);
  });

  it("includes the public page exactly once in the sitemap", () => {
    expect(
      sitemap().filter(
        (item) => item.url === `https://www.sakalakaboomboom.online${path}`,
      ),
    ).toHaveLength(1);
  });

  it("renders an indexable production page without a nonworking conversion form", () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("VERCEL", "1");
    render(<YoutubePage />);
    expect(
      screen.getByRole("heading", { level: 1, name: /YouTube to MP3/ }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("status", { name: "Online conversion coming soon" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Convert to MP3" }),
    ).not.toBeInTheDocument();
    expect(metadata.robots).not.toMatchObject({ index: false });
    expect(metadata.alternates?.canonical).toBe(
      `https://www.sakalakaboomboom.online${path}`,
    );
  });
});
