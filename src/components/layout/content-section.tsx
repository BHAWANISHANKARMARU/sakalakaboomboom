import type { ReactNode } from "react";
import Link from "next/link";

export function ContentSection({
  title,
  description,
  action,
  children,
}: {
  title: string;
  description?: string;
  action?: { label: string; href: string };
  children: ReactNode;
}) {
  return (
    <section className="content-section">
      <div className="content-section-heading">
        <div>
          <h2>{title}</h2>
          {description ? <p>{description}</p> : null}
        </div>
        {action ? (
          <Link href={action.href}>
            {action.label} <span aria-hidden="true">→</span>
          </Link>
        ) : null}
      </div>
      {children}
    </section>
  );
}
