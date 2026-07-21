import type { Metadata } from "next";
import { SubPageLayout } from "@/components/site/sub-page-layout";
import { Timeline } from "@/components/site/timeline";

export const metadata: Metadata = {
  title: "Timeline | Where Evil Dwells",
  description:
    "A chronology of California's prison-gang crisis from 1951 to the 2000s — the events that shaped Where Evil Dwells.",
  keywords: ["timeline", "chronology", "prison gang history", "California prison timeline"],
};

export default function TimelinePage() {
  return (
    <SubPageLayout title="Timeline" label="CHRONOLOGY">
      <Timeline />
    </SubPageLayout>
  );
}