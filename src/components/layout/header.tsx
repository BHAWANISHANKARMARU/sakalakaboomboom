import Link from "next/link";
import { navigationItems } from "@/content/navigation";
import { MobileNavigation } from "./mobile-navigation";
import { PageContainer } from "./page-container";
export function Header() {
  return (
    <header className="border-line relative border-b bg-white">
      <PageContainer className="flex min-h-18 items-center justify-between gap-6">
        <Link href="/" className="text-navy text-xl font-black tracking-tight">
          <span className="text-saffron">Sahaj</span> Tools
        </Link>
        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-6 md:flex"
        >
          {navigationItems.map((item) => (
            <Link
              className="text-navy hover:text-blue font-semibold"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
          <Link className="text-blue font-semibold" href="/search">
            Search
          </Link>
        </nav>
        <MobileNavigation />
      </PageContainer>
    </header>
  );
}
