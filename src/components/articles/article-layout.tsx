import type { ReactNode } from "react";
import { PageContainer } from "@/components/layout/page-container";
export function ArticleLayout({
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
      <PageContainer className="grid max-w-3xl gap-8 py-12">
        <header>
          <h1>{title}</h1>
          <p className="text-muted mt-4 text-lg">{description}</p>
        </header>
        <article className="grid gap-5">{children}</article>
      </PageContainer>
    </main>
  );
}
