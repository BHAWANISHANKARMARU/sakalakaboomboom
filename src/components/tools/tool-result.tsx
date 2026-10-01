import type { ReactNode } from "react";
export function ToolResult({
  children,
  status = "polite",
}: {
  children: ReactNode;
  status?: "polite" | "assertive";
}) {
  return (
    <div
      aria-live={status}
      className="border-line bg-paper rounded-md border p-4"
    >
      {children}
    </div>
  );
}
