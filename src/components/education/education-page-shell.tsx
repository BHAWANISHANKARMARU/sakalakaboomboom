import { PageContainer } from "@/components/layout/page-container";
import { EducationBreadcrumbs } from "./education-breadcrumbs";
import { LanguageSwitcher } from "./language-switcher";
import type { ReactNode } from "react";
import type { Locale } from "@/types/content";

export function EducationPageShell({
  title,
  description,
  locale,
  breadcrumbs,
  englishPath,
  hindiPath,
  children,
}: {
  title: string;
  description: string;
  locale: Locale;
  breadcrumbs: { label: string; href?: string }[];
  englishPath: string;
  hindiPath: string;
  children: ReactNode;
}) {
  return (
    <main>
      <PageContainer className="education-page">
        <EducationBreadcrumbs items={breadcrumbs} />
        <header className="education-header">
          <p className="eyebrow">
            {locale === "hi"
              ? "भारतीय विद्यार्थियों के लिए"
              : "For Indian students"}
          </p>
          <h1>{title}</h1>
          <p>{description}</p>
          <LanguageSwitcher
            locale={locale}
            englishPath={englishPath}
            hindiPath={hindiPath}
          />
        </header>
        {children}
      </PageContainer>
    </main>
  );
}
