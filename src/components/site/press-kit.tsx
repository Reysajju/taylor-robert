"use client";

import { useState } from "react";
import { Reveal } from "./reveal";
import { ContactTrigger } from "./contact-modal";
import {
  Download,
  ImageIcon,
  FileText,
  User,
  BookOpen,
  Check,
} from "lucide-react";

const PRESS_ASSETS = [
  {
    icon: <ImageIcon className="h-5 w-5" />,
    title: "Book Cover",
    description: "High-resolution cover image (JPG, print-ready)",
    format: "JPG · 3000 × 4500px",
    status: "ready" as const,
  },
  {
    icon: <User className="h-5 w-5" />,
    title: "Author Headshot",
    description: "Professional portrait of Robert B. Taylor",
    format: "JPG · 1728 × 2066px",
    status: "ready" as const,
  },
  {
    icon: <FileText className="h-5 w-5" />,
    title: "Press Release",
    description: "Official announcement and book summary",
    format: "PDF · 2 pages",
    status: "ready" as const,
  },
  {
    icon: <BookOpen className="h-5 w-5" />,
    title: "Fact Sheet",
    description: "Key details: synopsis, specs, bio, contacts",
    format: "PDF · 1 page",
    status: "ready" as const,
  },
];

function AssetCard({
  asset,
  onDownload,
  downloading,
}: {
  asset: (typeof PRESS_ASSETS)[0];
  onDownload: () => void;
  downloading: boolean;
}) {
  return (
    <div className="group relative border border-paper/10 bg-charcoal-soft/50 p-6 corner-brackets transition-all duration-500 hover:border-gold/30 hover:bg-charcoal-soft sm:p-7 overflow-hidden">
      {/* Corner accent on hover */}
      <div className="absolute right-0 top-0 h-8 w-8 border-r-2 border-t-2 border-gold/0 transition-all duration-500 group-hover:border-gold/40" aria-hidden />

      <div className="flex items-start gap-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-gold/20 text-gold/60 transition-all duration-300 group-hover:border-gold/50 group-hover:text-gold group-hover:shadow-[0_0_12px_rgba(176,141,87,0.08)]">
          {asset.icon}
        </span>
        <div className="flex-1 min-w-0">
          <h3 className="font-display text-base font-semibold tracking-display text-paper transition-colors duration-300 group-hover:text-gold">
            {asset.title}
          </h3>
          <p className="mt-1 font-body text-sm leading-relaxed text-paper-mute/70">
            {asset.description}
          </p>
          <div className="mt-3 flex items-center gap-3">
            <span className="font-mono-dossier text-[0.5rem] tracking-label text-paper-mute/40">
              {asset.format}
            </span>
          </div>
        </div>
        <button
          onClick={onDownload}
          disabled={downloading}
          className="flex h-9 w-9 shrink-0 items-center justify-center border border-paper/15 text-paper-mute/50 transition-all duration-300 hover:border-gold/50 hover:text-gold hover:shadow-[0_0_12px_rgba(176,141,87,0.08)] disabled:opacity-40"
          aria-label={`Download ${asset.title}`}
        >
          {downloading ? (
            <Check className="h-4 w-4 text-gold" />
          ) : (
            <Download className="h-4 w-4" />
          )}
        </button>
      </div>
    </div>
  );
}

export function PressKit() {
  const [downloadingIndex, setDownloadingIndex] = useState<number | null>(null);

  const handleDownload = (index: number) => {
    setDownloadingIndex(index);
    setTimeout(() => setDownloadingIndex(null), 2000);
  };

  return (
    <section
      id="press"
      className="concrete-texture section-transition scan-line relative overflow-hidden border-t border-paper/10 bg-charcoal-soft py-24 sm:py-32"
    >
      <div className="relative z-10 mx-auto max-w-4xl px-5 sm:px-8 lg:px-12">
        <Reveal className="mb-6 flex items-center gap-4">
          <span className="font-mono-dossier text-[0.65rem] tracking-label text-gold">
            MEDIA RESOURCES
          </span>
          <span className="h-px flex-1 bg-paper/10" />
        </Reveal>

        <Reveal>
          <h2 className="font-display text-[clamp(2rem,4vw,3.2rem)] font-semibold leading-[1.04] tracking-display text-paper text-glow-gold">
            Press kit
            <span className="text-gold">.</span>
          </h2>
          <p className="mt-5 max-w-xl font-body text-lg leading-relaxed text-paper-mute">
            Everything you need for press coverage, reviews, or event listings.
            All assets are available for editorial use.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {PRESS_ASSETS.map((asset, i) => (
              <AssetCard
                key={asset.title}
                asset={asset}
                onDownload={() => handleDownload(i)}
                downloading={downloadingIndex === i}
              />
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-10 border-t border-paper/10 pt-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-mono-dossier text-[0.55rem] tracking-label text-paper-mute/50">
                  PRESS INQUIRIES
                </p>
                <p className="mt-1 font-body text-sm text-paper-mute/70">
                  For interviews, review copies, or event bookings, reach out via
                  the newsletter form below.
                </p>
              </div>
              <ContactTrigger
                className="inline-flex items-center justify-center border border-paper/30 px-5 py-3 font-mono-dossier text-[0.65rem] tracking-label text-paper transition-all duration-300 hover:border-gold hover:bg-gold/10 hover:text-gold"
              >
                GET IN TOUCH
              </ContactTrigger>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}