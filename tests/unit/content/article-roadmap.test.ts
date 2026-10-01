import { describe, expect, it } from "vitest";
import { articleRoadmap } from "@/content/article-roadmap";
describe("article roadmap", () => {
  it("contains exactly 100 unique, complete planned briefs", () => {
    expect(articleRoadmap).toHaveLength(100);
    expect(new Set(articleRoadmap.map((item) => item.slug)).size).toBe(100);
    expect(
      articleRoadmap.every(
        (item) =>
          item.status === "planned" &&
          item.searchIntent &&
          item.headings.length >= 3 &&
          item.relatedToolIds.length,
      ),
    ).toBe(true);
  });
  it("uses the required category distribution", () => {
    const count = (section: string) =>
      articleRoadmap.filter((item) => item.section === section).length;
    expect(count("education")).toBe(25);
    expect(count("exams")).toBe(20);
    expect(count("technology")).toBe(20);
    expect(count("how-to")).toBe(20);
    expect(count("india-guides")).toBe(15);
  });
});
