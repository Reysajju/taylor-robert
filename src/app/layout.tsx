import type { Metadata, Viewport } from "next";
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

export const viewport: Viewport = {
  themeColor: "#0f0f0e",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://whereevildwells.com";
const BOOK_IMAGE = `${SITE_URL}/assets/book-cover-real@2x.jpg`;

const SITE_DESCRIPTION =
  "Inside the gangs that rule California's prisons — and the men who dared to stand against them. A true-crime work of investigative nonfiction by Robert B. Taylor, former LAPD officer and Chief of L.A. County Probation.";

const SITE_TITLE = "Where Evil Dwells: Perdition Awaits — Robert B. Taylor";

export const metadata: Metadata = {
  title: {
    default: SITE_TITLE,
    template: "%s | Where Evil Dwells",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "true crime book",
    "true crime nonfiction",
    "Where Evil Dwells",
    "Perdition Awaits",
    "Robert B. Taylor",
    "prison gangs",
    "Mexican Mafia",
    "La EMe",
    "Aryan Brotherhood",
    "Black Guerrilla Family",
    "Nuestra Familia",
    "California prisons",
    "California correctional system",
    "prison gang history",
    "criminal justice",
    "investigative nonfiction",
    "LAPD",
    "Los Angeles crime",
    "gang intelligence",
    "prison reform",
    "Wadsworth Publishing",
    "book about prison gangs",
    "true crime author",
    "criminal justice book",
    "gang task force",
    "prison violence",
    "mass incarceration",
    "crime book 2026",
    "new true crime releases",
  ],
  authors: [{ name: "Robert B. Taylor", url: `${SITE_URL}/author` }],
  creator: "Robert B. Taylor",
  publisher: "Wadsworth Publishing",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/icon.png",
    apple: "/apple-touch-icon.png",
  },
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
        alt: "Where Evil Dwells: Perdition Awaits — Book Cover by Robert B. Taylor",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [BOOK_IMAGE],
  },
  metadataBase: new URL(SITE_URL),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
  category: "Books",
};

function SiteJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Book",
        "@id": `${SITE_URL}/#book`,
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
        bookFormat: ["Paperback", "EBook"],
        numberOfPages: 289,
        genre: ["True Crime", "Investigative Nonfiction", "Criminal Justice"],
        description:
          "Inside the gangs that rule California's prisons — and the men who dared to stand against them. A true-crime work of investigative nonfiction by Robert B. Taylor.",
        datePublished: "2026",
        inLanguage: "en",
        image: BOOK_IMAGE,
        url: SITE_URL,
        offers: {
          "@type": "AggregateOffer",
          lowPrice: "14.99",
          highPrice: "24.99",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "Where Evil Dwells: Perdition Awaits",
        description: SITE_DESCRIPTION,
        publisher: {
          "@type": "Organization",
          name: "Wadsworth Publishing",
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${SITE_URL}/#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: SITE_URL,
          },
        ],
      },
    ],
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
        <SiteJsonLd />
        <Toaster />
      </body>
    </html>
  );
}
