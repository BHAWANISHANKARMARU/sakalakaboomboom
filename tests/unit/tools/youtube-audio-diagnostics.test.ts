// @vitest-environment node
import { expect, it } from "vitest";
import { createStderrDiagnostics } from "@/features/youtube-audio/diagnostics";

it("preserves useful diagnostics while omitting every free-form value", () => {
  const capture = createStderrDiagnostics();
  const lines = [
    "[debug] Command-line config: --proxy http://user:password@secret-host --cookies secret-cookie",
    "[debug] yt-dlp version stable@2026.08.19 from yt-dlp/yt-dlp",
    "[debug] Python 3.12.11 (CPython arm64)",
    "[debug] [youtube] [pot] PO Token Providers: bgutil:script-node-2.0.2 (external)",
    "[youtube] [pot:bgutil:script-node] Generating a player PO Token for mweb client via bgutil script",
    "[debug] [youtube] secret-video: Retrieved a player PO Token for mweb client",
    "[debug] script stdout: secret-token\nCookie: secret-cookie",
    "ERROR: [youtube] secret-video: Sign in to confirm you’re not a bot. https://secret-host?token=secret-token",
  ].join("\n");
  for (let offset = 0; offset < lines.length; offset += 7)
    capture.feed(lines.slice(offset, offset + 7));
  const result = capture.finish();
  expect(result.failures).toContain("playback_verification");
  expect(result.versions).toMatchObject({
    ytDlp: "2026.08.19",
    python: "3.12.11",
    tokenProvider: "2.0.2",
  });
  expect(result.tokens.player).toEqual({ requested: true, received: true });
  expect(result.providerLoaded).toBe(true);
  expect(JSON.stringify(result)).not.toMatch(/secret|password|user:|https?:/);
});

it.each([
  ["HTTP Error 403: Forbidden", "http_403"],
  ["Requested format is not available", "missing_formats"],
  ["_get_pot_via_script failed", "po_token_provider"],
  ["ERR_DLOPEN_FAILED: libsecret.so", "runtime_dependency"],
])("classifies %s without copying raw stderr", (line, category) => {
  const capture = createStderrDiagnostics();
  capture.feed(line);
  expect(capture.finish().failures).toContain(category);
});

it("retains multiple causes and bounds oversized/unrecognized lines", () => {
  const capture = createStderrDiagnostics();
  capture.feed(
    "secret".repeat(10000) + "\n_get_pot_via_script failed\nHTTP Error 403\n",
  );
  const result = capture.finish();
  expect(result.failures).toEqual(["po_token_provider", "http_403"]);
  expect(result.omittedLines).toBe(1);
  expect(JSON.stringify(result).length).toBeLessThan(2000);
});
