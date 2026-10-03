import { Breadcrumbs } from "@/components/ui/breadcrumbs";

export function EducationBreadcrumbs({
  items,
}: {
  items: { label: string; href?: string }[];
}) {
  return <Breadcrumbs items={items} />;
}
