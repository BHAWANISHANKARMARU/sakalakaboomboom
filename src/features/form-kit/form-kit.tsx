"use client";
import { useEffect, useState } from "react";
import { FileUploader } from "@/components/tools/file-uploader";
import { ToolResult } from "@/components/tools/tool-result";
import { imagesToPdf } from "@/features/jpg-to-pdf/convert";
import { resizeToLimits } from "@/features/photo-resizer/resize";

const copy = {
  en: {
    chooseHint: "Choose files from your device",
    photo: "Your photo",
    signature: "Your signature",
    documents: "Documents to join into one PDF (optional)",
    limits: "Limits from your notification",
    minKb: "Min KB",
    maxKb: "Max KB",
    width: "Width (px)",
    height: "Height (px)",
    pdfMax: "Maximum PDF size (KB)",
    hint: "These values are only examples. Enter the limits from your official notification.",
    run: "Make my files ready",
    working: "Preparing your files…",
    done: "Your files are ready. Open each one and check it before you upload.",
    need: "Choose at least one file.",
    invalid:
      "Check your values. Maximum KB must be above minimum KB, and pixels must be between 10 and 4000.",
    pass: "Within limit",
    fail: "Outside limit",
    failed: "could not be prepared",
    download: "Download",
    photoFile: "Photo",
    signatureFile: "Signature",
    documentsFile: "Documents PDF",
  },
  hi: {
    chooseHint: "अपने डिवाइस से फ़ाइल चुनें",
    photo: "आपकी फ़ोटो",
    signature: "आपके हस्ताक्षर",
    documents: "एक PDF में जोड़ने वाले दस्तावेज़ (वैकल्पिक)",
    limits: "अधिसूचना में दी गई सीमाएँ",
    minKb: "न्यूनतम KB",
    maxKb: "अधिकतम KB",
    width: "चौड़ाई (px)",
    height: "ऊँचाई (px)",
    pdfMax: "PDF का अधिकतम आकार (KB)",
    hint: "ये मान केवल उदाहरण हैं। अपनी आधिकारिक अधिसूचना की सीमाएँ भरें।",
    run: "मेरी फ़ाइलें तैयार करें",
    working: "आपकी फ़ाइलें तैयार हो रही हैं…",
    done: "आपकी फ़ाइलें तैयार हैं। अपलोड करने से पहले हर फ़ाइल खोलकर जाँच लें।",
    need: "कम से कम एक फ़ाइल चुनें।",
    invalid:
      "अपने मान जाँचें। अधिकतम KB, न्यूनतम KB से ज़्यादा होना चाहिए और पिक्सेल 10 से 4000 के बीच होने चाहिए।",
    pass: "सीमा के भीतर",
    fail: "सीमा से बाहर",
    failed: "तैयार नहीं हो सकी",
    download: "डाउनलोड करें",
    photoFile: "फ़ोटो",
    signatureFile: "हस्ताक्षर",
    documentsFile: "दस्तावेज़ PDF",
  },
};

type Limits = { minKb: number; maxKb: number; width: number; height: number };
type Output = {
  label: string;
  name: string;
  url: string;
  sizeKb: number;
  ok: boolean;
};

const validLimits = (limits: Limits) =>
  Object.values(limits).every(Number.isFinite) &&
  limits.minKb >= 0 &&
  limits.maxKb > limits.minKb &&
  limits.width >= 10 &&
  limits.height >= 10 &&
  limits.width <= 4000 &&
  limits.height <= 4000;

function LimitFields({
  value,
  onChange,
  text,
}: {
  value: Limits;
  onChange: (next: Limits) => void;
  text: (typeof copy)["en"];
}) {
  const fields: [keyof Limits, string][] = [
    ["minKb", text.minKb],
    ["maxKb", text.maxKb],
    ["width", text.width],
    ["height", text.height],
  ];
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {fields.map(([key, label]) => (
        <label className="tool-field" key={key}>
          {label}
          <input
            type="number"
            min="0"
            value={value[key]}
            onChange={(event) =>
              onChange({ ...value, [key]: event.target.valueAsNumber })
            }
          />
        </label>
      ))}
    </div>
  );
}

