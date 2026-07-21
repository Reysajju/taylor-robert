import type { Metadata } from "next";
import { SubPageLayout } from "@/components/site/sub-page-layout";
import { AudioPreview } from "@/components/site/audio-preview";

export const metadata: Metadata = {
  title: "Audio Preview | Where Evil Dwells",
  description:
    "Listen to AI-narrated excerpts from Where Evil Dwells. Hear the opening pages of this true-crime investigation.",
  keywords: ["audio preview", "audiobook", "narrated excerpt", "true crime audio"],
};

export default function AudioPage() {
  return (
    <SubPageLayout title="Audio Preview" label="AUDIO PREVIEW">
      <AudioPreview />
    </SubPageLayout>
  );
}