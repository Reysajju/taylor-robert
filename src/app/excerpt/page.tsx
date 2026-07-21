import type { Metadata } from "next";
import { SubPageLayout } from "@/components/site/sub-page-layout";
import { Excerpt } from "@/components/site/excerpt";

export const metadata: Metadata = {
  title: "Book Excerpt | Where Evil Dwells",
  description:
    "Read a declassified excerpt from the Introduction of Where Evil Dwells: Perdition Awaits by Robert B. Taylor.",
  keywords: ["book excerpt", "introduction", "where evil dwells excerpt", "true crime preview"],
};

export default function ExcerptPage() {
  return (
    <SubPageLayout title="Book Excerpt" label="§ 02 — THE EXCERPT">
      <Excerpt />
    </SubPageLayout>
  );
}