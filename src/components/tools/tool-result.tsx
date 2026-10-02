import type { ReactNode } from "react";
export function ToolResult({
  children,
  status = "polite",
}: {
  children: ReactNode;
  status?: "polite" | "assertive";
}) {
  return (
    <div aria-live={status} className="tool-result">
      {children}
    </div>
  );
}
