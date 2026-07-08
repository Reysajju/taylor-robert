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

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://whereevildwells.com";
const BOOK_IMAGE = `${SITE_URL}/assets/book-cover-real@2x.jpg`;

const SITE_DESCRIPTION =
  "Inside the gangs that rule California's prisons — and the men who dared to stand against them. A true-crime work of investigative nonfiction by Robert B. Taylor.";

const SITE_TITLE = "Where Evil Dwells: Perdition Awaits — Robert B. Taylor";

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
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
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: "Where Evil Dwells",
    images: [
      {
        url: BOOK_IMAGE,
        width: 1002,
        height: 1503,
        alt: "Where Evil Dwells: Perdition Awaits — Book Cover",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [BOOK_IMAGE],
  },
  metadataBase: new URL(SITE_URL),
};

function JsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Book",
    name: "Where Evil Dwells: Perdition Awaits",
    author: {
      "@type": "Person",
      name: "Robert B. Taylor",
      jobTitle:
        "Former LAPD Officer, Former Chief of L.A. County Probation Department",
    },
    publisher: {
      "@type": "Organization",
      name: "Wadsworth Publishing",
    },
    bookFormat: "Paperback",
    numberOfPages: 289,
    genre: "True Crime",
    isbn: "",
    description:
      "Inside the gangs that rule California's prisons — and the men who dared to stand against them.",
    datePublished: "2026",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

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
        <JsonLd />
        <Toaster />
      </body>
    </html>
  );
}
