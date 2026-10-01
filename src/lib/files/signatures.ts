export async function readSignature(file: File, length = 12) {
  return new Uint8Array(await file.slice(0, length).arrayBuffer());
}
export const isPdfSignature = (bytes: Uint8Array) =>
  new TextDecoder().decode(bytes.slice(0, 5)) === "%PDF-";
export const imageSignature = (
  bytes: Uint8Array,
): "image/jpeg" | "image/png" | "image/webp" | undefined =>
  bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff
    ? "image/jpeg"
    : bytes[0] === 0x89 &&
        bytes[1] === 0x50 &&
        bytes[2] === 0x4e &&
        bytes[3] === 0x47
      ? "image/png"
      : new TextDecoder().decode(bytes.slice(0, 4)) === "RIFF" &&
          new TextDecoder().decode(bytes.slice(8, 12)) === "WEBP"
        ? "image/webp"
        : undefined;
