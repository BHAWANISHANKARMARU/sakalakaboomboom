import { spawnSync } from "node:child_process";
import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

// Build a pinned, on-demand token script. It runs as a child of yt-dlp;
// no listening server, account cookies or external conversion service is used.
const revision = "26475e9d3665b972c4aeb83b4dbaafcf64b88438";
const destination = join(process.cwd(), ".audio-bin", "pot");
const server = join(destination, "server");
const stamp = `${revision}:${process.platform}:${process.arch}:${process.versions.node.split(".")[0]}`;
const marker = join(destination, ".prepared");
function run(command, args, cwd) {
  const result = spawnSync(command, args, {
    cwd,
    stdio: "inherit",
    timeout: 300_000,
  });
  if (result.error || result.status !== 0)
    throw new Error(`Audio token setup failed: ${command}`);
}
await mkdir(join(process.cwd(), ".audio-bin"), { recursive: true });
if (
  !(await access(join(destination, ".git")).then(
    () => true,
    () => false,
  ))
) {
  run("git", [
    "clone",
    "--depth",
    "1",
    "--branch",
    "2.0.2",
    "https://github.com/Brainicism/bgutil-ytdlp-pot-provider.git",
    destination,
  ]);
}
const actual = spawnSync("git", ["rev-parse", "HEAD"], {
  cwd: destination,
  encoding: "utf8",
});
if (actual.status !== 0 || actual.stdout.trim() !== revision)
  throw new Error("Audio token provider revision mismatch");
if ((await readFile(marker, "utf8").catch(() => "")) !== stamp) {
  run("npm", ["ci", "--include=dev"], server);
  run(
    process.execPath,
    [join(server, "node_modules", "typescript", "bin", "tsc")],
    server,
  );
  run("npm", ["prune", "--omit=dev", "--ignore-scripts"], server);
  await writeFile(marker, stamp);
}
run(
  process.execPath,
  [join(server, "build", "generate_once.js"), "--version"],
  server,
);
console.log("Audio: playback-token provider ready.");
