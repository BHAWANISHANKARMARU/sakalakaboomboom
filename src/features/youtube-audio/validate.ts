export function normalizeYoutubeUrl(input: unknown): string {
  const invalid = () =>
    new Error("Paste a valid YouTube video link (watch, Shorts or youtu.be).");
  if (typeof input !== "string" || input.length > 2048) throw invalid();
  let url: URL;
  try {
    url = new URL(input.trim());
  } catch {
    throw invalid();
  }
  if (
    !["https:", "http:"].includes(url.protocol) ||
    url.username ||
    url.password ||
    url.port
  )
    throw invalid();
  let id: string | null = null;
  if (url.hostname === "youtu.be") {
    id = url.pathname.match(/^\/([\w-]{11})\/?$/)?.[1] ?? null;
  } else if (
    [
      "youtube.com",
      "www.youtube.com",
      "m.youtube.com",
      "music.youtube.com",
    ].includes(url.hostname)
  ) {
    id =
      url.pathname === "/watch"
        ? url.searchParams.get("v")
        : (url.pathname.match(
            /^\/(?:shorts|embed|live)\/([\w-]{11})\/?$/,
          )?.[1] ?? null);
  }
  if (!id || !/^[\w-]{11}$/.test(id)) throw invalid();
  return `https://www.youtube.com/watch?v=${id}`;
}
