// @vitest-environment node
import { describe, expect, it } from "vitest";
import { normalizeYoutubeUrl } from "@/features/youtube-audio/validate";

describe("YouTube URL validation", () => {
  it.each([
    "https://www.youtube.com/watch?v=BaW_jenozKc&list=anything",
    "https://youtu.be/BaW_jenozKc?t=5",
    "https://m.youtube.com/shorts/BaW_jenozKc",
    "https://www.youtube.com/embed/BaW_jenozKc",
    "https://youtube.com/live/BaW_jenozKc",
  ])(
    "normalizes a single video and removes tracking/playlist arguments: %s",
    (input) => {
      expect(normalizeYoutubeUrl(input)).toBe(
        "https://www.youtube.com/watch?v=BaW_jenozKc",
      );
    },
  );

  it.each([
    "",
    null,
    123,
    "--exec=whoami",
    "file:///etc/passwd",
    "https://youtube.com.evil.example/watch?v=BaW_jenozKc",
    "https://youtube.com@127.0.0.1/watch?v=BaW_jenozKc",
    "https://user:pass@youtube.com/watch?v=BaW_jenozKc",
    "https://youtube.com:444/watch?v=BaW_jenozKc",
    "https://youtube.com/playlist?list=PLtest",
    "https://youtu.be/BaW_jenozKc/extra",
    "https://youtube.com/watch?v=invalid",
  ])("rejects unsupported or misleading URLs: %s", (input) => {
    expect(() => normalizeYoutubeUrl(input)).toThrow();
  });
});
