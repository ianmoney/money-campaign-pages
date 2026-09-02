#!/usr/bin/env node

import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const REPOSITORY_ROOT = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../..",
);

export const HEALTH_INSURANCE_VIEWPORTS = [
  { name: "desktop-1440", width: 1440, height: 1000 },
  { name: "reference-1117", width: 1117, height: 900 },
  { name: "laptop-1024", width: 1024, height: 900 },
  { name: "tablet-768", width: 768, height: 1024 },
  { name: "mobile-390", width: 390, height: 844 },
  { name: "mobile-360", width: 360, height: 800 },
];

const FORM_CONTAINER_SELECTOR = [
  "[data-health-quote-form-container]",
  "#health-quote-form",
  "#quote-form",
  "[data-testid='health-quote-form']",
].join(",");

const FORM_READY_SELECTOR = [
  "[data-health-form-placeholder]",
  "[data-quote-form-placeholder]",
  "[data-testid='health-form-placeholder']",
  "iframe[data-health-quote-form]",
  "iframe[title*='health insurance' i]",
  "iframe[title*='health quote' i]",
  "[data-health-quote-form-state='ready']",
].join(",");

const CTA_SELECTOR = [
  "[data-health-quote-cta]",
  "a[href='#health-quote-form']",
  "button[aria-label='Compare now']",
].join(",");

function serialiseError(error) {
  return error instanceof Error
    ? { name: error.name, message: error.message, stack: error.stack }
    : { name: "Error", message: String(error) };
}

function normaliseBaseUrl(value) {
  const url = new URL(value || "http://127.0.0.1:3000");
  url.pathname = url.pathname.replace(/\/$/, "");
  return url;
}

async function waitForPageAssets(page) {
  await page.evaluate(async () => {
    if (document.fonts?.ready) {
      await document.fonts.ready;
    }

    await Promise.all(
      [...document.images].map((image) => {
        if (image.complete) return undefined;
        return new Promise((resolve) => {
          image.addEventListener("load", resolve, { once: true });
          image.addEventListener("error", resolve, { once: true });
        });
      }),
    );
  });
}

async function inspectLayout(page) {
  return page.evaluate((formSelector) => {
    const root = document.documentElement;
    const body = document.body;
    const viewportWidth = root.clientWidth;
    const overflowAmount = Math.max(root.scrollWidth, body.scrollWidth) - viewportWidth;
    const overflowingElements = [...body.querySelectorAll("*")]
      .map((element) => {
        const rectangle = element.getBoundingClientRect();
        return {
          tag: element.tagName.toLowerCase(),
          id: element.id || null,
          className:
            typeof element.className === "string"
              ? element.className.trim().slice(0, 160) || null
              : null,
          left: Math.round(rectangle.left * 100) / 100,
          right: Math.round(rectangle.right * 100) / 100,
          width: Math.round(rectangle.width * 100) / 100,
        };
      })
      .filter(
        (item) =>
          item.width > 0 && (item.left < -1 || item.right > viewportWidth + 1),
      )
      .slice(0, 20);

    const missingImages = [...document.images]
      .filter((image) => image.complete && image.naturalWidth === 0)
      .map((image) => ({ src: image.currentSrc || image.src, alt: image.alt }));

    const form = document.querySelector(formSelector);
    const formRectangle = form?.getBoundingClientRect();
    const iframe = form?.querySelector("iframe") || null;
    const formStyle = form ? getComputedStyle(form) : null;

    return {
      viewport: { width: viewportWidth, height: window.innerHeight },
      document: {
        scrollWidth: Math.max(root.scrollWidth, body.scrollWidth),
        scrollHeight: Math.max(root.scrollHeight, body.scrollHeight),
      },
      horizontalOverflow: overflowAmount > 1,
      horizontalOverflowPixels: Math.max(0, overflowAmount),
      overflowingElements,
      missingImages,
      form: formRectangle
        ? {
            found: true,
            x: formRectangle.x,
            y: formRectangle.y + window.scrollY,
            width: formRectangle.width,
            height: formRectangle.height,
            overflowX: formStyle?.overflowX,
            overflowY: formStyle?.overflowY,
            iframe: iframe
              ? {
                  title: iframe.getAttribute("title"),
                  height: iframe.getBoundingClientRect().height,
                  scrolling: iframe.getAttribute("scrolling"),
                }
              : null,
          }
        : { found: false },
    };
  }, FORM_CONTAINER_SELECTOR);
}

