import Image from 'next/image';
import type { Metadata } from 'next';
import { LegalFooter } from '@/components/health-insurance/HealthInsuranceLandingPage';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'The 30-Year Reset: How a Cheaper Monthly Mortgage Can Quietly Cost You $121,000 Extra | Money.com.au',
  description:
    'How resetting a refinanced mortgage back to 30 years can lower the monthly repayment while increasing total lifetime interest.',
  robots: 'noindex,follow',
};

const compareUrl = 'https://www.money.com.au/home-loans/matching-engine';

export default function RefinanceMistakePage() {
  return (
    <div className={styles.page}>
      <header className={styles.pageHeader}>
        <a href="https://www.money.com.au/home-loans" className={styles.pageHeaderBrand} aria-label="Money.com.au home loans">
          <Image src="/money-logo.svg" alt="Money.com.au" width={240} height={28} priority />
        </a>
      </header>

      <main>
        <article>
          <header className={styles.articleHero}>
            <p className={styles.eyebrow}>Home loan refinance guide</p>
            <h1>The 30-Year Reset: How a Cheaper Monthly Mortgage Can Quietly Cost You $121,000 Extra</h1>
            <div className={styles.byline}>
              <Image className={styles.avatar} src="/money-icon.svg" alt="" width={38} height={38} aria-hidden="true" />
              <span>
                <strong>By the Money.com.au team</strong>
                <small>4 min read</small>
              </span>
            </div>
          </header>

          <figure className={styles.heroImage}>
            <Image
              src="/advertorial/home-loans/refinance-mistake/hero-home.jpg"
              alt="Covered outdoor living area of an Australian home overlooking trees and a swimming pool"
              width={700}
              height={467}
              priority
              unoptimized
              sizes="(max-width: 760px) calc(100vw - 32px), 700px"
            />
          </figure>

          <div className={styles.articleColumn}>
            <p>Refinancing usually feels like simple maths: secure a lower interest rate, shrink your monthly repayment, and celebrate the savings.</p>
            <p>Yet 47% of Australian refinancers walk into an expensive trap without realising it. Another 8% only discover what happened long after the contracts are signed.</p>
            <p className={styles.pullQuote}>The trap is not the interest rate. It is the clock.</p>

            <h2>The Hidden Trap: Adding 5 Years Back On</h2>
            <p>Imagine you took out a 30-year loan five years ago. You have done the hard yards, paid down the balance, and have 25 years left.</p>
            <p>When you refinance for a lower rate, most lenders automatically stretch your new contract back over a fresh 30-year term.</p>
            <p>Your monthly repayment drops immediately. But that drop does not just come from the better rate; it comes from stretching your debt over an extra 60 months of compounding interest.</p>
            <p>Here is what happens when you compare the two ways to refinance the same $600,000 balance at 5.50% p.a.:</p>
          </div>

          <div className={styles.tableWrap} role="region" aria-label="Comparison of 25-year and 30-year refinance options" tabIndex={0}>
            <table className={styles.comparisonTable}>
              <thead>
                <tr>
                  <th scope="col">Loan Setup</th>
                  <th scope="col">Option A: Keep Your 25-Year Term</th>
                  <th scope="col">Option B: Reset Back to 30 Years</th>
                  <th scope="col">The Difference</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">New Interest Rate</th>
                  <td>5.50% p.a.</td>
                  <td>5.50% p.a.</td>
                  <td>Same rate</td>
                </tr>
                <tr>
                  <th scope="row">Remaining Term</th>
                  <td>25 years</td>
                  <td>30 years</td>
                  <td>+5 extra years</td>
                </tr>
                <tr>
                  <th scope="row">Monthly Repayment</th>
                  <td>$3,685</td>
                  <td>$3,407</td>
                  <td>$278 lower per month</td>
                </tr>
                <tr>
                  <th scope="row">Total Lifetime Interest</th>
                  <td>$505,357</td>
                  <td>$626,424</td>
                  <td className={styles.warningCell}>$121,067 EXTRA interest</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className={styles.disclaimer}>Illustrative example based on P&amp;I repayments, constant rates, and no additional fees or offsets.</p>

          <div className={styles.articleColumn}>
            <p>Resetting the clock saves you $278 a month in the short term, but it hands the bank an extra $121,067 in total interest.</p>
            <p>The problem is not the lower rate. The lower rate works in your favour. The trap is assuming a smaller monthly bill means you secured a cheaper loan overall.</p>

            <h2>Is a 30-Year Reset Ever Justified?</h2>
            <p>Yes. If your household budget needs urgent breathing room, securing the lowest possible mandatory payment makes tactical sense.</p>
            <p>The danger is doing it by accident. As ASIC’s Moneysmart warns, stretching your term will routinely erase any benefit gained from a lower headline rate.</p>
            <aside className={styles.proMove}>
              <strong>The Pro Move:</strong> If you need cash flow flexibility, accept the 30-year term to lock in the lower mandatory minimum, but keep transferring your old repayment amount whenever finances allow. You preserve a safety net without sacrificing six figures in compounding interest.
            </aside>

            <h2>4 Things to Check Before You Sign</h2>
            <p>Before swapping lenders, make sure you compare:</p>
            <ol className={styles.checkList}>
              <li><strong>The Loan Term:</strong> Insist on seeing repayment quotes matched to your current remaining years, not just a default 30-year reset.</li>
              <li><strong>The Comparison Rate:</strong> Headline rates hide application fees, valuation charges, and ongoing account costs.</li>
              <li><strong>Features That Offset Debt:</strong> An offset account or redraw facility can neutralize years of interest if used properly.</li>
              <li><strong>The Break-Even Horizon:</strong> Ensure the lifetime savings comfortably outweigh upfront discharge and setup costs.</li>
            </ol>

            <h2>Find Out What Your True Savings Look Like</h2>
            <p>A lower rate should not mean staying in debt for an extra five years. Compare loan options matched to your actual timeline, not just the lender&apos;s default settings.</p>

            <div className={styles.ctaWrap}>
              <a className={styles.primaryCta} href={compareUrl}>
                Calculate Your Real Lifetime Savings Across 40+ Lenders <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </article>
      </main>

      <LegalFooter />
    </div>
  );
}
