import { describe, expect, it } from "vitest";
import {
  getEducationClassParams,
  getEducationSubjectParams,
  getPublishedLessonParams,
} from "@/lib/education/repository";

describe("education route generation", () => {
  it("generates all four class directories and subject pages", () => {
    expect(getEducationClassParams().map((item) => item.classSlug)).toEqual([
      "class-9",
      "class-10",
      "class-11",
      "class-12",
    ]);
    expect(getEducationSubjectParams()).toContainEqual({
      classSlug: "class-12",
      subjectSlug: "accountancy",
    });
  });

  it("generates only published localized lesson routes", () => {
    expect(getPublishedLessonParams("en")).toHaveLength(2);
    expect(getPublishedLessonParams("hi")).toHaveLength(2);
    expect(
      getPublishedLessonParams("en").some(
        (item) => item.chapterSlug === "quadrilaterals",
      ),
    ).toBe(false);
  });
});
