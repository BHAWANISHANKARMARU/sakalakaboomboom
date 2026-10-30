import { validateImageFile } from "@/features/image-compressor/validate";

export type ResizedImage = {
  blob: Blob;
  width: number;
  height: number;
  belowMinimum: boolean;
};

const MIN_QUALITY = 0.2;
const MAX_QUALITY = 0.95;
const SEARCH_STEPS = 7;

// Finds the highest quality whose output still fits within maxBytes.
export async function findBestQuality(
  encode: (quality: number) => Promise<Blob>,
  maxBytes: number,
) {
  const best = await encode(MAX_QUALITY);
  if (best.size <= maxBytes) return best;
  const lowest = await encode(MIN_QUALITY);
  if (lowest.size > maxBytes) return undefined;
  let result = lowest;
  let low = MIN_QUALITY;
  let high = MAX_QUALITY;
  for (let step = 0; step < SEARCH_STEPS; step++) {
    const quality = (low + high) / 2;
    const blob = await encode(quality);
    if (blob.size <= maxBytes) {
      result = blob;
      low = quality;
    } else {
      high = quality;
    }
  }
  return result;
}

// Returns the centred source area that matches the target shape.
export function centreCrop(
  sourceWidth: number,
  sourceHeight: number,
  targetWidth: number,
  targetHeight: number,
) {
  const scale = Math.min(
    sourceWidth / targetWidth,
    sourceHeight / targetHeight,
  );
  const width = targetWidth * scale;
  const height = targetHeight * scale;
  return {
    x: (sourceWidth - width) / 2,
    y: (sourceHeight - height) / 2,
    width,
    height,
  };
}

export async function resizeToLimits(
  file: File,
  limits: { minKb: number; maxKb: number; width: number; height: number },
): Promise<ResizedImage> {
  const valid = await validateImageFile(file);
  if (!valid.ok) throw new Error(valid.message);
  const bitmap = await createImageBitmap(file);
  const canvas = document.createElement("canvas");
  canvas.width = limits.width;
  canvas.height = limits.height;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Canvas unavailable");
  // JPEG has no transparency, so transparent PNG areas become white.
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, limits.width, limits.height);
  const crop = centreCrop(
    bitmap.width,
    bitmap.height,
    limits.width,
    limits.height,
  );
  context.drawImage(
    bitmap,
    crop.x,
    crop.y,
    crop.width,
    crop.height,
    0,
    0,
    limits.width,
    limits.height,
  );
  bitmap.close();
  const blob = await findBestQuality(
    (quality) =>
      new Promise<Blob>((resolve, reject) =>
        canvas.toBlob(
          (value) =>
            value ? resolve(value) : reject(new Error("Image encoding failed")),
          "image/jpeg",
          quality,
        ),
      ),
    limits.maxKb * 1024,
  );
  if (!blob)
    throw new Error(
      "This image cannot fit within that KB limit. Try smaller pixel dimensions or a higher KB limit.",
    );
  return {
    blob,
    width: limits.width,
    height: limits.height,
    belowMinimum: blob.size < limits.minKb * 1024,
  };
}
