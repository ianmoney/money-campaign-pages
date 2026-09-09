"use client";

import { useEffect, useRef } from "react";
import styles from "./home-loan-quote-embed.module.css";

const formUrl = "https://lead.money.com.au/home-loans/quote";
const formOrigin = "https://lead.money.com.au";
const thankYouUrl = "https://compare.money.com.au/home-loans/thank-you";

function isCompletionMessage(value: unknown) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const message = value as Record<string, unknown>;
  return message.source === "money-home-loan-quote" &&
    message.version === 1 &&
    message.type === "complete" &&
    message.redirect_url === thankYouUrl;
}

export function HomeLoanQuoteEmbed() {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    function handleMessage(event: MessageEvent<unknown>) {
      if (event.origin !== formOrigin || event.source !== iframeRef.current?.contentWindow) return;
      if (isCompletionMessage(event.data)) window.location.assign(thankYouUrl);
    }

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <main className={styles.page}>
      <iframe
        ref={iframeRef}
        className={styles.iframe}
        src={formUrl}
        title="Compare home loans"
        loading="eager"
        referrerPolicy="strict-origin-when-cross-origin"
        sandbox="allow-forms allow-scripts allow-same-origin"
      />
    </main>
  );
}
