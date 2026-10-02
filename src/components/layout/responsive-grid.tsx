import type { ReactNode } from "react";

export function ResponsiveGrid({
  children,
  columns = 3,
  className = "",
}: {
  children: ReactNode;
  columns?: 2 | 3 | 4;
  className?: string;
}) {
  return (
    <div className={`responsive-grid responsive-grid-${columns} ${className}`}>
      {children}
    </div>
  );
}
