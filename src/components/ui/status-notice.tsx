export function StatusNotice({
  title,
  description,
  tone = "info",
}: {
  title: string;
  description: string;
  tone?: "info" | "privacy" | "planned";
}) {
  return (
    <aside
      className={`status-notice status-notice-${tone}`}
      role="status"
      aria-label={title}
    >
      <span aria-hidden="true">{tone === "privacy" ? "✓" : "i"}</span>
      <div>
        <strong>{title}</strong>
        <p>{description}</p>
      </div>
    </aside>
  );
}
