import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ToolLayout } from "@/components/tools/tool-layout";
import { YoutubeAudio } from "@/features/youtube-audio/youtube-audio";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: "YouTube Video to Audio",
    description: "Convert a YouTube video to a downloadable MP3 audio file.",
    path: "/tools/web/youtube-video-to-audio",
  }),
  robots: { index: false, follow: false },
};

export default function Page() {
  if (process.env.NODE_ENV !== "development" || process.env.VERCEL) notFound();
  return (
    <ToolLayout
      title="YouTube Video to Audio"
      description="Turn a YouTube video into an MP3 audio file."
      category="Web"
      path="/tools/web/youtube-video-to-audio"
      processing="server"
      details={
        <p>
          Paste a single video link, select Convert to MP3, then download your
          audio. This local preview accepts recorded videos up to 10 minutes
          long and processes one conversion at a time. No API key or account is
          required. The downloaded file stays in your browser until you save it
          or leave the page.
        </p>
      }
    >
      <YoutubeAudio />
    </ToolLayout>
  );
}
