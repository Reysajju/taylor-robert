import type { Metadata } from "next";
import { SubPageLayout } from "@/components/site/sub-page-layout";
import { Endorsements } from "@/components/site/endorsements";
import { ReaderReviews } from "@/components/site/reader-reviews";

export const metadata: Metadata = {
  title: "Reviews | Where Evil Dwells",
  description:
    "Reader reviews, advance praise, and endorsements for Where Evil Dwells: Perdition Awaits by Robert B. Taylor.",
  keywords: ["reviews", "endorsements", "reader reviews", "advance praise", "book reviews"],
};

export default function ReviewsPage() {
  return (
    <SubPageLayout title="Reviews" label="FIELD REPORTS">
      <Endorsements />
      <ReaderReviews />
    </SubPageLayout>
  );
}