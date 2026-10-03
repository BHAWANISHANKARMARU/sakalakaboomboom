export const siteConfig = {
  name: "Sakalakaboomboom",
  homeTitle: "Sakalakaboomboom — Free Online Tools & Study Resources for India",
  description:
    "Free, fast online tools for PDFs, images, text and everyday tasks, plus carefully reviewed study resources for students across India.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.sakalakaboomboom.online/",
  locale: "en" as const,
  contactEmail:
    process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@sakalakaboomboom.online",
  analyticsId:
    process.env.NODE_ENV === "production"
      ? (process.env.NEXT_PUBLIC_GA_ID ?? "G-MDCMHQR1JD")
      : undefined,
  adsEnabled: process.env.NEXT_PUBLIC_ADS_ENABLED === "true",
};
