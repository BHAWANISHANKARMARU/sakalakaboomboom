import { spawn } from "node:child_process";
import { mkdir, mkdtemp, readFile, readdir, rm, stat } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { normalizeYoutubeUrl } from "./validate";
import ffmpegStatic from "ffmpeg-static";
import {
  AUDIO_MAX_SECONDS,
  AUDIO_MAX_OUTPUT_BYTES,
  AUDIO_MAX_MINUTES,
} from "./limits";

export class AudioError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
  }
}

export type CommandRunner = (
  command: string,
  args: string[],
  signal?: AbortSignal,
  temporaryDirectory?: string,
) => Promise<string>;

// No shell interpolation. Kill the process group so cancellation also stops children.
export const runCommand: CommandRunner = (
  command,
  args,
  signal,
  temporaryDirectory,
) =>
  new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(new AudioError("Conversion cancelled.", 499));
      return;
    }
    const child = spawn(command, args, {
      shell: false,
      env: temporaryDirectory
        ? {
            ...process.env,
            TMPDIR: temporaryDirectory,
            TMP: temporaryDirectory,
            TEMP: temporaryDirectory,
          }
        : process.env,
      detached: process.platform !== "win32",
      stdio: ["ignore", "pipe", "pipe"],
    });
    let stdout = "";
    let stderr = "";
    let stopped: Error | undefined;
    const stop = (error: Error) => {
      stopped = error;
      try {
        if (child.pid && process.platform !== "win32")
          process.kill(-child.pid, "SIGKILL");
        else child.kill("SIGKILL");
      } catch {
        /* Process already exited. */
      }
    };
    const abort = () => stop(new AudioError("Conversion cancelled.", 499));
    const timer = setTimeout(
      () =>
        stop(
          new AudioError("Conversion took too long. Try a shorter video.", 504),
        ),
      90_000,
    );
    signal?.addEventListener("abort", abort, { once: true });
    if (signal?.aborted) abort();
    const cleanup = () => {
      clearTimeout(timer);
      signal?.removeEventListener("abort", abort);
    };
    child.stdout.on("data", (chunk: Buffer) => {
      stdout += chunk.toString();
      if (stdout.length > 2_000_000)
        stop(new AudioError("Video information is too large to process.", 422));
    });
    child.stderr.on("data", (chunk: Buffer) => {
      stderr = (stderr + chunk.toString()).slice(-8000);
    });
    child.on("error", () => {
      cleanup();
      reject(
        new AudioError(
          "The audio converter could not start. Please try again later.",
          503,
        ),
      );
    });
    child.on("close", (code) => {
      cleanup();
      if (stopped) reject(stopped);
      else if (code !== 0) {
        if (/sign in to confirm|not a bot|login_required/i.test(stderr)) {
          reject(
            new AudioError(
              "YouTube is requiring playback verification from our server, so this video cannot be converted right now.",
              502,
            ),
          );
        } else if (
          /error loading python|shared object file|exec format|permission denied|GLIBC_/i.test(
            stderr,
          )
        ) {
          reject(
            new AudioError(
              "The audio converter could not start. Please try again later.",
              503,
            ),
          );
        } else {
          reject(new Error(stderr || "Conversion process failed."));
        }
      } else resolve(stdout);
    });
  });

