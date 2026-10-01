import QRCode from "qrcode";
export type QrValidation = { ok: true } | { ok: false; message: string };
const byteCapacity = { L: 2953, M: 2331, Q: 1663, H: 1273 } as const;
export function validateQrInput(
  value: string,
  level: keyof typeof byteCapacity = "M",
): QrValidation {
  if (!value.trim())
    return { ok: false, message: "Enter text or a URL to create a QR code." };
  if (value.length > 2000)
    return {
      ok: false,
      message: "QR content must be 2,000 characters or fewer.",
    };
  if (new TextEncoder().encode(value).length > byteCapacity[level])
    return {
      ok: false,
      message: `This content is too long for ${level} error correction.`,
    };
  return { ok: true };
}
export async function generateQrPng(
  value: string,
  {
    width = 320,
    level = "M",
  }: { width?: number; level?: "L" | "M" | "Q" | "H" } = {},
) {
  const valid = validateQrInput(value, level);
  if (!valid.ok) throw new Error(valid.message);
  if (![256, 320, 512].includes(width)) throw new Error("Unsupported QR size.");
  return QRCode.toDataURL(value, {
    width,
    margin: 2,
    errorCorrectionLevel: level,
    color: { dark: "#17324D", light: "#FFFFFF" },
  });
}
