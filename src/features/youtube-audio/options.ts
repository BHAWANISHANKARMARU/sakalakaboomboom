import { AUDIO_MAX_SECONDS } from "./limits";

export type AudioTrim = { start?: number; end?: number };

export function parseTrimTime(value: string): number | undefined {
  if (!value.trim()) return undefined;
  const match = value.trim().match(/^(?:(\d+):([0-5]\d)|(\d+(?:\.\d+)?))$/);
  if (!match)
    throw new Error(
      "Enter trim times as mm:ss or seconds (for example 1:30 or 90).",
    );
  return match[3] ? Number(match[3]) : Number(match[1]) * 60 + Number(match[2]);
}

export function validateTrim(
  input: unknown,
  duration = AUDIO_MAX_SECONDS,
): { start: number; end: number } {
  if (
    input !== undefined &&
    (input === null || typeof input !== "object" || Array.isArray(input))
  ) {
    throw new Error("Invalid trim settings.");
  }
  const trim = (input ?? {}) as AudioTrim;
  const start = trim.start === undefined ? 0 : trim.start;
  const end = trim.end === undefined ? duration : trim.end;
  if (
    typeof start !== "number" ||
    typeof end !== "number" ||
    !Number.isFinite(start) ||
    !Number.isFinite(end) ||
    start < 0 ||
    end <= start ||
    end > duration ||
    start !== Number(start.toFixed(3)) ||
    end !== Number(end.toFixed(3)) ||
    end - start < 0.1
  ) {
    throw new Error(
      "Choose a clip of at least 0.1 seconds within the video (maximum 4 minutes), using up to 3 decimal places.",
    );
  }
  return { start, end };
}

export function audioFilename(title: unknown, fallback: string): string {
  const text = typeof title === "string" ? title : "";
  const clean = new TextDecoder()
    .decode(new TextEncoder().encode(text))
    .replace(/[\x00-\x1f\x7f]/g, " ")
    .replace(/[<>:"/\\|?*]/g, "-")
    .replace(/[\u202a-\u202e\u2066-\u2069]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/^[. ]+|[. ]+$/g, "");
  let name = "";
  for (const char of clean) {
    if (new TextEncoder().encode(name + char).length > 180) break;
    name += char;
  }
  name = name.replace(/[. ]+$/g, "") || fallback;
  if (/^(?:con|prn|aux|nul|com[1-9]|lpt[1-9])(?:\.|$)/i.test(name))
    name = `_${name}`;
  return `${name}.mp3`;
}

export function audioDisposition(filename: string): string {
  const encoded = encodeURIComponent(filename).replace(
    /[!'()*]/g,
    (c) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`,
  );
  return `attachment; filename="audio.mp3"; filename*=UTF-8''${encoded}`;
}

export function responseFilename(
  header: string | null,
  fallback: string,
): string {
  const encoded = header?.match(/filename\*=UTF-8''([^;]+)/i)?.[1];
  if (encoded) {
    try {
      return audioFilename(
        decodeURIComponent(encoded).replace(/\.mp3$/i, ""),
        fallback,
      );
    } catch {
      /* Use safe fallback for malformed headers. */
    }
  }
  return `${fallback}.mp3`;
}
