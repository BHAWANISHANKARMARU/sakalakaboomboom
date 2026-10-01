import type { ReactNode } from "react";
import { PageContainer } from "@/components/layout/page-container";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { breadcrumbJsonLd, toolJsonLd } from "@/lib/seo/structured-data";
export function ToolLayout({
  title,
  description,
  category,
  path,
  children,
  details,
}: {
  title: string;
  description: string;
  category: string;
  path: string;
  children: ReactNode;
  details?: ReactNode;
}) {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Tools", path: "/tools" },
              { name: category, path: `/tools/${category.toLowerCase()}` },
              { name: title, path },
            ]),
            toolJsonLd(title, description, path),
          ]).replace(/</g, "\\u003c"),
        }}
      />
      <PageContainer className="grid gap-8 py-8 sm:py-12">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Tools", href: "/tools" },
            { label: category, href: `/tools/${category.toLowerCase()}` },
            { label: title },
          ]}
        />
        <header className="max-w-3xl">
          <h1 className="text-4xl sm:text-5xl">{title}</h1>
          <p className="text-muted mt-3 text-lg">{description}</p>
        </header>
        {children}
        <section className="prose border-line max-w-3xl border-t pt-8">
          <h2>How to use this tool</h2>
          {details ?? (
            <p className="text-muted mt-3">
              Add your input, review the options, then create and download the
              result. Your content stays on this device.
            </p>
          )}
        </section>
      </PageContainer>
    </main>
  );
}
