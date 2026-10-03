import { describe, expect, it } from "vitest";
import {
  getBookDirectory,
  getClassDirectory,
  getEducationSearchRecords,
  getPublishedLesson,
  getPublishedLessonParams,
  getSubjectDirectory,
} from "@/lib/education/repository";

describe("education repository", () => {
  it("resolves localized Class 9 directories", () => {
    expect(getClassDirectory("class-9", "en")?.title).toBe("Class 9");
    expect(getClassDirectory("class-9", "hi")?.title).toBe("कक्षा 9");
    expect(getClassDirectory("class-8", "en")).toBeUndefined();
  });

  it("keeps the verified Class 9 Mathematics chapter order", () => {
    const book = getBookDirectory(
      "class-9",
      "mathematics",
      "mathematics-2026-27",
      "en",
    );

    expect(book?.chapters.map((chapter) => chapter.title)).toEqual([
      "Number System",
      "Introduction to Polynomials",
      "Sequences and Progressions",
      "Exploring Algebraic Identities",
      "Linear Equations in Two Variables",
      "Coordinate Geometry",
      "Introduction to Euclid's Geometry",
      "Lines and Angles",
      "Triangles – Congruence Theorems",
      "Quadrilaterals",
      "Circles",
      "Area and Perimeter",
      "Surface Area and Volume",
      "Statistics and Probability",
    ]);
  });

  it("publishes only reviewed locale lessons", () => {
    expect(
      getPublishedLesson(
        "class-9",
        "mathematics",
        "mathematics-2026-27",
        "number-system",
        "hi",
      )?.title,
    ).toBe("संख्या पद्धति आसान भाषा में");
    expect(
      getPublishedLesson(
        "class-9",
        "mathematics",
        "mathematics-2026-27",
        "sequences-and-progressions",
        "en",
      ),
    ).toBeUndefined();
    expect(getPublishedLessonParams("en")).toHaveLength(2);
    expect(getPublishedLessonParams("hi")).toHaveLength(2);
  });

  it("resolves subjects and emits searchable published pages", () => {
    expect(getSubjectDirectory("class-9", "mathematics", "hi")?.title).toBe(
      "गणित",
    );
    const records = getEducationSearchRecords("en");
    expect(
      records.some((record) => record.url.endsWith("/number-system")),
    ).toBe(true);
    expect(
      records.some((record) =>
        record.url.endsWith("/sequences-and-progressions"),
      ),
    ).toBe(false);
  });
});
