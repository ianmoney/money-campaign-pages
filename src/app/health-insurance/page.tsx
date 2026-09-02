import type { Metadata } from "next";
import { HealthInsuranceLandingPage } from "@/components/health-insurance";

export const metadata: Metadata = {
  title: "Compare Health Insurance | Money.com.au",
  description:
    "Compare personalised health insurance prices and cover options from 11+ providers.",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function HealthInsurancePage() {
  return <HealthInsuranceLandingPage />;
}