async function findCompareNowCta(page) {
  const explicitCta = page.locator(CTA_SELECTOR).first();
  if (await explicitCta.count()) return explicitCta;

  const accessibleCta = page.getByRole("link", { name: /^compare now$/i }).first();
  if (await accessibleCta.count()) return accessibleCta;

  return page.getByRole("button", { name: /^compare now$/i }).first();
}

async function checkKeyboardAndCta(page) {
  const cta = await findCompareNowCta(page);
  if (!(await cta.count()) || !(await cta.isVisible())) {
    return {
      passed: false,
      ctaFound: false,
      ctaReachedByTab: false,
      ctaActivatedByKeyboard: false,
      formFocused: false,
      formInViewport: false,
      tabStops: [],
      errors: ["A visible Compare now CTA was not found."],
    };
  }

  // Start immediately after the CTA in the page-level tab order and reverse-tab
  // onto it. This exercises real keyboard navigation without entering or
  // inspecting the separately owned questionnaire iframe/component.
  const keyboardSetup = await cta.evaluate((ctaNode, formSelector) => {
    const form = document.querySelector(formSelector);
    const candidates = [...document.querySelectorAll(
      "a[href],button,input,select,textarea,iframe,[tabindex]:not([tabindex='-1'])",
    )].filter((element) => {
      if (!(element instanceof HTMLElement)) return false;
      if (form?.contains(element)) return false;
      if (element.matches(":disabled,[aria-hidden='true']")) return false;
      const style = getComputedStyle(element);
      const rectangle = element.getBoundingClientRect();
      return style.visibility !== "hidden" && style.display !== "none" && rectangle.width > 0;
    });
    const ctaIndex = candidates.indexOf(ctaNode);
    const next = ctaIndex >= 0 ? candidates[ctaIndex + 1] : null;

    if (next instanceof HTMLElement) {
      next.focus();
      return { direction: "backward", adjacentTargetFound: true };
    }

    if (ctaNode instanceof HTMLElement) {
      ctaNode.focus();
    }
    return { direction: "roundTrip", adjacentTargetFound: false };
  }, FORM_CONTAINER_SELECTOR);

  const tabStops = [];
  if (keyboardSetup.direction === "backward") {
    await page.keyboard.press("Shift+Tab");
  } else {
    await page.keyboard.press("Shift+Tab");
    await page.keyboard.press("Tab");
  }

  const focusedStop = await page.evaluate(() => {
    const active = document.activeElement;
    if (!(active instanceof HTMLElement)) return null;
    return {
      tag: active.tagName.toLowerCase(),
      id: active.id || null,
      text: (active.innerText || active.getAttribute("aria-label") || "")
        .trim()
        .replace(/\s+/g, " ")
        .slice(0, 100),
      href: active instanceof HTMLAnchorElement ? active.getAttribute("href") : null,
    };
  });
  if (focusedStop) tabStops.push(focusedStop);

  const ctaReachedByTab = await cta.evaluate(
    (node) => node === document.activeElement,
  );

  if (!ctaReachedByTab) {
    await cta.focus();
  }

  const scrollBeforeActivation = await page.evaluate(() => window.scrollY);
  await page.keyboard.press("Enter");
  await page.waitForTimeout(650);

  const activation = await page.evaluate((formSelector) => {
    const form = document.querySelector(formSelector);
    const active = document.activeElement;
    if (!(form instanceof HTMLElement)) {
      return {
        formFound: false,
        scrollY: window.scrollY,
        formFocused: false,
        formInViewport: false,
        activeElement: active?.tagName.toLowerCase() || null,
      };
    }

    const rectangle = form.getBoundingClientRect();
    const formFocused =
      active === form ||
      (active instanceof Node && form.contains(active)) ||
      (active instanceof HTMLIFrameElement && form.contains(active));

    return {
      formFound: true,
      scrollY: window.scrollY,
      formFocused,
      formInViewport:
        rectangle.top < window.innerHeight && rectangle.bottom > 0,
      formTop: rectangle.top,
      activeElement: active?.tagName.toLowerCase() || null,
      activeElementId: active instanceof HTMLElement ? active.id || null : null,
    };
  }, FORM_CONTAINER_SELECTOR);

  const errors = [];
  if (!ctaReachedByTab) errors.push("Compare now was not reached in the tab sequence.");
  if (!activation.formFound) errors.push("The form container was not found after CTA activation.");
  if (!activation.formInViewport) errors.push("CTA activation did not bring the form into view.");
  if (!activation.formFocused) errors.push("CTA activation did not move focus into the form boundary.");

  return {
    passed: errors.length === 0,
    ctaFound: true,
    ctaReachedByTab,
    ctaActivatedByKeyboard: activation.formInViewport,
    formFocused: activation.formFocused,
    formInViewport: activation.formInViewport,
    scrollBeforeActivation,
    scrollAfterActivation: activation.scrollY,
    activeElement: activation.activeElement,
    activeElementId: activation.activeElementId,
    adjacentKeyboardTargetFound: keyboardSetup.adjacentTargetFound,
    tabStops,
    errors,
  };
}

