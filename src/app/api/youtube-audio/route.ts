import { randomUUID } from "node:crypto";
import { AudioError, convertAudio } from "@/features/youtube-audio/server";
import { normalizeYoutubeUrl } from "@/features/youtube-audio/validate";
import { siteConfig } from "@/config/site";

export const runtime = "nodejs";
export const maxDuration = 240;

function failure(error: string, status: number, requestId?: string) {
  return Response.json(
    { error, ...(requestId ? { requestId } : {}) },
    { status, headers: { "Cache-Control": "no-store" } },
  );
}

export async function POST(request: Request) {
  // Next may normalize request.url to localhost even for a 127.0.0.1 request.
  const normalized = new URL(request.url);
  let url: URL;
  try {
    url = new URL(
      `${normalized.protocol}//${request.headers.get("host") ?? normalized.host}`,
    );
    if (
      url.username ||
      url.password ||
      url.pathname !== "/" ||
      url.search ||
      url.hash
    )
      return failure("Invalid host.", 403);
  } catch {
    return failure("Invalid host.", 403);
  }
  const publicHosts = [
    new URL(siteConfig.url).host,
    process.env.VERCEL_URL,
    process.env.VERCEL_PROJECT_PRODUCTION_URL,
  ].filter(Boolean);
  const isPublicHost = publicHosts.includes(url.host);
  const isLocal =
    !process.env.VERCEL &&
    ["localhost", "127.0.0.1", "[::1]"].includes(url.hostname);
  const origin = isPublicHost ? `https://${url.host}` : url.origin;
  if (
    (!isPublicHost && !isLocal) ||
    (request.headers.get("origin") && request.headers.get("origin") !== origin)
  ) {
    return failure("Open the tool on this website to convert a video.", 403);
  }
  if (
    request.headers.get("content-type")?.split(";")[0] !== "application/json"
  ) {
    return failure("Send a YouTube link as JSON.", 415);
  }
  let input: string;
  try {
    const reader = request.body?.getReader();
    if (!reader) return failure("Enter a YouTube video link.", 400);
    const chunks: Uint8Array[] = [];
    let length = 0;
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      length += value.byteLength;
      if (length > 4096) {
        await reader.cancel();
        return failure("The request is too large.", 413);
      }
      chunks.push(value);
    }
    const body = JSON.parse(Buffer.concat(chunks).toString("utf8"));
    input = normalizeYoutubeUrl(body?.url);
  } catch {
    return failure("Paste a valid YouTube video link.", 400);
  }
  const requestId = randomUUID();
  try {
    const result = await convertAudio(input, request.signal, requestId);
    return new Response(new Uint8Array(result.audio), {
      headers: {
        "Content-Type": "audio/mpeg",
        "Content-Disposition": `attachment; filename="${result.filename}"`,
        "Cache-Control": "no-store",
        "X-Content-Type-Options": "nosniff",
        "X-Request-ID": requestId,
      },
    });
  } catch (error) {
    return failure(
      error instanceof AudioError
        ? error.message
        : "Conversion failed. Please try again.",
      error instanceof AudioError ? error.status : 500,
      requestId,
    );
  }
}
