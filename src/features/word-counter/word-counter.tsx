"use client";
import { useMemo, useState } from "react";
import { countText } from "./count-text";
export function WordCounter() {
  const [text, setText] = useState("");
  const counts = useMemo(() => countText(text), [text]);
  const stats = [
    ["Words", counts.words],
    ["Characters", counts.characters],
    ["Without spaces", counts.charactersWithoutSpaces],
    ["Sentences", counts.sentences],
    ["Paragraphs", counts.paragraphs],
    ["Reading time", `${counts.readingMinutes} min`],
  ];
  return (
    <section className="border-line grid gap-5 rounded-lg border p-4 sm:p-7">
      <label className="text-navy grid gap-2 font-bold">
        Enter or paste text
        <textarea
          className="field min-h-56 resize-y font-normal"
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="Start typing here…"
        />
      </label>
      <div
        aria-live="polite"
        className="border-line grid grid-cols-2 border-t border-l sm:grid-cols-3"
      >
        {stats.map(([label, value]) => (
          <div className="border-line border-r border-b p-4" key={label}>
            <strong className="text-navy block text-2xl tabular-nums">
              {value}
            </strong>
            <span className="text-muted text-sm">{label}</span>
          </div>
        ))}
      </div>
      <button
        className="button secondary justify-self-start"
        disabled={!text}
        onClick={() => setText("")}
        type="button"
      >
        Clear text
      </button>
      <p className="text-muted text-sm">
        Your text is counted on this device and is not uploaded.
      </p>
    </section>
  );
}