async function verifyViewport(browser, baseUrl, viewport, screenshotDirectory) {
  const context = await browser.newContext({
    viewport: { width: viewport.width, height: viewport.height },
    colorScheme: "light",
    reducedMotion: "reduce",
    locale: "en-AU",
  });
  const page = await context.newPage();
  const consoleMessages = [];
  const pageErrors = [];
  const failedRequests = [];
  const httpErrors = [];
  const pageOrigin = baseUrl.origin;

  const isFirstParty = (url) => {
    try {
      return new URL(url).origin === pageOrigin;
    } catch {
      return false;
    }
  };

  page.on("console", (message) => {
    if (message.type() === "warning" || message.type() === "error") {
      consoleMessages.push({
        type: message.type(),
        text: message.text(),
        location: message.location(),
      });
    }
  });
  page.on("pageerror", (error) => pageErrors.push(serialiseError(error)));
  page.on("requestfailed", (request) => {
    failedRequests.push({
      url: request.url(),
      method: request.method(),
      resourceType: request.resourceType(),
      firstParty: isFirstParty(request.url()),
      errorText: request.failure()?.errorText || "unknown",
    });
  });
  page.on("response", (response) => {
    if (response.status() >= 400) {
      httpErrors.push({
        url: response.url(),
        status: response.status(),
        resourceType: response.request().resourceType(),
        firstParty: isFirstParty(response.url()),
      });
    }
  });

  const result = {
    name: viewport.name,
    width: viewport.width,
    height: viewport.height,
    url: new URL("health-insurance", `${baseUrl.href}/`).href,
    screenshot: path.join(screenshotDirectory, `${viewport.name}.png`),
    consoleMessages,
    pageErrors,
    failedRequests,
    httpErrors,
    readiness: { formReady: false, fontsAndImagesReady: false },
    layout: null,
    interaction: null,
    errors: [],
    passed: false,
  };

  try {
    const response = await page.goto(result.url, {
      waitUntil: "domcontentloaded",
      timeout: 30_000,
    });
    if (!response || !response.ok()) {
      result.errors.push(`Page response was ${response?.status() ?? "unavailable"}.`);
    }

    await page.locator(FORM_CONTAINER_SELECTOR).first().waitFor({
      state: "visible",
      timeout: 15_000,
    });
    await page.locator(FORM_READY_SELECTOR).first().waitFor({
      state: "visible",
      timeout: 15_000,
    });
    result.readiness.formReady = true;

    await waitForPageAssets(page);
    result.readiness.fontsAndImagesReady = true;
    result.layout = await inspectLayout(page);

    // Capture the deterministic comparison state before the interaction check
    // deliberately moves focus to the form boundary.
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({
      path: result.screenshot,
      fullPage: true,
      animations: "disabled",
    });

    result.interaction = await checkKeyboardAndCta(page);

    if (result.layout.horizontalOverflow) {
      result.errors.push(
        `Horizontal overflow: ${result.layout.horizontalOverflowPixels}px.`,
      );
    }
    if (!result.layout.form.found) {
      result.errors.push("Form container is missing.");
    }
    if (result.layout.missingImages.length) {
      result.errors.push(`${result.layout.missingImages.length} image(s) failed to render.`);
    }
    if (pageErrors.length) {
      result.errors.push(`${pageErrors.length} uncaught page error(s).`);
    }

    const firstPartyFailures = [
      ...failedRequests.filter((request) => request.firstParty),
      ...httpErrors.filter((responseError) => responseError.firstParty),
    ];
    if (firstPartyFailures.length) {
      result.errors.push(`${firstPartyFailures.length} first-party request failure(s).`);
    }
    if (consoleMessages.some((message) => message.type === "error")) {
      result.errors.push("The browser console contains error messages.");
    }
    if (!result.interaction.passed) {
      result.errors.push(...result.interaction.errors);
    }

    result.passed = result.errors.length === 0;
  } catch (error) {
    result.errors.push(serialiseError(error).message);
    try {
      await page.screenshot({
        path: result.screenshot,
        fullPage: true,
        animations: "disabled",
      });
    } catch (screenshotError) {
      result.errors.push(`Screenshot failed: ${serialiseError(screenshotError).message}`);
    }
  } finally {
    await context.close();
  }

  return result;
}

