"use client";

import { Reveal, Stagger, StaggerItem } from "./reveal";
import { BookOpen, ExternalLink, Star } from "lucide-react";
import { RETAILERS, GOODREADS_URL } from "@/lib/retailers";

export function BuySection() {
  const primary = RETAILERS.find((r) => r.tier === "primary")!;

  return (
    <section
      id="buy"
      className="concrete-texture ink-blot atmosphere-fog relative overflow-hidden border-t border-paper/10 bg-charcoal py-24 sm:py-32"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <Reveal className="mb-16 flex items-center gap-4">
          <span className="font-mono-dossier text-[0.65rem] tracking-label text-gold">
            § 05 — ACQUIRE
          </span>
          <span className="h-px flex-1 bg-paper/10" />
        </Reveal>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="font-mono-dossier mb-4 text-[0.6rem] tracking-label text-rust-bright/90">
                THE BOOK IS AVAILABLE NOW
              </p>
              <h2 className="font-display text-[clamp(2rem,4vw,3.2rem)] font-semibold leading-[1.02] tracking-display text-paper text-glow-gold">
                Take the file
                <br />
                <span className="text-gold">off the shelf.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-7 max-w-md font-body text-lg leading-relaxed text-paper-mute">
                Available in paperback and ebook. Click any retailer below to
                order &mdash; every link opens the live listing in a new tab.
              </p>
            </Reveal>
            <Reveal delay={0.16}>
              <div className="mt-8 inline-flex items-center gap-3 border border-paper/15 px-4 py-3">
                <BookOpen className="h-4 w-4 text-gold" />
                <span className="font-mono-dossier text-[0.6rem] tracking-label text-paper-mute">
                  PUBLISHED 2026 &middot; WADSWORTH
                </span>
              </div>
            </Reveal>

          </div>

          <div className="lg:col-span-7">
            <Stagger className="grid grid-cols-1 gap-px overflow-hidden border border-paper/10 bg-paper/10 sm:grid-cols-2">
              {RETAILERS.map((r) => (
                <StaggerItem key={r.name} className="group relative">
                  <span className="pointer-events-none absolute left-0 top-0 z-20 h-full w-[2px] origin-top scale-y-0 bg-gold transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100" aria-hidden />
                  <a
                    href={r.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-full items-center justify-between bg-charcoal-soft p-7 transition-colors duration-500 group-hover:bg-charcoal-deep sm:p-8"
                  >
                    <div>
                      <h3 className="font-display text-xl font-semibold tracking-display text-paper">
                        {r.name}
                      </h3>
                      <p className="mt-1.5 font-mono-dossier text-[0.55rem] tracking-label text-paper-mute/70">
                        {r.note.toUpperCase()}
                      </p>
                    </div>
                    <ExternalLink className="h-5 w-5 text-paper-mute/40 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-gold" />
                  </a>
                </StaggerItem>
              ))}
            </Stagger>

            <Reveal delay={0.1}>
              <a
                href={GOODREADS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-4 flex items-center justify-between border border-paper/10 bg-charcoal-soft/60 px-7 py-5 transition-colors hover:border-gold/40 hover:bg-charcoal-soft"
              >
                <div className="flex items-center gap-4">
                  <Star className="h-5 w-5 text-gold/70" />
                  <div>
                    <h3 className="font-display text-base font-semibold tracking-display text-paper">
                      Find it on Goodreads
                    </h3>
                    <p className="mt-1 font-mono-dossier text-[0.55rem] tracking-label text-paper-mute/70">
                      ADD TO SHELF &middot; READ &middot; REVIEW
                    </p>
                  </div>
                </div>
                <ExternalLink className="h-4 w-4 text-paper-mute/40 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-gold" />
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}