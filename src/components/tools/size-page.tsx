import type { Metadata } from "next";
import { ToolLayout } from "@/components/tools/tool-layout";
import { SizeLinks } from "@/components/tools/size-links";
import { sizePagePath, type SizePage } from "@/content/size-pages";
import { PdfCompressor } from "@/features/pdf-compressor/pdf-compressor";
import { TargetResizer } from "@/features/photo-resizer/target-resizer";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const sizePageMetadata = (page: SizePage): Metadata =>
  buildPageMetadata({
    title: page.seoTitle,
    description: page.metaDescription,
    path: sizePagePath(page),
  });

export function SizePageView({ page }: { page: SizePage }) {
  const isImage = page.kind === "image";
  return (
    <ToolLayout
      title={page.title}
      description={page.intro}
      category={isImage ? "Image" : "PDF"}
      path={sizePagePath(page)}
      details={
        <div className="grid gap-5">
          <ol className="list-decimal space-y-2 pl-5">
            <li>Choose your {isImage ? "photo" : "PDF"}.</li>
            <li>Keep the {page.label} target, or enter your own limit.</li>
            <li>
              Select {isImage ? "Resize photo" : "Reduce PDF size"}, check the
              result, then download it.
            </li>
          </ol>
          <h2>When to use {page.label}</h2>
          <p>{page.useFor}</p>
          <h2>Tip</h2>
          <p>{page.tip}</p>
          {!isImage ? (
            <>
              <h2>Good to know</h2>
              <p>
                To save space, pages are turned into images. Keep your original
                PDF, because text in the new file cannot be selected.
              </p>
            </>
          ) : null}
          <h2>Frequently asked questions</h2>
          {page.faqs.map((faq) => (
            <div key={faq.question}>
              <h3>{faq.question}</h3>
              <p>{faq.answer}</p>
            </div>
          ))}
          <SizeLinks kind={page.kind} current={page.slug} />
        </div>
      }
    >
      {isImage ? (
        <TargetResizer targetKb={page.targetKb} />
      ) : (
        <PdfCompressor targetKb={page.targetKb} />
      )}
    </ToolLayout>
  );
}
