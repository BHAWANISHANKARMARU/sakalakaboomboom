import Link from "next/link";
import { MobileNavigation } from "./mobile-navigation";
import { PageContainer } from "./page-container";

const desktopMenus = [
  {
    label: "Tools",
    links: [
      ["All Tools", "/tools"],
      ["Form Ready Kit", "/tools/image/form-ready-kit"],
      ["PDF Tools", "/tools/pdf"],
      ["Image Tools", "/tools/image"],
      ["Text Tools", "/tools/text"],
      ["Calculators", "/tools/calculators"],
      ["Developer Tools", "/tools/web"],
    ],
  },
  {
    label: "Education",
    links: [
      ["Education Home", "/education"],
      ["Class 9 Maths", "/education/class-9/mathematics/mathematics-2026-27"],
      ["हिंदी पाठ", "/hi/education"],
    ],
  },
] as const;

export function Header() {
  return (
    <header className="site-header">
      <PageContainer className="site-header-inner">
        <Link
          href="/"
          className="site-brand"
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
          <Link className="site-nav-link" href="/how-to">
            Guides
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
