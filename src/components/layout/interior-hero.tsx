import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

type Crumb = { label: string; href?: string };

export function InteriorHero({
  title,
  description,
  eyebrow,
  breadcrumbs,
  action,
}: {
  title: string;
  description: string;
  eyebrow?: string;
  breadcrumbs: Crumb[];
  action?: { label: string; href: string };
}) {
  return (
    <header className="interior-hero">
      <Breadcrumbs items={breadcrumbs} />
      <div className="interior-hero-row">
        <div>
          {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
        {action ? (
          <Link className="button secondary" href={action.href}>
            {action.label} <span aria-hidden="true">→</span>
          </Link>
        ) : null}
      </div>
    </header>
  );
}
