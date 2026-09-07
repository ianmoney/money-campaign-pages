import Image from "next/image";
import { legalCopy, legalLinks } from "@/config/health-insurance";
import styles from "@/components/health-insurance/health-insurance.module.css";
import embedStyles from "./business-loans.module.css";

const ASSET_ROOT = "/assets/health-insurance";
const MATCHING_ENGINE_URL =
  "https://www.money.com.au/business-loans/business-loans-matching-engine-embeddable";

function MinimalHeader() {
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

function BusinessLoansQuiz() {
  return (
    <div
      className={embedStyles.embed}
      id="business-loans-matching-engine"
      data-business-loans-matching-engine
    >
      <iframe
        className={embedStyles.iframe}
        src={MATCHING_ENGINE_URL}
        title="Money.com.au business loans matching engine"
        loading="eager"
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </div>
  );
}

function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="business-loans-hero-title">
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
        <h1 id="business-loans-hero-title" className={styles.heroTitle}>
          <span>MATCH WITH THE RIGHT FUNDING</span>
          <span className={styles.heroTitleSecondLine}>FOR YOUR BUSINESS</span>
        </h1>
        <p className={styles.heroCopy}>
          Compare your best business loan options from 50+ lenders in Australia.
        </p>
        <ul className={styles.benefits} aria-label="Comparison benefits">
          <li>
            <span aria-hidden="true">✓</span>
            100% Aussie staff
          </li>
          <li>
            <span aria-hidden="true">✓</span>
            No markups
          </li>
          <li>
            <span aria-hidden="true">✓</span>
            Obligation free
          </li>
        </ul>
        <div className={`${styles.formPanel} ${embedStyles.formPanel}`}>
          <BusinessLoansQuiz />
        </div>
      </div>
    </section>
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
      <span
        className={styles.expertHeadshots}
        role="img"
        aria-label="Money.com.au business loans experts"
      >
        <Image
          src={`${ASSET_ROOT}/people/health-experts-ribbon.png`}
          alt=""
          width={214}
          height={90}
          aria-hidden="true"
        />
      </span>
      <p>Our dedicated Business Loans experts are here to help.</p>
    </aside>
  );
}

function LegalFooter() {
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

export function BusinessLoansLandingPage() {
  return (
    <div className={styles.page}>
      <MinimalHeader />
      <main>
        <Hero />
        <div className={`${styles.whiteContent} ${embedStyles.whiteContent}`}>
          <TrustRibbon />
        </div>
      </main>
      <LegalFooter />
    </div>
  );
}
