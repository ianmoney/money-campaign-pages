import Image from 'next/image';
import type { Metadata } from 'next';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: '47% of Aussie refinancers are making this mistake, and it could cost them over $100k | Money.com.au',
  description:
    'A practical guide to the refinance term-reset trap, why a lower monthly repayment can still mean more lifetime interest, and what to compare before switching home loans.',
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

      <article>
        <header className={styles.articleHero}>
          <p className={styles.eyebrow}>Home loan refinance guide</p>
          <h1>47% of Aussie refinancers are making this mistake, and it could cost them over $100k</h1>
          <p className={styles.dek}>
            The strange part? Your interest rate and monthly repayment can both go down while the total interest bill goes up.
          </p>
          <div className={styles.byline}>
            <img className={styles.avatar} src="/money-icon.svg" alt="" aria-hidden="true" />
            <span>
              <strong>By the Money.com.au team</strong>
              <small>6 min read</small>
            </span>
          </div>
        </header>

        <figure className={styles.heroImage}>
          <img
            src="/advertorial/home-loans/refinance-mistake/hero-mortgage-clock.svg"
            alt="Illustration of a home loan document, a house and a mortgage clock resetting"
          />
        </figure>

        <div className={styles.articleColumn}>
          <p>Refinancing a home loan usually starts with a pretty simple idea.</p>
          <p>You look at the rate you&apos;re paying now, see what else is available, and work out whether switching could leave you better off.</p>
          <p>So if a new loan gives you a lower interest rate <strong>and</strong> knocks a few hundred dollars off the monthly repayment, it can feel like an obvious win.</p>
          <p>But there&apos;s one number on the refinance that can completely change the maths.</p>
          <p><strong>The new loan term.</strong></p>
          <p>If you&apos;ve already spent years paying down a 30-year mortgage, refinancing can quietly put those years back on the clock.</p>
          <p>And that can make the required repayment look much cheaper today, while increasing how much interest you pay over the life of the loan.</p>
        </div>

        <aside className={styles.summaryStrip} aria-label="Short summary">
          <div>
            <strong>No time to read?</strong>
            <p>If you refinance with 25 years remaining and reset the new loan to 30 years, the lower required repayment can hide a much higher lifetime interest bill.</p>
          </div>
          <a className={styles.textCta} href={compareUrl}>Compare your home loan <span aria-hidden="true">→</span></a>
        </aside>

        <div className={styles.articleColumn}>
          <h2>The part of a refinance that&apos;s easy to miss</h2>
          <p>When you first take out a home loan, a 30-year term is common.</p>
          <p>Then life carries on. You make repayments for five years. Your mortgage now has 25 years remaining.</p>
          <p>Maybe rates have moved. Maybe your property has gone up in value. Maybe you realise you haven&apos;t checked your home loan in a while.</p>
          <p>So you refinance.</p>
          <p>The new lender offers a lower rate, but the new loan is written over a fresh 30-year term.</p>
          <p>That can make the refinance look even better because stretching the balance over another five years pushes the required monthly repayment down.</p>
          <p>You haven&apos;t only changed the rate. <strong>You&apos;ve added five years back onto the mortgage.</strong></p>
          <p>
            Money.com.au research found <strong>47% of homeowners who refinanced reset their mortgage term to 30 years</strong>. Another 8% said they didn&apos;t realise the term had been extended to 30 years until after refinancing.{' '}
            <a href="https://www.money.com.au/home-loans/research-insights" target="_blank" rel="noreferrer">See the research</a>.
          </p>
          <p>That doesn&apos;t automatically mean those borrowers made a bad decision. A longer term can be useful when cash flow is tight.</p>
          <p>But it does mean the monthly repayment on its own can be a misleading way to judge whether you&apos;ve actually saved money.</p>
        </div>

        <figure className={styles.diagram}>
          <img
            src="/advertorial/home-loans/refinance-mistake/term-reset.svg"
            alt="Timeline showing a 30 year mortgage reduced to 25 years remaining, then reset to 30 years after refinancing"
          />
          <figcaption>The refinance can lower your required payment while putting years back on the clock.</figcaption>
        </figure>

        <section className={styles.example} aria-labelledby="example-title">
          <h2 id="example-title">Here&apos;s where the maths gets interesting</h2>
          <p>Take a homeowner with a <strong>$600,000 mortgage</strong>, <strong>25 years remaining</strong> and an interest rate of <strong>5.70% p.a.</strong></p>
          <p>Their principal-and-interest repayment is about <strong>$3,757 a month</strong>.</p>
          <p>They find a refinance at a lower rate of <strong>5.50% p.a.</strong></p>
          <p>There are now two ways to structure the same lower-rate refinance.</p>

          <div className={styles.loanGrid}>
            <div className={styles.loanCard}>
              <span className={styles.loanLabel}>Refinance A</span>
              <h3>Keep 25 years remaining</h3>
              <dl>
                <div><dt>Loan balance</dt><dd>$600,000</dd></div>
                <div><dt>Rate</dt><dd>5.50% p.a.</dd></div>
                <div><dt>Loan term</dt><dd>25 years</dd></div>
                <div><dt>Monthly repayment</dt><dd>≈ $3,685</dd></div>
                <div><dt>Lifetime interest</dt><dd>≈ $505,357</dd></div>
              </dl>
            </div>
            <div className={`${styles.loanCard} ${styles.loanCardHighlight}`}>
              <span className={styles.loanLabel}>Refinance B</span>
              <h3>Reset the loan to 30 years</h3>
              <dl>
                <div><dt>Loan balance</dt><dd>$600,000</dd></div>
                <div><dt>Rate</dt><dd>5.50% p.a.</dd></div>
                <div><dt>Loan term</dt><dd>30 years</dd></div>
                <div><dt>Monthly repayment</dt><dd>≈ $3,407</dd></div>
                <div><dt>Lifetime interest</dt><dd>≈ $626,424</dd></div>
              </dl>
            </div>
          </div>

          <div className={styles.revealBox}>
            <span>The lower monthly repayment looks great.</span>
            <strong>But the 30-year version adds about $121,067 in lifetime interest.</strong>
          </div>

          <p>The rate is identical. The loan balance is identical.</p>
          <p>The difference is simply that one version gives interest another five years to accumulate.</p>
          <p>Compared with the borrower&apos;s original 5.70% loan, resetting to 30 years also cuts the required repayment by about <strong>$350 a month</strong>. That&apos;s why it can feel so attractive.</p>
          <p className={styles.exampleConclusion}><strong>The trap isn&apos;t the lower rate.</strong> The lower rate is helping. The problem is assuming the smaller required repayment proves the refinance is cheaper overall.</p>
        </section>

        <p className={styles.disclaimer}>Illustrative example only. Assumes principal-and-interest repayments, a constant interest rate for the full term and no refinancing costs, fees, extra repayments or other changes. Actual outcomes vary.</p>

        <figure className={styles.diagram}>
          <img
            src="/advertorial/home-loans/refinance-mistake/lower-rate-lower-repayment.svg"
            alt="Three checks showing lower interest rate and lower repayment do not necessarily mean lower total interest"
          />
        </figure>

        <div className={styles.articleColumn}>
          <h2>So why does the cheaper-looking loan cost more?</h2>
          <p>Because two different things are happening at the same time.</p>
          <p><strong>The rate change</strong> is reducing the amount of interest charged on the balance.</p>
          <p><strong>The term change</strong> is spreading that balance across more repayments and giving interest longer to build up.</p>
          <p>The lower rate is pulling your cost down.</p>
          <p>The longer term can pull the total cost back up.</p>
          <p>If you only look at what leaves your bank account next month, it&apos;s easy to miss the second part.</p>

          <h2>That doesn&apos;t mean refinancing back to 30 years is always a mistake</h2>
          <p>There are perfectly reasonable reasons to choose a longer term.</p>
          <p>If household cash flow is tight, lowering the required repayment may be exactly what you need.</p>
          <p>You may also prefer having a lower minimum repayment while keeping the option to make extra repayments when you can.</p>
          <p>The important bit is knowing what you&apos;re trading.</p>
          <p>You&apos;re potentially buying more breathing room each month in exchange for a longer repayment period and more interest if you actually take the full term to repay the loan.</p>
          <p>
            Moneysmart also warns borrowers switching home loans to be careful about the new loan length, because extending the term can mean paying more interest over time.{' '}
            <a href="https://moneysmart.gov.au/home-loans/switching-home-loans" target="_blank" rel="noreferrer">Read Moneysmart&apos;s guidance</a>.
          </p>

          <h2>There&apos;s another option people often overlook</h2>
          <p>Say your refinance does come with a new 30-year term and the required repayment drops.</p>
          <p>That doesn&apos;t necessarily mean you have to spend 30 years paying it off.</p>
          <p>If the loan allows additional repayments, you could choose to keep paying roughly what you were already paying before the refinance.</p>
          <p>That can give you the flexibility of a lower required minimum without automatically turning every dollar of that lower repayment into extra spending.</p>
          <p>How much difference that makes depends on the loan, the rate, fees and what happens over time, but it&apos;s worth modelling before you sign anything.</p>

          <h2>Before refinancing, compare more than the rate</h2>
          <p>There are a few numbers worth putting next to each other before deciding whether a refinance genuinely improves your position:</p>
          <ul className={styles.plainList}>
            <li><strong>Your new interest rate and comparison rate:</strong> the headline rate matters, but fees and charges matter too.</li>
            <li><strong>Your remaining loan term:</strong> if you have 25 years left now, check whether the refinance keeps roughly 25 years or resets you to 30.</li>
            <li><strong>Your required repayment:</strong> useful for cash flow, but not a complete measure of the saving.</li>
            <li><strong>Your total interest over the term:</strong> run the numbers over the same time period before comparing.</li>
            <li><strong>Refinancing costs:</strong> discharge fees, application costs and other switching costs can affect the break-even point.</li>
            <li><strong>Features you&apos;ll actually use:</strong> offset, redraw and package features can change the value of a loan depending on how you use them.</li>
          </ul>
          <p>A better question than <strong>“How much lower is my repayment?”</strong> is:</p>
          <p><strong>“What does this refinance change over the next five, ten and twenty-five years?”</strong></p>

          <h2>The headline rate is only one part of the loan</h2>
          <p>One lender might have the lower advertised rate. Another might have the lower comparison rate.</p>
          <p>One may include an offset account. Another may have fewer ongoing fees.</p>
          <p>Your repayment may fall because the rate is lower, because the term has been stretched, or because both happened at the same time.</p>
          <p>That&apos;s why two refinances that look similar in an ad can produce very different long-term outcomes.</p>
          <p>The goal isn&apos;t simply to find the smallest number on a rate table. It&apos;s to understand why one option may work better for your situation.</p>
        </div>

        <section className={styles.compareSection} id="compare" aria-labelledby="compare-title">
          <div className={styles.compareColumn}>
            <p className={styles.eyebrow}>Compare your home loan</p>
            <h2 id="compare-title">See how your current loan stacks up</h2>
            <p>Compare your current home loan against options available through Money.com.au&apos;s lender panel and look at more than just the headline rate.</p>
            <ul className={styles.compareBenefits} aria-label="Home loan comparison benefits">
              <li>Compare 50+ lenders</li>
              <li>Expert broker support</li>
              <li>Obligation free</li>
            </ul>
            <a className={styles.primaryCta} href={compareUrl}>Compare my home loan <span aria-hidden="true">→</span></a>
            <p className={styles.panelNote}>Money.com.au does not compare every lender or home loan available in Australia. Eligibility, rates, fees, features and lending criteria vary by lender and applicant.</p>
          </div>
        </section>

        <section className={`${styles.articleColumn} ${styles.faq}`} aria-labelledby="faq-title">
          <h2 id="faq-title">Common questions</h2>
          <details>
            <summary>Is resetting a refinance to 30 years always bad?</summary>
            <p>No. A longer term can reduce the required repayment and may help with cash flow. The important thing is understanding the extra interest you may pay if you take the full term to repay the loan.</p>
          </details>
          <details>
            <summary>Why can my repayment fall even if the loan costs more overall?</summary>
            <p>Because the balance is being spread across more monthly repayments. A lower required payment tells you what you need to pay now, not necessarily the total interest you&apos;ll pay over the full term.</p>
          </details>
          <details>
            <summary>Can I take a 30-year term and still pay the loan off faster?</summary>
            <p>Potentially, if your loan allows additional repayments. Check the product rules, fees and any limits that apply before relying on that strategy.</p>
          </details>
          <details>
            <summary>What should I compare when refinancing?</summary>
            <p>Start with the interest rate, comparison rate, remaining term, repayment, total interest, switching costs and the features you&apos;ll actually use.</p>
          </details>
        </section>
      </article>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <Image src="/money-logo.svg" alt="Money.com.au" width={190} height={24} />
          <p>General information only. This page does not take into account your objectives, financial situation or needs. Rates, fees, terms, eligibility and lender criteria vary. Consider whether a product is appropriate for you and check the lender&apos;s terms before applying.</p>
        </div>
      </footer>
    </div>
  );
}
