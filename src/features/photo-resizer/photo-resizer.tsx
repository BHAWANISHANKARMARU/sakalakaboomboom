"use client";
import { useEffect, useState } from "react";
import { FileUploader } from "@/components/tools/file-uploader";
import { ToolResult } from "@/components/tools/tool-result";
import { sanitizeDownloadFilename } from "@/lib/files/filenames";
import { resizeToLimits, type ResizedImage } from "./resize";

const presets = {
  photo: { minKb: 20, maxKb: 50, width: 200, height: 230 },
  signature: { minKb: 10, maxKb: 20, width: 140, height: 60 },
};
type Preset = keyof typeof presets;
type Limits = (typeof presets)[Preset];

const fields: [keyof Limits, string][] = [
  ["minKb", "Minimum size (KB)"],
  ["maxKb", "Maximum size (KB)"],
  ["width", "Width (pixels)"],
  ["height", "Height (pixels)"],
];

export function PhotoResizer() {
  const [file, setFile] = useState<File>(),
    [preset, setPreset] = useState<Preset>("photo"),
    [limits, setLimits] = useState<Limits>(presets.photo),
    [message, setMessage] = useState(""),
    [url, setUrl] = useState(""),
    [output, setOutput] = useState<ResizedImage>();
  useEffect(
    () => () => {
      if (url) URL.revokeObjectURL(url);
    },
    [url],
  );
  function clearResult() {
    if (url) URL.revokeObjectURL(url);
    setUrl("");
    setOutput(undefined);
    setMessage("");
  }
  async function run() {
    if (!file) return;
    if (
      Object.values(limits).some((value) => !Number.isFinite(value)) ||
      limits.minKb < 0 ||
      limits.maxKb <= limits.minKb ||
      limits.width < 10 ||
      limits.height < 10 ||
      limits.width > 4000 ||
      limits.height > 4000
    ) {
      setMessage(
        "Check your values. Maximum KB must be above minimum KB, and pixels must be between 10 and 4000.",
      );
      return;
    }
    try {
      setMessage("Resizing image…");
      const result = await resizeToLimits(file, limits);
      if (url) URL.revokeObjectURL(url);
      setUrl(URL.createObjectURL(result.blob));
      setOutput(result);
      setMessage(
        result.belowMinimum
          ? "The image is below your minimum KB. Try larger pixel dimensions or a clearer original."
          : "Your image is ready. Check that it looks clear before you upload it.",
      );
    } catch (error) {
      setUrl("");
      setOutput(undefined);
      setMessage(
        error instanceof Error
          ? error.message
          : "This image could not be resized. Try a different file.",
      );
    }
  }
  return (
    <section className="border-line grid gap-5 rounded-lg border p-4 sm:p-7">
      <FileUploader
        accept="image/jpeg,image/png,image/webp"
        label="Choose a photo or signature"
        onChange={(files) => {
          setFile(files[0]);
          clearResult();
        }}
      />
      <label className="tool-field">
        Image type
        <select
          value={preset}
          onChange={(event) => {
            const next = event.target.value as Preset;
            setPreset(next);
            setLimits(presets[next]);
            clearResult();
          }}
        >
          <option value="photo">Photo</option>
          <option value="signature">Signature</option>
        </select>
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        {fields.map(([key, name]) => (
          <label className="tool-field" key={key}>
            {name}
            <input
              type="number"
              min="0"
              value={limits[key]}
              onChange={(event) => {
                setLimits({ ...limits, [key]: event.target.valueAsNumber });
                clearResult();
              }}
            />
          </label>
        ))}
      </div>
      <p className="text-muted text-sm">
        These values are only a starting point. Enter the limits from your
        official notification.
      </p>
      <button className="button" disabled={!file} onClick={run} type="button">
        Resize image
      </button>
      {message && (
        <ToolResult>
          <p>{message}</p>
          {url && output && (
            <>
              <p className="text-muted mt-2 text-sm">
                {(output.blob.size / 1024).toFixed(1)} KB · {output.width} ×{" "}
                {output.height} pixels · JPG
              </p>
              <a
                className="button mt-3"
                download={sanitizeDownloadFilename(
                  `${file?.name ?? "image"}-resized`,
                  "jpg",
                )}
                href={url}
              >
                Download JPG
              </a>
            </>
          )}
        </ToolResult>
      )}
    </section>
  );
}
