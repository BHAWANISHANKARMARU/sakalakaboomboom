import Link from "next/link";
import { getRelatedTools } from "@/lib/content/registry";
export function RelatedTools({ toolId }: { toolId: string }) {
  const tools = getRelatedTools(toolId, "en");
  if (!tools.length) return null;
  return (
    <section className="grid gap-4">
      <h2>Related tools</h2>
      <div className="flex flex-wrap gap-3">
        {tools.map((tool) => (
          <Link className="button secondary" href={tool.url} key={tool.id}>
            {tool.title}
          </Link>
        ))}
      </div>
    </section>
  );
}
