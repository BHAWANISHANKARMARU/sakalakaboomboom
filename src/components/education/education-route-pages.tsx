import { notFound } from "next/navigation";
import { BookChapterList } from "./book-chapter-list";
import { ChapterLessonLayout } from "./chapter-lesson-layout";
import { ClassDirectory } from "./class-directory";
import { EducationPageShell } from "./education-page-shell";
import { SubjectDirectory } from "./subject-directory";
import { SyllabusVerificationNotice } from "./syllabus-verification-notice";
import {
  getBookDirectory,
  getClassDirectory,
  getPublishedLesson,
  getSubjectDirectory,
} from "@/lib/education/repository";
import type { Locale } from "@/types/content";

const localePrefix = (locale: Locale) => (locale === "hi" ? "/hi" : "");

export function EducationClassPage({
  classSlug,
  locale,
}: {
  classSlug: string;
  locale: Locale;
}) {
  const record = getClassDirectory(classSlug, locale);
  if (!record) notFound();
  const prefix = localePrefix(locale);
  return (
    <EducationPageShell
      title={record.title}
      description={record.description}
      locale={locale}
      englishPath={`/education/${classSlug}`}
      hindiPath={`/hi/education/${classSlug}`}
      breadcrumbs={[
        { label: locale === "hi" ? "होम" : "Home", href: "/" },
        {
          label: locale === "hi" ? "शिक्षा" : "Education",
          href: `${prefix}/education`,
        },
        { label: record.title },
      ]}
    >
      <SyllabusVerificationNotice source={record.source} locale={locale} />
      <ClassDirectory record={record} locale={locale} />
    </EducationPageShell>
  );
}

export function EducationSubjectPage({
  classSlug,
  subjectSlug,
  locale,
}: {
  classSlug: string;
  subjectSlug: string;
  locale: Locale;
}) {
  const classRecord = getClassDirectory(classSlug, locale);
  const subject = getSubjectDirectory(classSlug, subjectSlug, locale);
  if (!classRecord || !subject) notFound();
  const prefix = localePrefix(locale);
  return (
    <EducationPageShell
      title={`${subject.title} · ${classRecord.title}`}
      description={subject.description}
      locale={locale}
      englishPath={`/education/${classSlug}/${subjectSlug}`}
      hindiPath={`/hi/education/${classSlug}/${subjectSlug}`}
      breadcrumbs={[
        {
          label: locale === "hi" ? "शिक्षा" : "Education",
          href: `${prefix}/education`,
        },
        { label: classRecord.title, href: `${prefix}/education/${classSlug}` },
        { label: subject.title },
      ]}
    >
      <SyllabusVerificationNotice source={subject.source} locale={locale} />
      <SubjectDirectory
        subject={subject}
        classSlug={classSlug}
        locale={locale}
      />
    </EducationPageShell>
  );
}

export function EducationBookPage({
  classSlug,
  subjectSlug,
  bookSlug,
  locale,
}: {
  classSlug: string;
  subjectSlug: string;
  bookSlug: string;
  locale: Locale;
}) {
  const classRecord = getClassDirectory(classSlug, locale);
  const subject = getSubjectDirectory(classSlug, subjectSlug, locale);
  const book = getBookDirectory(classSlug, subjectSlug, bookSlug, locale);
  if (!classRecord || !subject || !book) notFound();
  const prefix = localePrefix(locale);
  const basePath = `${prefix}/education/${classSlug}/${subjectSlug}/${bookSlug}`;
  return (
    <EducationPageShell
      title={book.title}
      description={book.description}
      locale={locale}
      englishPath={`/education/${classSlug}/${subjectSlug}/${bookSlug}`}
      hindiPath={`/hi/education/${classSlug}/${subjectSlug}/${bookSlug}`}
      breadcrumbs={[
        { label: classRecord.title, href: `${prefix}/education/${classSlug}` },
        {
          label: subject.title,
          href: `${prefix}/education/${classSlug}/${subjectSlug}`,
        },
        { label: book.title },
      ]}
    >
      <SyllabusVerificationNotice source={book.source} locale={locale} />
      <section className="education-section">
        <h2>{locale === "hi" ? "अध्याय सूची" : "Chapter list"}</h2>
        <BookChapterList book={book} basePath={basePath} locale={locale} />
      </section>
    </EducationPageShell>
  );
}

export function EducationLessonPage({
  classSlug,
  subjectSlug,
  bookSlug,
  chapterSlug,
  locale,
}: {
  classSlug: string;
  subjectSlug: string;
  bookSlug: string;
  chapterSlug: string;
  locale: Locale;
}) {
  const result = getPublishedLesson(
    classSlug,
    subjectSlug,
    bookSlug,
    chapterSlug,
    locale,
  );
  if (!result) notFound();
  return <ChapterLessonLayout result={result} locale={locale} />;
}
