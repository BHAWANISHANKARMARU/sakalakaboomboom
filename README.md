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
provided by `ffmpeg-static`. Next output tracing includes both executables in
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
