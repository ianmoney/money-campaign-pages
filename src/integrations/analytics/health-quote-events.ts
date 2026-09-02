export const HEALTH_QUOTE_EVENTS = {
  pageView: "health_quote_page_view",
  formVisible: "health_quote_form_visible",
  compareNowClick: "health_quote_compare_now_click",
  embedReady: "health_quote_embed_ready",
  embedError: "health_quote_embed_error",
} as const;

export type HealthQuoteEvent =
  (typeof HEALTH_QUOTE_EVENTS)[keyof typeof HEALTH_QUOTE_EVENTS];

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export function trackHealthQuoteEvent(event: HealthQuoteEvent): void {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event });
}
