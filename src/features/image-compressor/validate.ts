import { imageSignature, readSignature } from "@/lib/files/signatures";
export type ImageValidation =
  { ok: true; mime: string } | { ok: false; message: string };
export async function validateImageFile(file: File): Promise<ImageValidation> {
  if (file.size > 20 * 1024 * 1024)
    return { ok: false, message: "Choose an image that is 20 MB or smaller." };
  const detected = imageSignature(await readSignature(file));
  if (!detected || detected !== file.type)
    return {
      ok: false,
      message: "This file is not a supported JPEG, PNG or WebP image.",
    };
  return { ok: true, mime: detected };
}
