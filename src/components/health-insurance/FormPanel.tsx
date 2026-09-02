"use client";

import { QuoteFormEmbed } from "@/integrations/quote-form";
import { InlineHealthQuoteForm } from "@/integrations/quote-form/InlineHealthQuoteForm";
import {
  HEALTH_QUOTE_EVENTS,
  trackHealthQuoteEvent,
} from "@/integrations/analytics";

export function FormPanel() {
  return (
    <QuoteFormEmbed
      component={InlineHealthQuoteForm}
      onReady={() => trackHealthQuoteEvent(HEALTH_QUOTE_EVENTS.embedReady)}
      onError={() => trackHealthQuoteEvent(HEALTH_QUOTE_EVENTS.embedError)}
    />
  );
}
