import type { ReactNode } from "react";
import { PageContainer } from "./page-container";
import { InteriorHero } from "./interior-hero";
import { StatusNotice } from "@/components/ui/status-notice";

export function SectionIndex({
  title,
  description,
  eyebrow = "StudyTools.in",
  children,
}: {
  title: string;
  description: string;
  eyebrow?: string;
  children?: ReactNode;
}) {
  return (
    <main>
      <PageContainer className="interior-page">
        <InteriorHero
          title={title}
          description={description}
          eyebrow={eyebrow}
          breadcrumbs={[{ label: "Home", href: "/" }, { label: title }]}
        />
        {children ?? (
          <StatusNotice
            title="Reviewed before publication"
            description="Useful resources for this section are being prepared and checked before they are published."
            tone="planned"
          />
        )}
      </PageContainer>
    </main>
  );
}
