import { describe, expect, it } from "vitest";
import {
  audioFilename,
  parseTrimTime,
  validateTrim,
} from "@/features/youtube-audio/options";

describe("audio download options", () => {
  it("preserves Unicode titles but removes unsafe filename characters", () => {
    expect(audioFilename('मेरा गाना / "Live"\r\n', "fallback")).toBe(
      "मेरा गाना - -Live-.mp3",
    );
    expect(audioFilename("...", "fallback")).toBe("fallback.mp3");
    expect(
      new TextEncoder().encode(audioFilename("🎵".repeat(200), "fallback"))
        .length,
    ).toBeLessThanOrEqual(184);
  });
  it("parses seconds or mm:ss and defaults blank fields", () => {
    expect(parseTrimTime("")).toBeUndefined();
    expect(parseTrimTime("1:25")).toBe(85);
    expect(parseTrimTime("12.5")).toBe(12.5);
    expect(() => parseTrimTime("1:80")).toThrow();
  });
  it("validates numeric ranges and rejects clips beyond the video", () => {
    expect(validateTrim({ start: 10, end: 20 }, 30)).toEqual({
      start: 10,
      end: 20,
    });
    expect(validateTrim(undefined, 30)).toEqual({ start: 0, end: 30 });
    for (const trim of [
      { start: -1 },
      { start: "10" },
      { end: null },
      { end: 0 },
      { start: 15, end: 10 },
      { end: 31 },
      { start: Infinity },
      { start: 0.0000001 },
      { start: 0, end: 0.001 },
    ]) {
      expect(() => validateTrim(trim, 30)).toThrow();
    }
  });
});
