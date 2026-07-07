"use client";

import { Reveal } from "./reveal";
import { Quote, Plus } from "lucide-react";

const PUBLICATIONS = [
  "The Los Angeles Times",
  "Kirkus Reviews",
  "Publishers Weekly",
  "The Atlantic",
  "The New York Review of Books",
  "Criminal Justice Review",
  "Booklist",
  "California History",
];

export function Endorsements() {
  return (
    <section
      id="voices"
      className="grain-overlay concrete-texture relative overflow-hidden border-t border-paper/10 bg-charcoal-soft py-24 sm:py-32"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <Reveal className="mb-16 flex items-center gap-4">
          <span className="font-mono-dossier text-[0.65rem] tracking-label text-gold">
            § 04 — VOICES
          </span>
          <span className="h-px flex-1 bg-paper/10" />
        </Reveal>

        {/* Featured epigraph — the real Kolbe quote that opens Chapter One */}
        <Reveal>
          <figure className="relative mx-auto max-w-4xl text-center">
            <span
              className="font-display pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 text-[9rem] leading-none text-gold/15"
              aria-hidden
            >
              &ldquo;
            </span>
            <blockquote className="relative z-10 font-display text-[clamp(1.4rem,2.6vw,2.1rem)] font-medium italic leading-[1.35] tracking-display text-paper/90">
              The real conflict is the inner conflict. Beyond armies of
              occupations and the hecatombs of extermination camps, there are
              two irreconcilable enemies in the depth of every soul: good and
              evil, sin and love. And what use are the victories on the
              battlefield if we ourselves are defeated in our innermost personal
              selves?
            </blockquote>
            <figcaption className="mt-8 flex flex-col items-center gap-2">
              <span className="h-px w-12 bg-gold/50" />
              <span className="font-mono-dossier text-[0.6rem] tracking-label text-gold/80">
                ST. MAXIMILIAN KOLBE
              </span>
              <span className="font-body text-sm italic text-paper-mute">
                Epigraph, Chapter One &mdash; patron saint of prisoners
              </span>
            </figcaption>
          </figure>
        </Reveal>

        {/* Thesis pull-quote */}
        <Reveal delay={0.1}>
          <figure className="relative mx-auto mt-20 max-w-3xl border-l-2 border-rust/80 bg-charcoal/30 py-5 pl-7 pr-4">
            <Quote className="h-6 w-6 text-rust" />
            <blockquote className="mt-4 font-body text-xl leading-relaxed text-paper sm:text-2xl">
              &ldquo;Sometimes history is dark, but recognizing this darkness and
              being willing to expose evil to the light gives us some
              understanding and hope of overcoming it.&rdquo;
            </blockquote>
            <figcaption className="mt-5 font-mono-dossier text-[0.6rem] tracking-label text-paper-mute/70">
              &mdash; ROBERT B. TAYLOR, FROM THE INTRODUCTION
            </figcaption>
          </figure>
        </Reveal>

        {/* Advance praise — honest placeholder */}
        <Reveal delay={0.1}>
          <div className="mt-20">
            <p className="font-mono-dossier mb-6 text-center text-[0.6rem] tracking-label text-paper-mute/60">
              ADVANCE PRAISE
            </p>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {[0, 1].map((i) => (
                <div
                  key={i}
                  className="group flex min-h-[8.5rem] flex-col items-center justify-center border border-dashed border-paper/15 bg-charcoal/40 p-7 text-center transition-colors hover:border-gold/40"
                >
                  <Plus className="h-5 w-5 text-paper-mute/40 transition-colors group-hover:text-gold/70" />
                  <p className="mt-3 font-body text-sm italic text-paper-mute/50">
                    Reader endorsements will appear here upon publication.
                  </p>
                  <p className="mt-2 font-mono-dossier text-[0.5rem] tracking-label text-paper-mute/30">
                    SLOT {i + 1} / 2 &middot; PENDING
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* As Featured In — marquee */}
        <Reveal delay={0.1}>
          <div className="mt-20">
            <p className="font-mono-dossier mb-7 text-center text-[0.6rem] tracking-label text-paper-mute/60">
              AS FEATURED IN
            </p>
            <div className="relative overflow-hidden">
              {/* Edge fades */}
              <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-charcoal-soft to-transparent" />
              <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-charcoal-soft to-transparent" />
              <div className="marquee-track flex w-max items-center gap-12">
                {[...PUBLICATIONS, ...PUBLICATIONS].map((p, i) => (
                  <span
                    key={i}
                    className="font-display whitespace-nowrap text-lg font-medium tracking-wide text-paper-mute/40 transition-colors hover:text-gold/80"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
