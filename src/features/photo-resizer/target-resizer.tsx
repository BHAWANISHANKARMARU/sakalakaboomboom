"use client";
import { useEffect, useState } from "react";
import { FileUploader } from "@/components/tools/file-uploader";
import { ToolResult } from "@/components/tools/tool-result";
import { sanitizeDownloadFilename } from "@/lib/files/filenames";
import { compressToKb, type TargetImage } from "./resize";

export function TargetResizer({ targetKb }: { targetKb: number }) {
  const [file, setFile] = useState<File>(),
    [maxKb, setMaxKb] = useState(targetKb),
    [message, setMessage] = useState(""),
    [url, setUrl] = useState(""),
    [output, setOutput] = useState<TargetImage>();
  useEffect(
    () => () => {
      if (url) URL.revokeObjectURL(url);
    },
    [url],
  );
  async function run() {
    if (!file) return;
    if (!(maxKb >= 2)) {
      setMessage("Enter a target of 2 KB or more.");
      return;
    }
    try {
      setMessage("Resizing your photo…");
      const result = await compressToKb(file, maxKb);
      if (url) URL.revokeObjectURL(url);
      setUrl(URL.createObjectURL(result.blob));
      setOutput(result);
      setMessage("Your photo is ready. Check that it looks clear.");
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
        label="Choose a photo"
        onChange={(files) => {
          setFile(files[0]);
          setMessage("");
          setUrl("");
          setOutput(undefined);
        }}
      />
      <label className="tool-field">
        Target size (KB)
        <input
          type="number"
          min="2"
          value={maxKb}
          onChange={(event) => setMaxKb(event.target.valueAsNumber)}
        />
      </label>
      <button className="button" disabled={!file} onClick={run} type="button">
        Resize photo
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
                  `${file?.name ?? "photo"}-${maxKb}kb`,
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
