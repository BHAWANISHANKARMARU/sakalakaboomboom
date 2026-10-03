import { describe, expect, it } from "vitest";
import {
  educationBooks,
  educationChapters,
  educationClasses,
  educationSubjects,
} from "@/content/education/catalog";
import { chapterLessons } from "@/content/education/lessons";
import { validateEducationContent } from "@/lib/education/validate";

const content = {
  classes: educationClasses,
  subjects: educationSubjects,
  books: educationBooks,
  chapters: educationChapters,
  lessons: chapterLessons,
};

describe("education content validation", () => {
  it("accepts the production catalog", () => {
    expect(validateEducationContent(content)).toEqual([]);
  });

  it("reports duplicate sibling slugs", () => {
    const duplicate = { ...educationSubjects[0], id: "duplicate-english" };
    expect(
      validateEducationContent({
        ...content,
        subjects: [...educationSubjects, duplicate],
      }),
    ).toContain("Duplicate subject slug class-9/english");
  });

  it("reports orphaned relationships", () => {
    const orphan = {
      ...educationBooks[0],
      id: "orphan-book",
      subjectId: "missing-subject",
    };
    expect(
      validateEducationContent({
        ...content,
        books: [...educationBooks, orphan],
      }),
    ).toContain("Book orphan-book references missing subject missing-subject");
  });

  it("reports incomplete published lessons", () => {
    const incomplete = {
      ...chapterLessons[0],
      id: "incomplete-lesson",
      description: "",
      locale: "hi" as const,
    };
    expect(
      validateEducationContent({
        ...content,
        lessons: [...chapterLessons, incomplete],
      }),
    ).toContain(
      "Published lesson incomplete-lesson is missing required content",
    );
  });
});
