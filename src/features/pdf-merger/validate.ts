import { isPdfSignature, readSignature } from "@/lib/files/signatures";
import {
  PDF_MAX_FILES,
  PDF_MAX_FILE_BYTES,
  PDF_MAX_TOTAL_BYTES,
} from "./constants";
export type ValidationResult = { ok: true } | { ok: false; message: string };
export async function validatePdfFiles(
  files: File[],
): Promise<ValidationResult> {
  if (files.length < 2)
    return { ok: false, message: "Choose at least two PDF files." };
  if (files.length > PDF_MAX_FILES)
    return {
      ok: false,
      message: `Choose no more than ${PDF_MAX_FILES} files.`,
    };
  if (files.some((file) => file.size > PDF_MAX_FILE_BYTES))
    return { ok: false, message: "Each PDF must be 25 MB or smaller." };
  if (files.reduce((sum, file) => sum + file.size, 0) > PDF_MAX_TOTAL_BYTES)
    return {
      ok: false,
      message: "The selected files must total 100 MB or less.",
    };
  for (const file of files) {
    if (
      file.type !== "application/pdf" ||
      !file.name.toLowerCase().endsWith(".pdf") ||
      !isPdfSignature(await readSignature(file))
    )
      return { ok: false, message: `${file.name} is not a valid PDF file.` };
  }
  return { ok: true };
}
