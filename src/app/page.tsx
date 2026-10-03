import Link from "next/link";
import { PageContainer } from "@/components/layout/page-container";

type ToolCard = {
  title: string;
  description: string;
  icon: string;
  tone: string;
  href?: string;
};

const popularTools: ToolCard[] = [
  {
    title: "PDF Compressor",
    description: "Reduce PDF file size while keeping quality",
    icon: "PDF",
    tone: "red",
  },
  {
    title: "PDF Merger",
    description: "Combine multiple PDF files into one",
    icon: "PDF",
    tone: "red",
    href: "/tools/pdf/pdf-merger",
  },
  {
    title: "Image Compressor",
    description: "Compress JPG, PNG and WebP images",
    icon: "IMG",
    tone: "purple",
    href: "/tools/image/image-compressor",
  },
  {
    title: "Image Resizer",
    description: "Resize images to exact dimensions",
    icon: "↗",
    tone: "purple",
  },
  {
    title: "JPG to PDF",
    description: "Convert JPG images into a PDF file",
    icon: "JPG",
    tone: "red",
  },
  {
    title: "Word Counter",
    description: "Count words, characters and reading time",
    icon: "T",
    tone: "green",
    href: "/tools/text/word-counter",
  },
  {
    title: "QR Code Generator",
    description: "Create a downloadable QR code instantly",
    icon: "QR",
    tone: "blue",
    href: "/tools/web/qr-code-generator",
  },
  {
    title: "JSON Formatter",
    description: "Format, validate and minify JSON",
    icon: "{ }",
    tone: "orange",
    href: "/tools/web/json-formatter-validator",
  },
];

const categories = [
  ["PDF Tools", "6 tools", "PDF", "red", "/tools/pdf"],
  ["Image Tools", "4 tools", "IMG", "purple", "/tools/image"],
  ["Text Tools", "4 tools", "T", "green", "/tools/text"],
  ["Developer Tools", "3 tools", "</>", "orange", "/tools/web"],
  ["Scanner Tools", "2 tools", "⌗", "blue", "/tools/scanner"],
  ["Calculator Tools", "1 tool", "123", "teal", "/tools/calculators"],
] as const;

const education = [
  [
    "Class 11",
    "Study guides for Maths, Physics and Chemistry",
    "11",
    "blue",
    "/education/class-11",
  ],
  [
    "Class 12",
    "Board preparation and subject study guides",
    "12",
    "purple",
    "/education/class-12",
  ],
  [
    "NCERT",
    "Textbook structure, chapters and study strategies",
    "N",
    "green",
    "/education/ncert",
  ],
  [
    "CBSE",
    "Practical preparation and study planning",
    "C",
    "orange",
    "/education/cbse",
  ],
  [
    "Competitive Exams",
    "Evergreen preparation resources for major exams",
    "✓",
    "red",
    "/exams",
  ],
] as const;

const guides = [
  [
    "How to reduce PDF file size without losing quality",
    "A practical guide to choosing sensible compression settings.",
    "PDF Guide",
    "red",
  ],
  [
    "How to prepare a clean study timetable",
    "Build a realistic revision plan around school and practice.",
    "Study Guide",
    "blue",
  ],
  [
    "Image file types explained: JPG, PNG and WebP",
    "Know which image format to use for documents and the web.",
    "Technology",
    "purple",
  ],
  [
    "How to check and format JSON safely",
    "Find syntax errors and make structured data easier to read.",
    "Developer Guide",
    "orange",
  ],
] as const;

const faqs = [
  [
    "Are the tools on Sakalakaboomboom free?",
    "Yes. The available tools are free to use and do not require an account.",
  ],
  [
    "Are my files uploaded to a server?",
    "The current file tools process files in your browser. A tool will clearly disclose any future server processing before you use it.",
  ],
  [
    "Can I use these tools on mobile?",
    "Yes. The interface is designed for phones, tablets and desktop computers.",
  ],
  [
    "How are education and exam details verified?",
    "Time-sensitive syllabus, policy and exam information is checked against relevant official sources before publication.",
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
  const body = (
    <>
      <IconTile label={tool.icon} tone={tool.tone} />
      <span className="min-w-0">
        <span className="home-card-title">{tool.title}</span>
        <span className="home-card-copy">{tool.description}</span>
      </span>
      <span className="home-card-arrow" aria-hidden="true">
        →
      </span>
      {!tool.href ? <span className="home-soon">Coming soon</span> : null}
    </>
  );
  return tool.href ? (
    <Link className="home-tool-card" href={tool.href}>
      {body}
    </Link>
  ) : (
    <div className="home-tool-card home-tool-card-planned">{body}</div>
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
              "PDF Merger",
              "Image Compressor",
              "Word Counter",
              "QR Code Generator",
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
            {categories.map(([title, count, icon, tone, href]) => (
              <Link className="home-category-card" href={href} key={title}>
                <IconTile label={icon} tone={tone} />
                <span className="home-card-title">{title}</span>
                <span className="home-card-copy">{count}</span>
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

      <PageContainer className="home-content home-content-lower">
        <section>
          <SectionTitle
            title="Latest Helpful Guides"
            href="/blog"
            linkLabel="View All Guides"
          />
          <div className="home-guide-grid">
            {guides.map(([title, copy, category, tone]) => (
              <article className="home-guide-card" key={title}>
                <div
                  className={`home-guide-art home-guide-art-${tone}`}
                  aria-hidden="true"
                >
                  <span>ST</span>
                </div>
                <div className="home-guide-body">
                  <span className="home-guide-label">{category}</span>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                  <span className="home-guide-status">
                    Editorial roadmap · Publishing after review
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>
      </PageContainer>

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
