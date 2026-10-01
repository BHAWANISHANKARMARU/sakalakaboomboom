import { describe, expect, it } from "vitest";
import { countText } from "@/features/word-counter/count-text";
describe("word counter", () => {
  it("counts mixed Unicode text", () => {
    const value = countText("Hello भारत 👋.\n\nSecond line!");
    expect(value.words).toBe(4);
    expect(value.paragraphs).toBe(2);
    expect(value.sentences).toBe(2);
  });
  it("returns zeroes for whitespace", () =>
    expect(countText("  \n ").words).toBe(0));
});
