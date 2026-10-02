import type { ReactNode } from "react";
import { PageContainer } from "./page-container";
import { InteriorHero } from "./interior-hero";

export function DocumentLayout({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <main>
      <PageContainer className="interior-page document-page">
        <InteriorHero
          title={title}
          description={description}
          eyebrow="StudyTools.in"
          breadcrumbs={[{ label: "Home", href: "/" }, { label: title }]}
        />
        <article className="document-content">{children}</article>
      </PageContainer>
    </main>
  );
}
