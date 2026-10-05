"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { normalizeYoutubeUrl } from "./validate";

export function YoutubeAudio() {
  const [url, setUrl] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<{
    url: string;
    filename: string;
    size: number;
  } | null>(null);
  const pending = useRef<AbortController | null>(null);

  useEffect(
    () => () => {
      if (result) URL.revokeObjectURL(result.url);
    },
    [result],
  );
  useEffect(
    () => () => {
      pending.current?.abort();
    },
    [],
  );

  async function convert(event: FormEvent) {
    event.preventDefault();
    if (pending.current) return;
    setError("");
    setResult(null);
    let canonical: string;
    try {
      canonical = normalizeYoutubeUrl(url);
    } catch (error) {
      setError((error as Error).message);
      return;
    }
    const controller = new AbortController();
    pending.current = controller;
    setBusy(true);
    const timeout = setTimeout(() => controller.abort(), 190_000);
    try {
      const response = await fetch("/api/youtube-audio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: canonical }),
        signal: controller.signal,
      });
      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(
          typeof body.error === "string"
            ? body.error
            : "Conversion failed. Please try again.",
        );
      }
      if (!response.headers.get("content-type")?.includes("audio/mpeg"))
        throw new Error("The server did not return an MP3. Please try again.");
      const audio = await response.blob();
      if (!audio.size)
        throw new Error("No audio was returned. Try another video.");
      if (controller.signal.aborted) return;
      setResult({
        url: URL.createObjectURL(audio),
        filename: `youtube-${new URL(canonical).searchParams.get("v")}.mp3`,
        size: audio.size,
      });
    } catch (error) {
      setError(
        controller.signal.aborted
          ? "Conversion stopped. You can try another video."
          : error instanceof Error
            ? error.message
            : "Could not connect to the converter. Please try again.",
      );
    } finally {
      clearTimeout(timeout);
      pending.current = null;
      setBusy(false);
    }
  }

  return (
    <form
      onSubmit={convert}
      className="border-line grid gap-5 rounded-lg border p-4 sm:p-7"
      aria-busy={busy}
    >
      <div>
        <h2 className="text-navy text-xl font-bold">
          Your video, ready to listen
        </h2>
        <p className="text-muted mt-2">
          Paste a YouTube link to create a 128 kbps MP3. Videos up to 10 minutes
          are supported.
        </p>
      </div>
      <label className="text-navy grid gap-2 font-bold">
        YouTube video URL
        <input
          className="field font-normal"
          type="url"
          required
          maxLength={2048}
          value={url}
          disabled={busy}
          placeholder="https://www.youtube.com/watch?v=…"
          onChange={(event) => {
            setUrl(event.target.value);
            setResult(null);
            setError("");
          }}
        />
      </label>
      <div className="flex flex-wrap gap-3">
        <button
          className="button disabled:cursor-wait disabled:opacity-60"
          type="submit"
          disabled={busy}
        >
          {busy ? "Preparing audio…" : "Convert to MP3"}
        </button>
        {busy && (
          <button
            className="button"
            type="button"
            onClick={() => pending.current?.abort()}
          >
            Cancel
          </button>
        )}
      </div>
      {busy && (
        <p role="status" className="text-muted">
          Downloading and converting audio. This can take up to 3 minutes.
        </p>
      )}
      {error && (
        <p role="alert" className="tool-result">
          {error}
        </p>
      )}
      {result && (
        <div className="tool-result grid justify-items-start gap-3">
          <p role="status">
            Your MP3 is ready ({(result.size / 1024 / 1024).toFixed(1)} MB).
          </p>
          <a className="button" href={result.url} download={result.filename}>
            Download MP3
          </a>
        </div>
      )}
      <p className="text-muted text-sm">
        Convert videos you own or have permission to download. Playlists and
        live streams are not supported.
      </p>
    </form>
  );
}
