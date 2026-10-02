import Link from "next/link";
import { MobileNavigation } from "./mobile-navigation";
import { PageContainer } from "./page-container";

const desktopMenus = [
  {
    label: "Tools",
    links: [
      ["All Tools", "/tools"],
      ["PDF Tools", "/tools/pdf"],
      ["Image Tools", "/tools/image"],
      ["Text Tools", "/tools/text"],
      ["Developer Tools", "/tools/web"],
      ["Scanner Tools", "/tools/scanner"],
    ],
  },
  {
    label: "Education",
    links: [
      ["Education Home", "/education"],
      ["Class 11", "/education/class-11"],
      ["Class 12", "/education/class-12"],
      ["NCERT", "/education/ncert"],
      ["CBSE", "/education/cbse"],
    ],
  },
  {
    label: "Exams",
    links: [
      ["Competitive Exams", "/exams"],
      ["Exam Study Guides", "/education"],
      ["Useful Tools", "/tools"],
    ],
  },
  {
    label: "Technology",
    links: [
      ["Technology Guides", "/technology"],
      ["Developer Tools", "/tools/web"],
      ["How-to Guides", "/how-to"],
    ],
  },
] as const;

export function Header() {
  return (
    <header className="site-header">
      <PageContainer className="site-header-inner">
        <Link href="/" className="site-brand" aria-label="StudyTools.in home">
          <span className="site-brand-mark" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span>
            StudyTools<span>.in</span>
          </span>
        </Link>
        <nav aria-label="Primary navigation" className="site-desktop-nav">
          {desktopMenus.map((menu) => (
            <details className="site-nav-menu" key={menu.label}>
              <summary className="site-nav-link">
                {menu.label}
                <span aria-hidden="true">⌄</span>
              </summary>
              <div className="site-nav-dropdown">
                {menu.links.map(([label, href]) => (
                  <Link href={href} key={`${menu.label}-${label}`}>
                    {label}
                  </Link>
                ))}
              </div>
            </details>
          ))}
          <Link className="site-nav-link" href="/blog">
            Blog
          </Link>
        </nav>
        <form action="/search" className="site-header-search">
          <label className="sr-only" htmlFor="header-search">
            Search
          </label>
          <span aria-hidden="true">⌕</span>
          <input id="header-search" name="q" placeholder="Search tools..." />
        </form>
        <span
          className="site-theme-icon"
          aria-label="Light appearance"
          role="img"
        >
          ☾
        </span>
        <MobileNavigation />
      </PageContainer>
    </header>
  );
}
