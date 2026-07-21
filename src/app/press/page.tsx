import type { Metadata } from "next";
import { SubPageLayout } from "@/components/site/sub-page-layout";
import { PressKit } from "@/components/site/press-kit";

export const metadata: Metadata = {
  title: "Press Kit | Where Evil Dwells",
  description:
    "Press kit for Where Evil Dwells: Perdition Awaits — download book cover, author headshot, press release, and fact sheet.",
  keywords: ["press kit", "media resources", "press release", "book cover download", "author headshot"],
};

export default function PressPage() {
  return (
    <SubPageLayout title="Press Kit" label="MEDIA RESOURCES">
      <PressKit />
    </SubPageLayout>
  );
}