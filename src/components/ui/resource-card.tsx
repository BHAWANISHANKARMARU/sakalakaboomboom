import Link from "next/link";

export function ResourceCard({
  title,
  description,
  href,
  label = "Explore resources",
}: {
  title: string;
  description: string;
  href: string;
  label?: string;
}) {
  return (
    <Link className="resource-card" href={href}>
      <h3>{title}</h3>
      <p>{description}</p>
      <span>
        {label} <span aria-hidden="true">→</span>
      </span>
    </Link>
  );
}
