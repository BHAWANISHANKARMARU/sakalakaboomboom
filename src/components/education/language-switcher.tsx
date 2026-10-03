import Link from "next/link";
import type { Locale } from "@/types/content";

export function LanguageSwitcher({
  locale,
  englishPath,
  hindiPath,
}: {
  locale: Locale;
  englishPath: string;
  hindiPath?: string;
}) {
  if (!hindiPath && locale === "en") return null;
  return (
    <nav
      className="language-switcher"
      aria-label={locale === "hi" ? "भाषा चुनें" : "Choose language"}
    >
      {locale === "en" ? (
        <Link href={hindiPath!} hrefLang="hi">
          हिंदी में पढ़ें
        </Link>
      ) : (
        <Link href={englishPath} hrefLang="en">
          Read in English
        </Link>
      )}
    </nav>
  );
}
