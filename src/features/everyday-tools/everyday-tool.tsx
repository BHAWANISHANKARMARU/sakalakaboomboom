"use client";

import { useMemo, useState } from "react";
import {
  calculateAge,
  calculateEmi,
  calculateGst,
  calculatePercentage,
  convertUnit,
  formatNumber,
} from "./calculations";
import {
  cleanWhitespace,
  convertCase,
  removeDuplicateLines,
  sortLines,
} from "./text";

const n = (value: string) => Number(value);
const money = (value: number) => `₹${formatNumber(value)}`;

export function EverydayTool({ slug }: { slug: string }) {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [c, setC] = useState("");
  const [text, setText] = useState("");
  const [mode, setMode] = useState("upper");
  const [generated, setGenerated] = useState("");

  const result = useMemo(() => {
    if (slug === "age-calculator") {
      const value = calculateAge(a, b || new Date().toISOString().slice(0, 10));
      return value
        ? `${value.years} years, ${value.months} months, ${value.days} days`
        : "Enter a valid birth date.";
    }
    if (slug === "bmi-calculator") {
      const bmi = n(a) / (n(b) / 100) ** 2;
      if (!n(a) || !n(b) || !Number.isFinite(bmi))
        return "Enter weight and height.";
      const label =
        bmi < 18.5
          ? "Underweight"
          : bmi < 25
            ? "Healthy range"
            : bmi < 30
              ? "Overweight"
              : "Obesity range";
      return `${bmi.toFixed(1)} — ${label}`;
    }
    if (slug === "percentage-calculator") {
      const value = calculatePercentage(n(a), n(b));
      return value === null
        ? "Enter a part and a non-zero total."
        : `${value}%`;
    }
    if (slug === "discount-calculator") {
      if (n(a) < 0 || n(b) < 0 || n(b) > 100 || !a || !b)
        return "Enter a valid price and discount.";
      const saving = (n(a) * n(b)) / 100;
      return `Final price ${money(n(a) - saving)} · You save ${money(saving)}`;
    }
    if (slug === "gst-calculator") {
      const value = calculateGst(n(a), n(b), mode === "inclusive");
      return value
        ? `GST ${money(value.tax)} · Total ${money(value.total)}`
        : "Enter a valid amount and GST rate.";
    }
    if (slug === "emi-calculator") {
      const emi = calculateEmi(n(a), n(b), n(c));
      return emi === null
        ? "Enter loan amount, annual rate and months."
        : `Estimated monthly EMI ${money(emi)}`;
    }
    if (slug === "sip-calculator") {
      const monthly = n(a),
        rate = n(b) / 1200,
        months = n(c) * 12;
      if (monthly <= 0 || n(b) < 0 || months <= 0)
        return "Enter monthly investment, expected return and years.";
      const value =
        rate === 0
          ? monthly * months
          : monthly * (((1 + rate) ** months - 1) / rate) * (1 + rate);
      return `Estimated value ${money(value)} · Invested ${money(monthly * months)}`;
    }
    if (slug === "date-difference-calculator") {
      const start = new Date(`${a}T00:00:00`),
        end = new Date(`${b}T00:00:00`);
      const days = Math.abs(end.valueOf() - start.valueOf()) / 86400000;
      return Number.isFinite(days)
        ? `${formatNumber(days)} days`
        : "Choose two valid dates.";
    }
    if (slug === "unit-converter") {
      const value = convertUnit(n(a), mode || "km", b || "m");
      return value === null
        ? "Enter a valid value and units."
        : `${formatNumber(value)} ${b || "m"}`;
    }
    if (slug === "fuel-cost-calculator") {
      const cost = (n(a) / n(b)) * n(c);
      return n(a) >= 0 && n(b) > 0 && n(c) >= 0 && Number.isFinite(cost)
        ? `Estimated fuel cost ${money(cost)}`
        : "Enter distance, mileage and fuel price.";
    }
    if (slug === "case-converter") return convertCase(text, mode);
    if (slug === "remove-duplicate-lines") return removeDuplicateLines(text);
    if (slug === "text-sorter") return sortLines(text);
    if (slug === "find-replace-text") return a ? text.split(a).join(b) : text;
    if (slug === "whitespace-cleaner") return cleanWhitespace(text);
    if (slug === "line-counter")
      return `${text ? text.split(/\r?\n/).length : 0} lines · ${text.length} characters`;
    if (slug === "url-encoder-decoder") {
      try {
        return mode === "decode"
          ? decodeURIComponent(text)
          : encodeURIComponent(text);
      } catch {
        return "The encoded text is invalid.";
      }
    }
    if (slug === "base64-encoder-decoder") {
      try {
        return mode === "decode"
          ? decodeURIComponent(escape(atob(text)))
          : btoa(unescape(encodeURIComponent(text)));
      } catch {
        return "The Base64 input is invalid.";
      }
    }
    return generated;
  }, [a, b, c, generated, mode, slug, text]);

  const textTool = [
    "case-converter",
    "remove-duplicate-lines",
    "text-sorter",
    "find-replace-text",
    "whitespace-cleaner",
    "line-counter",
    "url-encoder-decoder",
    "base64-encoder-decoder",
  ].includes(slug);
  const generate = () => {
    if (slug === "uuid-generator") setGenerated(crypto.randomUUID());
    if (slug === "password-generator") {
      const length = Math.min(64, Math.max(8, n(a) || 16));
      const chars =
        "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%&*";
      const bytes = crypto.getRandomValues(new Uint32Array(length));
      setGenerated([...bytes].map((x) => chars[x % chars.length]).join(""));
    }
  };

  const label = (
    name: string,
    value: string,
    setter: (v: string) => void,
    type = "number",
  ) => (
    <label className="tool-field">
      {name}
      <input
        type={type}
        value={value}
        onChange={(e) => setter(e.target.value)}
      />
    </label>
  );

  return (
    <div className="everyday-tool">
      {textTool ? (
        <label className="tool-field">
          Your text
          <textarea
            rows={8}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </label>
      ) : null}
      {slug === "age-calculator" && (
        <>
          {label("Date of birth", a, setA, "date")}
          {label("Calculate age on", b, setB, "date")}
        </>
      )}
      {slug === "bmi-calculator" && (
        <>
          {label("Weight (kg)", a, setA)}
          {label("Height (cm)", b, setB)}
        </>
      )}
      {slug === "percentage-calculator" && (
        <>
          {label("Part", a, setA)}
          {label("Total", b, setB)}
        </>
      )}
      {slug === "discount-calculator" && (
        <>
          {label("Original price (₹)", a, setA)}
          {label("Discount (%)", b, setB)}
        </>
      )}
      {slug === "gst-calculator" && (
        <>
          {label("Amount (₹)", a, setA)}
          {label("GST rate (%)", b, setB)}
          <Select
            value={mode}
            set={setMode}
            options={["exclusive", "inclusive"]}
          />
        </>
      )}
      {slug === "emi-calculator" && (
        <>
          {label("Loan amount (₹)", a, setA)}
          {label("Annual interest (%)", b, setB)}
          {label("Tenure (months)", c, setC)}
        </>
      )}
      {slug === "sip-calculator" && (
        <>
          {label("Monthly investment (₹)", a, setA)}
          {label("Expected annual return (%)", b, setB)}
          {label("Years", c, setC)}
        </>
      )}
      {slug === "date-difference-calculator" && (
        <>
          {label("Start date", a, setA, "date")}
          {label("End date", b, setB, "date")}
        </>
      )}
      {slug === "unit-converter" && (
        <>
          {label("Value", a, setA)}
          <Select
            value={mode}
            set={setMode}
            options={["km", "m", "cm", "mm", "mi", "yd", "ft", "in"]}
          />
          <Select
            value={b || "m"}
            set={setB}
            options={["km", "m", "cm", "mm", "mi", "yd", "ft", "in"]}
          />
        </>
      )}
      {slug === "fuel-cost-calculator" && (
        <>
          {label("Distance (km)", a, setA)}
          {label("Mileage (km/l)", b, setB)}
          {label("Fuel price (₹/l)", c, setC)}
        </>
      )}
      {slug === "case-converter" && (
        <Select
          value={mode}
          set={setMode}
          options={["upper", "lower", "title", "sentence"]}
        />
      )}
      {["url-encoder-decoder", "base64-encoder-decoder"].includes(slug) && (
        <Select value={mode} set={setMode} options={["encode", "decode"]} />
      )}
      {slug === "find-replace-text" && (
        <>
          {label("Find", a, setA, "text")}
          {label("Replace with", b, setB, "text")}
        </>
      )}
      {slug === "password-generator" &&
        label("Password length (8–64)", a, setA)}
      {["password-generator", "uuid-generator"].includes(slug) && (
        <button className="button" type="button" onClick={generate}>
          Generate
        </button>
      )}
      <div className="tool-output" aria-live="polite">
        <strong>Result</strong>
        <pre>{result || "Your result will appear here."}</pre>
      </div>
      <div className="tool-actions">
        <button
          className="button secondary"
          type="button"
          onClick={() => navigator.clipboard?.writeText(result)}
        >
          Copy result
        </button>
        <button
          className="button secondary"
          type="button"
          onClick={() => {
            setA("");
            setB("");
            setC("");
            setText("");
            setGenerated("");
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

function Select({
  value,
  set,
  options,
}: {
  value: string;
  set: (v: string) => void;
  options: string[];
}) {
  return (
    <label className="tool-field">
      Option
      <select value={value} onChange={(e) => set(e.target.value)}>
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}
