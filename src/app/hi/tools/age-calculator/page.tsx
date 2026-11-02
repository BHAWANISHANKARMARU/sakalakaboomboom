import type { Metadata } from "next";
import { InteriorHero } from "@/components/layout/interior-hero";
import { PageContainer } from "@/components/layout/page-container";
import { AgeCalculatorHi } from "@/features/everyday-tools/age-calculator-hi";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "आयु कैलकुलेटर – जन्म तिथि से उम्र निकालें",
  description:
    "जन्म तिथि से अपनी सही उम्र वर्ष, महीने और दिन में निकालें। परीक्षा की कट-ऑफ तारीख पर आयु जाँचने के लिए मुफ़्त आयु कैलकुलेटर।",
  path: "/hi/tools/age-calculator",
  languageAlternates: {
    en: "/tools/calculators/age-calculator",
    hi: "/hi/tools/age-calculator",
    "x-default": "/tools/calculators/age-calculator",
  },
});

export default function Page() {
  return (
    <main lang="hi">
      <PageContainer className="interior-page tool-page">
        <InteriorHero
          title="आयु कैलकुलेटर"
          description="जन्म तिथि से अपनी सही उम्र वर्ष, महीने और दिन में निकालें।"
          eyebrow="हिंदी में टूल"
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Tools", href: "/tools" },
            { label: "आयु कैलकुलेटर" },
          ]}
        />
        <section className="tool-workspace" aria-label="आयु कैलकुलेटर">
          <AgeCalculatorHi />
        </section>
        <section className="tool-instructions">
          <h2>इस्तेमाल कैसे करें</h2>
          <ol className="list-decimal space-y-2 pl-5">
            <li>अपनी जन्म तिथि भरें।</li>
            <li>
              जिस तारीख पर उम्र जाननी है, वह भरें। खाली छोड़ने पर आज की तारीख
              मानी जाएगी।
            </li>
            <li>अपनी उम्र वर्ष, महीने और दिन में देखें।</li>
          </ol>
          <h2>उदाहरण</h2>
          <p>
            15 अगस्त 2005 को जन्मे व्यक्ति की आयु 30 अक्टूबर 2026 को 21 वर्ष, 2
            महीने और 15 दिन होगी।
          </p>
          <h2>अक्सर पूछे जाने वाले सवाल</h2>
          <h3>परीक्षा की आयु सीमा कैसे जाँचें?</h3>
          <p>
            आधिकारिक अधिसूचना से कट-ऑफ तारीख देखें, उसे दूसरे बॉक्स में भरें और
            परिणाम की तुलना दी गई आयु सीमा से करें।
          </p>
          <h3>क्या मेरी जानकारी सेव होती है?</h3>
          <p>नहीं। गणना आपके डिवाइस पर ही होती है।</p>
        </section>
      </PageContainer>
    </main>
  );
}
