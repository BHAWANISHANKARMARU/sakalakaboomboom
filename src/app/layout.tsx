import type { Metadata } from "next";
import type { ReactNode } from "react";
import { GoogleAnalytics } from "@/components/analytics/google-analytics";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { siteConfig } from "@/config/site";
import { websiteJsonLd } from "@/lib/seo/structured-data";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.homeTitle,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.homeTitle,
    description: siteConfig.description,
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: siteConfig.homeTitle,
    description: siteConfig.description,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd()).replace(/</g, "\\u003c"),
          }}
        />
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
        <GoogleAnalytics measurementId={siteConfig.analyticsId} />
      </body>
    </html>
  );
}
