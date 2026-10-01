export function sanitizeDownloadFilename(input: string, extension: string) {
  const base =
    input
      .split(/[\\/]/)
      .pop()
      ?.replace(/\.[^.]+$/, "")
      .normalize("NFKD")
      .replace(/[^a-zA-Z0-9_-]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 80) || "download";
  return `${base}.${extension.replace(/^\./, "")}`;
}
