"use client";

import {
  HEALTH_QUOTE_EVENTS,
  trackHealthQuoteEvent,
} from "@/integrations/analytics";
import styles from "./health-insurance.module.css";

export function CompareNowButton() {
  const handleClick = () => {
    trackHealthQuoteEvent(HEALTH_QUOTE_EVENTS.compareNowClick);

    const container = document.querySelector<HTMLElement>(
      "[data-health-quote-form-container]",
    );
    if (!container) return;

    container.scrollIntoView({ behavior: "smooth", block: "center" });

    const focusTarget =
      container.querySelector<HTMLIFrameElement>("iframe") ?? container;
    window.setTimeout(() => focusTarget.focus({ preventScroll: true }), 350);
  };

  return (
    <button
      className={styles.compareButton}
      data-health-quote-cta
      type="button"
      onClick={handleClick}
    >
      Compare now
    </button>
  );
}
