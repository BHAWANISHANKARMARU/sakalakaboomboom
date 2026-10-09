import type { Metadata } from "next";
import { ToolLayout } from "@/components/tools/tool-layout";
import { YoutubeAudio } from "@/features/youtube-audio/youtube-audio";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: "YouTube to MP3 – Video to Audio Converter",
    description:
      "Convert YouTube videos up to 4 minutes to 128 kbps MP3 audio. Paste a video link, convert and download your audio without an account.",
    path: "/tools/web/youtube-video-to-audio",
  }),
};

export default function Page() {
  return (
    <ToolLayout
      title="YouTube to MP3 – Video to Audio"
      description="Paste a YouTube video link to convert and download its audio as an MP3."
      category="Web"
      path="/tools/web/youtube-video-to-audio"
      processing="server"
      details={
        <div className="grid gap-5">
          <p>
            Paste a single YouTube video link, select Convert to MP3, and wait
            for the audio to finish processing. Select Download MP3 to save it
            before leaving the page. The tool supports recorded videos up to 4
            minutes long and processes one video at a time.
          </p>
          <h2>What is YouTube to MP3 conversion?</h2>
          <p>
            A YouTube-to-MP3 converter extracts the audio track from a video and
            saves it as an MP3 file. The result contains sound without the video
            picture. This can be useful for listening to your own recorded
            talks, tutorials or other videos you have permission to download.
          </p>
          <h2>Supported video links and audio quality</h2>
          <p>
            The tool accepts standard YouTube watch links, youtu.be links,
            Shorts and embedded video links. It creates 128 kbps MP3 files.
            Re-encoding cannot improve the quality of the original recording.
            Playlists, live streams and videos with unknown duration are not
            supported.
          </p>
          <h2>Frequently asked questions</h2>
          <h3>How do I convert a video?</h3>
          <p>
            Paste a supported video link into the tool above, select Convert to
            MP3, then Download MP3 when processing finishes. YouTube may require
            playback verification and prevent conversion. If that happens, the
            tool displays an error.
          </p>
          <h3>Does this tool download MP4 videos?</h3>
          <p>
            No. This tool prepares MP3 audio only. It does not download the
            video picture or create MP4 files.
          </p>
          <h3>Do I need an API key or an account?</h3>
          <p>
            No API key or account is needed. A video can still be unavailable if
            YouTube requires playback verification or restricts access.
          </p>
          <h3>What happens to the downloaded audio?</h3>
          <p>
            The conversion server temporarily downloads and processes the audio.
            Temporary files are deleted after processing. The result remains in
            your browser until you save it, change the input or leave the page.
            Only convert videos you own or have permission to download.
          </p>
        </div>
      }
    >
      <YoutubeAudio />
    </ToolLayout>
  );
}
