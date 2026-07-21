import type { Metadata } from "next";
import { SubPageLayout } from "@/components/site/sub-page-layout";
import { AuthorQA } from "@/components/site/author-qa";

export const metadata: Metadata = {
  title: "Author Q&A | Where Evil Dwells",
  description:
    "Robert B. Taylor answers questions about Where Evil Dwells, the prison-gang crisis, and his decades in law enforcement.",
  keywords: ["author Q&A", "interview", "Robert B. Taylor", "law enforcement interview"],
};

export default function AuthorQAPage() {
  return (
    <SubPageLayout title="Author Q&A" label="INTERVIEW TRANSCRIPT">
      <AuthorQA />
    </SubPageLayout>
  );
}