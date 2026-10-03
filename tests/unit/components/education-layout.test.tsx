import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { BookChapterList } from "@/components/education/book-chapter-list";
import { ChapterLessonLayout } from "@/components/education/chapter-lesson-layout";
import {
  getBookDirectory,
  getPublishedLesson,
} from "@/lib/education/repository";

describe("education layouts", () => {
  it("shows chapter availability without linking planned placeholders", () => {
    const book = getBookDirectory(
      "class-9",
      "mathematics",
      "mathematics-2026-27",
      "en",
    )!;
    render(
      <BookChapterList
        book={book}
        basePath="/education/class-9/mathematics/mathematics-2026-27"
      />,
    );
    expect(screen.getByRole("link", { name: /Number System/ })).toHaveAttribute(
      "href",
      expect.stringContaining("number-system"),
    );
    expect(
      screen.getByText("Sequences and Progressions").closest("a"),
    ).toBeNull();
    expect(screen.getAllByText("Lesson being prepared").length).toBeGreaterThan(
      0,
    );
  });

  it("renders a structured bilingual lesson with verification and language link", () => {
    const result = getPublishedLesson(
      "class-9",
      "mathematics",
      "mathematics-2026-27",
      "number-system",
      "en",
    )!;
    render(<ChapterLessonLayout result={result} locale="en" />);
    expect(
      screen.getByRole("heading", { level: 1, name: result.lesson.title }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "हिंदी में पढ़ें" }),
    ).toHaveAttribute("href", expect.stringMatching(/^\/hi\/education/));
    expect(
      screen.getByRole("heading", { name: "Questions and answers" }),
    ).toBeInTheDocument();
    expect(screen.getByText(/Verified against/)).toBeInTheDocument();
  });
});
