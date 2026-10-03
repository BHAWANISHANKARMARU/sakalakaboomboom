import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import {
  calculateAge,
  calculateEmi,
  calculateGst,
  calculatePercentage,
  convertUnit,
} from "@/features/everyday-tools/calculations";
import {
  removeDuplicateLines,
  cleanWhitespace,
} from "@/features/everyday-tools/text";
import { tools } from "@/content/tools";
import { EverydayTool } from "@/features/everyday-tools/everyday-tool";

describe("everyday tool engines", () => {
  it("calculates completed age from two dates", () => {
    expect(calculateAge("2000-10-10", "2026-10-04")).toEqual({
      years: 25,
      months: 11,
      days: 24,
    });
  });

  it("handles zero-interest EMI", () => {
    expect(calculateEmi(120000, 0, 12)).toBe(10000);
  });

  it("calculates inclusive and exclusive GST", () => {
    expect(calculateGst(1000, 18, false)).toEqual({ tax: 180, total: 1180 });
    expect(calculateGst(1180, 18, true)).toEqual({ tax: 180, total: 1180 });
  });

  it("calculates a percentage and converts units", () => {
    expect(calculatePercentage(25, 200)).toBe(12.5);
    expect(convertUnit(1, "km", "m")).toBe(1000);
  });

  it("cleans text without losing first occurrences", () => {
    expect(removeDuplicateLines("one\ntwo\none")).toBe("one\ntwo");
    expect(cleanWhitespace("  hello   world \n next  ")).toBe(
      "hello world\nnext",
    );
  });

  it("publishes exactly twenty new everyday tools", () => {
    const ids = new Set([
      "age-calculator",
      "bmi-calculator",
      "percentage-calculator",
      "discount-calculator",
      "gst-calculator",
      "emi-calculator",
      "sip-calculator",
      "date-difference-calculator",
      "unit-converter",
      "fuel-cost-calculator",
      "case-converter",
      "remove-duplicate-lines",
      "text-sorter",
      "find-replace-text",
      "whitespace-cleaner",
      "line-counter",
      "url-encoder-decoder",
      "base64-encoder-decoder",
      "password-generator",
      "uuid-generator",
    ]);
    expect(
      tools.filter((tool) => ids.has(tool.id) && tool.status === "published"),
    ).toHaveLength(20);
  });

  it("updates a percentage result from labelled inputs", async () => {
    const user = userEvent.setup();
    render(<EverydayTool slug="percentage-calculator" />);
    await user.type(screen.getByRole("spinbutton", { name: "Part" }), "25");
    await user.type(screen.getByRole("spinbutton", { name: "Total" }), "200");
    expect(screen.getByText("12.5%")).toBeInTheDocument();
  });
});
