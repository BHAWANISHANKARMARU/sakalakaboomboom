import { randomUUID } from "node:crypto";
import { createStderrDiagnostics } from "./diagnostics";
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

type AudioDiagnostic = ReturnType<
  ReturnType<typeof createStderrDiagnostics>["finish"]
>;
type CommandContext = {
  requestId: string;
  stage: "metadata" | "download" | "encode";
};

export class AudioError extends Error {
  constructor(
    message: string,
    public status: number,
    public diagnostic?: AudioDiagnostic,
  ) {
    super(message);
  }
}

export type CommandRunner = (
  command: string,
  args: string[],
  signal?: AbortSignal,
  temporaryDirectory?: string,
  context?: CommandContext,
) => Promise<string>;

// No shell interpolation. Kill the process group so cancellation also stops children.
export const runCommand: CommandRunner = (
  command,
  args,
  signal,
  temporaryDirectory,
  context,
) =>
  new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(new AudioError("Conversion cancelled.", 499));
      return;
    }
    const childEnvironment = { ...process.env };
    // Both yt-dlp and bgutil otherwise independently inherit proxy settings.
    // Explicit --proxy is the sole network configuration for both processes.
    for (const key of Object.keys(childEnvironment)) {
      if (/^(https?|all|no)_proxy$/i.test(key)) delete childEnvironment[key];
    }
    const child = spawn(command, args, {
      shell: false,
      env: temporaryDirectory
        ? {
            ...childEnvironment,
            TMPDIR: temporaryDirectory,
            TMP: temporaryDirectory,
            TEMP: temporaryDirectory,
            XDG_CACHE_HOME: temporaryDirectory,
          }
        : childEnvironment,
      detached: process.platform !== "win32",
      stdio: ["ignore", "pipe", "pipe"],
    });
    let stdout = "";
    const capture = createStderrDiagnostics();
    const started = Date.now();
    let spawnFailed = false;
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
    child.stderr.on("data", (chunk: Buffer) => capture.feed(chunk.toString()));
    child.on("error", () => {
      spawnFailed = true;
    });
    child.on("close", (code, terminationSignal) => {
      cleanup();
      const diagnostic = capture.finish();
      if (spawnFailed) diagnostic.failures.push("runtime_dependency");
      // Only the allowlisted projection is logged. Never stdout, argv, environment
      // values, raw Error objects or raw provider stderr.
      console.info(
        JSON.stringify({
          event: "youtube_audio_process",
          requestId: context?.requestId,
          stage: context?.stage ?? "process",
          exitCode: code,
          terminationSignal,
          elapsedMs: Date.now() - started,
          runtime: {
            node: process.version,
            platform: process.platform,
            arch: process.arch,
          },
          extraction:
            context?.stage === "encode"
              ? undefined
              : {
                  client: "mweb",
                  fetchPot: "always",
                  cookies: false,
                  network:
                    args.includes("--proxy") &&
                    args[args.indexOf("--proxy") + 1]
                      ? "configured_proxy"
                      : "direct",
                },
          ...diagnostic,
        }),
      );
      if (stopped) {
        reject(stopped);
        return;
      }
      if (code === 0 && !spawnFailed) {
        resolve(stdout);
        return;
      }
      const causes = diagnostic.failures;
      if (causes.includes("runtime_dependency")) {
        reject(
          new AudioError(
            "The audio converter could not start. Please try again later.",
            503,
            diagnostic,
          ),
        );
      } else if (causes.includes("playback_verification")) {
        reject(
          new AudioError(
            "YouTube is requiring playback verification from our server, so this video cannot be converted right now.",
            502,
            diagnostic,
          ),
        );
      } else if (causes.includes("po_token_provider")) {
        reject(
          new AudioError(
            "Playback verification could not be prepared. Please try again later.",
            502,
            diagnostic,
          ),
        );
      } else if (causes.includes("http_403")) {
        reject(
          new AudioError(
            "YouTube refused access to this video's media.",
            502,
            diagnostic,
          ),
        );
      } else if (causes.includes("missing_formats")) {
        reject(
          new AudioError(
            "No downloadable audio format is available for this video.",
            422,
            diagnostic,
          ),
        );
      } else {
        reject(
          new AudioError(
            "Audio processing failed. Please try again later.",
            502,
            diagnostic,
          ),
        );
      }
    });
  });

export function createAudioConverter(
  options: {
    run?: CommandRunner;
    python?: string;
    ffmpeg?: string;
    executable?: string;
    proxy?: string;
  } = {},
) {
  const run = options.run ?? runCommand;
  let busy = false;
  return async (
    input: unknown,
    signal?: AbortSignal,
    requestId = randomUUID(),
  ) => {
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
      // Only deployment configuration can choose the proxy; never browser input.
      const proxy = options.proxy ?? process.env.YOUTUBE_PROXY_URL;
      if (proxy) {
        try {
          const parsed = new URL(proxy);
          if (
            !["http:", "https:", "socks5:", "socks5h:"].includes(
              parsed.protocol,
            ) ||
            !parsed.hostname ||
            (parsed.pathname !== "/" && parsed.pathname !== "") ||
            !!parsed.search ||
            !!parsed.hash ||
            proxy !== proxy.trim()
          )
            throw new Error();
        } catch {
          throw new AudioError(
            "The audio service connection is not configured correctly.",
            503,
          );
        }
      }
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
        "--proxy",
        proxy ?? "",
        "--ignore-config",
        "--no-plugin-dirs",
        "--plugin-dirs",
        join(process.cwd(), ".audio-bin", "pot"),
        "--extractor-args",
        "youtube:player_client=mweb;fetch_pot=always",
        "--extractor-args",
        `youtubepot-bgutilscript:server_home=${join(process.cwd(), ".audio-bin", "pot", "server")}`,
        "--no-playlist",
        "--no-cache-dir",
        "--no-progress",
        "--verbose",
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
          { requestId, stage: "metadata" },
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
        { requestId, stage: "download" },
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
          "-nostats",
          "-loglevel",
          "info",
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
        { requestId, stage: "encode" },
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
