import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["ffmpeg-static"],
  outputFileTracingIncludes: {
    "/api/youtube-audio": [
      "./.audio-bin/yt-dlp",
      "./node_modules/ffmpeg-static/ffmpeg",
    ],
  },
  outputFileTracingExcludes: {
    "/api/youtube-audio": ["./.venv-audio/**/*"],
  },
};

export default nextConfig;
