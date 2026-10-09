import { createHash } from "node:crypto";
import { chmod, mkdir, readFile, rename, writeFile } from "node:fs/promises";
import { join } from "node:path";

// A standalone Linux executable includes Python; no Python runtime is needed
// inside the deployed Next.js Node function. Never download code at request time.
const version = "2026.08.19";
const linux = process.platform === "linux" || process.argv.includes("--linux");
if (!linux) {
  console.log(
    "Audio: local macOS development uses .venv-audio; Linux executable not required.",
  );
  process.exit(0);
}
const arch = process.argv.includes("--linux") ? "x64" : process.arch;
const asset =
  arch === "x64"
    ? "yt-dlp_linux"
    : arch === "arm64"
      ? "yt-dlp_linux_aarch64"
      : null;
if (!asset) throw new Error(`Unsupported audio runtime architecture: ${arch}`);
const base = `https://github.com/yt-dlp/yt-dlp/releases/download/${version}`;
async function fetchFile(name) {
  const response = await fetch(`${base}/${name}`, {
    signal: AbortSignal.timeout(120_000),
  });
  if (!response.ok)
    throw new Error(`Cannot download ${name}: HTTP ${response.status}`);
  return Buffer.from(await response.arrayBuffer());
}
const sums = (await fetchFile("SHA2-256SUMS")).toString("utf8");
const expected = sums
  .split("\n")
  .find((line) => line.trim().split(/\s+/).at(-1) === asset)
  ?.split(/\s+/)[0];
if (!expected || !/^[a-f0-9]{64}$/.test(expected))
  throw new Error(`Missing checksum for ${asset}`);
const directory = join(process.cwd(), ".audio-bin");
const destination = join(directory, "yt-dlp");
const digest = (bytes) => createHash("sha256").update(bytes).digest("hex");
let bytes = await readFile(destination).catch(() => null);
if (!bytes || digest(bytes) !== expected) {
  bytes = await fetchFile(asset);
  if (digest(bytes) !== expected)
    throw new Error("yt-dlp checksum verification failed");
  await mkdir(directory, { recursive: true });
  await writeFile(`${destination}.download`, bytes, { mode: 0o755 });
  await rename(`${destination}.download`, destination);
}
await chmod(destination, 0o755);
console.log(
  `Audio: verified yt-dlp ${version} (${arch}, ${bytes.length} bytes).`,
);
