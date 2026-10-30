import { siteConfig } from "@/config/site";

export const websiteJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteConfig.name,
  url: siteConfig.url,
  inLanguage: siteConfig.locale,
  potentialAction: {
    "@type": "SearchAction",
    target: new URL(
      "/search?q={search_term_string}",
      siteConfig.url,
    ).toString(),
    "query-input": "required name=search_term_string",
  },
});

export const organizationJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: siteConfig.url,
  logo: new URL("/icon.png", siteConfig.url).toString(),
});

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
export const articleJsonLd = (article: {
  title: string;
  description: string;
  slug: string;
  section: string;
  updatedAt: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: article.title,
  description: article.description,
  dateModified: article.updatedAt,
  url: new URL(
    `/${article.section}/${article.slug}`,
    siteConfig.url,
  ).toString(),
  publisher: { "@type": "Organization", name: siteConfig.name },
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
  isAccessibleForFree: true,
  offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
});
