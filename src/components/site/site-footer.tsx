"use client";

import Link from "next/link";
import { Reveal } from "./reveal";
import { ContactTrigger } from "./contact-modal";
import { GOODREADS_URL } from "@/lib/retailers";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Chapters", href: "/chapters" },
  { label: "Excerpt", href: "/excerpt" },
  { label: "Timeline", href: "/timeline" },
  { label: "Evidence Board", href: "/case-board" },
  { label: "The Prison Gangs", href: "/subjects" },
  { label: "Author Q&A", href: "/author-qa" },
  { label: "Reviews", href: "/reviews" },
];

const EXPLORE_LINKS = [
  { label: "Audio Preview", href: "/audio" },
  { label: "FAQ", href: "/faq" },
  { label: "Press Kit", href: "/press" },
  { label: "Behind the Research", href: "/research" },
  { label: "Further Reading", href: "/related" },
  { label: "Events", href: "/events" },
  { label: "Buy the Book", href: "/buy" },
];

const RETAILERS = [
  { label: "Goodreads", href: GOODREADS_URL },
  { label: "Amazon", href: "https://www.amazon.com/WHERE-EVIL-DWELLS-PERDITION-AWAITS/dp/B0H2KK7RJQ" },
  { label: "Blackwell's", href: "https://blackwells.co.uk/bookshop/search/author/%20Robert%20Taylor" },
];

export function SiteFooter() {
  return (
    <footer className="grain-overlay relative overflow-hidden border-t border-paper/10 bg-charcoal-deep">
      <div className="relative z-10 mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-12">
        {/* Top: stamp + tagline */}
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-10 border-b border-paper/10 pb-12 lg:flex-row lg:items-center">
            <div>
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center border border-gold/50 font-display text-base font-semibold text-gold">
                  R
                </span>
                <div className="leading-tight">
                  <p className="font-display text-lg font-semibold tracking-display text-paper">
                    Where Evil Dwells
                  </p>
                  <p className="font-mono-dossier text-[0.55rem] tracking-label text-gold/80">
                    PERDITION AWAITS
                  </p>
                </div>
              </div>
              <p className="mt-5 max-w-sm font-body text-base leading-relaxed text-paper-mute">
                True-crime nonfiction by Robert B. Taylor. Published by
                Wadsworth.
              </p>
            </div>

            {/* Dossier stamp */}
            <div className="relative">
              <div className="flex rotate-[-4deg] items-center gap-3 border-2 border-rust/50 px-5 py-3">
                <span className="font-mono-dossier text-[0.6rem] tracking-label text-rust">
                  CASE CLOSED.
                  <br />
                  STORY OPEN.
                </span>
                <span className="h-8 w-px bg-rust/40" />
                <span className="font-mono-dossier text-[0.5rem] tracking-label text-paper-mute/60">
                  FILE № 04
                  <br />
                  2026
                </span>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Middle: nav columns */}
        <Reveal delay={0.05}>
          <div className="grid grid-cols-1 gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="font-mono-dossier mb-4 text-[0.55rem] tracking-label text-paper-mute/50">
                NAVIGATE
              </p>
              <ul className="space-y-2.5">
                {NAV_LINKS.map((n) => (
                  <li key={n.href}>
                    <Link
                      href={n.href}
                      className="link-underline font-body text-base text-paper-mute hover:text-paper"
                    >
                      {n.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="font-mono-dossier mb-4 text-[0.55rem] tracking-label text-paper-mute/50">
                EXPLORE
              </p>
              <ul className="space-y-2.5">
                {EXPLORE_LINKS.map((n) => (
                  <li key={n.href}>
                    <Link
                      href={n.href}
                      className="link-underline font-body text-base text-paper-mute hover:text-paper"
                    >
                      {n.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="font-mono-dossier mb-4 text-[0.55rem] tracking-label text-paper-mute/50">
                PURCHASE
              </p>
              <ul className="space-y-2.5">
                {RETAILERS.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-underline font-body text-base text-paper-mute hover:text-paper"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="font-mono-dossier mb-4 text-[0.55rem] tracking-label text-paper-mute/50">
                IMPRINT
              </p>
              <ul className="space-y-2.5 font-body text-base text-paper-mute">
                <li>Wadsworth Publishing</li>
                <li>True Crime / Criminal Justice</li>
                <li>Paperback &middot; 289 pages</li>
                <li>First Edition &middot; 2026</li>
              </ul>
            </div>
          </div>
        </Reveal>

        {/* Inquiries row */}
        <Reveal delay={0.1}>
          <div className="border-t border-paper/10 py-8">
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
              <ContactTrigger className="link-underline font-mono-dossier text-[0.6rem] tracking-label text-paper-mute hover:text-paper">
                Press &amp; media
              </ContactTrigger>
              <span className="hidden h-4 w-px bg-paper/10 sm:block" />
              <ContactTrigger className="link-underline font-mono-dossier text-[0.6rem] tracking-label text-paper-mute hover:text-paper">
                Speaking requests
              </ContactTrigger>
              <span className="hidden h-4 w-px bg-paper/10 sm:block" />
              <ContactTrigger className="link-underline font-mono-dossier text-[0.6rem] tracking-label text-paper-mute hover:text-paper">
                Rights &amp; permissions
              </ContactTrigger>
            </div>
          </div>
        </Reveal>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-paper/10 pt-8 sm:flex-row">
          <p className="font-mono-dossier text-[0.55rem] tracking-label text-paper-mute/50">
            © {new Date().getFullYear()} ROBERT B. TAYLOR. ALL RIGHTS RESERVED.
          </p>
          <p className="font-mono-dossier text-[0.5rem] tracking-label text-paper-mute/30">
            BUILT AS A DOSSIER &middot; WHERE EVIL DWELLS &middot; PERDITION AWAITS
          </p>
        </div>
      </div>
    </footer>
  );
}