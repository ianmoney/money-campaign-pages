import Image from 'next/image';
import type { Metadata } from 'next';
import { LegalFooter } from '@/components/health-insurance/HealthInsuranceLandingPage';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: '47% of Aussie refinancers are making this mistake, and it could cost them $121,000 extra | Money.com.au',
  description:
    'A lower mortgage repayment feels like a win. But one overlooked refinance decision can quietly add years back onto your loan and dramatically increase the total interest you pay.',
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
            <p className={styles.eyebrow}>HOME LOAN REFINANCE GUIDE</p>
            <h1>47% of Aussie refinancers are making this mistake, and it could cost them $121,000 extra</h1>
            <p className={styles.subheadline}>
              A lower mortgage repayment feels like a win. But one overlooked refinance decision can quietly add years back onto your loan and dramatically increase the total interest you pay.
            </p>
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
            <p>Refinancing seems simple on paper. Get a lower rate, pay less each month and get more money in your back pocket.</p>
            <p>But a cheaper monthly repayment might actually cost you more in the long run.</p>
            <p>47% of Australian refinancers make this mistake, most without even realising. Before you get another refinance quote, make sure you don’t overlook this.</p>

            <aside className={styles.proMove} aria-labelledby="read-summary-title">
              <p id="read-summary-title"><strong>No time to read?</strong></p>
              <p>Refinancing to a lower rate can reduce your monthly repayment, but resetting your loan back to 30 years can add years of extra interest.</p>
              <p>Before refinancing, compare the loan term and total cost, not just the new monthly repayment.</p>
              <p>
                <a className={styles.primaryCta} href={compareUrl}>
                  Calculate Your Real Lifetime Savings Across 40+ Lenders →
                </a>
              </p>
            </aside>

            <h2>The refinance trap most people miss</h2>
            <p>Imagine you took out a 30-year home loan five years ago.</p>
            <p>After five years of repayments, your broker comes to you with a refinance option that has a lower rate and monthly repayment.</p>
            <p>Great.</p>
            <p>As with nearly half of refinances, it’s stretched out over a fresh <strong>30-year term</strong>.</p>
            <p>You’d likely save hundreds a month, but in reality, you’ve just added another five years back onto your mortgage.</p>

            <h2>How a “cheaper” refinance can cost more</h2>
            <p>Here's what happens with a <strong>$600,000 loan balance at 5.50% p.a.</strong> when you compare keeping the remaining 25-year term with resetting the loan back to 30 years.</p>
          </div>

          <div className={styles.tableWrap} role="region" aria-label="Comparison of 25-year and 30-year refinance options" tabIndex={0}>
            <table className={styles.comparisonTable}>
              <thead>
                <tr>
                  <th scope="col">Loan setup</th>
                  <th scope="col">Keep your 25-year term</th>
                  <th scope="col">Reset back to 30 years</th>
                  <th scope="col">Difference</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row"><strong>New interest rate</strong></th>
                  <td>5.50% p.a.</td>
                  <td>5.50% p.a.</td>
                  <td>Same rate</td>
                </tr>
                <tr>
                  <th scope="row"><strong>Remaining term</strong></th>
                  <td>25 years</td>
                  <td>30 years</td>
                  <td><strong>+5 years</strong></td>
                </tr>
                <tr>
                  <th scope="row"><strong>Monthly repayment</strong></th>
                  <td>$3,685</td>
                  <td>$3,407</td>
                  <td className={styles.emphasisCell}><strong>$278 lower per month</strong></td>
                </tr>
                <tr>
                  <th scope="row"><strong>Total lifetime interest</strong></th>
                  <td>$505,357</td>
                  <td>$626,424</td>
                  <td className={styles.warningCell}><strong>$121,067 EXTRA interest</strong></td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className={styles.disclaimer}>Illustrative example based on principal and interest repayments, constant rates, and no additional fees or offsets.</p>

          <div className={styles.articleColumn}>
            <p>At first glance, the 30-year option looks better.</p>
            <p>You're paying <strong>$278 less every month.</strong></p>
            <p>That's money you can actually see in your bank account.</p>
            <p>But over the life of the loan, that lower repayment comes with a much bigger number:</p>
            <p><strong>$121,067 more in total interest.</strong></p>
            <p>Same balance.</p>
            <p>Same interest rate.</p>
            <p>The major difference is how long you take to repay it.</p>

            <h2>The $121,000 detail most Aussie’s don’t notice</h2>
            <p>Saving $278 a month feels immediate.</p>
            <p>But when it’s spread out over an extra five years, the difference can be misleading.</p>
            <p>Due to compounding interest, extending the debt for another five years adds up to hundreds of thousands over the life of your mortgage.</p>
            <p><strong>A lower repayment and a cheaper loan aren't always the same thing.</strong></p>

            <h2>Is resetting to 30 years always a mistake?</h2>
            <p>No.</p>
            <p>For some households, reducing the mandatory monthly repayment can be genuinely useful.</p>
            <p>You might want more breathing room in the household budget.</p>
            <p>Your income might be temporarily uncertain.</p>
            <p>You may value having a lower minimum repayment while keeping extra cash available for emergencies.</p>
            <p>There's nothing inherently wrong with choosing a longer term when you understand the trade-off.</p>
            <p>The danger is doing it <strong>accidentally</strong>.</p>
            <p>If you deliberately choose a 30-year term because flexibility matters to you, that's very different from assuming a $278 lower repayment means the new loan is automatically $278 a month cheaper.</p>
            <p>Depending on your loan terms, you may be able to make additional repayments or continue paying an amount similar to your old repayment when your budget allows.</p>
            <p>That can give you the flexibility of a lower required repayment without necessarily following the minimum repayment schedule for the entire 30 years.</p>

            <h2>4 things to check before you refinance</h2>

            <h3>1. Your remaining loan term</h3>
            <p>Start with how many years you actually have left.</p>
            <p>If you have 23 years remaining, ask to see what the refinance looks like over 23 years as well as 30.</p>
            <p>That makes it much easier to separate the savings from the lower rate from the apparent savings created by extending the loan.</p>

            <h3>2. The rate, comparison rate and fees</h3>
            <p>Don’t look at the headline interest rate in isolation.</p>
            <p>Check the advertised rate, comparison rate and the fees that apply to the loan.</p>
            <p>A lower advertised rate can still come with costs that affect the value of switching.</p>

            <h3>3. Offset, redraw and repayment features</h3>
            <p>Loan features can change the real outcome too.</p>
            <p>An offset account, redraw facility or ability to make additional repayments may affect how much interest you ultimately pay depending on how you use them.</p>
            <p>Compare the features you'll genuinely use.</p>

            <h3>4. Your break-even point</h3>
            <p>Refinancing can involve discharge fees, application costs and other switching expenses.</p>
            <p>Work out how long it may take for the benefits of refinancing to outweigh those costs.</p>
            <p>A lower rate is much more useful when you stay in the new loan long enough to benefit from it.</p>

            <section className={styles.ctaWrap} aria-labelledby="refinance-cta-title">
              <h2 id="refinance-cta-title">See what your refinance could actually look like</h2>
              <p>I hope you can now understand that if refinancing changes both your rate <strong>and the number of years you'll be repaying the debt</strong>, it’s best to see what the total cost is over the life of your loan.</p>
              <p>And make sure resetting the clock doesn't quietly give those savings back.</p>
              <p>A lower rate shouldn't mean staying in debt for more years. Compare loan options matched to your actual timeline, not just the lender's default settings.</p>
              <a className={styles.primaryCta} href={compareUrl}>Calculate Your Real Lifetime Savings Across 40+ Lenders →</a>
              <p className={styles.ctaSupport}><em>It only takes a few minutes to start comparing.</em></p>
            </section>
          </div>
        </article>
      </main>

      <LegalFooter />
    </div>
  );
}
