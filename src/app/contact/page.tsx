import { ArticleLayout } from "@/components/articles/article-layout";
import { siteConfig } from "@/config/site";
export default function Page() {
  return (
    <ArticleLayout
      title="Contact"
      description="Report a tool problem, correction or accessibility issue."
    >
      <p>
        Email{" "}
        <a
          className="text-blue font-bold underline"
          href={`mailto:${siteConfig.contactEmail}`}
        >
          {siteConfig.contactEmail}
        </a>
        . Please do not send confidential files or personal information.
      </p>
    </ArticleLayout>
  );
}
