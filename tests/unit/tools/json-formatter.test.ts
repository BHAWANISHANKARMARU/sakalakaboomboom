import { describe, expect, it } from "vitest";
import {
  parseAndFormatJson,
  minifyJson,
} from "@/features/json-formatter/format-json";
describe("JSON formatter", () => {
  it("formats and minifies valid JSON", () => {
    expect(parseAndFormatJson('{"a":1}')).toEqual({
      ok: true,
      value: '{\n  "a": 1\n}',
    });
    expect(minifyJson('{ "a": 1 }')).toEqual({ ok: true, value: '{"a":1}' });
  });
  it("returns a safe error for malformed JSON", () => {
    const result = parseAndFormatJson("{");
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.message).not.toMatch(/stack|at /i);
  });
});
