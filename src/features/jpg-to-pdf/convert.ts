import { imageSignature, readSignature } from "@/lib/files/signatures";

export const JPG_TO_PDF_MAX_FILES = 20;
export const JPG_TO_PDF_MAX_FILE_BYTES = 20 * 1024 * 1024;
const A4 = { width: 595.28, height: 841.89 };
const MARGIN = 24;

export type ImageListValidation = { ok: true } | { ok: false; message: string };

export async function validatePdfImages(
  files: File[],
): Promise<ImageListValidation> {
  if (!files.length)
    return { ok: false, message: "Choose at least one image." };
  if (files.length > JPG_TO_PDF_MAX_FILES)
    return {
      ok: false,
      message: `Choose no more than ${JPG_TO_PDF_MAX_FILES} images.`,
    };
  for (const file of files) {
    if (file.size > JPG_TO_PDF_MAX_FILE_BYTES)
      return { ok: false, message: "Each image must be 20 MB or smaller." };
    const detected = imageSignature(await readSignature(file));
    if (detected !== "image/jpeg" && detected !== "image/png")
      return { ok: false, message: `${file.name} is not a JPG or PNG image.` };
  }
  return { ok: true };
}

// Scales an image down to fit the page, without enlarging small images.
export function fitOnPage(width: number, height: number) {
  const scale = Math.min(
    (A4.width - MARGIN * 2) / width,
    (A4.height - MARGIN * 2) / height,
    1,
  );
  const fitted = { width: width * scale, height: height * scale };
  return {
    ...fitted,
    x: (A4.width - fitted.width) / 2,
    y: (A4.height - fitted.height) / 2,
  };
}

export async function imagesToPdf(files: File[]) {
  const valid = await validatePdfImages(files);
  if (!valid.ok) throw new Error(valid.message);
  const { PDFDocument } = await import("pdf-lib");
  const output = await PDFDocument.create();
  for (const file of files) {
    const bytes = await file.arrayBuffer();
    const isPng = imageSignature(await readSignature(file)) === "image/png";
    const image = isPng
      ? await output.embedPng(bytes)
      : await output.embedJpg(bytes);
    const page = output.addPage([A4.width, A4.height]);
    page.drawImage(image, fitOnPage(image.width, image.height));
  }
  return output.save();
}
