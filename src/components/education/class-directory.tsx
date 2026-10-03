import Link from "next/link";
import type { Locale } from "@/types/content";
import type { ResolvedEducationClass } from "@/types/education";

export function ClassDirectory({
  record,
  locale,
}: {
  record: ResolvedEducationClass;
  locale: Locale;
}) {
  const prefix = locale === "hi" ? "/hi" : "";
  const groups =
    record.grade > 10 ? (["science", "commerce", "humanities"] as const) : [];
  return (
    <>
      {groups.map((stream) => {
        const subjects = record.subjects.filter((item) =>
          item.streams?.includes(stream),
        );
        return (
          <section className="education-section" key={stream}>
            <h2>
              {locale === "hi"
                ? {
                    science: "विज्ञान",
                    commerce: "वाणिज्य",
                    humanities: "मानविकी",
                  }[stream]
                : `${stream[0].toUpperCase()}${stream.slice(1)}`}
            </h2>
            <div className="education-card-grid">
              {subjects.map((subject) => (
                <Link
                  className="education-card"
                  href={`${prefix}/education/${record.slug}/${subject.slug}`}
                  key={subject.id}
                >
                  <h3>{subject.title}</h3>
                  <p>{subject.description}</p>
                  <span>
                    {locale === "hi" ? "विषय देखें →" : "View subject →"}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        );
      })}
      {record.grade <= 10 ? (
        <section className="education-section">
          <h2>{locale === "hi" ? "विषय चुनें" : "Choose a subject"}</h2>
          <div className="education-card-grid">
            {record.subjects.map((subject) => (
              <Link
                className="education-card"
                href={`${prefix}/education/${record.slug}/${subject.slug}`}
                key={subject.id}
              >
                <h3>{subject.title}</h3>
                <p>{subject.description}</p>
                <span>
                  {locale === "hi" ? "विषय देखें →" : "View subject →"}
                </span>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </>
  );
}