export async function runHealthInsuranceVerification({
  browser,
  baseURL = process.env.BASE_URL || "http://127.0.0.1:3000",
  outputDirectory = path.join(REPOSITORY_ROOT, "artifacts/verification"),
  viewports = HEALTH_INSURANCE_VIEWPORTS,
} = {}) {
  if (!browser) throw new Error("A Playwright Browser instance is required.");

  const startedAt = new Date().toISOString();
  const baseUrl = normaliseBaseUrl(baseURL);
  const screenshotDirectory = path.join(outputDirectory, "screenshots");
  await mkdir(screenshotDirectory, { recursive: true });

  const results = [];
  for (const viewport of viewports) {
    results.push(
      await verifyViewport(browser, baseUrl, viewport, screenshotDirectory),
    );
  }

  const finishedAt = new Date().toISOString();
  const report = {
    schemaVersion: 1,
    route: "/health-insurance",
    baseURL: baseUrl.href,
    startedAt,
    finishedAt,
    passed: results.every((result) => result.passed),
    summary: {
      viewportCount: results.length,
      passedViewportCount: results.filter((result) => result.passed).length,
      consoleErrors: results.reduce(
        (count, result) =>
          count + result.consoleMessages.filter((message) => message.type === "error").length,
        0,
      ),
      consoleWarnings: results.reduce(
        (count, result) =>
          count + result.consoleMessages.filter((message) => message.type === "warning").length,
        0,
      ),
      pageErrors: results.reduce((count, result) => count + result.pageErrors.length, 0),
      firstPartyRequestFailures: results.reduce(
        (count, result) =>
          count +
          result.failedRequests.filter((request) => request.firstParty).length +
          result.httpErrors.filter((responseError) => responseError.firstParty).length,
        0,
      ),
      overflowingViewports: results.filter(
        (result) => result.layout?.horizontalOverflow,
      ).length,
      missingImages: results.reduce(
        (count, result) => count + (result.layout?.missingImages.length || 0),
        0,
      ),
      ctaFailures: results.filter((result) => !result.interaction?.passed).length,
    },
    results,
  };

  await writeFile(
    path.join(outputDirectory, "latest.json"),
    `${JSON.stringify(report, null, 2)}\n`,
    "utf8",
  );
  return report;
}

async function loadPlaywright() {
  try {
    return await import("playwright");
  } catch (playwrightError) {
    try {
      return await import("@playwright/test");
    } catch {
      throw new Error(
        "Playwright is not installed. Add @playwright/test, run `npx playwright install chromium`, then retry.",
        { cause: playwrightError },
      );
    }
  }
}

async function runFromCommandLine() {
  const { chromium } = await loadPlaywright();
  const browser = await chromium.launch({ headless: true });
  try {
    const report = await runHealthInsuranceVerification({ browser });
    process.stdout.write(
      `Health insurance verification: ${report.passed ? "PASS" : "FAIL"}\n` +
        `Report: ${path.join(REPOSITORY_ROOT, "artifacts/verification/latest.json")}\n`,
    );
    process.exitCode = report.passed ? 0 : 1;
  } finally {
    await browser.close();
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  runFromCommandLine().catch((error) => {
    process.stderr.write(`${serialiseError(error).message}\n`);
    process.exitCode = 1;
  });
}
