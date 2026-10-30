import Link from "next/link";
import { PageContainer } from "@/components/layout/page-container";
import { getLiveTools } from "@/lib/content/registry";
import { getStaticPageMetadata } from "@/lib/seo/static-pages";
export const metadata = getStaticPageMetadata("/");

type ToolCard = {
  title: string;
  description: string;
  icon: string;
  tone: string;
  href: string;
};

const popularTools: ToolCard[] = [
  {
    title: "Form Ready Kit",
    description: "Photo, signature and PDF ready in one go",
    icon: "✓",
    tone: "blue",
    href: "/tools/image/form-ready-kit",
  },
  {
    title: "Photo and Signature Resizer",
    description: "Fit images to online form KB limits",
    icon: "KB",
    tone: "purple",
    href: "/tools/image/photo-signature-resizer",
  },
  {
    title: "PDF Merger",
    description: "Combine multiple PDF files into one",
    icon: "PDF",
    tone: "red",
    href: "/tools/pdf/pdf-merger",
  },
  {
    title: "JPG to PDF",
    description: "Convert JPG and PNG images into a PDF file",
    icon: "JPG",
    tone: "red",
    href: "/tools/pdf/jpg-to-pdf",
  },
  {
    title: "Image Compressor",
    description: "Compress JPG, PNG and WebP images",
    icon: "IMG",
    tone: "purple",
    href: "/tools/image/image-compressor",
  },
  {
    title: "Age Calculator",
    description: "Check your exact age on any date",
    icon: "AGE",
    tone: "teal",
    href: "/tools/calculators/age-calculator",
  },
  {
    title: "Percentage Calculator",
    description: "Work out marks and percentages",
    icon: "%",
    tone: "teal",
    href: "/tools/calculators/percentage-calculator",
  },
  {
    title: "Word Counter",
    description: "Count words, characters and reading time",
    icon: "T",
    tone: "green",
    href: "/tools/text/word-counter",
  },
  {
    title: "GST Calculator",
    description: "Add or remove GST from an amount",
    icon: "₹",
    tone: "teal",
    href: "/tools/calculators/gst-calculator",
  },
];

const categories = [
  ["PDF Tools", "pdf", "PDF", "red"],
  ["Image Tools", "image", "IMG", "purple"],
  ["Text Tools", "text", "T", "green"],
  ["Developer Tools", "web", "</>", "orange"],
  ["Calculator Tools", "calculators", "123", "teal"],
] as const;

const toolCount = (category: string) => {
  const count = getLiveTools("en").filter(
    (tool) => tool.category === category,
  ).length;
  return `${count} ${count === 1 ? "tool" : "tools"}`;
};

const education = [
  [
    "Class 9 Maths",
    "Number System and Polynomials explained simply",
    "9",
    "blue",
    "/education/class-9/mathematics/mathematics-2026-27",
  ],
  [
    "कक्षा 9 गणित",
    "आसान हिंदी में अध्याय गाइड",
    "हिं",
    "green",
    "/hi/education/class-9/mathematics/mathematics-2026-27",
  ],
] as const;

const faqs = [
  [
    "Are the tools on Sakalakaboomboom free?",
    "Yes. The available tools are free to use and do not require an account.",
  ],
  [
    "Are my files uploaded to a server?",
    "All current tools process your files in your browser. A tool will clearly tell you before any future server processing.",
  ],
  [
    "Can I use these tools on mobile?",
    "Yes. The interface is designed for phones, tablets and desktop computers.",
  ],
  [
    "Which image size do online forms accept?",
    "It differs between exams and years, so check your official notification. You can then enter those limits in the Photo and Signature Resizer.",
  ],
] as const;

function SectionTitle({
  title,
  href,
  linkLabel,
}: {
  title: string;
  href?: string;
  linkLabel?: string;
}) {
  return (
    <div className="home-section-title">
      <h2>{title}</h2>
      {href && linkLabel ? (
        <Link href={href}>
          {linkLabel} <span aria-hidden="true">→</span>
        </Link>
      ) : null}
    </div>
  );
}

function IconTile({ label, tone }: { label: string; tone: string }) {
  return (
    <span className={`home-icon home-icon-${tone}`} aria-hidden="true">
      {label}
    </span>
  );
}

