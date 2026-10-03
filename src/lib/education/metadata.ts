import type { Locale } from "@/types/content";
import { buildPageMetadata } from "@/lib/seo/metadata";
import {
  getBookDirectory,
  getClassDirectory,
  getPublishedLesson,
  getSubjectDirectory,
} from "./repository";

const prefix = (locale: Locale) => (locale === "hi" ? "/hi" : "");
const localizedAlternates = (
  englishPath: string,
  hasEnglish = true,
  hasHindi = true,
) => ({
  ...(hasEnglish ? { en: englishPath } : {}),
  ...(hasHindi ? { hi: `/hi${englishPath}` } : {}),
  "x-default": hasEnglish ? englishPath : `/hi${englishPath}`,
});

export const getEducationLandingMetadata = (locale: Locale) => {
  const path = `${prefix(locale)}/education`;
  return buildPageMetadata({
    title:
      locale === "hi"
        ? "कक्षा 9 से 12 अध्ययन सामग्री"
        : "Class 9 to 12 Study Resources",
    description:
      locale === "hi"
        ? "कक्षा 9 से 12 के लिए आसान हिंदी में सत्यापित विषय और मौलिक अध्याय गाइड।"
        : "Verified Class 9 to 12 subject directories and original, easy chapter guides for Indian students.",
    path,
    languageAlternates: localizedAlternates("/education"),
  });
};

export const getClassMetadata = (classSlug: string, locale: Locale) => {
  const record = getClassDirectory(classSlug, locale);
  if (!record) return {};
  const path = `/education/${classSlug}`;
  return buildPageMetadata({
    title: `${record.title} Subjects and Chapters`,
    description: record.description,
    path: `${prefix(locale)}${path}`,
    languageAlternates: localizedAlternates(path),
  });
};

export const getSubjectMetadata = (
  classSlug: string,
  subjectSlug: string,
  locale: Locale,
) => {
  const subject = getSubjectDirectory(classSlug, subjectSlug, locale);
  if (!subject) return {};
  const path = `/education/${classSlug}/${subjectSlug}`;
  return buildPageMetadata({
    title: `${subject.title} Chapters and Study Guides`,
    description: subject.description,
    path: `${prefix(locale)}${path}`,
    noIndex: subject.books.length === 0,
    languageAlternates: localizedAlternates(path),
  });
};

export const getBookMetadata = (
  classSlug: string,
  subjectSlug: string,
  bookSlug: string,
  locale: Locale,
) => {
  const book = getBookDirectory(classSlug, subjectSlug, bookSlug, locale);
  if (!book) return {};
  const path = `/education/${classSlug}/${subjectSlug}/${bookSlug}`;
  return buildPageMetadata({
    title: `${book.title} Chapters`,
    description: book.description,
    path: `${prefix(locale)}${path}`,
    languageAlternates: localizedAlternates(path),
  });
};

export const getLessonMetadata = (
  classSlug: string,
  subjectSlug: string,
  bookSlug: string,
  chapterSlug: string,
  locale: Locale,
) => {
  const result = getPublishedLesson(
    classSlug,
    subjectSlug,
    bookSlug,
    chapterSlug,
    locale,
  );
  if (!result) return {};
  const path = `/education/${classSlug}/${subjectSlug}/${bookSlug}/${chapterSlug}`;
  const hasEnglish = Boolean(
    getPublishedLesson(classSlug, subjectSlug, bookSlug, chapterSlug, "en"),
  );
  const hasHindi = Boolean(
    getPublishedLesson(classSlug, subjectSlug, bookSlug, chapterSlug, "hi"),
  );
  return buildPageMetadata({
    title: result.lesson.title,
    description: result.lesson.description,
    path: `${prefix(locale)}${path}`,
    languageAlternates: localizedAlternates(path, hasEnglish, hasHindi),
  });
};
