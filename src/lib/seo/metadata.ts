import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
export function buildPageMetadata({
  title,
  description,
  path,
  noIndex = false,
}: {
  title: string;
  description: string;
  path: string;
  noIndex?: boolean;
}): Metadata {
  const canonical = new URL(path, siteConfig.url).toString();
  return {
    title: `${title} | ${siteConfig.name}`,
    description,
    alternates: { canonical },
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
