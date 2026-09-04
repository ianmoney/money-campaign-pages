"use client";

import { useEffect, useRef, useState } from "react";
import type { EmbeddedQuoteFormProps } from "./types";
import styles from "./inline-health-quote-form.module.css";

const providerOptions = [
  "Medibank",
  "Australian Unity",
  "AHM",
  "HCF",
  "HBF",
  "nib",
  "Bupa",
  "Other",
  "No current fund",
] as const;

const coverForOptions = ["Individual", "Couple", "Family"] as const;
const genderOptions = ["Male", "Female"] as const;
const coverTypeOptions = ["Hospital Only", "Hospital & Extras", "Extras Only"] as const;
const stateOptions = ["ACT", "NSW", "NT", "QLD", "SA", "TAS", "VIC", "WA"] as const;
const decades = [1940, 1950, 1960, 1970, 1980, 1990, 2000] as const;

const privacyUrl = "https://www.money.com.au/privacy-policy";
const termsUrl = "https://www.money.com.au/terms-of-use";
const thankYouUrl = "https://www.money.com.au/health-insurance/health-thank-you";

type Answers = {
  current_health_fund: string;
  cover_for: string;
  gender: string;
  cover_type: string;
  state: string;
  birth_year: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  consentAccepted: boolean;
};

const initialAnswers: Answers = {
  current_health_fund: "",
  cover_for: "",
  gender: "",
  cover_type: "",
  state: "",
  birth_year: "",
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  consentAccepted: false,
};

type QuizStep =
  | "current_health_fund"
  | "cover_for"
  | "gender"
  | "cover_type"
  | "state"
  | "birth_year"
  | "contact";

const allSteps: ReadonlyArray<{ id: QuizStep; title: string; hint?: string }> = [
  {
    id: "current_health_fund",
    title: "Who is your current health fund?",
    hint: "Choose one option",
  },
  {
    id: "cover_for",
    title: "Who needs health cover?",
    hint: "Choose the option that best fits",
  },
  {
    id: "gender",
    title: "What is your gender?",
    hint: "This is required for individual health cover",
  },
  {
    id: "cover_type",
    title: "What type of cover are you looking for?",
    hint: "You can review the details with an expert later",
  },
  {
    id: "state",
    title: "Which state or territory do you live in?",
    hint: "This helps narrow down available cover",
  },
  {
    id: "birth_year",
    title: "What year were you born?",
    hint: "Choose a decade, then tap your birth year",
  },
  {
    id: "contact",
    title: "Enter a few details to access your offers",
  },
];

function normalizeAustralianMobile(value: string) {
  const compact = value.replace(/[\s()-]/g, "");
  if (/^04\d{8}$/.test(compact)) return `+61${compact.slice(1)}`;
  if (/^\+614\d{8}$/.test(compact)) return compact;
  return null;
}

function isValidName(value: string) {
  return /^[\p{L}][\p{L}' -]{1,79}$/u.test(value.trim());
}

function validateContact(answers: Answers) {
  if (!isValidName(answers.first_name)) return "Enter your first name.";
  if (!isValidName(answers.last_name)) return "Enter your last name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(answers.email.trim())) {
    return "Enter a valid email address.";
  }
  if (!normalizeAustralianMobile(answers.phone)) {
    return "Enter a valid Australian mobile number, such as 0412 345 678.";
  }
  if (!answers.consentAccepted) {
    return "Accept the terms of use and privacy policy before accessing your offers.";
  }
  return null;
}

function nullableQueryValue(params: URLSearchParams, key: string) {
  return params.get(key)?.slice(0, 500) || null;
}

async function submitLead(answers: Answers, submissionId: string) {
  const endpoint = process.env.NEXT_PUBLIC_HEALTH_LEAD_ENDPOINT?.trim();
  if (!endpoint) throw new Error("The comparison service is unavailable.");
  const query = new URLSearchParams(window.location.search);

  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      submission_id: submissionId,
      lead: {
        current_health_fund: answers.current_health_fund,
        cover_for: answers.cover_for,
        gender: answers.gender,
        cover_type: answers.cover_type,
        state: answers.state,
        birth_year: answers.birth_year,
        first_name: answers.first_name.trim(),
        last_name: answers.last_name.trim(),
        email: answers.email.trim(),
        phone: normalizeAustralianMobile(answers.phone),
      },
      consent: {
        accepted: answers.consentAccepted,
        version: "health-v1",
      },
      attribution: {
        utm_source: nullableQueryValue(query, "utm_source"),
        utm_medium: nullableQueryValue(query, "utm_medium"),
        utm_campaign: nullableQueryValue(query, "utm_campaign"),
        utm_content: nullableQueryValue(query, "utm_content"),
        utm_term: nullableQueryValue(query, "utm_term"),
        fbclid: nullableQueryValue(query, "fbclid"),
        gclid: nullableQueryValue(query, "gclid"),
        landing_url: window.location.href.slice(0, 500),
        referrer: document.referrer.slice(0, 500) || null,
        funnel_version: "health-inline-v1",
      },
    }),
    keepalive: true,
  });

  if (!response.ok) throw new Error("The comparison service is unavailable.");
}

