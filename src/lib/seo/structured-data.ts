import { siteConfig } from "@/config/site";
export const breadcrumbJsonLd = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: new URL(item.path, siteConfig.url).toString(),
  })),
});
export const toolJsonLd = (
  name: string,
  description: string,
  path: string,
) => ({
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name,
  description,
  url: new URL(path, siteConfig.url).toString(),
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Any",
});
