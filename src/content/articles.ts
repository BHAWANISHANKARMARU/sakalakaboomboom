import type { ArticleRecord } from "@/types/content";

const article = (
  record: Omit<ArticleRecord, "locale" | "section" | "status" | "updatedAt"> & {
    locale?: ArticleRecord["locale"];
  },
): ArticleRecord => ({
  locale: "en",
  ...record,
  section: "how-to",
  status: "published",
  updatedAt: "2026-10-31",
});

export const articles: ArticleRecord[] = [
  article({
    id: "resize-photo-signature-form",
    slug: "resize-photo-signature-for-online-form",
    title: "How to Resize a Photo and Signature for an Online Form",
    description:
      "Why online forms reject photos, what to check in your notification, and how to prepare a photo and signature that fit.",
    relatedToolIds: ["form-ready-kit", "photo-signature-resizer"],
    relatedArticleIds: ["reduce-image-to-50kb", "merge-documents-pdf"],
    sections: [
      {
        heading: "Why the form rejects your photo",
        paragraphs: [
          "An online form usually checks more than one thing. It may check the file type, the size in KB and the size in pixels. Your photo can pass one check and still fail another.",
          "KB and pixels are not the same thing. Pixels describe the width and height of the picture. KB describes how much storage the file uses. A phone photo is usually far larger than a form allows on both.",
        ],
      },
      {
        heading: "Find the exact limits first",
        paragraphs: [
          "Open the official notification or the form’s instruction page and write down the file type, the minimum and maximum KB, and the pixel size if it is given. Limits differ between exams and can change between years, so do not copy them from a friend’s old form.",
        ],
      },
      {
        heading: "Prepare the files",
        steps: [
          "Take a clear photo against a plain background, following any rules in the notification.",
          "For a signature, sign on plain white paper with a dark pen and photograph it in good light.",
          "Crop the picture so that your face or signature fills the frame.",
          "Open the Form Ready Kit and enter the limits from your notification.",
          "Download the files and open each one to check that it is sharp and correctly cropped.",
        ],
      },
      {
        heading: "If the signature looks faint",
        paragraphs: [
          "Faint signatures usually come from a light pen or poor lighting. Sign again with a darker pen near a window, then repeat the steps. Shrinking the file cannot add detail that the original does not have.",
        ],
      },
    ],
  }),
  article({
    id: "reduce-image-to-50kb",
    slug: "reduce-image-size-to-50kb",
    title: "How to Reduce an Image to 50 KB Without Blur",
    description:
      "A simple way to bring a phone photo under 50 KB, and what to do when the image still looks blurry or stays too large.",
    relatedToolIds: ["photo-signature-resizer", "image-compressor"],
    relatedArticleIds: ["resize-photo-signature-form"],
    sections: [
      {
        heading: "Two things control file size",
        paragraphs: [
          "File size depends mostly on the number of pixels and the compression quality. Lowering quality alone on a large photo can make it look rough. Reducing the pixel size first gives the compression much less work to do.",
        ],
      },
      {
        heading: "The quick method",
        steps: [
          "Open the Photo Resizer in KB.",
          "Set the maximum size to 50 KB.",
          "Enter the pixel size your form asks for. If it gives none, try a modest size such as 400 × 400.",
          "Select Resize image. The tool finds the highest quality that stays within your limit.",
          "Check the result at normal size before you use it.",
        ],
      },
      {
        heading: "If it is still too large or blurry",
        paragraphs: [
          "If the tool says the image cannot fit, reduce the pixel size. If the image looks blurry, the pixel size may be too small, or the original may be unclear.",
          "Busy backgrounds use more KB than plain ones. A plain background usually gives a sharper result at the same file size.",
        ],
      },
    ],
  }),
  article({
    id: "merge-documents-pdf",
    slug: "merge-documents-into-one-pdf",
    title: "How to Join Documents Into One PDF for an Application",
    description:
      "Put marksheets, certificates and ID proof into a single PDF in the right order, without uploading private documents.",
    relatedToolIds: ["pdf-merger", "jpg-to-pdf", "pdf-page-extractor"],
    relatedArticleIds: ["phone-photos-to-pdf"],
    sections: [
      {
        heading: "Decide the order before you start",
        paragraphs: [
          "If the application gives a document order, follow it exactly. If it does not, a sensible order is the application or cover page, ID proof, then marksheets and certificates from oldest to newest.",
        ],
      },
      {
        heading: "Join the files",
        steps: [
          "If a document is a photo, turn it into a PDF with JPG to PDF.",
          "Open the PDF Merger and select your PDFs in the order you decided.",
          "Check the list, select Merge PDFs and download the file.",
          "Open the result and check that every page is present and upright.",
        ],
      },
      {
        heading: "Keep private documents safe",
        paragraphs: [
          "ID proofs and marksheets contain personal details. The tools here work in your browser, so these files are not uploaded. Whichever tool you use, check how it handles your files before you add private documents.",
        ],
      },
      {
        heading: "If you only need some pages",
        paragraphs: [
          "Use the PDF Page Extractor to keep only the pages you need before you merge. This also helps when the combined file is over the size limit.",
        ],
      },
    ],
  }),
  article({
    id: "phone-photos-to-pdf",
    slug: "convert-phone-photos-to-pdf",
    title: "How to Turn Phone Photos Into a Clean PDF",
    description:
      "Photograph assignments and documents on your phone so they stay readable, then combine them into one A4 PDF.",
    relatedToolIds: ["jpg-to-pdf", "image-compressor"],
    relatedArticleIds: ["merge-documents-pdf"],
    sections: [
      {
        heading: "Take photos that stay readable",
        steps: [
          "Place the page on a flat surface with a plain, contrasting background.",
          "Use daylight when you can, and avoid casting your own shadow on the page.",
          "Hold the phone straight above the page so the text does not slant.",
          "Tap the screen to focus on the text before you take the photo.",
          "Crop each photo so that only the page shows.",
        ],
      },
      {
        heading: "Create the PDF",
        steps: [
          "Open JPG to PDF.",
          "Select the images in page order.",
          "Select Create PDF and download the file.",
          "Open the PDF and read one page to confirm the text is clear.",
        ],
      },
      {
        heading: "If the PDF is too large",
        paragraphs: [
          "A PDF is about as large as the images inside it. Make each photo smaller with the Image Compressor, then create the PDF again. Check that small text is still readable.",
        ],
      },
    ],
  }),
  article({
    id: "check-age-limit",
    slug: "check-age-limit-for-exam-form",
    title: "How to Check Your Age Limit for an Exam Form",
    description:
      "Work out your exact age on the cut-off date in your exam notification, and avoid the most common eligibility mistake.",
    relatedToolIds: ["age-calculator", "date-difference-calculator"],
    relatedArticleIds: ["resize-photo-signature-form"],
    sections: [
      {
        heading: "Your age on the cut-off date is what counts",
        paragraphs: [
          "Eligibility is normally checked on a date fixed in the notification, not on the day you apply. Calculating your age for today can give the wrong answer.",
        ],
      },
      {
        heading: "Check it in three steps",
        steps: [
          "Find the cut-off date and the minimum and maximum age in the official notification.",
          "Open the Age Calculator and enter your date of birth exactly as it appears on your certificate.",
          "Enter the cut-off date as the second date, then compare the result with the limits.",
        ],
      },
      {
        heading: "Age relaxation",
        paragraphs: [
          "Some candidates may get extra years under the notification’s rules. These rules differ between exams, so read that section carefully and rely only on the official text.",
        ],
      },
    ],
  }),
  article({
    id: "pratishat-kaise-nikale",
    locale: "hi",
    slug: "pratishat-kaise-nikale",
    title: "प्रतिशत कैसे निकालें – आसान फ़ॉर्मूला और उदाहरण",
    description:
      "प्रतिशत निकालने का आसान फ़ॉर्मूला सीखें और उदाहरणों से समझें कि अंकों, छूट और बढ़ोतरी का प्रतिशत कैसे निकालते हैं।",
    relatedToolIds: ["percentage-calculator"],
    relatedArticleIds: [],
    toolLinks: [
      {
        href: "/tools/calculators/percentage-calculator",
        label: "प्रतिशत कैलकुलेटर",
      },
      { href: "/hi/tools/age-calculator", label: "आयु कैलकुलेटर" },
    ],
    sections: [
      {
        heading: "प्रतिशत का फ़ॉर्मूला",
        paragraphs: [
          "प्रतिशत = (प्राप्त संख्या ÷ कुल संख्या) × 100। प्रतिशत का अर्थ है “हर 100 में से कितना”।",
        ],
      },
      {
        heading: "अंकों का प्रतिशत कैसे निकालें",
        paragraphs: [
          "मान लीजिए आपको 500 में से 450 अंक मिले। 450 ÷ 500 = 0.9 और 0.9 × 100 = 90। यानी आपके 90% अंक हैं।",
          "कई विषयों का कुल प्रतिशत निकालने के लिए सभी विषयों के प्राप्त अंक जोड़ें, फिर सभी के अधिकतम अंक जोड़ें और यही फ़ॉर्मूला लगाएँ।",
        ],
      },
      {
        heading: "किसी संख्या का प्रतिशत कैसे निकालें",
        paragraphs: [
          "संख्या को प्रतिशत से गुणा करें और 100 से भाग दें। उदाहरण: 200 का 15% = 200 × 15 ÷ 100 = 30।",
        ],
      },
      {
        heading: "बढ़ोतरी या कमी का प्रतिशत",
        paragraphs: [
          "बदलाव ÷ पुरानी संख्या × 100। उदाहरण: दाम 400 से बढ़कर 500 रुपये हुआ। बदलाव 100 है, इसलिए 100 ÷ 400 × 100 = 25% बढ़ोतरी।",
        ],
      },
      {
        heading: "आम गलती",
        paragraphs: [
          "बढ़ोतरी निकालते समय नई संख्या से नहीं, बल्कि पुरानी संख्या से भाग दें।",
        ],
      },
    ],
  }),
  article({
    id: "photo-ka-size-kaise-kam-kare",
    locale: "hi",
    slug: "photo-ka-size-kaise-kam-kare",
    title: "फोटो का साइज़ KB में कैसे कम करें",
    description:
      "मोबाइल की फोटो को ऑनलाइन फ़ॉर्म के लिए 20 KB, 50 KB या 100 KB तक छोटा करने का आसान तरीका।",
    relatedToolIds: ["photo-signature-resizer", "form-ready-kit"],
    relatedArticleIds: [],
    toolLinks: [
      { href: "/hi/tools/form-ready-kit", label: "फ़ॉर्म रेडी किट" },
      { href: "/tools/image/photo-resizer-50kb", label: "Photo Resizer 50 KB" },
      { href: "/tools/image/photo-resizer-20kb", label: "Photo Resizer 20 KB" },
    ],
    sections: [
      {
        heading: "KB और पिक्सेल में क्या अंतर है",
        paragraphs: [
          "पिक्सेल फोटो की चौड़ाई और ऊँचाई बताते हैं। KB बताता है कि फ़ाइल कितनी जगह लेती है। ऑनलाइन फ़ॉर्म इन दोनों की जाँच कर सकता है।",
        ],
      },
      {
        heading: "फोटो का साइज़ कम करने के स्टेप",
        steps: [
          "अधिसूचना में फोटो की KB और पिक्सेल सीमा देखें।",
          "फ़ॉर्म रेडी किट खोलें और अपनी फोटो चुनें।",
          "वही सीमाएँ भरें और “मेरी फ़ाइलें तैयार करें” चुनें।",
          "फोटो खोलकर देखें कि वह साफ़ दिख रही है, फिर डाउनलोड करें।",
        ],
      },
      {
        heading: "फोटो धुंधली दिखे तो क्या करें",
        paragraphs: [
          "सादे बैकग्राउंड और अच्छी रोशनी में फोटो लें और चेहरे के पास तक क्रॉप करें। इससे कम KB में भी फोटो ज़्यादा साफ़ रहती है।",
        ],
      },
      {
        heading: "क्या फोटो अपलोड होती है?",
        paragraphs: [
          "नहीं। हमारे टूल आपके ब्राउज़र में काम करते हैं, इसलिए आपकी फोटो आपके डिवाइस पर ही रहती है।",
        ],
      },
    ],
  }),
];
