import type { Metadata } from "next";
import { SubPageLayout } from "@/components/site/sub-page-layout";
import { EventsSection } from "@/components/site/events-section";

export const metadata: Metadata = {
  title: "Events | Where Evil Dwells",
  description:
    "Upcoming book readings, signings, and public appearances for Where Evil Dwells by Robert B. Taylor.",
  keywords: ["events", "book readings", "book signings", "public appearances", "author events"],
};

export default function EventsPage() {
  return (
    <SubPageLayout title="Events" label="EVENT LOG">
      <EventsSection />
    </SubPageLayout>
  );
}