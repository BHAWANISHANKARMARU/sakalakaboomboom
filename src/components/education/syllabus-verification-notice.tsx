import type { VerifiedSource } from "@/types/education";

export function SyllabusVerificationNotice({
  source,
  locale,
}: {
  source: VerifiedSource;
  locale: "en" | "hi";
}) {
  return (
    <aside
      className="syllabus-notice"
      aria-label={
        locale === "hi" ? "पाठ्यक्रम सत्यापन" : "Syllabus verification"
      }
    >
      <span aria-hidden="true">✓</span>
      <div>
        <strong>
          {locale === "hi"
            ? "आधिकारिक स्रोत से सत्यापित"
            : "Verified against an official source"}
        </strong>
        <p>
          {locale === "hi"
            ? `शैक्षणिक सत्र ${source.academicSession} · ${source.verifiedAt} को जाँचा गया`
            : `Academic session ${source.academicSession} · Checked ${source.verifiedAt}`}
        </p>
        <a href={source.url} target="_blank" rel="noreferrer">
          {source.label}
        </a>
      </div>
    </aside>
  );
}
