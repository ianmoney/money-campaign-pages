"use client";

import { useEffect } from "react";
import {
  HEALTH_QUOTE_EVENTS,
  trackHealthQuoteEvent,
} from "@/integrations/analytics";

export function LandingAnalytics() {
  useEffect(() => {
    trackHealthQuoteEvent(HEALTH_QUOTE_EVENTS.pageView);

    const form = document.querySelector("[data-health-quote-form-container]");
    if (!form) return;

    let fired = false;
    const observer = new IntersectionObserver(
      (entries) => {
        if (fired || !entries.some((entry) => entry.isIntersecting)) return;
        fired = true;
        trackHealthQuoteEvent(HEALTH_QUOTE_EVENTS.formVisible);
        observer.disconnect();
      },
      { threshold: 0.25 },
    );

    observer.observe(form);
    return () => observer.disconnect();
  }, []);

  return null;
}
