import { validateImageFile } from "@/features/image-compressor/validate";

export type ConvertedImage = { blob: Blob; width: number; height: number };

// Fills a missing dimension so the image keeps its shape.
export function targetSize(
  sourceWidth: number,
  sourceHeight: number,
  width?: number,
  height?: number,
) {
  if (width && height) return { width, height };
  if (width)
    return {
      width,
      height: Math.max(1, Math.round((sourceHeight / sourceWidth) * width)),
    };
  if (height)
    return {
      width: Math.max(1, Math.round((sourceWidth / sourceHeight) * height)),
      height,
    };
  return { width: sourceWidth, height: sourceHeight };
}

export async function convertImage(
  file: File,
  mime: "image/jpeg" | "image/png",
  width?: number,
  height?: number,
): Promise<ConvertedImage> {
  const valid = await validateImageFile(file);
  if (!valid.ok) throw new Error(valid.message);
  const bitmap = await createImageBitmap(file);
  const size = targetSize(bitmap.width, bitmap.height, width, height);
  const canvas = document.createElement("canvas");
  canvas.width = size.width;
  canvas.height = size.height;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Canvas unavailable");
  if (mime === "image/jpeg") {
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, size.width, size.height);
  }
  context.drawImage(bitmap, 0, 0, size.width, size.height);
  bitmap.close();
  const blob = await new Promise<Blob>((resolve, reject) =>
    canvas.toBlob(
      (value) =>
        value ? resolve(value) : reject(new Error("Image encoding failed")),
      mime,
      0.92,
    ),
  );
  return { blob, ...size };
}
