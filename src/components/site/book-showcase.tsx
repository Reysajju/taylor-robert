"use client";

import { Reveal } from "./reveal";
import { BookCover } from "./book-cover";
import { RETAILERS } from "@/lib/retailers";
import { ArrowRight } from "lucide-react";

export function BookShowcase() {
  const primary = RETAILERS.find((r) => r.tier === "primary")!;

  return (
    <section
      id="book"
      className="concrete-texture section-transition relative overflow-hidden border-t border-paper/10 bg-charcoal-soft py-24 sm:py-32"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <Reveal className="mb-16 flex items-center gap-4">
          <span className="font-mono-dossier text-[0.65rem] tracking-label text-gold">
            § 01 — THE BOOK
          </span>
          <span className="h-px flex-1 bg-paper/10" />
        </Reveal>

        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Cover with breathing animation */}
          <Reveal direction="right" className="lg:col-span-5">
            <div className="sticky top-28 mx-auto max-w-xs sm:max-w-sm">
              <div className="cover-breathe">
                <BookCover priority />
              </div>
              <div className="mt-6 flex items-center justify-center gap-3 font-mono-dossier text-[0.55rem] tracking-label text-paper-mute/60">
                <span className="h-1.5 w-1.5 rounded-full bg-gold/70" />
                <span>PAPERBACK &middot; EBOOK &middot; 2026</span>
              </div>
            </div>
          </Reveal>

          {/* Synopsis */}
          <div className="lg:col-span-7">
            <Reveal>
              <h2 className="font-display text-[clamp(2rem,4vw,3.2rem)] font-semibold leading-[1.04] tracking-display text-paper text-glow-gold">
                A reckoning with
                <br />
                <span className="text-gold">the evil inside the walls.</span>
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-8 space-y-5 font-body text-lg leading-relaxed text-paper-mute">
                <p>
                  Before the 1950s, prisoners learned a trade and counted the
                  days to release. Then came the gangs &mdash; organizations
                  built not for survival but for power, reaching through the
                  walls to the streets, the cartels, and the next generation.
                </p>
                <p>
                  <em className="not-italic text-paper">
                    Where Evil Dwells
                  </em>{" "}
                  traces the men who built them, and the task-force officers and
                  reformers who refused to let the darkness go unrecorded. It is
                  investigative nonfiction with a moral spine &mdash; a case
                  file kept open on purpose.
                </p>
              </div>
            </Reveal>

            {/* Quick spec sheet */}
            <Reveal delay={0.16}>
              <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden border border-paper/10 bg-paper/10 sm:grid-cols-4 corner-brackets">
                {[
                  ["Publisher", "Wadsworth"],
                  ["Genre", "True Crime"],
                  ["Format", "Paperback"],
                  ["Year", "2026"],
                ].map(([k, v]) => (
                  <div key={k} className="bg-charcoal-soft p-4">
                    <dt className="font-mono-dossier text-[0.5rem] tracking-label text-paper-mute/60">
                      {k.toUpperCase()}
                    </dt>
                    <dd className="mt-1.5 font-display text-sm font-semibold text-paper">
                      {v}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            {/* Primary buy CTA */}
            <Reveal delay={0.2}>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                <a
                  href={primary.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-2.5 bg-rust px-7 py-4 font-mono-dossier text-[0.72rem] tracking-label text-paper transition-colors hover:bg-rust-bright"
                >
                  BUY ON {primary.name.toUpperCase()}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
                <a
                  href="#buy"
                  className="font-mono-dossier text-[0.65rem] tracking-label text-paper-mute link-underline hover:text-gold"
                >
                  OR CHOOSE ANOTHER RETAILER &rarr;
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
