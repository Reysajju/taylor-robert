import type { Metadata } from "next";
import { SubPageLayout } from "@/components/site/sub-page-layout";
import { RelatedWorks } from "@/components/site/related-works";

export const metadata: Metadata = {
  title: "Further Reading | Where Evil Dwells",
  description:
    "Essential books and reports that shaped the research behind Where Evil Dwells — from Tony Rafael to Michelle Alexander.",
  keywords: ["further reading", "related books", "research sources", "prison gang literature", "bibliography"],
};

export default function RelatedPage() {
  return (
    <SubPageLayout title="Further Reading" label="FURTHER READING">
      <RelatedWorks />
    </SubPageLayout>
  );
}