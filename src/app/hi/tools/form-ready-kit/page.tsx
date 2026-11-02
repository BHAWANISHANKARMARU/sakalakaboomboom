import type { Metadata } from "next";
import { InteriorHero } from "@/components/layout/interior-hero";
import { PageContainer } from "@/components/layout/page-container";
import { StatusNotice } from "@/components/ui/status-notice";
import { FormKit } from "@/features/form-kit/form-kit";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "ऑनलाइन फ़ॉर्म के लिए फ़ोटो, हस्ताक्षर और PDF तैयार करें",
  description:
    "परीक्षा और नौकरी के ऑनलाइन फ़ॉर्म के लिए फ़ोटो, हस्ताक्षर और दस्तावेज़ एक ही जगह तैयार करें। मुफ़्त, बिना साइन-अप और बिना अपलोड।",
  path: "/hi/tools/form-ready-kit",
  languageAlternates: {
    en: "/tools/image/form-ready-kit",
    hi: "/hi/tools/form-ready-kit",
    "x-default": "/tools/image/form-ready-kit",
  },
});

export default function Page() {
  return (
    <main lang="hi">
      <PageContainer className="interior-page tool-page">
        <InteriorHero
          title="फ़ॉर्म रेडी किट"
          description="ऑनलाइन फ़ॉर्म के लिए अपनी फ़ोटो, हस्ताक्षर और दस्तावेज़ एक ही बार में तैयार करें।"
          eyebrow="हिंदी में टूल"
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Tools", href: "/tools" },
            { label: "फ़ॉर्म रेडी किट" },
          ]}
        />
        <StatusNotice
          title="आपकी फ़ाइलें आपके पास"
          description="सारा काम आपके ब्राउज़र में होता है। आपकी फ़ोटो और दस्तावेज़ हमारे सर्वर पर अपलोड नहीं होते।"
          tone="privacy"
        />
        <section className="tool-workspace" aria-label="फ़ॉर्म रेडी किट">
          <FormKit locale="hi" />
        </section>
        <section className="tool-instructions">
          <h2>इस्तेमाल कैसे करें</h2>
          <ol className="list-decimal space-y-2 pl-5">
            <li>अपनी परीक्षा या नौकरी की अधिसूचना खोलें और सीमाएँ देखें।</li>
            <li>फ़ोटो, हस्ताक्षर और दस्तावेज़ चुनें, फिर वही सीमाएँ भरें।</li>
            <li>
              “मेरी फ़ाइलें तैयार करें” चुनें और हर फ़ाइल की जाँच करके डाउनलोड
              करें।
            </li>
          </ol>
          <h2>अक्सर पूछे जाने वाले सवाल</h2>
          <h3>क्या मेरी फ़ाइलें अपलोड होती हैं?</h3>
          <p>नहीं। सारा काम आपके डिवाइस पर ही होता है।</p>
          <h3>सही KB सीमा कहाँ मिलेगी?</h3>
          <p>
            अपनी आधिकारिक अधिसूचना में देखें। हर परीक्षा की सीमा अलग हो सकती है
            और बदल भी सकती है, इसलिए यहाँ दिए गए मान केवल उदाहरण हैं।
          </p>
          <h3>“सीमा से बाहर” दिखे तो क्या करें?</h3>
          <p>
            फ़ोटो या हस्ताक्षर के लिए बड़ा पिक्सेल आकार या ज़्यादा साफ़ मूल
            फ़ाइल आज़माएँ। PDF के लिए पहले तस्वीरों का आकार कम करें।
          </p>
        </section>
      </PageContainer>
    </main>
  );
}
