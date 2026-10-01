export type JsonResult =
  { ok: true; value: string } | { ok: false; message: string };
export const JSON_MAX_LENGTH = 1_000_000;
function parse(
  input: string,
): { ok: true; data: unknown } | { ok: false; message: string } {
  if (!input.trim()) return { ok: false, message: "Enter JSON to continue." };
  if (input.length > JSON_MAX_LENGTH)
    return {
      ok: false,
      message: "JSON must be 1,000,000 characters or fewer.",
    };
  try {
    return { ok: true, data: JSON.parse(input) };
  } catch (error) {
    const message =
      error instanceof SyntaxError
        ? error.message.replace(/\s+at position/i, " near position")
        : "Invalid JSON";
    return { ok: false, message: `Invalid JSON: ${message}` };
  }
}
export function parseAndFormatJson(input: string): JsonResult {
  const result = parse(input);
  return result.ok
    ? { ok: true, value: JSON.stringify(result.data, null, 2) }
    : result;
}
export function minifyJson(input: string): JsonResult {
  const result = parse(input);
  return result.ok ? { ok: true, value: JSON.stringify(result.data) } : result;
}
