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
  it("contains the expanded unique tool roadmap and six categories", () => {
    expect(tools).toHaveLength(38);
    expect(new Set(tools.map((tool) => tool.id)).size).toBe(tools.length);
    expect(
      new Set(tools.map((tool) => `${tool.category}/${tool.slug}`)).size,
    ).toBe(tools.length);
    expect(categories).toHaveLength(6);
  });

  it("publishes the foundation tools, everyday tools and YouTube audio page", () => {
    expect(getLiveTools("en")).toHaveLength(26);
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
