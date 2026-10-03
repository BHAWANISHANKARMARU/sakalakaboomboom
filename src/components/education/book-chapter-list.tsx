import Link from "next/link";
import type { ResolvedEducationBook } from "@/types/education";

export function BookChapterList({
  book,
  basePath,
  locale = "en",
}: {
  book: ResolvedEducationBook;
  basePath: string;
  locale?: "en" | "hi";
}) {
  return (
    <ol className="chapter-list">
      {book.chapters.map((chapter) => (
        <li key={chapter.id}>
          <span className="chapter-number">
            {String(chapter.order).padStart(2, "0")}
          </span>
          <div>
            {chapter.hasLesson ? (
              <Link href={`${basePath}/${chapter.slug}`}>{chapter.title}</Link>
            ) : (
              <strong>{chapter.title}</strong>
            )}
            <small>
              {chapter.hasLesson
                ? locale === "hi"
                  ? "आसान गाइड और प्रश्न-उत्तर"
                  : "Easy guide and questions"
                : locale === "hi"
                  ? "पाठ तैयार किया जा रहा है"
                  : "Lesson being prepared"}
            </small>
          </div>
        </li>
      ))}
    </ol>
  );
}
