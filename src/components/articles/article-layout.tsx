import type { ReactNode } from "react";
import { PageContainer } from "@/components/layout/page-container";
import { InteriorHero } from "@/components/layout/interior-hero";

export function ArticleLayout({
  title,
  description,
  children,
  category = "Guides",
}: {
  title: string;
  description: string;
  children: ReactNode;
  category?: string;
}) {
  return (
    <main>
      <PageContainer className="interior-page article-page">
        <InteriorHero
          title={title}
          description={description}
          eyebrow={category}
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: category, href: "/blog" },
            { label: title },
          ]}
        />
        <article className="article-content">{children}</article>
      </PageContainer>
    </main>
  );
}
