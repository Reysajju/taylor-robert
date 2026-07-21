import type { Metadata } from "next";
import { SubPageLayout } from "@/components/site/sub-page-layout";
import { KeyPlayers } from "@/components/site/key-players";

export const metadata: Metadata = {
  title: "The Prison Gangs | Where Evil Dwells",
  description:
    "Profiles of California's four dominant prison gangs: La EMe, Aryan Brotherhood, Black Guerrilla Family, and Nuestra Familia.",
  keywords: [
    "prison gangs",
    "La EMe",
    "Aryan Brotherhood",
    "Black Guerrilla Family",
    "Nuestra Familia",
  ],
};

export default function SubjectsPage() {
  return (
    <SubPageLayout title="The Prison Gangs" label="SUBJECT FILES">
      <KeyPlayers />
    </SubPageLayout>
  );
}