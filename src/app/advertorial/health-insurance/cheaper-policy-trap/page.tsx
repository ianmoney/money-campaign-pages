import type { Metadata } from 'next';
import { FormPanel } from '@/components/health-insurance/FormPanel';
import {
  LegalFooter,
  MinimalHeader,
} from '@/components/health-insurance/HealthInsuranceLandingPage';
import healthInsuranceStyles from '@/components/health-insurance/health-insurance.module.css';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'The cheaper health insurance trap | Money.com.au',
  description:
    'A practical guide to comparing health insurance premiums, excesses and Extras based on how you are likely to use your cover.',
  robots: 'noindex,follow',
};

export default function CheaperPolicyTrapPage() {
  return (
    <div className={`${styles.page} ${healthInsuranceStyles.page}`}>
      <MinimalHeader />

      <article>
        <header className={styles.articleHero}>
          <p className={styles.eyebrow}>Health insurance guide</p>
          <h1>The cheaper health insurance trap (and how to avoid it)</h1>
          <p className={styles.dek}>
            A lower monthly premium can look great. But it might not be the cheapest option once you actually use your cover.
          </p>
          <div className={styles.byline}>
            <img className={styles.avatar} src="/money-icon.svg" alt="" aria-hidden="true" />
            <span>
              <strong>By the Money.com.au team</strong>
              <small>5 min read</small>
            </span>
          </div>
        </header>

        <figure className={styles.heroImage}>
          <img
            src="/advertorial/health-insurance/cheaper-policy-trap/hero-family.webp"
            alt="An older couple sitting on a couch with two children"
          />
        </figure>

        <div className={styles.articleColumn}>
          <p>When you&apos;re comparing health insurance, it&apos;s hard not to start with the monthly premium.</p>
          <p>If one policy is $20 or $30 less each month, that looks like a pretty straightforward saving. And if you barely use your cover, it might genuinely work out cheaper.</p>
          <p>But the premium only tells you what it costs to keep the policy. It doesn&apos;t tell you much about what happens when you actually use it.</p>
          <p>And that&apos;s where things can change.</p>
          <p>Many people go years without a hospital visit. But they might still use Extras for the everyday stuff: a dental check-up, new glasses, a few physio appointments or a filling.</p>
          <p>Two policies can look similar on the surface and still give you very different value once you start claiming.</p>
        </div>

        <aside className={styles.summaryStrip} aria-label="Short summary">
          <div>
            <strong>No time to read?</strong>
            <p>Don&apos;t just compare the monthly premium. Look at the excess, the Extras you actually use, and what each policy may give you back.</p>
          </div>
          <a className={styles.textCta} href="#compare">Compare health insurance <span aria-hidden="true">→</span></a>
        </aside>

        <div className={styles.articleColumn}>
          <h2>Why the cheapest premium can be misleading</h2>
          <p>Imagine one policy is cheaper each month, but has a higher hospital excess and fairly basic Extras. Another costs a bit more, but has a lower excess and gives you more back on services you actually use.</p>
          <p>If you don&apos;t claim anything, the cheaper policy wins. Simple.</p>
          <p>But once you add a few physio visits, glasses, dental or a hospital admission, some of that premium saving can disappear pretty quickly.</p>
          <p>That doesn&apos;t mean the more expensive policy is automatically better. It isn&apos;t.</p>
          <p>It just means the better question isn&apos;t only <strong>“Which policy costs less each month?”</strong></p>
          <p>It&apos;s also <strong>“What am I likely to pay and get back based on how I actually use my cover?”</strong></p>

          <h2>A simpler way to think about it</h2>
          <p>You don&apos;t need a spreadsheet. Start with three questions:</p>
          <ul className={styles.plainList}>
            <li><strong>What am I paying each month?</strong> That&apos;s the obvious one.</li>
            <li><strong>What could I have to pay if I use hospital cover?</strong> Check the excess and any other relevant out-of-pocket costs.</li>
            <li><strong>What am I likely to get back from Extras I actually use?</strong> Think dental, glasses, physio and the annual limits that apply.</li>
          </ul>
          <p>Those three things won&apos;t tell you everything about a policy, but they&apos;ll give you a much better starting point than the premium on its own.</p>

          <h2>Extras are where this gets a lot more everyday</h2>
          <p>Hospital cover gets most of the attention because the bills can be big. But many people go years without a hospital visit.</p>
          <p>Extras are different. You might use them several times in a normal year.</p>
          <p>Think dental, optical and physio. The amount you get back can vary a lot between policies, and so can the annual limits.</p>
          <p>If you already know you&apos;re likely to get new glasses, see a physio or go to the dentist, it&apos;s worth checking what each policy would actually give you back, not just whether the service appears in the brochure.</p>
          <p>A cheaper Extras policy might give you less back per visit, have lower annual limits or come with different rules around the services you use. A slightly more expensive policy might pay more back on those same things.</p>
          <p>That&apos;s why the cheapest monthly premium can sometimes be a pretty rough shortcut for working out what&apos;s actually cheaper for you.</p>
        </div>

        <section className={styles.example} aria-labelledby="example-title">
          <h2 id="example-title">Here&apos;s a simple example</h2>
          <p>Let&apos;s compare two hypothetical policies.</p>
          <div className={styles.policyIntro}>
            <p><strong>Policy A</strong> costs <strong>$160 a month</strong>, has a <strong>$750 hospital excess</strong> and fairly basic Extras.</p>
            <p><strong>Policy B</strong> costs <strong>$185 a month</strong>, has a <strong>$250 hospital excess</strong> and stronger Extras in this example.</p>
          </div>

          <h3>If you barely use your cover</h3>
          <p>Policy A costs <strong>$1,920</strong> in premiums for the year. Policy B costs <strong>$2,220</strong>.</p>
          <p>So Policy A is <strong>$300 cheaper</strong>. If you don&apos;t claim anything, that&apos;s the end of the story.</p>

          <h3>Now say you use a few common Extras</h3>
          <p>Imagine you have three physio visits, get a new pair of glasses and have a dental check-up.</p>
          <p>In this hypothetical example, Policy A gives you about <strong>$180</strong> back. Policy B gives you about <strong>$450</strong> back.</p>
          <ul className={styles.mathList}>
            <li><strong>Policy A:</strong> $1,920 − $180 = <strong>$1,740</strong></li>
            <li><strong>Policy B:</strong> $2,220 − $450 = <strong>$1,770</strong></li>
          </ul>
          <p>That original $300 premium gap is now down to about <strong>$30</strong>.</p>

          <h3>Now add one hospital admission</h3>
          <p>Say Policy A has a <strong>$750 hospital excess</strong> and Policy B has a <strong>$250 excess</strong>.</p>
          <ul className={styles.mathList}>
            <li><strong>Policy A:</strong> $1,920 + $750 − $180 = <strong>$2,490</strong></li>
            <li><strong>Policy B:</strong> $2,220 + $250 − $450 = <strong>$2,020</strong></li>
          </ul>
          <p>In this example, Policy B ends up <strong>$470 cheaper</strong> for the year.</p>
          <p className={styles.exampleConclusion}><strong>But that&apos;s not the lesson.</strong> It doesn&apos;t mean Policy B is the better policy. If you hardly use Extras and don&apos;t go to hospital, paying the higher premium may not make sense at all. The point is that the answer can change once you look past the monthly price.</p>
        </section>
        <p className={styles.disclaimer}>Illustrative example only. These aren&apos;t real policy quotes or benefit schedules. Premiums, excesses, Extras benefits, annual limits and other out-of-pocket costs vary by policy and circumstances.</p>

        <div className={styles.articleColumn}>
          <h2>What should you actually compare?</h2>
          <p>You don&apos;t need to compare every line of every policy. Start with the bits most likely to affect you and your household:</p>
          <ul className={styles.plainList}>
            <li><strong>Monthly premium:</strong> what does it cost each month?</li>
            <li><strong>Hospital excess:</strong> what could you have to pay if you&apos;re admitted?</li>
            <li><strong>Extras you actually use:</strong> dental, optical, physio and anything else that matters to you.</li>
            <li><strong>Benefits and annual limits:</strong> how much could you get back before you hit the cap?</li>
            <li><strong>Restrictions and exclusions:</strong> is anything missing that you assumed was covered?</li>
          </ul>
          <p>When you&apos;re comparing Extras, focus on the services you&apos;re actually likely to use, what you could get back and the limits that apply. Just having “Extras” on the policy doesn&apos;t automatically make it good value.</p>

          <h2>That&apos;s where Money.com.au comes in</h2>
          <p>Money.com.au helps you compare health insurance options for your situation, so you can look at more than the monthly price.</p>
          <p>Maybe the cheaper policy really is the better-value option for you. Or maybe paying a bit more each month gives you more back on the services you already use, or leaves you with a lower excess if you end up in hospital.</p>
          <p>There&apos;s no one-size-fits-all answer. The useful part is seeing the trade-off before you choose.</p>
        </div>

        <section className={styles.quizSection} id="compare" aria-labelledby="quiz-title" tabIndex={-1}>
          <div className={styles.quizColumn}>
            <p className={styles.eyebrow}>Compare your options</p>
            <h2 id="quiz-title">See how much you could save on your health insurance</h2>
            <p>Answer a few simple questions to compare personalised prices and cover options across 240 policies from 11+ providers.</p>
            <ul className={styles.quizBenefits} aria-label="Health insurance comparison benefits">
              <li>100% Aussie staff</li>
              <li>No markups</li>
              <li>Obligation free</li>
            </ul>
            <div className={styles.quizFrame}>
              <FormPanel />
            </div>
            <p className={styles.panelNote}>Money.com.au doesn&apos;t compare every health insurer or every policy available in Australia. Availability depends on the comparison panel and your circumstances. Policy terms, limits, restrictions and eligibility apply.</p>
          </div>
        </section>

        <section className={`${styles.articleColumn} ${styles.faq}`} aria-labelledby="faq-title">
          <h2 id="faq-title">Common questions</h2>
          <details>
            <summary>Is cheaper health insurance always worse?</summary>
            <p>No. If you use very little cover, a lower premium may genuinely work out cheaper. The point is to compare what you&apos;re paying with what you&apos;re realistically likely to get back.</p>
          </details>
          <details>
            <summary>What Extras should I actually compare?</summary>
            <p>Start with the services you already use or genuinely expect to use, such as dental, optical and physio. Then look at the benefit amount and annual limit, not just whether the service is listed.</p>
          </details>
          <details>
            <summary>Does a higher hospital excess usually mean a lower premium?</summary>
            <p>It can. That&apos;s a common trade-off, but it&apos;s only one part of the policy, so look at it alongside the premium, cover and benefits that matter to you.</p>
          </details>
          <details>
            <summary>What if I hardly ever use Extras?</summary>
            <p>Then paying more for richer Extras may not make much sense for you. That&apos;s exactly why the right option can be different from one person to the next.</p>
          </details>
          <details>
            <summary>Does Money.com.au compare every health fund?</summary>
            <p>No. Money.com.au&apos;s comparison doesn&apos;t include every health fund or every policy available. Use the final approved panel wording at launch.</p>
          </details>
        </section>
      </article>

      <LegalFooter />
    </div>
  );
}
