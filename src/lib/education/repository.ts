import {
  educationBooks,
  educationChapters,
  educationClasses,
  educationSubjects,
} from "@/content/education/catalog";
import { chapterLessons } from "@/content/education/lessons";
import type { Locale } from "@/types/content";
import type {
  ResolvedEducationBook,
  ResolvedEducationChapter,
  ResolvedEducationClass,
  ResolvedEducationSubject,
} from "@/types/education";

const text = (value: { en: string; hi?: string }, locale: Locale) =>
  value[locale] ?? value.en;

const resolveChapter = (
  chapter: (typeof educationChapters)[number],
  locale: Locale,
): ResolvedEducationChapter => ({
  ...chapter,
  title: text(chapter.title, locale),
  hasLesson: chapterLessons.some(
    (lesson) =>
      lesson.chapterId === chapter.id &&
      lesson.locale === locale &&
      lesson.status === "published",
  ),
});

const resolveBook = (
  book: (typeof educationBooks)[number],
  locale: Locale,
): ResolvedEducationBook => ({
  ...book,
  title: text(book.title, locale),
  description: text(book.description, locale),
  chapters: educationChapters
    .filter((chapter) => chapter.bookId === book.id)
    .sort((a, b) => a.order - b.order)
    .map((chapter) => resolveChapter(chapter, locale)),
});

const resolveSubject = (
  subject: (typeof educationSubjects)[number],
  locale: Locale,
): ResolvedEducationSubject => ({
  ...subject,
  title: text(subject.title, locale),
  description: text(subject.description, locale),
  books: educationBooks
    .filter(
      (book) => book.subjectId === subject.id && book.status === "published",
    )
    .map((book) => resolveBook(book, locale)),
});

export const getClassDirectory = (
  classSlug: string,
  locale: Locale,
): ResolvedEducationClass | undefined => {
  const record = educationClasses.find(
    (item) => item.slug === classSlug && item.status === "published",
  );
  if (!record) return undefined;
  return {
    ...record,
    title: text(record.title, locale),
    description: text(record.description, locale),
    subjects: educationSubjects
      .filter(
        (subject) =>
          subject.classId === record.id && subject.status === "published",
      )
      .sort((a, b) => a.order - b.order)
      .map((subject) => resolveSubject(subject, locale)),
  };
};

export const getSubjectDirectory = (
  classSlug: string,
  subjectSlug: string,
  locale: Locale,
) => {
  const classRecord = educationClasses.find(
    (item) => item.slug === classSlug && item.status === "published",
  );
  const subject = educationSubjects.find(
    (item) =>
      item.classId === classRecord?.id &&
      item.slug === subjectSlug &&
      item.status === "published",
  );
  return subject ? resolveSubject(subject, locale) : undefined;
};

export const getBookDirectory = (
  classSlug: string,
  subjectSlug: string,
  bookSlug: string,
  locale: Locale,
) => {
  const subject = getSubjectDirectory(classSlug, subjectSlug, locale);
  const book = educationBooks.find(
    (item) =>
      item.subjectId === subject?.id &&
      item.slug === bookSlug &&
      item.status === "published",
  );
  return book ? resolveBook(book, locale) : undefined;
};

export const getPublishedLesson = (
  classSlug: string,
  subjectSlug: string,
  bookSlug: string,
  chapterSlug: string,
  locale: Locale,
) => {
  const book = getBookDirectory(classSlug, subjectSlug, bookSlug, locale);
  const chapter = book?.chapters.find((item) => item.slug === chapterSlug);
  const lesson = chapterLessons.find(
    (item) =>
      item.chapterId === chapter?.id &&
      item.locale === locale &&
      item.status === "published",
  );
  const subject = getSubjectDirectory(classSlug, subjectSlug, locale);
  const classRecord = getClassDirectory(classSlug, locale);
  if (!lesson || !chapter || !book || !subject || !classRecord)
    return undefined;
  return { ...lesson, lesson, chapter, book, subject, classRecord };
};

export const getPublishedLessonParams = (locale: Locale) =>
  chapterLessons
    .filter(
      (lesson) => lesson.locale === locale && lesson.status === "published",
    )
    .flatMap((lesson) => {
      const chapter = educationChapters.find(
        (item) => item.id === lesson.chapterId,
      );
      const book = educationBooks.find((item) => item.id === chapter?.bookId);
      const subject = educationSubjects.find(
        (item) => item.id === book?.subjectId,
      );
      const classRecord = educationClasses.find(
        (item) => item.id === subject?.classId,
      );
      return chapter && book && subject && classRecord
        ? [
            {
              classSlug: classRecord.slug,
              subjectSlug: subject.slug,
              bookSlug: book.slug,
              chapterSlug: chapter.slug,
            },
          ]
        : [];
    });

export const getEducationSearchRecords = (locale: Locale) =>
  getPublishedLessonParams(locale).map((params) => {
    const result = getPublishedLesson(
      params.classSlug,
      params.subjectSlug,
      params.bookSlug,
      params.chapterSlug,
      locale,
    )!;
    const prefix = locale === "hi" ? "/hi" : "";
    return {
      title: result.lesson.title,
      description: result.lesson.description,
      category: `${result.classRecord.title} · ${result.subject.title}`,
      url: `${prefix}/education/${params.classSlug}/${params.subjectSlug}/${params.bookSlug}/${params.chapterSlug}`,
      terms:
        `${result.lesson.title} ${result.lesson.description} ${result.subject.title}`.toLowerCase(),
      updatedAt: result.lesson.updatedAt,
    };
  });

export const getEducationClassParams = () =>
  educationClasses
    .filter((item) => item.status === "published")
    .map((item) => ({ classSlug: item.slug }));
export const getEducationSubjectParams = () =>
  educationSubjects
    .filter((item) => item.status === "published")
    .map((subject) => ({
      classSlug: educationClasses.find((item) => item.id === subject.classId)!
        .slug,
      subjectSlug: subject.slug,
    }));
export const getEducationBookParams = () =>
  educationBooks
    .filter((item) => item.status === "published")
    .map((book) => {
      const subject = educationSubjects.find(
        (item) => item.id === book.subjectId,
      )!;
      return {
        classSlug: educationClasses.find((item) => item.id === subject.classId)!
          .slug,
        subjectSlug: subject.slug,
        bookSlug: book.slug,
      };
    });
