import Link from "next/link";
import { PageContainer } from "@/components/layout/page-container";
import { CategoryCard } from "@/components/ui/category-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { categories } from "@/content/categories";
import { getLiveTools } from "@/lib/content/registry";

export default function Home() {
  const live = getLiveTools("en");
  return (
    <main>
      <section className="border-line bg-paper border-b py-16 sm:py-24">
        <PageContainer className="grid gap-7">
          <p className="eyebrow">Made for everyday India</p>
          <h1 className="max-w-4xl">
            Useful online tools and guides for everyday tasks
          </h1>
          <p className="text-muted text-lg">
            Private, quick utilities for files, images, text and the web—plus
            clear learning resources for Indian students.
          </p>
          <form
            action="/search"
            className="flex max-w-2xl flex-col gap-2 sm:flex-row"
          >
            <label className="sr-only" htmlFor="home-search">
              Search tools and guides
            </label>
            <input
              className="field"
              id="home-search"
              name="q"
              placeholder="Search tools and guides"
            />
            <button className="button" type="submit">
              Search
            </button>
          </form>
        </PageContainer>
      </section>
      <PageContainer className="grid gap-16 py-14">
        <section className="grid gap-7">
          <SectionHeading
            eyebrow="Start here"
            title="Popular tools"
            description="Your files and text stay in your browser for these tools."
          />
          <div className="grid gap-x-7 sm:grid-cols-2 lg:grid-cols-3">
            {live.map((item) => (
              <CategoryCard
                key={item.id}
                href={item.url}
                title={item.title}
                description={item.description}
              />
            ))}
          </div>
        </section>
        <section className="grid gap-7">
          <SectionHeading eyebrow="Directory" title="Find a tool by category" />
          <div className="grid gap-x-7 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((item) => (
              <CategoryCard
                key={item.id}
                href={`/tools/${item.id}`}
                title={item.title}
                description={item.description}
              />
            ))}
          </div>
        </section>
        <section className="border-line grid gap-5 border-y py-10 sm:grid-cols-[1fr_auto] sm:items-center">
          <div>
            <p className="eyebrow">For students</p>
            <h2 className="mt-2">Study with clearer, verified guidance</h2>
            <p className="text-muted mt-3">
              Education resources are being prepared carefully, with official
              sources used for current syllabus and exam information.
            </p>
          </div>
          <Link className="button secondary" href="/education">
            Explore education
          </Link>
        </section>
      </PageContainer>
    </main>
  );
}
