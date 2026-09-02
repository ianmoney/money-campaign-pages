import type { ComponentType } from "react";

export const HEALTH_FORM_MESSAGE_SOURCE = "money-health-form" as const;
export const HEALTH_FORM_MESSAGE_VERSION = 1 as const;

export type QuoteFormEmbedError = {
  code: "invalid_configuration" | "load_error" | "form_error";
  message: string;
};

export type EmbeddedQuoteFormProps = {
  onReady?: () => void;
  onStart?: () => void;
  onComplete?: () => void;
  onError?: (error: QuoteFormEmbedError) => void;
};

export type QuoteFormComponent = ComponentType<EmbeddedQuoteFormProps>;

export type QuoteFormEmbedProps = EmbeddedQuoteFormProps & {
  component?: QuoteFormComponent;
  embedUrl?: string;
  allowedOrigins?: readonly string[];
  initialHeight?: number;
  minHeight?: number;
  maxHeight?: number;
  fallbackUrl?: string;
  className?: string;
};

export type HealthFormMessage =
  | {
      source: typeof HEALTH_FORM_MESSAGE_SOURCE;
      version: typeof HEALTH_FORM_MESSAGE_VERSION;
      type: "ready" | "start" | "complete";
    }
  | {
      source: typeof HEALTH_FORM_MESSAGE_SOURCE;
      version: typeof HEALTH_FORM_MESSAGE_VERSION;
      type: "error";
      code?: string;
    }
  | {
      source: typeof HEALTH_FORM_MESSAGE_SOURCE;
      version: typeof HEALTH_FORM_MESSAGE_VERSION;
      type: "resize";
      height: number;
    };
