import Link from "next/link";
import { PageContainer } from "./page-container";

const groups = [
  {
    title: "Tools",
    links: [
      ["Form Ready Kit", "/tools/image/form-ready-kit"],
      ["PDF Tools", "/tools/pdf"],
      ["Image Tools", "/tools/image"],
      ["Calculators", "/tools/calculators"],
      ["All Tools", "/tools"],
    ],
  },
  {
    title: "Learn",
    links: [
      ["Class 9 Maths", "/education/class-9/mathematics/mathematics-2026-27"],
      ["हिंदी में पढ़ें", "/hi/education"],
      ["How-to Guides", "/how-to"],
    ],
  },
  {
    title: "Company",
    links: [
      ["About", "/about"],
      ["Contact", "/contact"],
      ["Privacy Policy", "/privacy-policy"],
      ["Terms", "/terms"],
      ["Disclaimer", "/disclaimer"],
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="site-footer">
      <PageContainer>
        <div className="site-footer-grid">
          <div className="site-footer-about">
            <Link
              href="/"
              className="site-brand site-brand-footer"
              aria-label="Sakalakaboomboom home"
            >
              <span className="site-brand-mark" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              <span>
                Sakalaka<span>boomboom</span>
              </span>
            </Link>
            <p>
              Free online tools and carefully reviewed learning resources for
              students and everyday users in India.
            </p>
            <p className="site-footer-privacy">
              Browser-based tools keep files on your device unless a tool
              clearly says otherwise.
            </p>
          </div>
          {groups.map((group) => (
            <nav aria-label={`${group.title} footer links`} key={group.title}>
              <h2>{group.title}</h2>
              {group.links.map(([label, href]) => (
                <Link href={href} key={href}>
                  {label}
                </Link>
              ))}
            </nav>
          ))}
        </div>
        <div className="site-footer-bottom">
          <span>
            © {new Date().getFullYear()} Sakalakaboomboom. All rights reserved.
          </span>
          <span>Useful by design. Made for India.</span>
        </div>
      </PageContainer>
    </footer>
  );
}