export function FormKit({ locale = "en" }: { locale?: "en" | "hi" }) {
  const text = copy[locale];
  const [photo, setPhoto] = useState<File>(),
    [signature, setSignature] = useState<File>(),
    [documents, setDocuments] = useState<File[]>([]),
    [photoLimits, setPhotoLimits] = useState<Limits>({
      minKb: 20,
      maxKb: 50,
      width: 200,
      height: 230,
    }),
    [signatureLimits, setSignatureLimits] = useState<Limits>({
      minKb: 10,
      maxKb: 20,
      width: 140,
      height: 60,
    }),
    [pdfMaxKb, setPdfMaxKb] = useState(500),
    [message, setMessage] = useState(""),
    [outputs, setOutputs] = useState<Output[]>([]);
  useEffect(
    () => () => outputs.forEach((item) => URL.revokeObjectURL(item.url)),
    [outputs],
  );
  async function run() {
    if (!photo && !signature && !documents.length) {
      setMessage(text.need);
      return;
    }
    if (![photoLimits, signatureLimits].every(validLimits) || !(pdfMaxKb > 0)) {
      setMessage(text.invalid);
      return;
    }
    setMessage(text.working);
    setOutputs([]);
    const ready: Output[] = [];
    const problems: string[] = [];
    const add = (label: string, name: string, blob: Blob, ok: boolean) =>
      ready.push({
        label,
        name,
        url: URL.createObjectURL(blob),
        sizeKb: blob.size / 1024,
        ok,
      });
    for (const [file, limits, label, name] of [
      [photo, photoLimits, text.photoFile, "photo.jpg"],
      [signature, signatureLimits, text.signatureFile, "signature.jpg"],
    ] as const) {
      if (!file) continue;
      try {
        const result = await resizeToLimits(file, limits);
        add(label, name, result.blob, !result.belowMinimum);
      } catch (error) {
        problems.push(
          `${label} ${text.failed}: ${error instanceof Error ? error.message : ""}`,
        );
      }
    }
    if (documents.length) {
      try {
        const bytes = await imagesToPdf(documents);
        const blob = new Blob([bytes as BlobPart], {
          type: "application/pdf",
        });
        add(
          text.documentsFile,
          "documents.pdf",
          blob,
          blob.size <= pdfMaxKb * 1024,
        );
      } catch (error) {
        problems.push(
          `${text.documentsFile} ${text.failed}: ${error instanceof Error ? error.message : ""}`,
        );
      }
    }
    setOutputs(ready);
    setMessage(problems.length ? problems.join(" ") : text.done);
  }
  return (
    <section className="border-line grid gap-6 rounded-lg border p-4 sm:p-7">
      <div className="grid gap-5 lg:grid-cols-2">
        <div className="grid content-start gap-3">
          <FileUploader
            hint={text.chooseHint}
            accept="image/jpeg,image/png,image/webp"
            label={text.photo}
            onChange={(files) => setPhoto(files[0])}
          />
          {photo && <p className="text-muted text-sm">{photo.name}</p>}
          <LimitFields
            value={photoLimits}
            onChange={setPhotoLimits}
            text={text}
          />
        </div>
        <div className="grid content-start gap-3">
          <FileUploader
            hint={text.chooseHint}
            accept="image/jpeg,image/png,image/webp"
            label={text.signature}
            onChange={(files) => setSignature(files[0])}
          />
          {signature && <p className="text-muted text-sm">{signature.name}</p>}
          <LimitFields
            value={signatureLimits}
            onChange={setSignatureLimits}
            text={text}
          />
        </div>
      </div>
      <div className="grid gap-3">
        <FileUploader
          hint={text.chooseHint}
          accept="image/jpeg,image/png"
          multiple
          label={text.documents}
          onChange={setDocuments}
        />
        {documents.length > 0 && (
          <p className="text-muted text-sm">
            {documents.map((file) => file.name).join(", ")}
          </p>
        )}
        <label className="tool-field">
          {text.pdfMax}
          <input
            type="number"
            min="1"
            value={pdfMaxKb}
            onChange={(event) => setPdfMaxKb(event.target.valueAsNumber)}
          />
        </label>
      </div>
      <p className="text-muted text-sm">{text.hint}</p>
      <button className="button" onClick={run} type="button">
        {text.run}
      </button>
      {message && (
        <ToolResult>
          <p>{message}</p>
          {outputs.length > 0 && (
            <ul className="mt-3 grid gap-3">
              {outputs.map((item) => (
                <li
                  className="border-line flex flex-wrap items-center justify-between gap-3 rounded border bg-white p-3"
                  key={item.name}
                >
                  <span>
                    <strong>{item.label}</strong>
                    <span className="text-muted block text-sm">
                      {item.sizeKb.toFixed(1)} KB ·{" "}
                      {item.ok ? `✓ ${text.pass}` : `✗ ${text.fail}`}
                    </span>
                  </span>
                  <a className="button" download={item.name} href={item.url}>
                    {text.download}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </ToolResult>
      )}
    </section>
  );
}
