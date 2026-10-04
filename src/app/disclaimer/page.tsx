import { DocumentLayout } from "@/components/layout/document-layout";
import { getStaticPageMetadata } from "@/lib/seo/static-pages";
export const metadata = getStaticPageMetadata("/disclaimer");
export default function Page() {
  return (
    <DocumentLayout
      title="Disclaimer"
      description="Important limits on our tools and informational guides."
    >
      <p>
        Content is for general informational and educational use, not legal,
        financial, medical or other professional advice.
      </p>
      <p>
        For syllabus, exam dates, eligibility, notices and policies, confirm the
        latest information on the responsible official website.
      </p>
    </DocumentLayout>
  );
}
