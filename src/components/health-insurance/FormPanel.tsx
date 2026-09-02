"use client";

import { QuoteFormEmbed } from "@/integrations/quote-form";
import {
  HEALTH_QUOTE_EVENTS,
  trackHealthQuoteEvent,
} from "@/integrations/analytics";

export function FormPanel() {
  return (
    <QuoteFormEmbed
      onReady={() => trackHealthQuoteEvent(HEALTH_QUOTE_EVENTS.embedReady)}
      onError={() => trackHealthQuoteEvent(HEALTH_QUOTE_EVENTS.embedError)}
    />
  );
}
