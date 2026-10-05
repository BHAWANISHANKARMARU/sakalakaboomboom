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

## Local YouTube-to-audio prototype

No email, API key or paid conversion provider is needed. Requires macOS/Linux,
Python 3.10+ and Node 22+ for yt-dlp's JavaScript runtime.

```bash
npm run audio:setup
npm run dev -- --hostname 127.0.0.1
```

Open `/tools/web/youtube-video-to-audio` on the local server, or find it under
Web & developer tools. The setup installs yt-dlp and an FFmpeg binary into
`.venv-audio/`, which is ignored by Git. Do not upload that directory to Vercel.

The local Next.js API runs yt-dlp without a shell, checks video duration, downloads
one video, and uses FFmpeg to produce a 128 kbps MP3. It allows one conversion at a
time per process, limits videos to 10 minutes, limits source media to 40 MiB,
monitors temporary disk usage, applies timeouts, and cleans up on success,
failure or cancellation. Only canonical YouTube video URLs are passed to yt-dlp.
Temporary folders have the prefix `sakalaka-audio-`; after a hard process/OS crash,
an interrupted folder may remain in the system temporary directory.

This is a **local prototype**. The page is not indexed or listed in production,
and the API is disabled outside development and on Vercel. A public deployment
needs a separate conversion worker, durable job/download handling, and shared
rate limits; it must not just enable subprocess conversions in a Vercel function.
Update the server-processing privacy disclosure when making it public.

YouTube can refuse downloads or require playback verification. This prototype
does not import browser cookies or use personal accounts. Such failures show an
error rather than a fake download. Dependency versions should be updated and
retested when YouTube changes its behavior. Convert only videos you own or have
permission to download.
