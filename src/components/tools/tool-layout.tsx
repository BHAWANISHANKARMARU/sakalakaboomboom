import type { ReactNode } from "react";
import { PageContainer } from "@/components/layout/page-container";
import { InteriorHero } from "@/components/layout/interior-hero";
import { StatusNotice } from "@/components/ui/status-notice";
import { breadcrumbJsonLd, toolJsonLd } from "@/lib/seo/structured-data";

export function ToolLayout({
  title,
  description,
  category,
  path,
  children,
  details,
  processing = "browser",
}: {
  title: string;
  description: string;
  category: string;
  path: string;
  children: ReactNode;
  details?: ReactNode;
  processing?: "browser" | "server";
}) {
  const categoryPath = `/tools/${category.toLowerCase()}`;
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Tools", path: "/tools" },
              { name: category, path: categoryPath },
              { name: title, path },
            ]),
            toolJsonLd(title, description, path),
          ]).replace(/</g, "\\u003c"),
        }}
      />
      <PageContainer className="interior-page tool-page">
        <InteriorHero
          title={title}
          description={description}
          eyebrow={`${category} tool`}
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Tools", href: "/tools" },
            { label: category, href: categoryPath },
            { label: title },
          ]}
        />
        <StatusNotice
          title={
            processing === "browser"
              ? "Private browser processing"
              : "Server audio conversion"
          }
          description={
            processing === "browser"
              ? "This tool processes your input on this device. Your files or text are not uploaded to our server."
              : "Your video link is sent to the conversion server, which downloads and converts the audio. Temporary files are deleted after processing."
          }
          tone="privacy"
        />
        <section className="tool-workspace" aria-label={`${title} interface`}>
          {children}
        </section>
        <section className="tool-instructions">
          <h2>How to use this tool</h2>
          {details ?? (
            <p>
              Add your input, review the options, then create and download the
              result.{" "}
              {processing === "browser"
                ? "Your content stays on this device."
                : "Audio is processed on the conversion server."}
            </p>
          )}
        </section>
      </PageContainer>
    </main>
  );
}
