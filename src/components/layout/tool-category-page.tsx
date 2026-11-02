import { SectionIndex } from "./section-index";
import { CategoryCard } from "@/components/ui/category-card";
import { ResponsiveGrid } from "./responsive-grid";
import { StatusNotice } from "@/components/ui/status-notice";
import { sizePagePath, sizePages } from "@/content/size-pages";
import { getLiveTools } from "@/lib/content/registry";
import type { ToolCategory } from "@/types/content";
const categoryAbout: Partial<Record<ToolCategory, string>> = {
  pdf: "Most online forms limit how large a document can be, so these tools focus on that problem. Use the PDF Size Reducer when a file is over the limit, or JPG to PDF to turn phone photos into one document. The PDF Merger joins several files, and the PDF Page Extractor keeps only the pages you need. Your documents are processed in your browser, so private files such as marksheets and ID proofs are not uploaded to a server.",
  image:
    "Application forms often reject a photo because it is too large or the wrong shape. Use the Photo Resizer in KB when a form gives you exact limits, or the Form Ready Kit to prepare your photo, signature and documents together. The Image Compressor is useful when you only want a smaller file, and the converters switch between JPG and PNG. Every tool works in your browser, so your pictures stay on your device.",
  text: "These tools help with everyday writing and list tasks. Count words for an assignment, change text to upper or lower case, sort a list of names, or remove repeated lines. If you paste text from a PDF, the Whitespace Cleaner tidies extra spaces and blank lines. All of this runs in your browser, so nothing you type is sent to a server or saved after you leave the page.",
  web: "These tools help developers, students and anyone working on the web. Format and check JSON, encode text for URLs or Base64, create a QR code for a link, or generate a strong password. Because they run in your browser, your data stays on your device. That makes them safer for private data than tools that upload what you paste.",
  calculators:
    "These calculators cover common everyday sums in India. Check GST with the CGST and SGST split, estimate a loan EMI or SIP value, work out your exact age on a cut-off date, or find your marks percentage. Each calculator shows a worked example and the formula it uses. Financial results are estimates, so check the final figures with your bank, fund or an official source before you decide.",
};

export function ToolCategoryPage({
  category,
  title,
  description,
}: {
  category: ToolCategory;
  title: string;
  description: string;
}) {
  const list = getLiveTools("en").filter((tool) => tool.category === category);
  return (
    <SectionIndex title={title} description={description}>
      {categoryAbout[category] ? (
        <p className="text-muted mb-6 max-w-3xl">{categoryAbout[category]}</p>
      ) : null}
      {list.length ? (
        <ResponsiveGrid columns={2}>
          {list.map((tool) => (
            <CategoryCard
              key={tool.id}
              href={tool.url}
              title={tool.title}
              description={tool.description}
            />
          ))}
          {sizePages
            .filter((page) => page.kind === category)
            .map((page) => (
              <CategoryCard
                key={page.slug}
                href={sizePagePath(page)}
                title={page.title}
                description={page.intro}
              />
            ))}
        </ResponsiveGrid>
      ) : (
        <StatusNotice
          title="Tools are being tested"
          description="Tools in this category will appear here after functional and privacy review."
          tone="planned"
        />
      )}
    </SectionIndex>
  );
}
