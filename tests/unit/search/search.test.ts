import { describe, expect, it } from "vitest";
import { buildSearchIndex } from "@/lib/search/build-index";
import { searchIndex } from "@/lib/search/rank-results";
describe("search", () => {
  it("indexes only published tools and ranks exact titles first", () => {
    const index = buildSearchIndex();
    expect(index).toHaveLength(29);
    expect(searchIndex("word counter", index)[0]?.title).toBe("Word Counter");
    expect(index.some((item) => item.title === "PDF Compressor")).toBe(false);
    expect(
      index.some((item) => item.title === "Number System Explained Simply"),
    ).toBe(true);
    expect(
      index.some((item) => item.title === "संख्या पद्धति आसान भाषा में"),
    ).toBe(true);
  });
});
