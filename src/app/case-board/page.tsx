import type { Metadata } from "next";
import { SubPageLayout } from "@/components/site/sub-page-layout";
import { CaseBoard } from "@/components/site/case-board";

export const metadata: Metadata = {
  title: "Evidence Board | Where Evil Dwells",
  description:
    "Interactive investigation map connecting the gangs, locations, and key figures in Where Evil Dwells.",
  keywords: ["evidence board", "investigation map", "case board", "prison gang connections"],
};

export default function CaseBoardPage() {
  return (
    <SubPageLayout title="Evidence Board" label="EVIDENCE BOARD">
      <CaseBoard />
    </SubPageLayout>
  );
}