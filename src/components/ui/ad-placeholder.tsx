import { siteConfig } from "@/config/site";
export function AdPlaceholder() {
  if (!siteConfig.adsEnabled) return null;
  return (
    <aside
      aria-label="Advertisement"
      className="border-line bg-paper text-muted my-8 min-h-24 border p-3 text-center text-xs"
    >
      Advertisement
    </aside>
  );
}
