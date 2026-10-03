import { SectionIndex } from "@/components/layout/section-index";
import { ContentSection } from "@/components/layout/content-section";
import { ResponsiveGrid } from "@/components/layout/responsive-grid";
import { ResourceCard } from "@/components/ui/resource-card";
import { StatusNotice } from "@/components/ui/status-notice";
import { getEducationLandingMetadata } from "@/lib/education/metadata";
import { getClassDirectory } from "@/lib/education/repository";
export const metadata = getEducationLandingMetadata("en");
export default function Page() {
  const classes = ["class-9", "class-10", "class-11", "class-12"].map((slug) =>
    getClassDirectory(slug, "en")!,
  );
  return (
    <SectionIndex
      title="Education"
      description="Carefully reviewed study guidance for Indian students."
      eyebrow="For Indian students"
    >
      <ContentSection
        title="Choose your study section"
        description="Start with your class or curriculum."
      >
        <ResponsiveGrid columns={4}>
          {classes.map((record) => (
            <ResourceCard
              title={record.title}
              description={record.description}
              href={`/education/${record.slug}`}
              key={record.id}
            />
          ))}
        </ResponsiveGrid>
      </ContentSection>
      <StatusNotice
        title="Current syllabus is source-checked"
        description="Published chapter guides are checked against official CBSE or NCERT sources. Lessons are original explanations, not copied textbooks."
      />
    </SectionIndex>
  );
}
