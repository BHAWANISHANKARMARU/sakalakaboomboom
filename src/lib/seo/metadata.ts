import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
export function buildPageMetadata({
  title,
  description,
  path,
  noIndex = false,
  languageAlternates,
}: {
  title: string;
  description: string;
  path: string;
  noIndex?: boolean;
  languageAlternates?: Record<string, string>;
}): Metadata {
  const canonical = new URL(path, siteConfig.url).toString();
  const languages = languageAlternates
    ? Object.fromEntries(
        Object.entries(languageAlternates).map(([locale, value]) => [
          locale,
          new URL(value, siteConfig.url).toString(),
        ]),
      )
    : undefined;
  return {
    title: `${title} | ${siteConfig.name}`,
    description,
    alternates: { canonical, languages },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: siteConfig.name,
      type: "website",
    },
    twitter: { card: "summary", title, description },
    robots: noIndex ? { index: false, follow: true } : undefined,
  };
}
