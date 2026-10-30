import { toolGuides } from "@/content/tool-guides";

export function ToolGuideDetails({ toolId }: { toolId: string }) {
  const guide = toolGuides[toolId];
  if (!guide) return null;
  return (
    <div className="grid gap-5">
      <ol className="list-decimal space-y-2 pl-5">
        {guide.steps.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
      {guide.example ? (
        <>
          <h2>Example</h2>
          <p>{guide.example}</p>
        </>
      ) : null}
      {guide.note ? (
        <>
          <h2>Good to know</h2>
          <p>{guide.note}</p>
        </>
      ) : null}
      <h2>Frequently asked questions</h2>
      {guide.faqs.map((faq) => (
        <div key={faq.question}>
          <h3>{faq.question}</h3>
          <p>{faq.answer}</p>
        </div>
      ))}
    </div>
  );
}
