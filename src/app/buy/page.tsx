import type { Metadata } from "next";
import { SubPageLayout } from "@/components/site/sub-page-layout";
import { BuySection } from "@/components/site/buy-section";
import { Newsletter } from "@/components/site/newsletter";

export const metadata: Metadata = {
  title: "Buy the Book | Where Evil Dwells",
  description:
    "Purchase Where Evil Dwells: Perdition Awaits — available in paperback and ebook on Amazon, Kindle, and Blackwell's.",
  keywords: ["buy the book", "purchase", "paperback", "ebook", "Amazon", "Kindle"],
};

export default function BuyPage() {
  return (
    <SubPageLayout title="Buy the Book" label="§ 05 — ACQUIRE">
      <BuySection />
      <Newsletter />
    </SubPageLayout>
  );
}