"use client";
import { useEffect, useState } from "react";
import { FileUploader } from "@/components/tools/file-uploader";
import { ToolResult } from "@/components/tools/tool-result";
import { compressImage, type CompressedImage } from "./compress";
import { validateImageFile } from "./validate";
export function ImageCompressor() {
  const [file, setFile] = useState<File>(),
    [quality, setQuality] = useState(0.78),
    [message, setMessage] = useState(""),
    [url, setUrl] = useState(""),
    [output, setOutput] = useState<CompressedImage>();
  useEffect(
    () => () => {
      if (url) URL.revokeObjectURL(url);
    },
    [url],
  );
  async function run() {
    if (!file) return;
    const valid = await validateImageFile(file);
    if (!valid.ok) {
      setMessage(valid.message);
      return;
    }
    try {
      setMessage("Compressing image…");
      const result = await compressImage(file, quality);
      if (url) URL.revokeObjectURL(url);
      setUrl(URL.createObjectURL(result.blob));
      setOutput(result);
      setMessage(
        result.outputSize < file.size
          ? "Your compressed image is ready."
          : "The new image is not smaller. Try a lower quality setting.",
      );
    } catch {
      setMessage("This image could not be decoded. Try a different file.");
    }
  }
  return (
    <section className="border-line grid gap-5 rounded-lg border p-4 sm:p-7">
      <FileUploader
        accept="image/jpeg,image/png,image/webp"
        label="Choose an image"
        onChange={(files) => {
          setFile(files[0]);
          setMessage("");
        }}
      />
      <label className="text-navy grid gap-2 font-bold">
        Quality: {Math.round(quality * 100)}%
        <input
          type="range"
          min="0.3"
          max="0.95"
          step="0.05"
          value={quality}
          onChange={(event) => setQuality(Number(event.target.value))}
        />
      </label>
      <button className="button" disabled={!file} onClick={run} type="button">
        Compress image
      </button>
      {message && (
        <ToolResult>
          <p>{message}</p>
          {url && output && (
            <>
              <p className="text-muted mt-2 text-sm">
                Original: {(output.originalSize / 1024).toFixed(1)} KB · Output:{" "}
                {(output.outputSize / 1024).toFixed(1)} KB · {output.width} ×{" "}
                {output.height} ·{" "}
                {output.mime.replace("image/", "").toUpperCase()} ·{" "}
                {Math.max(
                  0,
                  Math.round(
                    (1 - output.outputSize / output.originalSize) * 100,
                  ),
                )}
                % smaller
              </p>
              <a
                className="button mt-3"
                download={`compressed-image.${output.mime.split("/")[1]}`}
                href={url}
              >
                Download image
              </a>
            </>
          )}
        </ToolResult>
      )}
      <p className="text-muted text-sm">
        JPEG, PNG or WebP up to 20 MB. Processing stays on this device.
      </p>
    </section>
  );
}
