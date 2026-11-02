"use client";
import { useEffect, useState } from "react";
import { FileUploader } from "@/components/tools/file-uploader";
import { ToolResult } from "@/components/tools/tool-result";
import { sanitizeDownloadFilename } from "@/lib/files/filenames";
import { extractPdfPages } from "./extract";

export function PdfPages() {
  const [file, setFile] = useState<File>(),
    [ranges, setRanges] = useState(""),
    [message, setMessage] = useState(""),
    [url, setUrl] = useState("");
  useEffect(
    () => () => {
      if (url) URL.revokeObjectURL(url);
    },
    [url],
  );
  async function run() {
    if (!file) return;
    try {
      setMessage("Saving your pages…");
      const bytes = await extractPdfPages(file, ranges);
      if (url) URL.revokeObjectURL(url);
      setUrl(
        URL.createObjectURL(
          new Blob([bytes as BlobPart], { type: "application/pdf" }),
        ),
      );
      setMessage("Your new PDF is ready.");
    } catch (error) {
      setUrl("");
      setMessage(
        error instanceof Error && error.message.startsWith("Enter pages")
          ? error.message
          : "This PDF could not be read. It may be damaged or password protected.",
      );
    }
  }
  return (
    <section className="border-line grid gap-5 rounded-lg border p-4 sm:p-7">
      <FileUploader
        accept="application/pdf,.pdf"
        label="Choose a PDF file"
        onChange={(files) => {
          setFile(files[0]);
          setMessage("");
          setUrl("");
        }}
      />
      <label className="tool-field">
        Pages to keep, such as 1-3, 5
        <input
          type="text"
          value={ranges}
          onChange={(event) => setRanges(event.target.value)}
        />
      </label>
      <button
        className="button"
        disabled={!file || !ranges.trim()}
        onClick={run}
        type="button"
      >
        Extract pages
      </button>
      {message && (
        <ToolResult>
          <p>{message}</p>
          {url && (
            <a
              className="button mt-3"
              download={sanitizeDownloadFilename(
                `${file?.name ?? "document"}-pages`,
                "pdf",
              )}
              href={url}
            >
              Download PDF
            </a>
          )}
        </ToolResult>
      )}
      <p className="text-muted text-sm">
        One PDF up to 25 MB. Files stay on your device.
      </p>
    </section>
  );
}
