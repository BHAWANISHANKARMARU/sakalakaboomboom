import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { buildPageMetadata } from "./metadata";

type StaticPageRecord = {
  path: string;
  title: string;
  description: string;
  absoluteTitle?: boolean;
  noIndex?: boolean;
};

export const staticPages: StaticPageRecord[] = [
  {
    path: "/",
    title: siteConfig.homeTitle,
    description: siteConfig.description,
    absoluteTitle: true,
  },
  {
    path: "/tools",
    title: "Online Tools",
    description:
      "Fast, private online utilities for PDFs, images, text, calculations and web tasks.",
  },
  {
    path: "/tools/pdf",
    title: "PDF Tools",
    description:
      "Work with PDF files privately using practical browser-based tools.",
  },
  {
    path: "/tools/image",
    title: "Image Tools",
    description:
      "Compress, resize and convert everyday images in your browser.",
  },
  {
    path: "/tools/text",
    title: "Text Tools",
    description:
      "Count, clean and transform text instantly with free browser tools.",
  },
  {
    path: "/tools/web",
    title: "Web and Developer Tools",
    description:
      "Practical utilities for JSON, URLs, QR codes and common developer tasks.",
  },
  {
    path: "/tools/scanner",
    noIndex: true,
    title: "Scanner and Utility Tools",
    description:
      "Scan codes and inspect public website information with straightforward tools.",
  },
  {
    path: "/tools/calculators",
    title: "Everyday Calculators",
    description:
      "Useful calculators for percentages, GST, EMI, dates and everyday decisions.",
  },
  {
    path: "/education",
    title: "Class 9 to 12 Study Resources",
    description:
      "Verified Class 9 to 12 subject directories and original chapter guides for Indian students.",
  },
  {
    path: "/education/ncert",
    noIndex: true,
    title: "NCERT Study Guides",
    description:
      "Clear guides for using NCERT textbooks and learning chapter concepts effectively.",
  },
  {
    path: "/education/cbse",
    noIndex: true,
    title: "CBSE Study Resources",
    description:
      "Verified preparation guidance and study resources for CBSE students.",
  },
  {
    path: "/exams",
    noIndex: true,
    title: "Competitive Exam Guides",
    description:
      "Evergreen preparation guidance with official sources for current exam information.",
  },
  {
    path: "/technology",
    noIndex: true,
    title: "Technology Guides",
    description:
      "Practical explanations of the internet, devices and digital safety.",
  },
  {
    path: "/how-to",
    title: "How-to Guides",
    description:
      "Clear instructions for common digital tasks, files, images, text and websites.",
  },
  {
    path: "/blog",
    noIndex: true,
    title: "Useful Guides",
    description:
      "Original, reviewed guides for students and everyday internet users in India.",
  },
  {
    path: "/about",
    title: "About Sakalakaboomboom",
    description:
      "Learn about Sakalakaboomboom's practical tools and reviewed learning resources.",
  },
  {
    path: "/contact",
    title: "Contact",
    description:
      "Report a tool problem, content correction or accessibility issue.",
  },
  {
    path: "/privacy-policy",
    title: "Privacy Policy",
    description:
      "How Sakalakaboomboom handles information, browser processing and analytics.",
  },
  {
    path: "/terms",
    title: "Terms of Use",
    description: "Plain-language conditions for using Sakalakaboomboom.",
  },
  {
    path: "/disclaimer",
    title: "Disclaimer",
    description:
      "Important limits on Sakalakaboomboom tools and informational guides.",
  },
];

export const staticPagePaths = staticPages
  .filter((page) => !page.noIndex)
  .map((page) => page.path);

export function getStaticPageMetadata(path: string): Metadata {
  const page = staticPages.find((item) => item.path === path);
  if (!page) throw new Error(`Missing static page metadata for ${path}`);
  return buildPageMetadata(page);
}
