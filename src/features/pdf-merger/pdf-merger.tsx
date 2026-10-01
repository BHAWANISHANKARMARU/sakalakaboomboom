"use client";
import { useEffect, useState } from "react";
import { FileUploader } from "@/components/tools/file-uploader";
import { ToolResult } from "@/components/tools/tool-result";
import { sanitizeDownloadFilename } from "@/lib/files/filenames";
import { mergePdfFiles } from "./merge";
import { validatePdfFiles } from "./validate";
export function PdfMerger() {
  const [files, setFiles] = useState<File[]>([]),
    [message, setMessage] = useState(""),
    [url, setUrl] = useState("");
  useEffect(
    () => () => {
      if (url) URL.revokeObjectURL(url);
    },
    [url],
  );
  async function merge() {
    setMessage("Checking files…");
    const valid = await validatePdfFiles(files);
    if (!valid.ok) {
      setMessage(valid.message);
      return;
    }
    try {
      setMessage("Merging PDFs…");
      const bytes = await mergePdfFiles(files);
      if (url) URL.revokeObjectURL(url);
      setUrl(
        URL.createObjectURL(
          new Blob([bytes as BlobPart], { type: "application/pdf" }),
        ),
      );
      setMessage("Your merged PDF is ready.");
    } catch {
      setMessage(
        "These PDFs could not be merged. One may be damaged or password protected.",
      );
    }
  }
  return (
    <section className="border-line grid gap-5 rounded-lg border bg-white p-4 sm:p-7">
      <FileUploader
        accept="application/pdf,.pdf"
        multiple
        label="Choose PDF files"
        onChange={(value) => {
          setFiles(value);
          setMessage("");
        }}
      />
      {files.length > 0 && (
        <ol className="grid gap-2">
          {files.map((file, index) => (
            <li
              className="border-line flex items-center justify-between gap-3 rounded border px-3 py-2 text-sm"
              key={`${file.name}-${index}`}
            >
              <span className="min-w-0 truncate">
                {index + 1}. {file.name}
              </span>
              <button
                className="text-blue font-bold"
                type="button"
                onClick={() =>
                  setFiles(files.filter((_, itemIndex) => itemIndex !== index))
                }
              >
                Remove
              </button>
            </li>
          ))}
        </ol>
      )}
      <button
        className="button"
        disabled={files.length < 2}
        onClick={merge}
        type="button"
      >
        Merge PDFs
      </button>
      {message && (
        <ToolResult
          status={
            message.includes("could not") || message.includes("not a valid")
              ? "assertive"
              : "polite"
          }
        >
          <p>{message}</p>
          {url && (
            <a
              className="button mt-3"
              download={sanitizeDownloadFilename("merged-pdf", "pdf")}
              href={url}
            >
              Download merged PDF
            </a>
          )}
        </ToolResult>
      )}
      <p className="text-muted text-sm">
        Up to 20 files, 25 MB each and 100 MB total. Files stay on your device.
      </p>
    </section>
  );
}
