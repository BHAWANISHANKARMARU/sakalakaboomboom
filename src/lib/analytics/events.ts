export type AnalyticsEvent =
  | { name: "tool_start" | "tool_complete" | "download"; toolId: string }
  | { name: "search"; resultCount: number }
  | { name: "outbound_link"; host: string };
export function trackEvent(event: AnalyticsEvent) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("sahaj:analytics", { detail: event }));
}