function PopularToolCard({ tool }: { tool: ToolCard }) {
  return (
    <Link className="home-tool-card" href={tool.href}>
      <IconTile label={tool.icon} tone={tool.tone} />
      <span className="min-w-0">
        <span className="home-card-title">{tool.title}</span>
        <span className="home-card-copy">{tool.description}</span>
      </span>
      <span className="home-card-arrow" aria-hidden="true">
        →
      </span>
    </Link>
  );
}

export default function Home() {
  return (
    <main>
      <section className="home-hero">
        <PageContainer className="home-hero-inner">
          <p className="eyebrow">Free tools for students and everyone</p>
          <h1>
            Free Online Tools &amp; Study Resources <span>for India</span>
          </h1>
          <p className="home-hero-copy">
            Simple, fast and secure online tools for PDFs, images, text and
            everyday tasks—plus helpful resources for Indian students.
          </p>
          <p className="mt-5 mb-6 flex flex-wrap justify-center gap-3">
            <Link className="button" href="/tools/image/form-ready-kit">
              Get my form files ready
            </Link>
            <Link
              className="button secondary"
              href="/hi/tools/form-ready-kit"
              hrefLang="hi"
            >
              हिंदी में शुरू करें
            </Link>
          </p>
          <form action="/search" className="home-search">
            <label className="sr-only" htmlFor="home-search">
              Search tools and guides
            </label>
            <span aria-hidden="true">⌕</span>
            <input
              id="home-search"
              name="q"
              placeholder="Search tools, guides and study resources..."
            />
            <button type="submit">Search</button>
          </form>
          <div className="home-popular-searches" aria-label="Popular searches">
            <strong>Popular:</strong>
            {[
              "Form Ready Kit",
              "PDF Merger",
              "JPG to PDF",
              "Age Calculator",
            ].map((label) => (
              <span key={label}>{label}</span>
            ))}
          </div>
        </PageContainer>
      </section>

      <PageContainer className="home-content">
        <section>
          <SectionTitle
            title="Popular Tools"
            href="/tools"
            linkLabel="View All Tools"
          />
          <div className="home-tool-grid">
            {popularTools.map((tool) => (
              <PopularToolCard key={tool.title} tool={tool} />
            ))}
          </div>
        </section>

        <section>
          <SectionTitle title="Tools by Category" />
          <div className="home-category-grid">
            {categories.map(([title, category, icon, tone]) => (
              <Link
                className="home-category-card"
                href={`/tools/${category}`}
                key={title}
              >
                <IconTile label={icon} tone={tone} />
                <span className="home-card-title">{title}</span>
                <span className="home-card-copy">{toolCount(category)}</span>
                <span className="home-category-arrow" aria-hidden="true">
                  →
                </span>
              </Link>
            ))}
          </div>
        </section>
      </PageContainer>

      <section className="home-education-section">
        <PageContainer>
          <SectionTitle
            title="Student & Education Resources"
            href="/education"
            linkLabel="View Education"
          />
          <div className="home-education-grid">
            {education.map(([title, copy, icon, tone, href]) => (
              <Link
                className={`home-education-card home-education-${tone}`}
                href={href}
                key={title}
              >
                <IconTile label={icon} tone={tone} />
                <h3>{title}</h3>
                <p>{copy}</p>
                <span>
                  Explore resources <span aria-hidden="true">→</span>
                </span>
              </Link>
            ))}
          </div>
        </PageContainer>
      </section>

      <section className="home-trust">
        <PageContainer className="home-trust-grid">
          {[
            ["✓", "Free to use", "No sign up required"],
            ["⌁", "Fast & Secure", "Works in your browser"],
            ["▣", "Mobile Friendly", "Works on all devices"],
            ["◆", "Made for India", "Students, professionals & everyone"],
          ].map(([icon, title, copy]) => (
            <div className="home-trust-item" key={title}>
              <span aria-hidden="true">{icon}</span>
              <div>
                <strong>{title}</strong>
                <small>{copy}</small>
              </div>
            </div>
          ))}
        </PageContainer>
      </section>

      <PageContainer className="home-faq">
        <SectionTitle title="Frequently Asked Questions" />
        <div className="home-faq-list">
          {faqs.map(([question, answer]) => (
            <details key={question}>
              <summary>
                {question}
                <span aria-hidden="true">+</span>
              </summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </PageContainer>
    </main>
  );
}
