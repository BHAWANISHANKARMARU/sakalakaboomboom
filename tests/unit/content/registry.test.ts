import { describe, expect, it } from "vitest";
import { articles } from "@/content/articles";
import { categories } from "@/content/categories";
import { tools } from "@/content/tools";
import {
  getLiveTools,
  getToolBySlug,
  getRelatedTools,
} from "@/lib/content/registry";

describe("content registry", () => {
  it("contains the complete unique tool roadmap and six categories", () => {
    expect(tools).toHaveLength(20);
    expect(new Set(tools.map((tool) => tool.id)).size).toBe(20);
    expect(
      new Set(tools.map((tool) => `${tool.category}/${tool.slug}`)).size,
    ).toBe(20);
    expect(categories).toHaveLength(6);
  });

  it("publishes only the first five working tools", () => {
    expect(getLiveTools("en")).toHaveLength(5);
    expect(getToolBySlug("pdf", "pdf-compressor", "en")).toBeUndefined();
    expect(getToolBySlug("pdf", "pdf-merger", "hi")?.title).toBe("PDF Merger");
  });

  it("keeps relationships valid", () => {
    for (const tool of tools) {
      expect(getRelatedTools(tool.id, "en").every(Boolean)).toBe(true);
    }
    expect(articles).toEqual([]);
  });
});
