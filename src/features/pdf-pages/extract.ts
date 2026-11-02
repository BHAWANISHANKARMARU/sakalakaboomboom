import { isPdfSignature, readSignature } from "@/lib/files/signatures";
import { PDF_MAX_FILE_BYTES } from "@/features/pdf-merger/constants";

// Turns "1-3, 5" into zero-based page indexes, keeping the order typed.
export function parsePageRanges(input: string, pageCount: number) {
  const pages: number[] = [];
  for (const part of input.split(",").map((value) => value.trim())) {
    const match = /^(\d+)(?:\s*-\s*(\d+))?$/.exec(part);
    if (!match) return undefined;
    const start = Number(match[1]);
    const end = Number(match[2] ?? match[1]);
    if (start < 1 || end < start || end > pageCount) return undefined;
    for (let page = start; page <= end; page++) pages.push(page - 1);
  }
  return pages.length ? [...new Set(pages)] : undefined;
}

export async function extractPdfPages(file: File, ranges: string) {
  if (file.size > PDF_MAX_FILE_BYTES)
    throw new Error("The PDF must be 25 MB or smaller.");
  if (!isPdfSignature(await readSignature(file)))
    throw new Error("This is not a valid PDF file.");
  const { PDFDocument } = await import("pdf-lib");
  const source = await PDFDocument.load(await file.arrayBuffer());
  const pages = parsePageRanges(ranges, source.getPageCount());
  if (!pages)
    throw new Error(
      `Enter pages between 1 and ${source.getPageCount()}, such as 1-3, 5.`,
    );
  const output = await PDFDocument.create();
  const copied = await output.copyPages(source, pages);
  copied.forEach((page) => output.addPage(page));
  return output.save();
}
