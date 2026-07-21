import type { Metadata } from "next";
import { SubPageLayout } from "@/components/site/sub-page-layout";
import { ChapterPreview } from "@/components/site/chapter-preview";

export const metadata: Metadata = {
  title: "Chapters | Where Evil Dwells",
  description:
    "Explore all 12 chapters of Where Evil Dwells — from the birth of California's prison gangs to the task forces that fought back.",
  keywords: ["chapters", "table of contents", "book chapters", "prison gang chapters"],
};

export default function ChaptersPage() {
  return (
    <SubPageLayout title="Chapters" label="DOSSIER CONTENTS">
      <ChapterPreview />
    </SubPageLayout>
  );
}