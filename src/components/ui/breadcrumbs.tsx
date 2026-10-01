import Link from "next/link";
export function Breadcrumbs({
  items,
}: {
  items: { label: string; href?: string }[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="text-muted text-sm">
      <ol className="flex flex-wrap gap-2">
        {items.map((item, index) => (
          <li className="flex gap-2" key={`${item.label}-${index}`}>
            {item.href ? (
              <Link
                className="hover:text-blue hover:underline"
                href={item.href}
              >
                {item.label}
              </Link>
            ) : (
              <span aria-current="page">{item.label}</span>
            )}
            {index < items.length - 1 && <span aria-hidden="true">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
