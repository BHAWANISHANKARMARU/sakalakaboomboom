"use client";
import { useEffect, useState } from "react";
import { FileUploader } from "@/components/tools/file-uploader";
import { ToolResult } from "@/components/tools/tool-result";
import { imagesToPdf, validatePdfImages } from "./convert";

export function JpgToPdf() {
  const [files, setFiles] = useState<File[]>([]),
    [message, setMessage] = useState(""),
    [url, setUrl] = useState("");
  useEffect(
    () => () => {
      if (url) URL.revokeObjectURL(url);
    },
    [url],
  );
  async function create() {
    setMessage("Checking images…");
    const valid = await validatePdfImages(files);
    if (!valid.ok) {
      setMessage(valid.message);
      return;
    }
    try {
      setMessage("Creating PDF…");
      const bytes = await imagesToPdf(files);
      if (url) URL.revokeObjectURL(url);
      setUrl(
        URL.createObjectURL(
          new Blob([bytes as BlobPart], { type: "application/pdf" }),
        ),
      );
      setMessage("Your PDF is ready.");
    } catch {
      setUrl("");
      setMessage("This PDF could not be created. Try different images.");
    }
  }
  return (
    <section className="border-line grid gap-5 rounded-lg border p-4 sm:p-7">
      <FileUploader
        accept="image/jpeg,image/png"
        multiple
        label="Choose JPG or PNG images"
        onChange={(value) => {
          setFiles(value);
          setMessage("");
          setUrl("");
        }}
      />
      {files.length > 0 && (
        <ol className="grid gap-2">
          {files.map((file, index) => (
            <li
              className="border-line rounded border px-3 py-2 text-sm"
              key={`${file.name}-${index}`}
            >
              {index + 1}. {file.name}
            </li>
          ))}
        </ol>
      )}
      <button
        className="button"
        disabled={!files.length}
        onClick={create}
        type="button"
      >
        Create PDF
      </button>
      {message && (
        <ToolResult>
          <p>{message}</p>
          {url && (
            <a className="button mt-3" download="images.pdf" href={url}>
              Download PDF
            </a>
          )}
        </ToolResult>
      )}
      <p className="text-muted text-sm">
        Up to 20 images, 20 MB each. Files stay on your device.
      </p>
    </section>
  );
}
