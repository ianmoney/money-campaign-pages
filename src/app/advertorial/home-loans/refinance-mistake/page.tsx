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
            <p>Refinancing usually feels like simple maths: get a lower interest rate, lower your monthly repayment, and save money.</p>
            <p>But a cheaper monthly repayment does not always mean a cheaper mortgage.</p>
            <p>Yet 47% of Australian refinancers fall into an expensive trap without realising it. Another 8% only discover what happened after the contracts are signed.</p>
            <p>The trap isn’t the lower interest rate.</p>
            <p><strong>It’s the clock.</strong></p>

            <h2>The refinance trap most people miss</h2>
            <p>Imagine you took out a 30-year home loan five years ago.</p>
            <p>You have done five years of repayments and now have <strong>25 years remaining</strong>.</p>
            <p>You find a better interest rate and decide to refinance.</p>
            <p>So far, so good.</p>
            <p>But your new loan is set up over a fresh <strong>30-year term</strong>.</p>
            <p>You have just added another five years back onto your mortgage.</p>
            <p>Your new monthly repayment will probably look attractive because two things have happened:</p>
            <p><strong>1. You got a lower rate.</strong></p>
            <p><strong>2. Your remaining debt has been stretched over more years.</strong></p>
            <p>Most people notice the first one.</p>
            <p>The second is where the hidden cost can appear.</p>

            <h2>How a “cheaper” refinance can cost more</h2>
            <p>Here is what happens with a <strong>$600,000 loan balance at 5.50% p.a.</strong> when you compare keeping the remaining 25-year term with resetting the loan back to 30 years.</p>
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
            <p>You are paying <strong>$278 less every month.</strong></p>
            <p>That is money you can actually see in your bank account.</p>
            <p>But over the life of the loan, that lower repayment comes with a much bigger number:</p>
            <p><strong>$121,067 more in total interest.</strong></p>
            <p>Same balance.</p>
            <p>Same interest rate.</p>
            <p>The major difference is how long you take to repay it.</p>

            <h2>The $121,000 detail most refinancers don’t notice</h2>
            <p>Saving $278 a month feels immediate.</p>
            <p>The extra interest does not.</p>
            <p>It is spread across years of future repayments, which makes it easy to overlook when you are comparing refinance offers today.</p>
            <p>That is why monthly repayments can be misleading when viewed on their own.</p>
            <p>A refinance can give you:</p>
            <p><strong>a lower interest rate</strong></p>
            <p>and</p>
            <p><strong>a lower monthly repayment</strong></p>
            <p>while still costing substantially more over the full loan term.</p>
            <p>The lower rate is not the problem.</p>
            <p>The lower rate works in your favour.</p>
            <p>The problem is extending the debt for another five years without properly accounting for what those extra years cost.</p>
            <p><strong>A lower repayment and a cheaper loan are not always the same thing.</strong></p>

            <h2>Why the 30-year reset happens so easily</h2>
            <p>When people refinance, the rate naturally gets most of the attention.</p>
            <p>Is it lower than my current rate?</p>
            <p>How much will I save each month?</p>
            <p>What will my new repayment be?</p>
            <p>Those are sensible questions.</p>
            <p>But the loan term can quietly sit in the background.</p>
            <p>If you currently have 25 years remaining and the refinance quote is based on a new 30-year loan, you are not comparing like with like.</p>
            <p>Your rate has changed.</p>
            <p>But so has your repayment timeline.</p>
            <p>That does not automatically make the refinance bad.</p>
            <p>It simply means you need to look at both changes before deciding how much you are really saving.</p>

            <h2>Is resetting to 30 years always a mistake?</h2>
            <p>No.</p>
            <p>For some households, reducing the mandatory monthly repayment can be genuinely useful.</p>
            <p>You might want more breathing room in the household budget.</p>
            <p>Your income might be temporarily uncertain.</p>
            <p>You may value having a lower minimum repayment while keeping extra cash available for emergencies.</p>
            <p>There is nothing inherently wrong with choosing a longer term when you understand the trade-off.</p>
            <p>The danger is doing it <strong>accidentally</strong>.</p>
            <p>If you deliberately choose a 30-year term because flexibility matters to you, that is very different from assuming a $278 lower repayment means the new loan is automatically $278 a month cheaper.</p>

            <h2>A lower minimum repayment doesn’t mean you have to pay less</h2>
            <p>There is another important distinction.</p>
            <p>A 30-year loan term sets the minimum required repayment.</p>
            <p>It does not necessarily mean you have to take the full 30 years to repay the loan.</p>
            <p>Depending on your loan terms, you may be able to make additional repayments or continue paying an amount similar to your old repayment when your budget allows.</p>
            <p>That can give you the flexibility of a lower required repayment without necessarily following the minimum repayment schedule for the entire 30 years.</p>
            <p>But the outcome will depend on your loan, rate, fees, repayment behaviour and features such as an offset or redraw facility.</p>
            <p>That is why the loan structure matters just as much as the number shown next to “monthly repayment”.</p>

            <h2>4 things to check before you refinance</h2>

            <h3>1. Your remaining loan term</h3>
            <p>Start with how many years you actually have left.</p>
            <p>If you have 23 years remaining, ask to see what the refinance looks like over 23 years as well as 30.</p>
            <p>That makes it much easier to separate the savings from the lower rate from the apparent savings created by extending the loan.</p>

            <h3>2. The rate, comparison rate and fees</h3>
            <p>Do not look at the headline interest rate in isolation.</p>
            <p>Check the advertised rate, comparison rate and the fees that apply to the loan.</p>
            <p>A lower advertised rate can still come with costs that affect the value of switching.</p>

            <h3>3. Offset, redraw and repayment features</h3>
            <p>Loan features can change the real outcome too.</p>
            <p>An offset account, redraw facility or ability to make additional repayments may affect how much interest you ultimately pay depending on how you use them.</p>
            <p>Compare the features you will genuinely use, not just the headline rate.</p>

            <h3>4. Your break-even point</h3>
            <p>Refinancing can involve discharge fees, application costs and other switching expenses.</p>
            <p>Work out how long it may take for the benefits of refinancing to outweigh those costs.</p>
            <p>A lower rate is much more useful when you stay in the new loan long enough to benefit from it.</p>

            <h2>Before you celebrate the lower repayment, check the loan clock</h2>
            <p>Most refinancers look for a lower interest rate.</p>
            <p>They should.</p>
            <p>But the interest rate is only one number.</p>
            <p>If refinancing changes both your rate <strong>and the number of years you will be repaying the debt</strong>, compare both before deciding whether the new loan is genuinely cheaper.</p>
            <p>The number to focus on is not simply:</p>
            <p><strong>“What will my repayment be next month?”</strong></p>
            <p>It is also:</p>
            <p><strong>“What could this loan cost me over the time it takes to repay it?”</strong></p>
            <p>A lower rate can save you money.</p>
            <p>Just make sure resetting the clock does not quietly give those savings back.</p>

            <section className={styles.ctaWrap} aria-labelledby="refinance-cta-title">
              <h2 id="refinance-cta-title">See what your refinance could actually look like</h2>
              <p>Compare home loan options across <strong>40+ lenders</strong> and look beyond the headline rate. Check rates, repayments and loan structures before deciding whether refinancing makes sense for you.</p>
              <a className={styles.primaryCta} href={compareUrl}>Compare refinance options</a>
              <p className={styles.ctaSupport}><em>It only takes a few minutes to start comparing.</em></p>
            </section>
          </div>
        </article>
      </main>

      <LegalFooter />
    </div>
  );
}
