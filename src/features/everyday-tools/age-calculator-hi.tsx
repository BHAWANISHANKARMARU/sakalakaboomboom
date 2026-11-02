"use client";
import { useState } from "react";
import { calculateAge } from "./calculations";

export function AgeCalculatorHi() {
  const [birth, setBirth] = useState("");
  const [on, setOn] = useState("");
  const value = birth
    ? calculateAge(birth, on || new Date().toISOString().slice(0, 10))
    : null;
  return (
    <div className="everyday-tool">
      <label className="tool-field">
        जन्म तिथि
        <input
          type="date"
          value={birth}
          onChange={(event) => setBirth(event.target.value)}
        />
      </label>
      <label className="tool-field">
        इस तारीख पर आयु निकालें (खाली छोड़ने पर आज की तारीख)
        <input
          type="date"
          value={on}
          onChange={(event) => setOn(event.target.value)}
        />
      </label>
      <div className="tool-output" aria-live="polite">
        <strong>परिणाम</strong>
        <pre>
          {value
            ? `${value.years} वर्ष, ${value.months} महीने, ${value.days} दिन`
            : "सही जन्म तिथि भरें।"}
        </pre>
      </div>
    </div>
  );
}