export function createAudioConverter(
  options: {
    run?: CommandRunner;
    python?: string;
    ffmpeg?: string;
    executable?: string;
  } = {},
) {
  const run = options.run ?? runCommand;
  let busy = false;
  return async (input: unknown, signal?: AbortSignal) => {
    let url: string;
    try {
      url = normalizeYoutubeUrl(input);
    } catch (error) {
      throw new AudioError((error as Error).message, 400);
    }
    if (busy)
      throw new AudioError(
        "Another video is being converted. Please try again shortly.",
        429,
      );
    busy = true;
    let directory: string | undefined;
    let monitor: ReturnType<typeof setInterval> | undefined;
    const controller = new AbortController();
    const abort = () => controller.abort();
    signal?.addEventListener("abort", abort, { once: true });
    if (signal?.aborted) abort();
    const totalTimer = setTimeout(abort, 180_000);
    let tooLarge = false;
    try {
      const python =
        options.python ?? join(process.cwd(), ".venv-audio", "bin", "python");
      const executable =
        options.executable ??
        (!options.python && process.platform === "linux"
          ? join(process.cwd(), ".audio-bin", "yt-dlp")
          : undefined);
      const command = executable ?? python;
      const ffmpeg = options.ffmpeg ?? ffmpegStatic;
      if (!ffmpeg)
        throw new AudioError(
          "Audio conversion is unavailable on this platform.",
          503,
        );
      directory = await mkdtemp(join(tmpdir(), "sakalaka-audio-"));
      // PyInstaller extracts Python here. Owning this subtree lets finally clean
      // it even when cancellation kills the bootloader before its own cleanup.
      const runtimeDirectory = join(directory, "runtime");
      await mkdir(runtimeDirectory);
      const workDirectory = directory;
      monitor = setInterval(() => {
        void readdir(workDirectory)
          .then(async (names) => {
            const sizes = await Promise.all(
              names
                .filter((name) => name !== "runtime")
                .map((name) => stat(join(workDirectory, name))),
            );
            if (
              sizes.reduce((sum, item) => sum + item.size, 0) >
              60 * 1024 * 1024
            ) {
              tooLarge = true;
              controller.abort();
            }
          })
          .catch(() => {});
      }, 500);
      const common = [
        ...(executable ? [] : ["-m", "yt_dlp"]),
        "--ignore-config",
        "--no-plugin-dirs",
        "--no-playlist",
        "--no-cache-dir",
        "--no-progress",
        "--js-runtimes",
        `node:${process.execPath}`,
        "--socket-timeout",
        "15",
        "--retries",
        "1",
        "--fragment-retries",
        "1",
      ];
      const metadata = JSON.parse(
        await run(
          command,
          [...common, "--dump-single-json", "--skip-download", "--", url],
          controller.signal,
          runtimeDirectory,
        ),
      );
      if (
        typeof metadata.duration !== "number" ||
        !Number.isFinite(metadata.duration) ||
        metadata.duration <= 0 ||
        metadata.duration > AUDIO_MAX_SECONDS ||
        metadata.is_live ||
        metadata.live_status === "is_upcoming"
      ) {
        throw new AudioError(
          `Choose a recorded video up to ${AUDIO_MAX_MINUTES} minutes long. Live streams and videos with unknown duration are not supported.`,
          422,
        );
      }
      const source = join(directory, "source.audio");
      const output = join(directory, "audio.mp3");
      await run(
        command,
        [
          ...common,
          "--no-simulate",
          "--fixup",
          "never",
          "--downloader",
          "native",
          "--match-filters",
          `!is_live & duration > 0 & duration <= ${AUDIO_MAX_SECONDS}`,
          "--max-filesize",
          "40M",
          "-f",
          "bestaudio/best",
          "-o",
          source,
          "--",
          url,
        ],
        controller.signal,
        runtimeDirectory,
      );
      const sourceStat = await stat(source);
      if (!sourceStat.size || sourceStat.size > 40 * 1024 * 1024)
        throw new AudioError(
          "This video's audio is too large. Try a shorter video.",
          422,
        );
      await run(
        ffmpeg,
        [
          "-nostdin",
          "-hide_banner",
          "-loglevel",
          "error",
          "-i",
          source,
          "-vn",
          "-t",
          String(AUDIO_MAX_SECONDS),
          "-codec:a",
          "libmp3lame",
          "-b:a",
          "128k",
          output,
        ],
        controller.signal,
        runtimeDirectory,
      );
      const outputStat = await stat(output);
      if (!outputStat.size || outputStat.size > AUDIO_MAX_OUTPUT_BYTES)
        throw new AudioError(
          "The audio could not be prepared within the size limit.",
          422,
        );
      return {
        audio: await readFile(output),
        filename: `youtube-${new URL(url).searchParams.get("v")}.mp3`,
      };
    } catch (error) {
      if (tooLarge)
        throw new AudioError(
          "This video exceeds the processing size limit. Try a shorter video.",
          422,
        );
      if (signal?.aborted) throw new AudioError("Conversion cancelled.", 499);
      if (controller.signal.aborted)
        throw new AudioError(
          "Conversion took too long. Try a shorter video.",
          504,
        );
      if (error instanceof AudioError) throw error;
      throw new AudioError(
        "YouTube could not provide audio for this video. It may be unavailable or require playback verification. Try another public video.",
        502,
      );
    } finally {
      clearTimeout(totalTimer);
      if (monitor) clearInterval(monitor);
      signal?.removeEventListener("abort", abort);
      try {
        if (directory) await rm(directory, { recursive: true, force: true });
      } finally {
        busy = false;
      }
    }
  };
}

export const convertAudio = createAudioConverter();
