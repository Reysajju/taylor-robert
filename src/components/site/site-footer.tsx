"use client";

import { Reveal } from "./reveal";
import { GOODREADS_URL } from "@/lib/retailers";

const SOCIALS = [
  { label: "Goodreads", href: GOODREADS_URL },
  { label: "Amazon", href: "https://www.amazon.com/WHERE-EVIL-DWELLS-PERDITION-AWAITS/dp/B0H2KK7RJQ" },
  { label: "Blackwell's", href: "https://blackwells.co.uk/bookshop/search/author/%20Robert%20Taylor" },
];

const NAV = [
  { label: "The Book", href: "#book" },
  { label: "Excerpt", href: "#excerpt" },
  { label: "Author", href: "#author" },
  { label: "Buy", href: "#buy" },
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

        {/* Middle: nav + socials */}
        <Reveal delay={0.05}>
          <div className="grid grid-cols-1 gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="font-mono-dossier mb-4 text-[0.55rem] tracking-label text-paper-mute/50">
                EXPLORE
              </p>
              <ul className="space-y-2.5">
                {NAV.map((n) => (
                  <li key={n.href}>
                    <a
                      href={n.href}
                      className="link-underline font-body text-base text-paper-mute hover:text-paper"
                    >
                      {n.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="font-mono-dossier mb-4 text-[0.55rem] tracking-label text-paper-mute/50">
                CONNECT
              </p>
              <ul className="space-y-2.5">
                {SOCIALS.map((s) => (
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
                <li>Hardcover · 289 pages</li>
                <li>First Edition · 2026</li>
              </ul>
            </div>

            <div>
              <p className="font-mono-dossier mb-4 text-[0.55rem] tracking-label text-paper-mute/50">
                INQUIRIES
              </p>
              <ul className="space-y-2.5 font-body text-base text-paper-mute">
                <li>
                  <a
                    href="#newsletter"
                    className="link-underline hover:text-paper"
                  >
                    Press &amp; media
                  </a>
                </li>
                <li>
                  <a
                    href="#newsletter"
                    className="link-underline hover:text-paper"
                  >
                    Speaking requests
                  </a>
                </li>
                <li>
                  <a
                    href="#newsletter"
                    className="link-underline hover:text-paper"
                  >
                    Rights &amp; permissions
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </Reveal>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-paper/10 pt-8 sm:flex-row">
          <p className="font-mono-dossier text-[0.55rem] tracking-label text-paper-mute/50">
            © {new Date().getFullYear()} ROBERT B. TAYLOR. ALL RIGHTS RESERVED.
          </p>
          <p className="font-mono-dossier text-[0.5rem] tracking-label text-paper-mute/30">
            BUILT AS A DOSSIER · WHERE EVIL DWELLS · PERDITION AWAITS
          </p>
        </div>
      </div>
    </footer>
  );
}
