import { describe, expect, it } from "vitest";
import { validateQrInput } from "@/features/qr-generator/generate-qr";
describe("QR generator", () => {
  it("rejects blank and oversized input", () => {
    expect(validateQrInput("   ").ok).toBe(false);
    expect(validateQrInput("x".repeat(2001)).ok).toBe(false);
  });
  it("accepts ordinary text without treating markup as HTML", () =>
    expect(validateQrInput("<script>alert(1)</script>").ok).toBe(true));
  it("rejects content that exceeds high error-correction capacity", () => {
    expect(validateQrInput("x".repeat(1500), "H").ok).toBe(false);
  });
});
