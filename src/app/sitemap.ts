import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { getLiveTools, getPublishedArticles } from "@/lib/content/registry";
import { getPublishedEducationSitemapRecords } from "@/lib/education/repository";
import { staticPagePaths } from "@/lib/seo/static-pages";
export default function sitemap(): MetadataRoute.Sitemap {
  const basicRoutes = [
    ...staticPagePaths,
    ...getLiveTools("en").map((item) => item.url),
    ...getPublishedArticles("en").map(
      (item) => `/${item.section}/${item.slug}`,
    ),
  ].map(
    (path) =>
      ({
        url: new URL(path, siteConfig.url).toString(),
        changeFrequency: path.startsWith("/tools/") ? "monthly" : "weekly",
      }) satisfies MetadataRoute.Sitemap[number],
  );
  const educationRoutes = getPublishedEducationSitemapRecords().map((item) => ({
    url: new URL(item.path, siteConfig.url).toString(),
    lastModified: item.lastModified,
    changeFrequency: "monthly" as const,
  }));
  return [
    ...new Map(
      [...basicRoutes, ...educationRoutes].map((item) => [item.url, item]),
    ).values(),
  ];
}
