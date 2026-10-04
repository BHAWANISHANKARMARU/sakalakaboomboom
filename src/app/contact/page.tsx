import { DocumentLayout } from "@/components/layout/document-layout";
import { siteConfig } from "@/config/site";
import { getStaticPageMetadata } from "@/lib/seo/static-pages";
export const metadata = getStaticPageMetadata("/contact");
export default function Page() {
  return (
    <DocumentLayout
      title="Contact"
      description="Report a tool problem, correction or accessibility issue."
    >
      <p>
        Email{" "}
        <a
          className="text-blue font-bold underline"
          href={`mailto:${siteConfig.contactEmail}`}
        >
          {siteConfig.contactEmail}
        </a>
        . Please do not send confidential files or personal information.
      </p>
    </DocumentLayout>
  );
}
