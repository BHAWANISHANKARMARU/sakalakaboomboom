import Link from "next/link";

export function ToolDirectoryCard({
  title,
  description,
  category,
  href,
  status,
}: {
  title: string;
  description: string;
  category: string;
  href?: string;
  status: "live" | "planned";
}) {
  const content = (
    <>
      <span className="directory-card-kicker">{category}</span>
      <h3>{title}</h3>
      <p>{description}</p>
      <span className="directory-card-action">
        {status === "live" ? "Open tool →" : "Coming soon"}
      </span>
    </>
  );
  return status === "live" && href ? (
    <Link className="directory-card" href={href}>
      {content}
    </Link>
  ) : (
    <article className="directory-card directory-card-planned">
      {content}
    </article>
  );
}
