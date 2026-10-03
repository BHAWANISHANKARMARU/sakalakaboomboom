import Link from "next/link";
import type { Locale } from "@/types/content";
import type { ResolvedEducationSubject } from "@/types/education";

export function SubjectDirectory({
  subject,
  classSlug,
  locale,
}: {
  subject: ResolvedEducationSubject;
  classSlug: string;
  locale: Locale;
}) {
  const prefix = locale === "hi" ? "/hi" : "";
  if (!subject.books.length)
    return (
      <div className="education-empty">
        <strong>
          {locale === "hi"
            ? "अध्याय सामग्री की समीक्षा चल रही है"
            : "Chapter material is under review"}
        </strong>
        <p>
          {locale === "hi"
            ? "सत्यापित पुस्तक और अध्याय सूची तैयार होने के बाद यहाँ प्रकाशित होगी।"
            : "The verified book and chapter list will appear here after editorial review."}
        </p>
      </div>
    );
  return (
    <section className="education-section">
      <h2>{locale === "hi" ? "पुस्तक और अध्याय" : "Books and chapters"}</h2>
      <div className="education-card-grid">
        {subject.books.map((book) => (
          <Link
            className="education-card"
            href={`${prefix}/education/${classSlug}/${subject.slug}/${book.slug}`}
            key={book.id}
          >
            <h3>{book.title}</h3>
            <p>{book.description}</p>
            <span>
              {book.chapters.length}{" "}
              {locale === "hi" ? "अध्याय →" : "chapters →"}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
