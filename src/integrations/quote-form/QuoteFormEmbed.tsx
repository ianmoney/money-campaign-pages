"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { appendAllowlistedAttribution } from "./attribution";
import {
  HEALTH_FORM_MESSAGE_SOURCE,
  HEALTH_FORM_MESSAGE_VERSION,
  type HealthFormMessage,
  type QuoteFormEmbedProps,
} from "./types";
import styles from "./quote-form-embed.module.css";

const DEFAULT_HEIGHT = 500;
const DEFAULT_MIN_HEIGHT = 420;
const DEFAULT_MAX_HEIGHT = 1200;

function parseOrigins(value: string | undefined): string[] {
  if (!value) return [];

  return value
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean)
    .flatMap((entry) => {
      try {
        const origin = new URL(entry).origin;
        return origin.startsWith("https://") ? [origin] : [];
      } catch {
        return [];
      }
    });
}

function isHealthFormMessage(value: unknown): value is HealthFormMessage {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const message = value as Record<string, unknown>;
  if (
    message.source !== HEALTH_FORM_MESSAGE_SOURCE ||
    message.version !== HEALTH_FORM_MESSAGE_VERSION ||
    typeof message.type !== "string"
  ) {
    return false;
  }

  if (["ready", "start", "complete", "error"].includes(message.type)) {
    return true;
  }

  return message.type === "resize" && Number.isFinite(message.height);
}

function DevelopmentOnlyPlaceholder() {
  const items = [
    ["A", "Your current provider"],
    ["B", "Another provider"],
    ["C", "A different provider"],
    ["D", "Provider option"],
    ["E", "Provider option"],
    ["F", "No current provider"],
    ["G", "Other"],
  ];

  return (
    <div
      className={styles.placeholder}
      data-health-form-placeholder
      aria-label="Development-only form layout placeholder"
    >
      <div className={styles.progress} aria-hidden="true" />
      <p className={styles.placeholderTitle}>Your health insurance quote</p>
      <div className={styles.optionGrid} aria-hidden="true">
        {items.map(([key, label], index) => (
          <div
            className={`${styles.option} ${index === 1 ? styles.selected : ""}`}
            key={key}
          >
            <span className={styles.key}>{key}</span>
            <span>{label}</span>
          </div>
        ))}
      </div>
      <div className={styles.buttonShape} aria-hidden="true" />
    </div>
  );
}

export function QuoteFormEmbed({
  component: Component,
  embedUrl = process.env.NEXT_PUBLIC_HEALTH_FORM_URL,
  allowedOrigins,
  initialHeight = DEFAULT_HEIGHT,
  minHeight = DEFAULT_MIN_HEIGHT,
  maxHeight = DEFAULT_MAX_HEIGHT,
  fallbackUrl = "https://www.money.com.au/health-insurance/",
  className,
  onReady,
  onStart,
  onComplete,
  onError,
}: QuoteFormEmbedProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(initialHeight);

  const screenshotMode =
    process.env.NODE_ENV !== "production" ||
    process.env.NEXT_PUBLIC_HEALTH_FORM_SCREENSHOT_MODE === "true";

  const configuredOrigins = useMemo(
    () =>
      allowedOrigins
        ? [...allowedOrigins]
        : parseOrigins(process.env.NEXT_PUBLIC_HEALTH_FORM_ALLOWED_ORIGINS),
    [allowedOrigins],
  );

  const integration = useMemo(() => {
    if (!embedUrl) return { url: null, origin: null, valid: false };

    try {
      const url = new URL(embedUrl);
      const origin = url.origin;
      const valid =
        url.protocol === "https:" && configuredOrigins.includes(origin);

      if (typeof window !== "undefined" && valid) {
        appendAllowlistedAttribution(url, window.location.search);
      }

      return { url: valid ? url.toString() : null, origin, valid };
    } catch {
      return { url: null, origin: null, valid: false };
    }
  }, [configuredOrigins, embedUrl]);

  useEffect(() => {
    if (!integration.valid) return;

    const handleMessage = (event: MessageEvent<unknown>) => {
      const iframe = iframeRef.current;
      if (!iframe || event.source !== iframe.contentWindow) return;
      if (!configuredOrigins.includes(event.origin)) return;
      if (!isHealthFormMessage(event.data)) return;

      switch (event.data.type) {
        case "ready":
          onReady?.();
          break;
        case "start":
          onStart?.();
          break;
        case "complete":
          onComplete?.();
          break;
        case "error":
          onError?.({
            code: "form_error",
            message: "The health quote form reported an error.",
          });
          break;
        case "resize": {
          const nextHeight = Math.round(event.data.height);
          setHeight(Math.min(maxHeight, Math.max(minHeight, nextHeight)));
          break;
        }
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [
    configuredOrigins,
    integration.valid,
    maxHeight,
    minHeight,
    onComplete,
    onError,
    onReady,
    onStart,
  ]);

  const rootClassName = [styles.root, className].filter(Boolean).join(" ");

  if (Component) {
    return (
      <div
        className={rootClassName}
        data-health-quote-form-container
        data-health-quote-form-state="ready"
        id="health-quote-form"
        tabIndex={-1}
      >
        <Component
          onReady={onReady}
          onStart={onStart}
          onComplete={onComplete}
          onError={onError}
        />
      </div>
    );
  }

  if (integration.valid && integration.url) {
    return (
      <div
        className={rootClassName}
        data-health-quote-form-container
        id="health-quote-form"
        tabIndex={-1}
      >
        <iframe
          ref={iframeRef}
          className={styles.iframe}
          data-health-quote-form
          src={integration.url}
          title="Money.com.au health insurance quote form"
          height={height}
          scrolling="no"
          sandbox="allow-forms allow-scripts allow-same-origin"
          referrerPolicy="strict-origin-when-cross-origin"
          style={{ "--embed-height": `${height}px` } as CSSProperties}
        />
        <a className={styles.fallback} href={integration.url} target="_blank" rel="noreferrer">
          Open the quote form in a new window
        </a>
      </div>
    );
  }

  if (screenshotMode) {
    return (
      <div
        className={rootClassName}
        data-health-quote-form-container
        id="health-quote-form"
        tabIndex={-1}
      >
        <DevelopmentOnlyPlaceholder />
      </div>
    );
  }

  return (
    <div
      className={rootClassName}
      data-health-quote-form-container
      id="health-quote-form"
      tabIndex={-1}
    >
      <section className={styles.unavailable} role="status">
        <h2>Health insurance quotes are temporarily unavailable</h2>
        <p>
          The secure quote form is not connected yet. You can still view Money.com.au&apos;s
          health insurance information while the service is being prepared.
        </p>
        <a href={fallbackUrl}>Explore health insurance</a>
      </section>
    </div>
  );
}
