"use client";
import { useEffect, useState } from "react";
import { FileUploader } from "@/components/tools/file-uploader";
import { ToolResult } from "@/components/tools/tool-result";
import { sanitizeDownloadFilename } from "@/lib/files/filenames";
import { compressPdf } from "./compress";

export function PdfCompressor({ targetKb = 200 }: { targetKb?: number }) {
  const [file, setFile] = useState<File>(),
    [maxKb, setMaxKb] = useState(targetKb),
    [message, setMessage] = useState(""),
    [summary, setSummary] = useState(""),
    [url, setUrl] = useState("");
  useEffect(
    () => () => {
      if (url) URL.revokeObjectURL(url);
    },
    [url],
  );
  async function run() {
    if (!file) return;
    if (!(maxKb >= 10)) {
      setMessage("Enter a target of 10 KB or more.");
      return;
    }
    try {
      setUrl("");
      setSummary("");
      setMessage("Reducing your PDF. Large files can take a minute…");
      const result = await compressPdf(file, maxKb);
      setUrl(
        URL.createObjectURL(
          new Blob([result.bytes as BlobPart], { type: "application/pdf" }),
        ),
      );
      setSummary(
        `${(result.originalSize / 1024).toFixed(1)} KB → ${(result.bytes.length / 1024).toFixed(1)} KB`,
      );
      setMessage(
        result.alreadySmall
          ? "This PDF is already within your limit, so it was not changed."
          : result.fits
            ? "Your PDF is ready. Check that it is readable before you upload it."
            : "This PDF could not reach your target. This is the smallest version. Try removing pages or use a higher target.",
      );
    } catch {
      setMessage(
        "This PDF could not be read. It may be damaged or password protected.",
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
          setSummary("");
          setUrl("");
        }}
      />
      <label className="tool-field">
        Target size (KB)
        <input
          type="number"
          min="10"
          value={maxKb}
          onChange={(event) => setMaxKb(event.target.valueAsNumber)}
        />
      </label>
      <button className="button" disabled={!file} onClick={run} type="button">
        Reduce PDF size
      </button>
      {message && (
        <ToolResult>
          <p>{message}</p>
          {summary && <p className="text-muted mt-2 text-sm">{summary}</p>}
          {url && (
            <a
              className="button mt-3"
              download={sanitizeDownloadFilename(
                `${file?.name ?? "document"}-reduced`,
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
