export type CompressedImage = {
  blob: Blob;
  width: number;
  height: number;
  originalSize: number;
  outputSize: number;
  mime: string;
};
export async function compressImage(
  file: File,
  quality: number,
): Promise<CompressedImage> {
  const bitmap = await createImageBitmap(file);
  const canvas = document.createElement("canvas");
  canvas.width = bitmap.width;
  canvas.height = bitmap.height;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Canvas unavailable");
  context.drawImage(bitmap, 0, 0);
  bitmap.close();
  const mime = file.type === "image/png" ? "image/webp" : file.type;
  const blob = await new Promise<Blob>((resolve, reject) =>
    canvas.toBlob(
      (value) =>
        value ? resolve(value) : reject(new Error("Image encoding failed")),
      mime,
      quality,
    ),
  );
  return {
    blob,
    width: canvas.width,
    height: canvas.height,
    originalSize: file.size,
    outputSize: blob.size,
    mime,
  };
}
