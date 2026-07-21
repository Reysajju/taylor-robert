import type { Metadata } from "next";
import { SubPageLayout } from "@/components/site/sub-page-layout";
import { FAQ } from "@/components/site/faq";

export const metadata: Metadata = {
  title: "FAQ | Where Evil Dwells",
  description:
    "Frequently asked questions about Where Evil Dwells: Perdition Awaits — from purchasing to academic use.",
  keywords: ["FAQ", "frequently asked questions", "book FAQ", "purchasing questions"],
};

export default function FAQPage() {
  return (
    <SubPageLayout title="FAQ" label="DOSSIER INDEX">
      <FAQ />
    </SubPageLayout>
  );
}