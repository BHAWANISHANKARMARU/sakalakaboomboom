import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { getLiveTools, getPublishedArticles } from "@/lib/content/registry";
const staticPaths = [
  "/",
  "/tools",
  "/tools/pdf",
  "/tools/image",
  "/tools/text",
  "/tools/web",
  "/tools/scanner",
  "/tools/calculators",
  "/education",
  "/education/class-11",
  "/education/class-12",
  "/education/ncert",
  "/education/cbse",
  "/exams",
  "/technology",
  "/how-to",
  "/blog",
  "/about",
  "/contact",
  "/privacy-policy",
  "/terms",
  "/disclaimer",
];
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...staticPaths,
    ...getLiveTools("en").map((item) => item.url),
    ...getPublishedArticles("en").map(
      (item) => `/${item.section}/${item.slug}`,
    ),
  ].map((path) => ({
    url: new URL(path, siteConfig.url).toString(),
    changeFrequency: path.startsWith("/tools/") ? "monthly" : "weekly",
  }));
}
