import Image from "next/image";
import {
  healthInsuranceContent,
  healthInsuranceProviders,
  legalCopy,
  legalLinks,
} from "@/config/health-insurance";
import { CompareNowButton } from "./CompareNowButton";
import { FormPanel } from "./FormPanel";
import { LandingAnalytics } from "./LandingAnalytics";
import styles from "./health-insurance.module.css";

const ASSET_ROOT = "/assets/health-insurance";

export function MinimalHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <div className={styles.headerBrand}>
          <Image
            className={styles.headerLogo}
            src="/money-logo.svg"
            alt="Money.com.au"
            width={240}
            height={28}
            priority
          />
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="health-hero-title">
      <span className={styles.heroCircle} aria-hidden="true" />
      <Image
        className={styles.heroMoneyM}
        src={`${ASSET_ROOT}/brand/money-m-background.svg`}
        alt=""
        aria-hidden="true"
        width={479}
        height={370}
        priority
      />
      <div className={styles.heroInner}>
        <h1 id="health-hero-title" className={styles.heroTitle}>
          <span>SEE HOW MUCH YOU COULD SAVE</span>
          <span className={styles.heroTitleSecondLine}> ON YOUR HEALTH INSURANCE</span>
        </h1>
        <p className={styles.heroCopy}>{healthInsuranceContent.supportingCopy}</p>
        <ul className={styles.benefits} aria-label="Comparison benefits">
          {healthInsuranceContent.benefits.map((benefit) => (
            <li key={benefit}>
              <span aria-hidden="true">✓</span>
              {benefit}
            </li>
          ))}
        </ul>
        <div className={styles.formPanel}>
          <FormPanel />
        </div>
      </div>
    </section>
  );
}

function ExpertHeadshots() {
  return (
    <span
      className={styles.expertHeadshots}
      role="img"
      aria-label="Money.com.au health insurance experts"
    >
      <Image
        src={`${ASSET_ROOT}/people/health-experts-ribbon.png`}
        alt=""
        width={214}
        height={90}
        aria-hidden="true"
      />
    </span>
  );
}

function TrustRibbon() {
  return (
    <aside className={styles.trustRibbon} aria-label="Customer rating and expert support">
      <div className={styles.ratingBlock}>
        <span>
          <strong>Excellent</strong> 4.8 out of 5
        </span>
        <span className={styles.trustpilot}>
          <b aria-hidden="true">★</b> Trustpilot
        </span>
      </div>
      <span className={styles.ribbonDivider} aria-hidden="true" />
      <ExpertHeadshots />
      <p>{healthInsuranceContent.trust.expertCopy}</p>
    </aside>
  );
}

function ProviderLogo({
  provider,
}: {
  provider: (typeof healthInsuranceProviders)[number];
}) {
  return (
    <div className={`${styles.providerLogo} ${styles[provider.className]}`}>
      <Image
        src={`${ASSET_ROOT}/providers/${provider.asset}`}
        alt={`${provider.name} health insurance logo`}
        width={180}
        height={90}
      />
    </div>
  );
}

function Providers() {
  return (
    <section className={styles.providers} aria-labelledby="providers-title">
      <h2 id="providers-title">{healthInsuranceContent.providersHeading}</h2>
      <div className={styles.providerRow}>
        {healthInsuranceProviders.slice(0, 8).map((provider) => (
          <ProviderLogo provider={provider} key={provider.name} />
        ))}
      </div>
      <div className={`${styles.providerRow} ${styles.providerRowSecond}`}>
        {healthInsuranceProviders.slice(8).map((provider) => (
          <ProviderLogo provider={provider} key={provider.name} />
        ))}
      </div>
    </section>
  );
}

function Testimonial() {
  return (
    <section className={styles.testimonial} aria-labelledby="testimonial-title">
      <h2 id="testimonial-title">{healthInsuranceContent.testimonial.headline}</h2>
      <div className={styles.testimonialBody}>
        <Image
          className={styles.chrisPhoto}
          src={`${ASSET_ROOT}/people/chris.webp`}
          alt="Chris, a Money.com.au health insurance customer from Brisbane"
          width={248}
          height={248}
        />
        <div className={styles.testimonialCopy}>
          <blockquote>{healthInsuranceContent.testimonial.quote}</blockquote>
          <p>{healthInsuranceContent.testimonial.attribution}</p>
          <CompareNowButton />
        </div>
      </div>
    </section>
  );
}

export function LegalFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <span className={styles.footerLogoCrop} role="img" aria-label="Money.com.au">
          <Image
            src={`${ASSET_ROOT}/brand/money-logo-footer.png`}
            alt=""
            width={126}
            height={28}
            aria-hidden="true"
          />
        </span>
        <div className={styles.legalCopy}>
          {legalCopy.map((paragraph) => (
            <p key={paragraph.slice(0, 30)}>{paragraph}</p>
          ))}
          <p>
            For more information, read our{" "}
            <a href={legalLinks.financialServicesGuide}>Financial Services Guide</a>.
            We also provide a guide on what to do if you wish to{" "}
            <a href={legalLinks.complaints}>make a complaint about us</a>.
          </p>
        </div>
      </div>
    </footer>
  );
}

export function HealthInsuranceLandingPage() {
  return (
    <div className={styles.page}>
      <LandingAnalytics />
      <MinimalHeader />
      <main>
        <Hero />
        <div className={styles.whiteContent}>
          <TrustRibbon />
          <Providers />
          <Testimonial />
        </div>
      </main>
      <LegalFooter />
    </div>
  );
}
