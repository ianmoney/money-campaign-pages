# Health insurance visual verification

This verifier exercises only the `/health-insurance` landing page and its form
integration boundary. It does not inspect, answer, or submit questionnaire fields.

## Required page hooks

Prefer these stable hooks in the landing-page implementation:

- Form boundary: `data-health-quote-form-container` (or `id="health-quote-form"`)
- Development-only screenshot placeholder: `data-health-form-placeholder`
- External iframe: `data-health-quote-form`
- Testable ready state: `data-health-quote-form-state="ready"`
- Testimonial CTA: `data-health-quote-cta`

Fallback selectors support the accessible `Compare now` name and common form IDs,
but explicit hooks make failures easier to diagnose.

## Run

The project integrator must install `@playwright/test` and the Chromium browser;
this verification role intentionally does not change root dependencies or config.

Start the application in screenshot-test/development-placeholder mode, then run:

```sh
BASE_URL=http://127.0.0.1:3000 node scripts/visual-check/health-insurance-verify.mjs
```

Alternatively, use the Playwright test runner:

```sh
BASE_URL=http://127.0.0.1:3000 npx playwright test tests/health-insurance/health-insurance.visual.spec.mjs --workers=1
```

`BASE_URL` may point at a Vercel preview or production deployment. The runner
captures full-page PNGs at 1440, 1117, 1024, 768, 390, and 360 CSS pixels and
writes the machine-readable report to `artifacts/verification/latest.json`.

The report includes font/image readiness, form-boundary geometry, console warnings
and errors, uncaught errors, failed and HTTP-error requests, missing images,
horizontal overflow evidence, keyboard tab stops, and CTA scroll/focus results.

Console warnings are evidence but do not fail the run. Console errors, uncaught
errors, broken first-party requests, missing images, horizontal overflow, missing
form readiness, and failed CTA scroll/focus checks fail the affected viewport.