function ChoiceGrid({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: readonly string[];
  onChange: (value: string) => void;
}) {
  return (
    <div className={styles.optionGrid} role="radiogroup" aria-label={label}>
      {options.map((option) => (
        <button
          key={option}
          type="button"
          className={`${styles.option} ${value === option ? styles.optionSelected : ""}`}
          role="radio"
          aria-checked={value === option}
          onClick={() => onChange(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export function InlineHealthQuoteForm({
  onReady,
  onStart,
  onComplete,
  onError,
}: EmbeddedQuoteFormProps) {
  const [answers, setAnswers] = useState<Answers>(initialAnswers);
  const [stepIndex, setStepIndex] = useState(0);
  const [selectedDecade, setSelectedDecade] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const started = useRef(false);
  const ready = useRef(false);
  const headingRef = useRef<HTMLLegendElement>(null);
  const submissionIdRef = useRef<string | null>(null);
  const steps = allSteps.filter(
    (candidate) => candidate.id !== "gender" || answers.cover_for === "Individual",
  );
  const step = steps[stepIndex];
  const percentage = Math.round(((stepIndex + 1) / steps.length) * 100);

  useEffect(() => {
    if (ready.current) return;
    ready.current = true;
    onReady?.();
  }, [onReady]);

  useEffect(() => {
    if (stepIndex > 0) headingRef.current?.focus();
  }, [stepIndex]);

  const noteStart = () => {
    if (started.current) return;
    started.current = true;
    onStart?.();
  };

  const chooseAndAdvance = (key: keyof Answers, value: string) => {
    setAnswers((current) => ({ ...current, [key]: value }));
    setError("");
    noteStart();
    window.setTimeout(() => {
      setStepIndex((current) => Math.min(steps.length - 1, current + 1));
    }, 90);
  };

  const update = <K extends keyof Answers>(key: K, value: Answers[K]) => {
    setAnswers((current) => ({ ...current, [key]: value }));
    setError("");
    noteStart();
  };

  const goBack = () => {
    if (submitting) return;
    if (step.id === "birth_year" && selectedDecade !== null) {
      setSelectedDecade(null);
      setError("");
      return;
    }
    setError("");
    setStepIndex((current) => Math.max(0, current - 1));
  };

  const handleSubmit = async () => {
    const contactError = validateContact(answers);
    if (contactError) {
      setError(contactError);
      return;
    }

    setSubmitting(true);
    setError("");
    try {
      submissionIdRef.current ||= crypto.randomUUID();
      await submitLead(answers, submissionIdRef.current);
      onComplete?.();
      if (window.top && window.top !== window) {
        window.top.location.assign(thankYouUrl);
      } else {
        window.location.assign(thankYouUrl);
      }
    } catch (caught) {
      const message = caught instanceof Error ? caught.message : "We could not submit your details.";
      setSubmitting(false);
      setError(`${message} Please try again.`);
      onError?.({ code: "form_error", message });
    }
  };

  const years =
    selectedDecade === null
      ? []
      : Array.from({ length: 10 }, (_, index) => String(selectedDecade + index));

  const renderStep = () => {
    if (step.id === "current_health_fund") {
      return (
        <ChoiceGrid
          label="Current health fund"
          value={answers.current_health_fund}
          options={providerOptions}
          onChange={(value) => chooseAndAdvance("current_health_fund", value)}
        />
      );
    }
    if (step.id === "cover_for") {
      return (
        <ChoiceGrid
          label="Who needs health cover"
          value={answers.cover_for}
          options={coverForOptions}
          onChange={(value) => chooseAndAdvance("cover_for", value)}
        />
      );
    }
    if (step.id === "gender") {
      return (
        <ChoiceGrid
          label="Gender"
          value={answers.gender}
          options={genderOptions}
          onChange={(value) => chooseAndAdvance("gender", value)}
        />
      );
    }
    if (step.id === "cover_type") {
      return (
        <ChoiceGrid
          label="Type of cover"
          value={answers.cover_type}
          options={coverTypeOptions}
          onChange={(value) => chooseAndAdvance("cover_type", value)}
        />
      );
    }
    if (step.id === "state") {
      return (
        <ChoiceGrid
          label="State or territory"
          value={answers.state}
          options={stateOptions}
          onChange={(value) => chooseAndAdvance("state", value)}
        />
      );
    }
    if (step.id === "birth_year") {
      if (selectedDecade === null) {
        return (
          <ChoiceGrid
            label="Birth decade"
            value=""
            options={decades.map((decade) => `${decade}s`)}
            onChange={(value) => {
              setSelectedDecade(Number(value.slice(0, 4)));
              setError("");
              noteStart();
            }}
          />
        );
      }
      return (
        <>
          <button type="button" className={styles.decadeBack} onClick={() => setSelectedDecade(null)}>
            ← Choose another decade
          </button>
          <ChoiceGrid
            label="Birth year"
            value={answers.birth_year}
            options={years}
            onChange={(value) => chooseAndAdvance("birth_year", value)}
          />
        </>
      );
    }

    return (
      <div className={styles.fields}>
        <div className={styles.nameRow}>
          <label>
            <span>First name</span>
            <input
              name="first_name"
              autoComplete="given-name"
              value={answers.first_name}
              maxLength={80}
              required
              onChange={(event) => update("first_name", event.target.value)}
            />
          </label>
          <label>
            <span>Last name</span>
            <input
              name="last_name"
              autoComplete="family-name"
              value={answers.last_name}
              maxLength={80}
              required
              onChange={(event) => update("last_name", event.target.value)}
            />
          </label>
        </div>
        <label>
          <span>Email address</span>
          <input
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={answers.email}
            maxLength={160}
            required
            onChange={(event) => update("email", event.target.value)}
          />
        </label>
        <label>
          <span>Australian mobile number</span>
          <input
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="0412 345 678"
            value={answers.phone}
            maxLength={18}
            required
            onChange={(event) => update("phone", event.target.value)}
          />
          <small>Enter a valid Australian mobile number so we can contact you about your offers.</small>
        </label>
        <div className={styles.consent}>
          <input
            id="health-consent-accepted"
            name="consent_accepted"
            type="checkbox"
            checked={answers.consentAccepted}
            required
            onChange={(event) => update("consentAccepted", event.target.checked)}
          />
          <label htmlFor="health-consent-accepted">
            I understand and accept the website <a href={termsUrl} target="_blank" rel="noreferrer">terms of use</a> and <a href={privacyUrl} target="_blank" rel="noreferrer">privacy policy</a>, and that the Health Insurance advice is provided by Money.com.au (ABN 42 626 094 773) with the support of the ItsMyGroup(ABN 85 167 289 965). Both Money.com.au and the ItsMy Group are signatories to the PHIIA code of conduct.
          </label>
        </div>
        <button type="submit" className={styles.submitButton} disabled={submitting}>
          {submitting ? "Submitting..." : "Compare now"}
        </button>
      </div>
    );
  };

  return (
    <section className={styles.shell} aria-label="Health insurance comparison">
      <div className={styles.progressRow}>
        <span>Compare now</span>
        <span>Step {stepIndex + 1} of {steps.length}</span>
      </div>
      <div className={styles.progressTrack} aria-hidden="true">
        <span style={{ width: `${percentage}%` }} />
      </div>
      <form
        className={styles.card}
        onSubmit={(event) => {
          event.preventDefault();
          void handleSubmit();
        }}
        noValidate
      >
        {stepIndex > 0 && (
          <button type="button" className={styles.smallBack} onClick={goBack} disabled={submitting}>
            ← Back
          </button>
        )}
        <fieldset disabled={submitting}>
          <legend ref={headingRef} tabIndex={-1}>{step.title}</legend>
          {step.hint && <p className={styles.hint}>{step.hint}</p>}
          {renderStep()}
        </fieldset>
        <div className={styles.errorRegion} aria-live="polite">
          {error && <p className={styles.errorBox}>{error}</p>}
        </div>
      </form>
    </section>
  );
}
