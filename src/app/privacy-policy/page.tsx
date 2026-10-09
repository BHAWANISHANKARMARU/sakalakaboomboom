import { DocumentLayout } from "@/components/layout/document-layout";
import { getStaticPageMetadata } from "@/lib/seo/static-pages";
export const metadata = getStaticPageMetadata("/privacy-policy");
export default function Page() {
  return (
    <DocumentLayout
      title="Privacy Policy"
      description="How Sakalakaboomboom handles information."
    >
      <h2>Browser processing</h2>
      <p>
        Tools marked as browser processing keep files and entered content in
        your browser. We do not receive or store that content.
      </p>
      <h2>YouTube audio conversion</h2>
      <p>
        The YouTube audio tool sends your video link to our server, which
        fetches media from YouTube and creates an MP3. Temporary media files are
        deleted after processing. The returned audio stays in your browser until
        you download it or leave the page. We do not request your YouTube
        account credentials or cookies.
      </p>
      <h2>Analytics and advertising</h2>
      <p>
        Analytics and advertising are disabled unless explicitly configured. If
        enabled later, this policy will be updated to describe the data and
        choices accurately.
      </p>
      <h2>Contact</h2>
      <p>Messages you send voluntarily are used to respond to your enquiry.</p>
    </DocumentLayout>
  );
}
