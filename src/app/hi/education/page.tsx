import Link from "next/link";
import { EducationPageShell } from "@/components/education/education-page-shell";
import { getEducationLandingMetadata } from "@/lib/education/metadata";
import {
  getEducationClassParams,
  getClassDirectory,
} from "@/lib/education/repository";
export const metadata = getEducationLandingMetadata("hi");
export default function Page() {
  const classes = getEducationClassParams().map(({ classSlug }) =>
    getClassDirectory(classSlug, "hi")!,
  );
  return (
    <EducationPageShell
      title="कक्षा 9 से 12 अध्ययन सामग्री"
      description="आसान हिंदी में सत्यापित विषय, अध्याय गाइड और मौलिक प्रश्न-उत्तर।"
      locale="hi"
      englishPath="/education"
      hindiPath="/hi/education"
      breadcrumbs={[{ label: "होम", href: "/" }, { label: "शिक्षा" }]}
    >
      <section className="education-section">
        <h2>अपनी कक्षा चुनें</h2>
        <div className="education-card-grid">
          {classes.map((record) => (
            <Link
              className="education-card"
              href={`/hi/education/${record.slug}`}
              key={record.id}
            >
              <h3>{record.title}</h3>
              <p>{record.description}</p>
              <span>अध्ययन सामग्री देखें →</span>
            </Link>
          ))}
        </div>
      </section>
    </EducationPageShell>
  );
}
