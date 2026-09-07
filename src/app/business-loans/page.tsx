import type { Metadata } from "next";
import { BusinessLoansLandingPage } from "@/components/business-loans";

export const metadata: Metadata = {
  title: "Compare Business Loans | Money.com.au",
  description:
    "Compare your best business loan options from 50+ lenders in Australia.",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function BusinessLoansPage() {
  return <BusinessLoansLandingPage />;
}
