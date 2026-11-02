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
    title: "Free Online Tools for Photos, PDFs and Forms",
    description:
      "Free online tools for photos, PDFs, text and calculations. They work in your browser, need no sign up and keep your files on your device.",
  },
  {
    path: "/tools/pdf",
    title: "Free PDF Tools – Reduce, Merge and Convert",
    description:
      "Reduce PDF size in KB, merge PDFs, turn photos into a PDF and extract pages. Free PDF tools that work in your browser with no upload.",
  },
  {
    path: "/tools/image",
    title: "Free Image Tools – Resize Photos in KB",
    description:
      "Resize photos in KB, compress images and convert JPG and PNG files. Free image tools for online forms that work with no upload.",
  },
  {
    path: "/tools/text",
    title: "Free Text Tools – Count, Clean and Convert",
    description:
      "Count words, change text case, sort lines, remove duplicates and clean extra spaces. Free text tools that work in your browser.",
  },
  {
    path: "/tools/web",
    title: "Free Web and Developer Tools Online",
    description:
      "Format JSON, create QR codes, generate passwords and encode URLs or Base64. Free developer tools that keep your data on your device.",
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
    title: "Free Calculators – GST, EMI, SIP and Age",
    description:
      "Free calculators for India, including GST with CGST and SGST, EMI, SIP, age, percentage and discount. Fast, simple and mobile friendly.",
  },
  {
    path: "/education",
    title: "Class 9 to 12 Study Resources",
    description:
      "Original chapter guides for Indian students in English and Hindi, with verified subject lists for Class 9 to 12 and simple examples.",
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
    title: "How-to Guides for Online Forms and Documents",
    description:
      "Simple step-by-step guides for resizing photos, preparing PDFs for online forms, checking age limits and handling everyday documents.",
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
    title: "About Us",
    description:
      "Learn about Sakalakaboomboom, a free set of private browser tools and reviewed study resources made for students and users in India.",
  },
  {
    path: "/contact",
    title: "Contact Us",
    description:
      "Report a tool problem, suggest a correction or raise an accessibility issue with Sakalakaboomboom. We review every useful report.",
  },
  {
    path: "/privacy-policy",
    title: "Privacy Policy",
    description:
      "Read how Sakalakaboomboom handles information, how browser tools keep your files on your device, and how analytics are used on this site.",
  },
  {
    path: "/terms",
    title: "Terms of Use",
    description:
      "Read the plain-language terms for using Sakalakaboomboom, including fair use of our free tools and the limits of our informational content.",
  },
  {
    path: "/disclaimer",
    title: "Disclaimer",
    description:
      "Understand the limits of Sakalakaboomboom tools and guides, and why you should always check official sources for exam and financial details.",
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
