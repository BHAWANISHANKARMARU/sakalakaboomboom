import { isPdfSignature, readSignature } from "@/lib/files/signatures";
import { PDF_MAX_FILE_BYTES } from "@/features/pdf-merger/constants";

// Tried from best to smallest, so the first result that fits looks best.
export const COMPRESSION_STEPS = [
  { scale: 1.6, quality: 0.75 },
  { scale: 1.3, quality: 0.65 },
  { scale: 1.1, quality: 0.55 },
  { scale: 0.9, quality: 0.45 },
  { scale: 0.75, quality: 0.38 },
  { scale: 0.6, quality: 0.3 },
];

export type CompressedPdf = {
  bytes: Uint8Array;
  originalSize: number;
  fits: boolean;
  alreadySmall: boolean;
};

export async function pickSmallestFit<T extends { length: number }>(
  steps: typeof COMPRESSION_STEPS,
  build: (step: (typeof COMPRESSION_STEPS)[number]) => Promise<T>,
  maxBytes: number,
) {
  let smallest: T | undefined;
  for (const step of steps) {
    const result = await build(step);
    if (!smallest || result.length < smallest.length) smallest = result;
    if (result.length <= maxBytes) return { result, fits: true };
  }
  return { result: smallest as T, fits: false };
}

export async function compressPdf(
  file: File,
  maxKb: number,
): Promise<CompressedPdf> {
  if (file.size > PDF_MAX_FILE_BYTES)
    throw new Error("The PDF must be 25 MB or smaller.");
  if (!isPdfSignature(await readSignature(file)))
    throw new Error("This is not a valid PDF file.");
  const data = new Uint8Array(await file.arrayBuffer());
  const maxBytes = maxKb * 1024;
  if (file.size <= maxBytes)
    return {
      bytes: data,
      originalSize: file.size,
      fits: true,
      alreadySmall: true,
    };
  const pdfjs = await import("pdfjs-dist");
  pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url,
  ).toString();
  const source = await pdfjs.getDocument({ data: data.slice() }).promise;
  const { PDFDocument } = await import("pdf-lib");
  const build = async ({
    scale,
    quality,
  }: {
    scale: number;
    quality: number;
  }) => {
    const output = await PDFDocument.create();
    for (let number = 1; number <= source.numPages; number++) {
      const page = await source.getPage(number);
      const viewport = page.getViewport({ scale });
      const canvas = document.createElement("canvas");
      canvas.width = Math.ceil(viewport.width);
      canvas.height = Math.ceil(viewport.height);
      const context = canvas.getContext("2d");
      if (!context) throw new Error("Canvas unavailable");
      await page.render({ canvasContext: context, viewport }).promise;
      const blob = await new Promise<Blob>((resolve, reject) =>
        canvas.toBlob(
          (value) =>
            value ? resolve(value) : reject(new Error("Encoding failed")),
          "image/jpeg",
          quality,
        ),
      );
      const image = await output.embedJpg(await blob.arrayBuffer());
      const size = page.getViewport({ scale: 1 });
      output.addPage([size.width, size.height]).drawImage(image, {
        x: 0,
        y: 0,
        width: size.width,
        height: size.height,
      });
    }
    return output.save();
  };
  const { result, fits } = await pickSmallestFit(
    COMPRESSION_STEPS,
    build,
    maxBytes,
  );
  await source.destroy();
  return {
    bytes: result,
    originalSize: file.size,
    fits,
    alreadySmall: false,
  };
}
