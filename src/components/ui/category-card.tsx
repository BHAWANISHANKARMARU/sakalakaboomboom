import Link from "next/link";
export function CategoryCard({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group border-line hover:border-saffron border-t-2 py-5 transition-colors"
    >
      <h3 className="group-hover:text-blue text-lg">{title}</h3>
      <p className="text-muted mt-2 text-sm">{description}</p>
      <span className="text-blue mt-4 inline-block text-sm font-bold">
        Explore →
      </span>
    </Link>
  );
}
