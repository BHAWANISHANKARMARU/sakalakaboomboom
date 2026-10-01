"use client";
import { useState } from "react";
import Image from "next/image";
import { ToolResult } from "@/components/tools/tool-result";
import { generateQrPng, validateQrInput } from "./generate-qr";
export function QrGenerator() {
  const [value, setValue] = useState(""),
    [size, setSize] = useState(320),
    [level, setLevel] = useState<"L" | "M" | "Q" | "H">("M"),
    [result, setResult] = useState(""),
    [message, setMessage] = useState("");
  async function run() {
    const valid = validateQrInput(value);
    if (!valid.ok) {
      setMessage(valid.message);
      setResult("");
      return;
    }
    setResult(await generateQrPng(value, { width: size, level }));
    setMessage("Your QR code is ready.");
  }
  return (
    <section className="border-line grid gap-5 rounded-lg border p-4 sm:p-7">
      <label className="text-navy grid gap-2 font-bold">
        Text or URL
        <textarea
          className="field min-h-28 font-normal"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="https://example.com"
          maxLength={2001}
        />
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-navy grid gap-2 font-bold">
          Image size
          <select
            className="field font-normal"
            value={size}
            onChange={(event) => setSize(Number(event.target.value))}
          >
            <option value="256">256 × 256</option>
            <option value="320">320 × 320</option>
            <option value="512">512 × 512</option>
          </select>
        </label>
        <label className="text-navy grid gap-2 font-bold">
          Error correction
          <select
            className="field font-normal"
            value={level}
            onChange={(event) => setLevel(event.target.value as typeof level)}
          >
            <option value="L">Low</option>
            <option value="M">Medium</option>
            <option value="Q">Quartile</option>
            <option value="H">High</option>
          </select>
        </label>
      </div>
      <button className="button" onClick={run} type="button">
        Create QR code
      </button>
      {message && (
        <ToolResult status={result ? "polite" : "assertive"}>
          <p>{message}</p>
          {result && (
            <div className="mt-4 grid justify-items-start gap-3">
              <Image
                unoptimized
                className="border-line h-auto max-w-full border"
                src={result}
                width={size}
                height={size}
                alt="Generated QR code"
              />
              <a className="button" download="sahaj-qr-code.png" href={result}>
                Download PNG
              </a>
            </div>
          )}
        </ToolResult>
      )}
      <p className="text-muted text-sm">
        Check the destination or content before sharing a QR code. Generation
        stays on this device.
      </p>
    </section>
  );
}
