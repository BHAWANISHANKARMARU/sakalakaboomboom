import Link from "next/link";
import { PageContainer } from "./page-container";

const groups = [
  {
    title: "Tools",
    links: [
      ["PDF Tools", "/tools/pdf"],
      ["Image Tools", "/tools/image"],
      ["Text Tools", "/tools/text"],
      ["Developer Tools", "/tools/web"],
      ["All Tools", "/tools"],
    ],
  },
  {
    title: "Education",
    links: [
      ["Class 11", "/education/class-11"],
      ["Class 12", "/education/class-12"],
      ["NCERT", "/education/ncert"],
      ["CBSE", "/education/cbse"],
    ],
  },
  {
    title: "Explore",
    links: [
      ["Competitive Exams", "/exams"],
      ["Technology", "/technology"],
      ["How-to Guides", "/how-to"],
      ["Blog", "/blog"],
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
