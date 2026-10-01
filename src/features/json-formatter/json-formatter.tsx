"use client";
import { useState } from "react";
import { ToolResult } from "@/components/tools/tool-result";
import { minifyJson, parseAndFormatJson, type JsonResult } from "./format-json";
export function JsonFormatter() {
  const [input, setInput] = useState(""),
    [result, setResult] = useState<JsonResult>();
  function run(mode: "format" | "minify") {
    setResult(
      mode === "format" ? parseAndFormatJson(input) : minifyJson(input),
    );
  }
  return (
    <section className="border-line grid gap-5 rounded-lg border p-4 sm:p-7">
      <label className="text-navy grid gap-2 font-bold">
        JSON input
        <textarea
          className="field min-h-52 resize-y font-mono text-sm font-normal"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder={'{"example": true}'}
        />
      </label>
      <div className="flex flex-wrap gap-2">
        <button className="button" onClick={() => run("format")} type="button">
          Format & validate
        </button>
        <button
          className="button secondary"
          onClick={() => run("minify")}
          type="button"
        >
          Minify
        </button>
        <button
          className="button secondary"
          onClick={() => {
            setInput("");
            setResult(undefined);
          }}
          type="button"
        >
          Clear
        </button>
      </div>
      {result && (
        <ToolResult status={result.ok ? "polite" : "assertive"}>
          {result.ok ? (
            <>
              <label className="text-navy grid gap-2 font-bold">
                Result
                <textarea
                  readOnly
                  className="field min-h-52 font-mono text-sm font-normal"
                  value={result.value}
                />
              </label>
              <button
                className="button secondary mt-3"
                onClick={() => navigator.clipboard.writeText(result.value)}
                type="button"
              >
                Copy result
              </button>
            </>
          ) : (
            <p className="text-danger">{result.message}</p>
          )}
        </ToolResult>
      )}
      <p className="text-muted text-sm">
        Standard JSON parsing keeps the last value when an object repeats a key.
        Input stays on your device.
      </p>
    </section>
  );
}
