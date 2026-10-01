import { validatePdfFiles } from "./validate";
export async function mergePdfFiles(files: File[]) {
  const valid = await validatePdfFiles(files);
  if (!valid.ok) throw new Error(valid.message);
  const { PDFDocument } = await import("pdf-lib");
  const output = await PDFDocument.create();
  for (const file of files) {
    const source = await PDFDocument.load(await file.arrayBuffer());
    const pages = await output.copyPages(source, source.getPageIndices());
    pages.forEach((page) => output.addPage(page));
  }
  return output.save();
}
