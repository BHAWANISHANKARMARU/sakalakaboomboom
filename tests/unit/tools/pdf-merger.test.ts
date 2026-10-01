import { PDFDocument } from "pdf-lib";
import { describe, expect, it } from "vitest";
import { sanitizeDownloadFilename } from "@/lib/files/filenames";
import { validatePdfFiles } from "@/features/pdf-merger/validate";
import { mergePdfFiles } from "@/features/pdf-merger/merge";
async function pdfFile(name: string) {
  const doc = await PDFDocument.create();
  doc.addPage();
  const bytes = await doc.save();
  return new File([bytes.buffer as ArrayBuffer], name, {
    type: "application/pdf",
  });
}
describe("PDF merger", () => {
  it("rejects a spoofed PDF", async () => {
    const result = await validatePdfFiles([
      new File(["not pdf"], "fake.pdf", { type: "application/pdf" }),
    ]);
    expect(result.ok).toBe(false);
  });
  it("merges valid PDFs in order", async () => {
    const bytes = await mergePdfFiles([
      await pdfFile("one.pdf"),
      await pdfFile("two.pdf"),
    ]);
    const merged = await PDFDocument.load(bytes);
    expect(merged.getPageCount()).toBe(2);
  });
  it("enforces validation inside the processing function", async () => {
    await expect(mergePdfFiles([await pdfFile("one.pdf")])).rejects.toThrow(
      "at least two",
    );
  });
  it("sanitises download names", () =>
    expect(sanitizeDownloadFilename("../../My file!", "pdf")).toBe(
      "My-file.pdf",
    ));
});
