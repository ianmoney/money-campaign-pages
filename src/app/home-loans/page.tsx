import type { Metadata } from "next";
import { HomeLoanQuoteEmbed } from "@/components/home-loans/HomeLoanQuoteEmbed";

export const metadata: Metadata = {
  title: "Compare home loans | Money.com.au",
  description: "Answer a few simple questions to compare home loan options with Money.com.au.",
  robots: { index: false, follow: false },
};

export default function HomeLoansPage() {
  return <HomeLoanQuoteEmbed />;
}
