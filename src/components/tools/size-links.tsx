import Link from "next/link";
import { sizePagePath, sizePages, type SizePage } from "@/content/size-pages";

export function SizeLinks({
  kind,
  current,
}: {
  kind: SizePage["kind"];
  current?: string;
}) {
  const main =
    kind === "image"
      ? { href: "/tools/image/photo-resizer-in-kb", label: "Any KB size" }
      : { href: "/tools/pdf/pdf-size-reducer", label: "Any KB size" };
  const links = sizePages
    .filter((page) => page.kind === kind && page.slug !== current)
    .map((page) => ({ href: sizePagePath(page), label: page.label }));
  return (
    <section>
      <h2>Other sizes</h2>
      <div className="mt-3 flex flex-wrap gap-3">
        {[...links, main].map((link) => (
          <Link className="button secondary" href={link.href} key={link.href}>
            {link.label}
          </Link>
        ))}
      </div>
    </section>
  );
}
