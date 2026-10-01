import Link from "next/link";
import { PageContainer } from "./page-container";
export function Footer() {
  return (
    <footer className="border-line bg-paper mt-20 border-t py-10">
      <PageContainer>
        <div className="grid gap-8 sm:grid-cols-2">
          <div>
            <p className="text-navy font-black">Sahaj Tools</p>
            <p className="text-muted text-sm">
              Practical tools and carefully reviewed guides for everyday tasks.
            </p>
          </div>
          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap content-start gap-x-5 gap-y-2 text-sm font-semibold"
          >
            {[
              ["About", "/about"],
              ["Contact", "/contact"],
              ["Privacy", "/privacy-policy"],
              ["Terms", "/terms"],
              ["Disclaimer", "/disclaimer"],
            ].map(([label, href]) => (
              <Link href={href} key={href}>
                {label}
              </Link>
            ))}
          </nav>
        </div>
        <p className="border-line text-muted mt-8 border-t pt-5 text-xs">
          Files used in browser tools stay on your device unless a tool clearly
          says otherwise.
        </p>
      </PageContainer>
    </footer>
  );
}
