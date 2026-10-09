This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# sakalakaboomboom

## YouTube-to-MP3 tool

Conversion runs in the existing Next.js Node Route Handler at `/api/youtube-audio`.
No separate backend, email token or paid conversion API is required.

For local macOS development (Node 22+ and Python 3.10+):

```bash
npm run audio:setup
npm run dev -- --hostname 127.0.0.1
```

Linux builds run `scripts/prepare-audio.mjs` through `npm run build` to download
checksum-verified yt-dlp 2026.08.19, including its Python runtime. FFmpeg is
provided by `ffmpeg-static`. Build preparation also installs the pinned
BgUtils 2.0.2 playback-token provider (commit
`26475e9d3665b972c4aeb83b4dbaafcf64b88438`) and its locked dependencies.
yt-dlp uses its on-demand Node script with the mobile-web client and requests
player/media tokens; token caches stay inside each request’s temporary directory.
No additional HTTP server or account cookies are used.
Next output tracing includes these runtime dependencies and both executables in
the API function and excludes the local Python environment. Use `npm run build`,
not a direct `next build`, so the build preparation runs.

The public tool is `/tools/web/youtube-video-to-audio`, linked from the homepage,
tools directory, web category and sitemap. It produces 128 kbps MP3 audio for
videos up to 4 minutes, with a hard 4,000,000-byte response cap to stay below
Vercel's 4.5 MB response limit. The function declares a 240-second maximum;
conversion has a 180-second deadline, a 40 MiB source cap, temporary disk
monitoring, one conversion per process, and cleanup on completion or failure.
Hard process termination can leave files in the instance's temporary directory.
Per-process concurrency is not a global quota or distributed rate limit.
Hosting compute and bandwidth are still subject to the hosting plan's limits.

YouTube may refuse hosting-provider IPs or require playback verification.
Such failures return a visible error; this tool does not use personal cookies
or bypass account restrictions. Retest actual downloads after each deployment.
Only convert videos you own or have permission to download.

Deployment check on 2026-10-09: the production page and function deployed
successfully. The local production build downloaded a valid MP3, but the same
video on Vercel returned YouTube playback-verification rejection. Public
conversion is therefore not verified working; changing UI or adding another
Next route does not resolve this provider access restriction.

The playback-token provider was also tested on Vercel: diagnostics confirmed
`tokenReceived: true`, with no provider/runtime failure, but YouTube still
required playback verification in both `iad1` and `bom1`. The region experiment
was reverted. No working public-download claim is made from these tests.

An optional **server-only** `YOUTUBE_PROXY_URL` can route yt-dlp and its token
provider through an operator-supplied HTTP(S) or SOCKS5 proxy. Set it in Vercel's
production environment and redeploy; never use a `NEXT_PUBLIC_` variable or put
credentials in source control. No proxy is included, purchased or automatically
selected. It must be tested from production before treating downloads as working.
Without this variable the route continues to use a direct connection.

## Production diagnostics and controlled verification

The flow is same-origin JSON POST → strict YouTube URL normalization → metadata
preflight → media download → FFmpeg MP3 → bounded binary response. All subprocesses
run in the Node route (not Edge), with no shell, a 90-second per-command deadline,
180-second conversion deadline, and request-owned temporary directories. The Linux
standalone yt-dlp contains Python; production does not use the macOS virtualenv.

`YOUTUBE_PROXY_URL` is read on the server for each conversion. HTTP, HTTPS, SOCKS5
and SOCKS5H URLs are accepted; paths, queries, fragments, missing hosts, other
schemes and surrounding whitespace are rejected before starting processes. It is
passed as one literal subprocess argument to both yt-dlp commands; the provider
receives the proxy through yt-dlp's request context. With no configured value,
`--proxy ""` explicitly selects direct connectivity. Ambient uppercase/lowercase
HTTP(S)/ALL/NO_PROXY variables are removed from child environments because yt-dlp
and BgUtils otherwise independently inherit them. No proxy has been purchased or
selected by this application.

Each completed subprocess logs a `youtube_audio_process` JSON event containing a
generated request ID, stage, exit code/signal, elapsed time, observed runtime/plugin
versions, selected client/network mode, and token events separately for player,
GVS and subtitles. Failures distinguish token provider, playback verification,
HTTP 403, missing formats and runtime dependencies. Multiple causes are retained.
`sanitizedStderr` is a conservative allowlist projection of recognized stderr
lines, **not raw stderr**; unknown/oversized lines are counted and omitted. No
stdout, arguments, URLs, credentials, cookies, token values or raw exceptions
are logged. Clients receive only the public error and request ID, or an MP3 with
`X-Request-ID`. Use that ID to find the corresponding Vercel runtime log entries.

Follow the [official PO Token Guide](https://github.com/yt-dlp/yt-dlp/wiki/PO-Token-Guide).
The installed plugin uses yt-dlp's `get_webpo_content_binding`: player tokens use
the requested video ID, while GVS binding follows the extractor's current session
or video-binding policy. The plugin passes the mweb Innertube context to BgUtils.
Each conversion gets a fresh XDG cache directory, deleted afterward; token caches
are not shared across unrelated requests. `received` means the provider returned
a token, **not** that YouTube accepted it. Only successful media download proves
that path worked.

For a controlled comparison use the public 19-second video `jNQXAC9IVRw` on a local
production build and the actual deployed API. Save response status, request ID,
MP3 validity and the matching structured events. Start direct; only test a proxy
if it is already authorized/configured. Do not publish raw `yt-dlp --verbose`
output, which can contain proxy arguments and token-provider commands.

The current Vercel Node runtime supports subprocesses; the observed deployed
function has already executed yt-dlp and the provider. That does not verify the
FFmpeg/download stages, which playback rejection prevents from being reached.
The local trace is about 174 MiB; a Linux deployment has different native assets
and must be checked in its build/runtime logs. The configured 240-second function
and 4,000,000-byte response cap fit documented Fluid Compute Hobby duration and
4.5 MB response limits. Verify the project's actual plan/Fluid configuration.
Runtime files are temporary, not durable storage; instance termination can
interrupt cleanup. No hosting migration or proxy is proven to remove YouTube's
verification requirement.
