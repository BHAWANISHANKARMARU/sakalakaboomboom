import { SectionIndex } from "@/components/layout/section-index";
import { ContentSection } from "@/components/layout/content-section";
import { ResponsiveGrid } from "@/components/layout/responsive-grid";
import { ResourceCard } from "@/components/ui/resource-card";
import { StatusNotice } from "@/components/ui/status-notice";
export default function Page() {
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
          {[
            [
              "Class 11",
              "Subject study guides and preparation help.",
              "/education/class-11",
            ],
            [
              "Class 12",
              "Board-focused preparation and study planning.",
              "/education/class-12",
            ],
            [
              "NCERT",
              "Textbook structure and learning strategies.",
              "/education/ncert",
            ],
            [
              "CBSE",
              "Practical preparation and current-source guidance.",
              "/education/cbse",
            ],
          ].map(([title, description, href]) => (
            <ResourceCard
              title={title}
              description={description}
              href={href}
              key={href}
            />
          ))}
        </ResponsiveGrid>
      </ContentSection>
      <StatusNotice
        title="Reviewed before publication"
        description="Current syllabus, policy and exam details are checked against official sources before publication."
      />
    </SectionIndex>
  );
}
