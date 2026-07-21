import type { Metadata } from "next";
import { SubPageLayout } from "@/components/site/sub-page-layout";
import { ResearchGallery } from "@/components/site/research-gallery";

export const metadata: Metadata = {
  title: "Behind the Research | Where Evil Dwells",
  description:
    "Photographic evidence and research materials behind Where Evil Dwells — prison corridors, case files, and investigation artifacts.",
  keywords: [
    "research gallery",
    "photographic evidence",
    "prison photos",
    "case files",
    "investigation artifacts",
  ],
};

export default function ResearchPage() {
  return (
    <SubPageLayout title="Behind the Research" label="PHOTOGRAPHIC EVIDENCE">
      <ResearchGallery />
    </SubPageLayout>
  );
}