import { test, expect } from "@playwright/test";

import {
  runHealthInsuranceVerification,
  HEALTH_INSURANCE_VIEWPORTS,
} from "../../scripts/visual-check/health-insurance-verify.mjs";

test.describe("health insurance landing-page verification", () => {
  test.describe.configure({ mode: "serial", timeout: 420_000 });

  test("captures every required viewport and verifies the page boundary", async ({
    browser,
  }) => {
    const report = await runHealthInsuranceVerification({
      browser,
      baseURL: process.env.BASE_URL || "http://127.0.0.1:3000",
    });

    expect(report.results.map(({ width }) => width)).toEqual(
      HEALTH_INSURANCE_VIEWPORTS.map(({ width }) => width),
    );
    expect(
      report.results.every((result) => result.passed && result.errors.length === 0),
      "See artifacts/verification/latest.json for per-viewport evidence.",
    ).toBe(true);
    expect(
      report.passed,
      "One or more viewport checks failed; inspect artifacts/verification/latest.json.",
    ).toBe(true);
  });
});
