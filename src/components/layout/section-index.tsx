import { PageContainer } from "./page-container";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
export function SectionIndex({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children?: React.ReactNode;
}) {
  return (
    <main>
      <PageContainer className="grid gap-8 py-10 sm:py-14">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: title }]} />
        <header className="max-w-3xl">
          <h1>{title}</h1>
          <p className="text-muted mt-4 text-lg">{description}</p>
        </header>
        {children ?? (
          <p className="border-line text-muted border-t pt-6">
            We are reviewing resources for this section before publication.
          </p>
        )}
      </PageContainer>
    </main>
  );
}
