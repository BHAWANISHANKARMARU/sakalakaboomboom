import { PageContainer } from "@/components/layout/page-container";
import { EducationBreadcrumbs } from "./education-breadcrumbs";
import { LanguageSwitcher } from "./language-switcher";
import { SyllabusVerificationNotice } from "./syllabus-verification-notice";
import type { Locale } from "@/types/content";
import type { getPublishedLesson } from "@/lib/education/repository";

type LessonResult = NonNullable<ReturnType<typeof getPublishedLesson>>;

export function ChapterLessonLayout({
  result,
  locale,
}: {
  result: LessonResult;
  locale: Locale;
}) {
  const { lesson, chapter, book, subject, classRecord } = result;
  const prefix = locale === "hi" ? "/hi" : "";
  const base = `/education/${classRecord.slug}/${subject.slug}/${book.slug}/${chapter.slug}`;
  return (
    <main>
      <PageContainer className="education-page lesson-page">
        <EducationBreadcrumbs
          items={[
            { label: locale === "hi" ? "होम" : "Home", href: "/" },
            {
              label: locale === "hi" ? "शिक्षा" : "Education",
              href: `${prefix}/education`,
            },
            {
              label: classRecord.title,
              href: `${prefix}/education/${classRecord.slug}`,
            },
            {
              label: subject.title,
              href: `${prefix}/education/${classRecord.slug}/${subject.slug}`,
            },
            { label: chapter.title },
          ]}
        />
        <header className="lesson-header">
          <p className="eyebrow">
            {classRecord.title} · {subject.title}
          </p>
          <h1>{lesson.title}</h1>
          <p>{lesson.description}</p>
          <LanguageSwitcher
            locale={locale}
            englishPath={base}
            hindiPath={`/hi${base}`}
          />
        </header>
        <SyllabusVerificationNotice source={chapter.source} locale={locale} />
        <article className="lesson-content">
          <section className="lesson-summary">
            <h2>
              {locale === "hi"
                ? "इस अध्याय में आप सीखेंगे"
                : "What you will learn"}
            </h2>
            <ul>
              {lesson.learningObjectives.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
          {lesson.sections.map((section) => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {section.example ? (
                <div className="lesson-example">
                  <strong>{section.example.label}</strong>
                  <p>{section.example.problem}</p>
                  <p>
                    <b>{locale === "hi" ? "हल:" : "Solution:"}</b>{" "}
                    {section.example.solution}
                  </p>
                </div>
              ) : null}
            </section>
          ))}
          <section>
            <h2>{locale === "hi" ? "मुख्य शब्द" : "Key terms"}</h2>
            <dl className="key-terms">
              {lesson.keyTerms.map((item) => (
                <div key={item.term}>
                  <dt>{item.term}</dt>
                  <dd>{item.meaning}</dd>
                </div>
              ))}
            </dl>
          </section>
          <section>
            <h2>{locale === "hi" ? "सामान्य गलतियाँ" : "Common mistakes"}</h2>
            <ul>
              {lesson.commonMistakes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
          <section>
            <h2>
              {locale === "hi" ? "प्रश्न और उत्तर" : "Questions and answers"}
            </h2>
            <div className="question-list">
              {lesson.questions.map((item, index) => (
                <details key={item.question}>
                  <summary>
                    <span>{index + 1}.</span> {item.question}
                  </summary>
                  <div>
                    <p>
                      <b>{locale === "hi" ? "उत्तर:" : "Answer:"}</b>{" "}
                      {item.answer}
                    </p>
                    {item.explanation ? <p>{item.explanation}</p> : null}
                  </div>
                </details>
              ))}
            </div>
          </section>
          <section>
            <h2>
              {locale === "hi" ? "एक मिनट में दोहराएँ" : "One-minute revision"}
            </h2>
            <ul>
              {lesson.revisionPoints.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </article>
      </PageContainer>
    </main>
  );
}
