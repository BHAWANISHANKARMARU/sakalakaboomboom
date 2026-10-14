"use client";

import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
} from "react";
import { responseFilename } from "./options";

const time = (seconds: number) =>
  `${Math.floor(seconds / 60)}:${(seconds % 60).toFixed(1).padStart(4, "0")}`;

export function AudioTrimmer({
  src,
  blob,
  duration: initialDuration,
  filename,
  videoUrl,
}: {
  src: string;
  blob: Blob;
  duration: number;
  filename: string;
  videoUrl: string;
}) {
  const audio = useRef<HTMLAudioElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const pending = useRef<AbortController | null>(null);
  const [duration, setDuration] = useState(initialDuration);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(initialDuration);
  const [position, setPosition] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [peaks, setPeaks] = useState<number[]>([]);
  const [waveError, setWaveError] = useState(false);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [download, setDownload] = useState<{
    url: string;
    filename: string;
  } | null>(null);
  const selection = useRef({ start, end });
  const changed = start !== 0 || end !== duration;

  useEffect(() => {
    let disposed = false;
    let context: AudioContext | undefined;
    async function decode() {
      try {
        context = new AudioContext();
        const buffer = await context.decodeAudioData(await blob.arrayBuffer());
        const samples = buffer.getChannelData(0);
        // Ignore MP3 encoder padding beyond the source duration so waveform
        // coordinates and server trim times share the same timeline.
        const data =
          initialDuration > 0
            ? samples.subarray(
                0,
                Math.min(
                  samples.length,
                  Math.round(initialDuration * buffer.sampleRate),
                ),
              )
            : samples;
        const values = Array.from({ length: 240 }, (_, index) => {
          let peak = 0;
          const from = Math.floor((index * data.length) / 240);
          const to = Math.floor(((index + 1) * data.length) / 240);
          for (let i = from; i < to; i++)
            peak = Math.max(peak, Math.abs(data[i]));
          return peak;
        });
        if (!disposed) setPeaks(values);
      } catch {
        if (!disposed) setWaveError(true);
      } finally {
        if (context && context.state !== "closed")
          void context.close().catch(() => {});
      }
    }
    void decode();
    return () => {
      disposed = true;
      if (context && context.state !== "closed")
        void context.close().catch(() => {});
    };
  }, [blob, initialDuration]);

  useEffect(
    () => () => {
      pending.current?.abort();
    },
    [],
  );
  useEffect(
    () => () => {
      if (download) URL.revokeObjectURL(download.url);
    },
    [download],
  );
  useEffect(() => {
    if (!playing) return;
    let frame: number;
    const update = () => {
      const player = audio.current;
      if (!player) return;
      setPosition(player.currentTime);
      if (player.currentTime >= selection.current.end) {
        player.pause();
        return;
      }
      frame = requestAnimationFrame(update);
    };
    frame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frame);
  }, [playing]);

  function play(at = selection.current.start) {
    const player = audio.current;
    if (!player || !duration) return;
    player.currentTime = Math.max(
      selection.current.start,
      Math.min(at, selection.current.end),
    );
    setPosition(player.currentTime);
    setError("");
    void player
      .play()
      .catch(() =>
        setError("Audio could not play. Please try Play selection again."),
      );
  }
  function change(which: "start" | "end", value: number) {
    if (saving) return;
    audio.current?.pause();
    const previous = selection.current;
    const next = Math.round(Math.max(0, Math.min(duration, value)) * 10) / 10;
    const updated =
      which === "start"
        ? {
            start: Math.max(0, Math.min(next, previous.end - 0.2)),
            end: previous.end,
          }
        : {
            start: previous.start,
            end: Math.min(duration, Math.max(next, previous.start + 0.2)),
          };
    updated.start = Number(updated.start.toFixed(3));
    updated.end = Number(updated.end.toFixed(3));
    selection.current = updated;
    setStart(updated.start);
    setEnd(updated.end);
    setDownload(null);
    setError("");
  }
  function pointerTime(event: PointerEvent) {
    const bounds = track.current!.getBoundingClientRect();
    return ((event.clientX - bounds.left) / bounds.width) * duration;
  }
  function keyboard(which: "start" | "end", event: KeyboardEvent) {
    const step = event.shiftKey ? 1 : 0.1;
    let value = selection.current[which];
    if (event.key === "ArrowLeft" || event.key === "ArrowDown") value -= step;
    else if (event.key === "ArrowRight" || event.key === "ArrowUp")
      value += step;
    else if (event.key === "Home") value = 0;
    else if (event.key === "End") value = duration;
    else return;
    event.preventDefault();
    change(which, value);
  }
  function previewBoundary(which: "start" | "end") {
    play(
      which === "start"
        ? selection.current.start
        : Math.max(selection.current.start, selection.current.end - 2),
    );
  }
  async function exportClip() {
    if (pending.current) return;
    audio.current?.pause();
    const controller = new AbortController();
    pending.current = controller;
    setSaving(true);
    setError("");
    const timeout = setTimeout(() => controller.abort(), 190_000);
    try {
      const response = await fetch("/api/youtube-audio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: videoUrl,
          trim: { start, ...(end < duration ? { end } : {}) },
        }),
        signal: controller.signal,
      });
      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(
          body.error || "Could not prepare the selected clip. Try again.",
        );
      }
      if (!response.headers.get("content-type")?.includes("audio/mpeg"))
        throw new Error("The server did not return MP3 audio.");
      const output = await response.blob();
      if (!output.size) throw new Error("No audio was returned. Try again.");
      if (controller.signal.aborted) return;
      setDownload({
        url: URL.createObjectURL(output),
        filename: responseFilename(
          response.headers.get("content-disposition"),
          filename.replace(/\.mp3$/i, ""),
        ),
      });
    } catch (err) {
      setError(
        controller.signal.aborted
          ? "Clip preparation stopped. Your selection is still here."
          : err instanceof Error
            ? err.message
            : "Could not prepare clip.",
      );
    } finally {
      clearTimeout(timeout);
      pending.current = null;
      setSaving(false);
    }
  }

  return (
    <section
      className="grid w-full min-w-0 gap-4 rounded-xl bg-slate-950 p-4 text-white sm:p-6"
      aria-label="Audio trim editor"
    >
      <p className="font-semibold break-words">{filename}</p>
      <p className="text-sm text-slate-300">
        Drag either handle to trim. Release to hear that edge, or click the
        waveform to listen from there.
      </p>
      <audio
        ref={audio}
        src={src}
        preload="metadata"
        onLoadedMetadata={() => {
          if (
            !duration &&
            audio.current &&
            Number.isFinite(audio.current.duration)
          ) {
            const value = Math.min(240, audio.current.duration);
            setDuration(value);
            setEnd(value);
            selection.current = { start: 0, end: value };
          }
        }}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        onTimeUpdate={() => {
          if (
            audio.current &&
            audio.current.currentTime >= selection.current.end
          )
            audio.current.pause();
        }}
        onError={() =>
          setError("Audio preview could not load. Try converting again.")
        }
      />
      {duration > 0 && (
        <>
          <div
            ref={track}
            className="relative mx-3 h-44 rounded-md bg-slate-900 select-none"
            data-testid="waveform"
          >
            <button
              type="button"
              disabled={saving}
              aria-label="Seek in selected audio"
              className="absolute inset-0 h-full w-full cursor-crosshair overflow-hidden rounded-md focus-visible:outline-2 focus-visible:outline-white"
              onClick={(event) => {
                const bounds = event.currentTarget.getBoundingClientRect();
                play(
                  Math.min(
                    end - 0.01,
                    Math.max(
                      start,
                      ((event.clientX - bounds.left) / bounds.width) * duration,
                    ),
                  ),
                );
              }}
            >
              <svg
                viewBox="0 0 1000 160"
                preserveAspectRatio="none"
                className="h-full w-full"
                aria-hidden="true"
              >
                <line x1="0" x2="1000" y1="80" y2="80" stroke="#334155" />
                {peaks.map((peak, index) => (
                  <rect
                    key={index}
                    x={(index * 1000) / peaks.length}
                    y={80 - Math.max(1, peak * 70)}
                    width="2.5"
                    height={Math.max(2, peak * 140)}
                    rx="1"
                    fill="#2dd4bf"
                  />
                ))}
              </svg>
            </button>
            {!peaks.length && (
              <span className="pointer-events-none absolute inset-0 flex items-center justify-center text-sm text-slate-300">
                {waveError
                  ? "Waveform unavailable — playback and trimming still work"
                  : "Drawing waveform…"}
              </span>
            )}
            <div
              className="pointer-events-none absolute inset-y-0 left-0 bg-black/60"
              style={{ width: `${(start / duration) * 100}%` }}
            />
            <div
              className="pointer-events-none absolute inset-y-0 right-0 bg-black/60"
              style={{ width: `${((duration - end) / duration) * 100}%` }}
            />
            <div
              className="pointer-events-none absolute inset-y-0 border-y-2 border-amber-300"
              style={{
                left: `${(start / duration) * 100}%`,
                width: `${((end - start) / duration) * 100}%`,
              }}
            />
            <div
              className="pointer-events-none absolute inset-y-0 w-px bg-white"
              style={{ left: `${Math.min(100, (position / duration) * 100)}%` }}
            />
            {(["start", "end"] as const).map((which) => (
              <div
                key={which}
                role="slider"
                tabIndex={saving ? -1 : 0}
                aria-disabled={saving}
                aria-label={`Selection ${which}`}
                aria-valuemin={which === "start" ? 0 : start + 0.2}
                aria-valuemax={which === "start" ? end - 0.2 : duration}
                aria-valuenow={which === "start" ? start : end}
                aria-valuetext={time(which === "start" ? start : end)}
                className="absolute inset-y-0 z-10 flex w-6 -translate-x-1/2 cursor-ew-resize touch-none items-center justify-center rounded border-2 border-amber-300 bg-amber-300/15 outline-offset-4 focus-visible:outline-2 focus-visible:outline-white"
                style={{
                  left: `${((which === "start" ? start : end) / duration) * 100}%`,
                }}
                onKeyDown={(event) => keyboard(which, event)}
                onKeyUp={(event) => {
                  if (
                    event.key.startsWith("Arrow") ||
                    ["Home", "End"].includes(event.key)
                  )
                    previewBoundary(which);
                }}
                onPointerDown={(event) => {
                  if (saving) return;
                  event.preventDefault();
                  event.currentTarget.setPointerCapture(event.pointerId);
                  change(which, pointerTime(event));
                }}
                onPointerMove={(event) => {
                  if (event.currentTarget.hasPointerCapture(event.pointerId))
                    change(which, pointerTime(event));
                }}
                onPointerUp={(event) => {
                  if (!event.currentTarget.hasPointerCapture(event.pointerId))
                    return;
                  event.currentTarget.releasePointerCapture(event.pointerId);
                  previewBoundary(which);
                }}
              >
                <span
                  aria-hidden="true"
                  className="rounded bg-amber-300 px-1 py-3 text-xs font-bold text-slate-950"
                >
                  Ⅱ
                </span>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap justify-between gap-3 font-mono text-sm text-slate-200">
            <span>Start {time(start)}</span>
            <span>Selected {time(end - start)}</span>
            <span>End {time(end)}</span>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              className="rounded-md bg-white px-4 py-2 font-semibold text-slate-950 disabled:opacity-50"
              disabled={saving}
              onClick={() => (playing ? audio.current?.pause() : play())}
            >
              {playing ? "Pause" : "Play selection"}
            </button>
            <button
              type="button"
              className="rounded-md border border-slate-500 px-4 py-2 disabled:opacity-50"
              disabled={saving}
              onClick={() => {
                audio.current?.pause();
                change("start", 0);
                change("end", duration);
              }}
            >
              Reset selection
            </button>
            {changed && !download && (
              <button
                type="button"
                className="rounded-md bg-amber-300 px-4 py-2 font-semibold text-slate-950 disabled:opacity-50"
                disabled={saving}
                onClick={() => void exportClip()}
              >
                {saving ? "Preparing clip…" : "Prepare trimmed MP3"}
              </button>
            )}
            {saving && (
              <button
                type="button"
                className="rounded-md border border-slate-500 px-4 py-2"
                onClick={() => pending.current?.abort()}
              >
                Cancel
              </button>
            )}
          </div>
        </>
      )}
      {(!changed || download) && (
        <a
          className="w-fit rounded-md bg-teal-400 px-4 py-2 font-semibold text-slate-950"
          href={download?.url ?? src}
          download={download?.filename ?? filename}
        >
          {download ? "Download trimmed MP3" : "Download MP3"}
        </a>
      )}
      {saving && (
        <p role="status" className="text-sm text-slate-300">
          Preparing your selected audio. This can take up to 3 minutes.
        </p>
      )}
      {download && (
        <p role="status" className="text-sm text-teal-300">
          Your selected clip is ready to download.
        </p>
      )}
      {error && (
        <p role="alert" className="text-sm text-red-300">
          {error}
        </p>
      )}
    </section>
  );
}
