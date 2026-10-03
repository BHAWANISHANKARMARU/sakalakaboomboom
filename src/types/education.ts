import type { Locale, LocalizedText, PublicationStatus } from "@/types/content";

export type EducationStream = "science" | "commerce" | "humanities";

export type VerifiedSource = {
  label: string;
  url: string;
  academicSession: "2026-27";
  verifiedAt: string;
};

export type EducationClass = {
  id: string;
  slug: `class-${9 | 10 | 11 | 12}`;
  grade: 9 | 10 | 11 | 12;
  title: LocalizedText;
  description: LocalizedText;
  status: PublicationStatus;
  source: VerifiedSource;
};

export type EducationSubject = {
  id: string;
  slug: string;
  classId: string;
  streams?: EducationStream[];
  title: LocalizedText;
  description: LocalizedText;
  status: PublicationStatus;
  order: number;
  source: VerifiedSource;
};

export type EducationBook = {
  id: string;
  slug: string;
  subjectId: string;
  title: LocalizedText;
  description: LocalizedText;
  status: PublicationStatus;
  source: VerifiedSource;
};

export type EducationChapter = {
  id: string;
  slug: string;
  bookId: string;
  order: number;
  title: LocalizedText;
  status: PublicationStatus;
  source: VerifiedSource;
};

export type LessonSection = {
  heading: string;
  paragraphs: string[];
  example?: { label: string; problem: string; solution: string };
};

export type LessonQuestion = {
  question: string;
  answer: string;
  explanation?: string;
  difficulty: "basic" | "standard" | "challenge";
};

export type ChapterLesson = {
  id: string;
  chapterId: string;
  locale: Locale;
  title: string;
  description: string;
  status: PublicationStatus;
  searchIntent: string;
  prerequisites: string[];
  learningObjectives: string[];
  sections: LessonSection[];
  keyTerms: Array<{ term: string; meaning: string }>;
  commonMistakes: string[];
  revisionPoints: string[];
  questions: LessonQuestion[];
  reviewedAt: string;
  updatedAt: string;
};

export type ResolvedEducationClass = Omit<
  EducationClass,
  "title" | "description"
> & {
  title: string;
  description: string;
  subjects: ResolvedEducationSubject[];
};

export type ResolvedEducationSubject = Omit<
  EducationSubject,
  "title" | "description"
> & { title: string; description: string; books: ResolvedEducationBook[] };

export type ResolvedEducationBook = Omit<
  EducationBook,
  "title" | "description"
> & {
  title: string;
  description: string;
  chapters: ResolvedEducationChapter[];
};

export type ResolvedEducationChapter = Omit<EducationChapter, "title"> & {
  title: string;
  hasLesson: boolean;
};
