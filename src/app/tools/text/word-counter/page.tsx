import type { Metadata } from "next";
import { ToolLayout } from "@/components/tools/tool-layout";
import { RelatedTools } from "@/components/tools/related-tools";
import { WordCounter } from "@/features/word-counter/word-counter";
import { buildPageMetadata } from "@/lib/seo/metadata";
export const metadata: Metadata = buildPageMetadata({
  title: "Word Counter",
  description: "Count words, characters, sentences and reading time instantly.",
  path: "/tools/text/word-counter",
});
export default function Page() {
  return (
    <ToolLayout
      title="Word Counter"
      description="Count words, characters, sentences and reading time as you type."
      category="Text"
    >
      <WordCounter />
      <RelatedTools toolId="word-counter" />
    </ToolLayout>
  );
}
