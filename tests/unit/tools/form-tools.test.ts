import { describe, expect, it } from "vitest";
import { tools } from "@/content/tools";
import { toolGuides } from "@/content/tool-guides";
import { fitOnPage, imagesToPdf } from "@/features/jpg-to-pdf/convert";
import { centreCrop, findBestQuality } from "@/features/photo-resizer/resize";
import {
  calculateEmi,
  convertUnit,
} from "@/features/everyday-tools/calculations";

const sized = (bytes: number) => new Blob([new Uint8Array(bytes)]);

describe("photo resizer", () => {
  it("keeps the highest quality that fits the limit", async () => {
    const result = await findBestQuality(
      async (quality) => sized(Math.round(quality * 1000)),
      500,
    );
    expect(result?.size).toBeLessThanOrEqual(500);
    expect(result?.size).toBeGreaterThan(480);
  });
  it("reports when no quality can fit", async () => {
    expect(await findBestQuality(async () => sized(900), 500)).toBeUndefined();
  });
  it("crops the centre to the target shape", () => {
    expect(centreCrop(1000, 1000, 100, 200)).toEqual({
      x: 250,
      y: 0,
      width: 500,
      height: 1000,
    });
  });
});

describe("JPG to PDF", () => {
  it("never enlarges small images and shrinks large ones to fit A4", () => {
    expect(fitOnPage(100, 100)).toMatchObject({ width: 100, height: 100 });
    expect(fitOnPage(4000, 4000).width).toBeLessThanOrEqual(595.28);
  });
  it("rejects a file that is not really an image", async () => {
    const file = new File(["not an image"], "a.jpg", { type: "image/jpeg" });
    await expect(imagesToPdf([file])).rejects.toThrow("not a JPG or PNG");
  });
});

describe("tool guides", () => {
  const live = tools.filter((tool) => tool.status === "published");
  it("covers every live tool with a unique title and description", () => {
    for (const tool of live) expect(toolGuides[tool.id], tool.id).toBeDefined();
    const guides = Object.values(toolGuides);
    expect(new Set(guides.map((g) => g.seoTitle)).size).toBe(guides.length);
    expect(new Set(guides.map((g) => g.metaDescription)).size).toBe(
      guides.length,
    );
  });
  it("keeps titles and descriptions within search result lengths", () => {
    for (const guide of Object.values(toolGuides)) {
      expect(guide.seoTitle.length, guide.seoTitle).toBeLessThanOrEqual(52);
      expect(
        guide.metaDescription.length,
        guide.metaDescription,
      ).toBeLessThanOrEqual(160);
    }
  });
  it("uses worked examples that match the calculators", () => {
    expect(Math.round(calculateEmi(500000, 9, 60)!)).toBe(10379);
    expect(convertUnit(6, "ft", "m")).toBeCloseTo(1.8288);
    const monthly = 5000;
    const rate = 0.01;
    const value = monthly * (((1 + rate) ** 120 - 1) / rate) * (1 + rate);
    expect(Math.round(value / 100000)).toBe(12);
  });
});
