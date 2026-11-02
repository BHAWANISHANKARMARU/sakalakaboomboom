export type SizePage = {
  kind: "image" | "pdf";
  slug: string;
  targetKb: number;
  label: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  intro: string;
  useFor: string;
  tip: string;
  faqs: { question: string; answer: string }[];
};

export const sizePages: SizePage[] = [
  {
    kind: "image",
    slug: "photo-resizer-20kb",
    targetKb: 20,
    label: "20 KB",
    title: "Photo Resizer to 20 KB",
    seoTitle: "Photo Resizer 20 KB – Reduce Photo to 20 KB",
    metaDescription:
      "Reduce a photo to under 20 KB in your browser. Free, with no sign up and no upload. Keeps the best quality that fits.",
    intro:
      "20 KB is a very small target, so the tool lowers both quality and pixel size until the photo fits.",
    useFor:
      "This size suits small photos and signatures on online forms. It does not suit detailed pictures.",
    tip: "A close crop on a plain background keeps a face clearer at 20 KB, because there is less detail to store.",
    faqs: [
      {
        question: "Why does my photo look soft at 20 KB?",
        answer:
          "A small file holds little detail. Crop closer, use a plain background, or use a higher KB limit if your form allows it.",
      },
      {
        question: "Will the result be exactly 20 KB?",
        answer:
          "It will be at or below 20 KB, usually a little under. If your form also has a minimum, check the size shown after resizing.",
      },
    ],
  },
  {
    kind: "image",
    slug: "photo-resizer-50kb",
    targetKb: 50,
    label: "50 KB",
    title: "Photo Resizer to 50 KB",
    seoTitle: "Photo Resizer 50 KB – Reduce Photo to 50 KB",
    metaDescription:
      "Reduce a photo to under 50 KB online for forms and applications. Free, in your browser, with no sign up and no upload.",
    intro:
      "50 KB keeps a passport-style photo reasonably clear. The tool finds the highest quality that stays within the limit.",
    useFor:
      "This is a common upper limit for photos on application forms, but always check your own form.",
    tip: "If your form gives a pixel size as well, use the Photo Resizer in KB, where you can set both.",
    faqs: [
      {
        question: "Can I reduce a phone photo to 50 KB?",
        answer:
          "Yes. Large photos are scaled down first if needed, so the result keeps as much quality as the limit allows.",
      },
      {
        question: "What format do I get?",
        answer: "You get a JPG file, which most forms accept.",
      },
    ],
  },
  {
    kind: "image",
    slug: "photo-resizer-100kb",
    targetKb: 100,
    label: "100 KB",
    title: "Photo Resizer to 100 KB",
    seoTitle: "Photo Resizer 100 KB – Reduce Photo to 100 KB",
    metaDescription:
      "Reduce a photo to under 100 KB without uploading it. Free tool for forms, email and websites, with good quality kept.",
    intro:
      "100 KB leaves enough room for a clear picture, so most photos keep good quality at this size.",
    useFor:
      "This size suits forms with a larger limit, email attachments and pictures on simple websites.",
    tip: "Photos with busy backgrounds use more KB. A simple background gives a sharper result at the same size.",
    faqs: [
      {
        question: "Will 100 KB look good on a phone?",
        answer:
          "Usually yes, because the photo keeps a practical pixel size at this limit.",
      },
      {
        question: "Is my photo uploaded?",
        answer: "No. It is resized in your browser, on your device.",
      },
    ],
  },
  {
    kind: "pdf",
    slug: "pdf-size-reducer-100kb",
    targetKb: 100,
    label: "100 KB",
    title: "PDF Size Reducer to 100 KB",
    seoTitle: "PDF Size Reducer 100 KB – Compress PDF to 100 KB",
    metaDescription:
      "Reduce a PDF to around 100 KB in your browser. Free, with no sign up and no upload. Best for one or two page documents.",
    intro:
      "100 KB is a tight limit. It works best for one or two pages, such as a single certificate.",
    useFor: "Use this for short documents on forms with small upload limits.",
    tip: "If the file stays too large, keep only the pages you need with the PDF Page Extractor first.",
    faqs: [
      {
        question: "Why can’t my PDF reach 100 KB?",
        answer:
          "Each page needs some space, so long documents may not fit. Remove pages or use a higher target if your form allows it.",
      },
      {
        question: "Will the text stay readable?",
        answer:
          "Open the result and check. Small text can become hard to read at very low sizes.",
      },
    ],
  },
  {
    kind: "pdf",
    slug: "pdf-size-reducer-200kb",
    targetKb: 200,
    label: "200 KB",
    title: "PDF Size Reducer to 200 KB",
    seoTitle: "PDF Size Reducer 200 KB – Compress PDF to 200 KB",
    metaDescription:
      "Reduce a PDF to under 200 KB for online forms. Free, works in your browser, with no sign up and no upload.",
    intro: "200 KB suits short documents such as certificates and marksheets.",
    useFor: "Use this when an application asks for a document under 200 KB.",
    tip: "Scanned PDFs usually shrink the most, because they are already pictures of pages.",
    faqs: [
      {
        question: "Can I still select text after reducing the size?",
        answer:
          "No. Pages are turned into images to save space, so text can no longer be selected or searched.",
      },
      {
        question: "Is my document uploaded?",
        answer: "No. It is processed in your browser, on your device.",
      },
    ],
  },
  {
    kind: "pdf",
    slug: "pdf-size-reducer-1mb",
    targetKb: 1024,
    label: "1 MB",
    title: "PDF Size Reducer to 1 MB",
    seoTitle: "PDF Size Reducer 1 MB – Compress PDF to 1 MB",
    metaDescription:
      "Reduce a large PDF to under 1 MB in your browser. Good for email and uploads. Free, with no sign up and no upload.",
    intro:
      "1 MB leaves room for several pages at readable quality, so it suits longer documents.",
    useFor: "Use this for email attachments and portal uploads.",
    tip: "A 1 MB target usually keeps text clearer than a very small target, so use the largest size your form allows.",
    faqs: [
      {
        question: "How many pages fit in 1 MB?",
        answer:
          "It depends on the pages. Plain text pages use less space than photos or coloured scans.",
      },
      {
        question: "Does this change my original file?",
        answer: "No. It creates a new PDF and leaves your original as it is.",
      },
    ],
  },
];

export const findSizePage = (kind: SizePage["kind"], slug: string) =>
  sizePages.find((page) => page.kind === kind && page.slug === slug);

export const sizePagePath = (page: SizePage) =>
  `/tools/${page.kind}/${page.slug}`;
