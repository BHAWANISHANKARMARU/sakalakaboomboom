// @vitest-environment node
import { access, writeFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";
import {
  createAudioConverter,
  runCommand,
  type CommandRunner,
} from "@/features/youtube-audio/server";

const url = "https://youtu.be/BaW_jenozKc";

describe("local audio conversion", () => {
  it("runs metadata, download and MP3 conversion in order and removes temporary files", async () => {
    const steps: string[] = [];
    const files: string[] = [];
    const run: CommandRunner = async (command, args) => {
      if (args.includes("--dump-single-json")) {
        steps.push("metadata");
        return JSON.stringify({
          duration: 10,
          is_live: false,
          title: "Example",
        });
      }
      if (command === "python") {
        steps.push("download");
        expect(args.at(-1)).toBe("https://www.youtube.com/watch?v=BaW_jenozKc");
        expect(args).toContain("--no-playlist");
        const path = args[args.indexOf("-o") + 1];
        files.push(path);
        await writeFile(path, "source");
      } else {
        steps.push("mp3");
        expect(args).toContain("libmp3lame");
        const path = args.at(-1)!;
        files.push(path);
        await writeFile(path, "ID3-test-audio");
      }
      return "";
    };
    const convert = createAudioConverter({
      run,
      python: "python",
      ffmpeg: "ffmpeg",
    });
    const result = await convert(url);
    expect(steps).toEqual(["metadata", "download", "mp3"]);
    expect(result.audio.toString()).toBe("ID3-test-audio");
    expect(result.filename).toBe("youtube-BaW_jenozKc.mp3");
    for (const path of files) await expect(access(path)).rejects.toThrow();
  });

  it.each([
    { duration: 601, is_live: false },
    { duration: 12, is_live: true },
    { duration: null, is_live: false },
    { duration: 0, is_live: false },
    { duration: 12, live_status: "is_upcoming" },
  ])(
    "rejects long, live, upcoming or unknown-duration media before downloading: %j",
    async (metadata) => {
      let calls = 0;
      const convert = createAudioConverter({
        run: async () => {
          calls++;
          return JSON.stringify(metadata);
        },
        python: "python",
        ffmpeg: "ffmpeg",
      });
      await expect(convert(url)).rejects.toMatchObject({ status: 422 });
      expect(calls).toBe(1);
    },
  );

  it("rejects concurrent work, then releases its slot after a provider failure", async () => {
    let reject: (error: Error) => void = () => {};
    const convert = createAudioConverter({
      run: () =>
        new Promise((_, fail) => {
          reject = fail;
        }),
      python: "python",
      ffmpeg: "ffmpeg",
    });
    const first = convert(url);
    const assertion = expect(first).rejects.toMatchObject({ status: 502 });
    await expect(convert(url)).rejects.toMatchObject({ status: 429 });
    // Wait for the converter's temporary directory to be created.
    await new Promise((resolve) => setTimeout(resolve, 30));
    reject(new Error("YouTube refused this request"));
    await assertion;
    const second = convert(url);
    const secondAssertion = expect(second).rejects.toMatchObject({
      status: 502,
    });
    await new Promise((resolve) => setTimeout(resolve, 30));
    reject(new Error("still unavailable"));
    await secondAssertion;
  });

  it("runs processes without interpreting shell syntax", async () => {
    expect(
      await runCommand(process.execPath, [
        "-e",
        "process.stdout.write(process.argv[1])",
        "$(echo bad)",
      ]),
    ).toBe("$(echo bad)");
  });

  it("stops an aborted subprocess", async () => {
    const controller = new AbortController();
    const result = runCommand(
      process.execPath,
      ["-e", "setInterval(() => {}, 1000)"],
      controller.signal,
    );
    controller.abort();
    await expect(result).rejects.toThrow();
  });
});
