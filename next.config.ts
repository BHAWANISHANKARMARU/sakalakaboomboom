import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["ffmpeg-static"],
  outputFileTracingIncludes: {
    "/api/youtube-audio": [
      "./.audio-bin/yt-dlp",
      "./.audio-bin/pot/plugin/**/*.py",
      "./.audio-bin/pot/server/build/**/*.js",
      "./.audio-bin/pot/server/package.json",
      "./.audio-bin/pot/server/node_modules/**/*",
      "./node_modules/ffmpeg-static/ffmpeg",
    ],
  },
  outputFileTracingExcludes: {
    "/api/youtube-audio": ["./.venv-audio/**/*"],
  },
};

export default nextConfig;
