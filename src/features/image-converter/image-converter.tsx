"use client";
import { useEffect, useState } from "react";
import { FileUploader } from "@/components/tools/file-uploader";
import { ToolResult } from "@/components/tools/tool-result";
import { sanitizeDownloadFilename } from "@/lib/files/filenames";
import { convertImage, type ConvertedImage } from "./convert";

const modes = {
  resize: {
    accept: "image/jpeg,image/png,image/webp",
    label: "Choose an image",
    action: "Resize image",
    mime: undefined,
  },
  "jpg-to-png": {
    accept: "image/jpeg",
    label: "Choose a JPG image",
    action: "Convert to PNG",
    mime: "image/png",
  },
  "png-to-jpg": {
    accept: "image/png",
    label: "Choose a PNG image",
    action: "Convert to JPG",
    mime: "image/jpeg",
  },
} as const;

export function ImageConverter({ mode }: { mode: keyof typeof modes }) {
  const config = modes[mode];
  const [file, setFile] = useState<File>(),
    [width, setWidth] = useState(""),
    [height, setHeight] = useState(""),
    [message, setMessage] = useState(""),
    [url, setUrl] = useState(""),
    [output, setOutput] = useState<ConvertedImage>();
  useEffect(
    () => () => {
      if (url) URL.revokeObjectURL(url);
    },
    [url],
  );
  async function run() {
    if (!file) return;
    const targetWidth = Number(width);
    const targetHeight = Number(height);
    if (mode === "resize") {
      const values = [width, height].filter(Boolean).map(Number);
      if (
        !values.length ||
        values.some(
          (value) => !Number.isInteger(value) || value < 1 || value > 8000,
        )
      ) {
        setMessage("Enter a width or height from 1 to 8000 pixels.");
        return;
      }
    }
    try {
      setMessage("Working on your image…");
      const mime =
        config.mime ?? (file.type === "image/png" ? "image/png" : "image/jpeg");
      const result = await convertImage(
        file,
        mime,
        targetWidth || undefined,
        targetHeight || undefined,
      );
      if (url) URL.revokeObjectURL(url);
      setUrl(URL.createObjectURL(result.blob));
      setOutput(result);
      setMessage("Your image is ready.");
    } catch (error) {
      setUrl("");
      setOutput(undefined);
      setMessage(
        error instanceof Error
          ? error.message
          : "This image could not be processed. Try a different file.",
      );
    }
  }
  const extension = output?.blob.type === "image/png" ? "png" : "jpg";
  return (
    <section className="border-line grid gap-5 rounded-lg border p-4 sm:p-7">
      <FileUploader
        accept={config.accept}
        label={config.label}
        onChange={(files) => {
          setFile(files[0]);
          setMessage("");
          setUrl("");
          setOutput(undefined);
        }}
      />
      {mode === "resize" && (
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="tool-field">
            Width (pixels)
            <input
              type="number"
              min="1"
              value={width}
              onChange={(event) => setWidth(event.target.value)}
            />
          </label>
          <label className="tool-field">
            Height (pixels)
            <input
              type="number"
              min="1"
              value={height}
              onChange={(event) => setHeight(event.target.value)}
            />
          </label>
        </div>
      )}
      <button className="button" disabled={!file} onClick={run} type="button">
        {config.action}
      </button>
      {message && (
        <ToolResult>
          <p>{message}</p>
          {url && output && (
            <>
              <p className="text-muted mt-2 text-sm">
                {(output.blob.size / 1024).toFixed(1)} KB · {output.width} ×{" "}
                {output.height} pixels · {extension.toUpperCase()}
              </p>
              <a
                className="button mt-3"
                download={sanitizeDownloadFilename(
                  `${file?.name ?? "image"}-converted`,
                  extension,
                )}
                href={url}
              >
                Download image
              </a>
            </>
          )}
        </ToolResult>
      )}
    </section>
  );
}
