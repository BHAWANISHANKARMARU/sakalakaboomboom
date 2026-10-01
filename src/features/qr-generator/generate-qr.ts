import QRCode from "qrcode";
export type QrValidation = { ok: true } | { ok: false; message: string };
export function validateQrInput(value: string): QrValidation {
  if (!value.trim())
    return { ok: false, message: "Enter text or a URL to create a QR code." };
  if (value.length > 2000)
    return {
      ok: false,
      message: "QR content must be 2,000 characters or fewer.",
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
  return QRCode.toDataURL(value, {
    width,
    margin: 2,
    errorCorrectionLevel: level,
    color: { dark: "#17324D", light: "#FFFFFF" },
  });
}
