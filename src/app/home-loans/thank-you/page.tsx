import type { Metadata } from "next";
import Image from "next/image";
import { legalCopy, legalLinks } from "@/config/health-insurance";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Home Loans enquiry received | Money.com.au",
  description: "Confirmation that your Home Loans enquiry was received.",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <Image
          className={styles.headerLogo}
          src="/money-logo.svg"
          alt="Money.com.au"
          width={240}
          height={28}
          priority
        />
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <span className={styles.footerLogoCrop} role="img" aria-label="Money.com.au">
          <Image
            src="/assets/health-insurance/brand/money-logo-footer.png"
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

export default function HomeLoansThankYouPage() {
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <section className={styles.card} aria-labelledby="home-loans-thank-you-title">
          <span className={styles.confirmationMark} aria-hidden="true">
            ✓
          </span>
          <p className={styles.eyebrow}>Home loans</p>
          <h1 id="home-loans-thank-you-title">
            Thanks, we&apos;ve received your details
          </h1>
          <p className={styles.lead}>Your home loan enquiry has been submitted.</p>

          <div className={styles.nextSteps}>
            <h2>What happens next?</h2>
            <p>
              We&apos;ll be in touch if we need any further information about your
              enquiry.
            </p>
          </div>

          <a className={styles.button} href="https://www.money.com.au/home-loans">
            Return to Money.com.au
          </a>
        </section>
      </main>
      <Footer />
    </div>
  );
}
