export type FailureCategory =
  | "po_token_provider"
  | "playback_verification"
  | "http_403"
  | "missing_formats"
  | "runtime_dependency";

// A conservative projection of stderr, not a blacklist of secret spellings.
// Arbitrary upstream messages, arguments, URLs, paths and token values are NEVER
// copied. Unknown lines are counted so loss of detail remains visible to operators.
export function createStderrDiagnostics() {
  const failures = new Set<FailureCategory>();
  const events = new Set<string>();
  const versions: {
    ytDlp?: string;
    python?: string;
    tokenProvider?: string;
    ffmpeg?: string;
    jsRuntime?: string;
  } = {};
  const tokens = {
    player: { requested: false, received: false },
    gvs: { requested: false, received: false },
    subs: { requested: false, received: false },
  };
  let providerLoaded = false;
  let providerUnavailable = false;
  let omittedLines = 0;
  let pending = "";
  let oversized = false;
  const patterns: [FailureCategory, RegExp, string][] = [
    [
      "po_token_provider",
      /_get_pot_via_script failed|Failed.*(?:POT|PO Token|script)|Unable to fetch.*PO Token|PO Token.*(?:failed|not provided)/i,
      "PO Token provider failed or token unavailable",
    ],
    [
      "playback_verification",
      /sign in to confirm|not a bot|LOGIN_REQUIRED/i,
      "YouTube requested playback verification",
    ],
    [
      "http_403",
      /HTTP(?: Error)?[ :]+403|403 Forbidden/i,
      "Upstream HTTP 403 Forbidden",
    ],
    [
      "missing_formats",
      /Requested format is not available|No video formats found|Only images are available/i,
      "No requested media format available",
    ],
    [
      "runtime_dependency",
      /error loading python|shared object file|exec format|permission denied|GLIBC_|ERR_DLOPEN_FAILED|ERR_MODULE_NOT_FOUND|Cannot find module|No such file or directory/i,
      "Runtime or dependency unavailable",
    ],
  ];
  const line = (raw: string) => {
    if (!raw.trim()) return;
    let recognized = false;
    for (const [category, pattern, event] of patterns) {
      if (pattern.test(raw)) {
        failures.add(category);
        events.add(event);
        recognized = true;
      }
    }
    const yt = raw.match(
      /^\[debug\] yt-dlp version \S+@(\d{4}\.\d{2}\.\d{2})(?:\s|$)/,
    );
    const python = raw.match(/^\[debug\] Python (\d+\.\d+\.\d+)\b/);
    const ffmpeg = raw.match(/^ffmpeg version (\d+(?:\.\d+){1,2})\b/);
    const js = raw.match(/^\[debug\] JS runtimes:.*\bnode-(\d+\.\d+\.\d+)\b/);
    if (yt) {
      versions.ytDlp = yt[1];
      recognized = true;
    }
    if (python) {
      versions.python = python[1];
      recognized = true;
    }
    if (ffmpeg) {
      versions.ffmpeg = ffmpeg[1];
      recognized = true;
    }
    if (js) {
      versions.jsRuntime = js[1];
      recognized = true;
    }
    if (/^\[debug\].*PO Token Providers:/.test(raw)) {
      const provider = raw.match(
        /bgutil:script-node-(\d+\.\d+\.\d+) \((external(?:, unavailable)?)\)/,
      );
      if (provider) {
        providerLoaded = true;
        providerUnavailable = provider[2].includes("unavailable");
        versions.tokenProvider = provider[1];
        events.add(
          providerUnavailable
            ? "bgutil script provider loaded but unavailable"
            : "bgutil script provider loaded",
        );
        recognized = true;
      }
    }
    for (const context of ["player", "gvs", "subs"] as const) {
      if (raw.includes(`Generating a ${context} PO Token for mweb client`)) {
        tokens[context].requested = true;
        events.add(`Requested ${context} token for mweb`);
        recognized = true;
      }
      if (raw.includes(`Retrieved a ${context} PO Token for mweb client`)) {
        tokens[context].received = true;
        events.add(
          `Provider returned ${context} token for mweb (acceptance unknown)`,
        );
        recognized = true;
      }
    }
    if (!recognized) omittedLines++;
  };
  return {
    feed(chunk: string) {
      // Limit even a subprocess that writes arbitrarily long unterminated lines.
      for (const part of chunk.split(/(?<=\n)/)) {
        if (!oversized) {
          pending += part;
          if (pending.length > 4096) {
            pending = "";
            oversized = true;
          }
        }
        if (part.endsWith("\n")) {
          if (oversized) omittedLines++;
          else line(pending.trimEnd());
          pending = "";
          oversized = false;
        }
      }
    },
    finish() {
      if (oversized) omittedLines++;
      else if (pending) line(pending);
      pending = "";
      oversized = false;
      return {
        failures: [...failures],
        sanitizedStderr: [...events],
        versions,
        tokens,
        providerLoaded,
        providerUnavailable,
        omittedLines,
      };
    },
  };
}
