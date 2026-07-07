import type { Metadata } from "next";
import { Fraunces, Source_Serif_4, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Where Evil Dwells — Perdition Awaits | Robert B. Taylor",
  description:
    "Inside the gangs that rule California's prisons — and the men who dared to stand against them. A work of true-crime nonfiction by Robert B. Taylor, published by Wadsworth.",
  keywords: [
    "Where Evil Dwells",
    "Perdition Awaits",
    "Robert B. Taylor",
    "true crime",
    "prison gangs",
    "Mexican Mafia",
    "Aryan Brotherhood",
    "Black Guerrilla Family",
    "Nuestra Familia",
    "California prisons",
    "Wadsworth",
  ],
  authors: [{ name: "Robert B. Taylor" }],
  openGraph: {
    title: "Where Evil Dwells — Perdition Awaits",
    description:
      "Inside the gangs that rule California's prisons — and the men who dared to stand against them.",
    type: "book",
    siteName: "Where Evil Dwells",
  },
  twitter: {
    card: "summary_large_image",
    title: "Where Evil Dwells — Perdition Awaits",
    description:
      "Inside the gangs that rule California's prisons — and the men who dared to stand against them.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body
        className={`${fraunces.variable} ${sourceSerif.variable} ${plexMono.variable} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
