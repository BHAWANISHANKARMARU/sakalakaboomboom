import type {
  ChapterLesson,
  EducationBook,
  EducationChapter,
  EducationClass,
  EducationSubject,
} from "@/types/education";

type EducationContent = {
  classes: EducationClass[];
  subjects: EducationSubject[];
  books: EducationBook[];
  chapters: EducationChapter[];
  lessons: ChapterLesson[];
};

const duplicateMessages = <T>(
  items: T[],
  key: (item: T) => string,
  label: (item: T) => string,
) => {
  const seen = new Set<string>();
  const errors: string[] = [];
  for (const item of items) {
    const value = key(item);
    if (seen.has(value)) errors.push(label(item));
    seen.add(value);
  }
  return errors;
};

export function validateEducationContent(content: EducationContent): string[] {
  const errors: string[] = [];
  errors.push(
    ...duplicateMessages(
      content.subjects,
      (item) => `${item.classId}/${item.slug}`,
      (item) => `Duplicate subject slug ${item.classId}/${item.slug}`,
    ),
    ...duplicateMessages(
      content.books,
      (item) => `${item.subjectId}/${item.slug}`,
      (item) => `Duplicate book slug ${item.subjectId}/${item.slug}`,
    ),
    ...duplicateMessages(
      content.chapters,
      (item) => `${item.bookId}/${item.slug}`,
      (item) => `Duplicate chapter slug ${item.bookId}/${item.slug}`,
    ),
  );

  const classIds = new Set(content.classes.map((item) => item.id));
  const subjectIds = new Set(content.subjects.map((item) => item.id));
  const bookIds = new Set(content.books.map((item) => item.id));
  const chapterIds = new Set(content.chapters.map((item) => item.id));

  for (const subject of content.subjects) {
    if (!classIds.has(subject.classId))
      errors.push(
        `Subject ${subject.id} references missing class ${subject.classId}`,
      );
  }
  for (const book of content.books) {
    if (!subjectIds.has(book.subjectId))
      errors.push(
        `Book ${book.id} references missing subject ${book.subjectId}`,
      );
  }
  for (const chapter of content.chapters) {
    if (!bookIds.has(chapter.bookId))
      errors.push(
        `Chapter ${chapter.id} references missing book ${chapter.bookId}`,
      );
  }
  for (const lesson of content.lessons) {
    if (!chapterIds.has(lesson.chapterId))
      errors.push(
        `Lesson ${lesson.id} references missing chapter ${lesson.chapterId}`,
      );
    if (
      lesson.status === "published" &&
      (!lesson.title.trim() ||
        !lesson.description.trim() ||
        !lesson.searchIntent.trim() ||
        lesson.sections.length === 0 ||
        lesson.questions.length === 0 ||
        !lesson.reviewedAt ||
        !lesson.updatedAt)
    ) {
      errors.push(`Published lesson ${lesson.id} is missing required content`);
    }
  }

  return errors;
}
