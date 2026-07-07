"use client";

import { useRef } from "react";
import { Reveal } from "./reveal";
import { BookOpen, Lock } from "lucide-react";

const CHAPTERS = [
  {
    num: "01",
    title: "The Birth of the Gangs",
    desc: "How California's prison system birthed the most powerful criminal organizations in American history.",
    status: "sample" as const,
  },
  {
    num: "02",
    title: "La EMe — The Mexican Mafia",
    desc: "Inside the formation and expansion of the prison gang that would come to control the streets.",
    status: "sample" as const,
  },
  {
    num: "03",
    title: "The Aryan Brotherhood",
    desc: "White supremacist prison gangs built on violence, racial allegiance, and absolute loyalty.",
    status: "redacted" as const,
  },
  {
    num: "04",
    title: "Black Guerrilla Family",
    desc: "Revolutionary rhetoric masked a criminal enterprise that thrived behind walls.",
    status: "redacted" as const,
  },
  {
    num: "05",
    title: "Nuestra Familia",
    desc: "The Northern California rival that warred with La EMe and spilled blood across the state.",
    status: "redacted" as const,
  },
  {
    num: "06",
    title: "The Task Forces",
    desc: "The officers who saw the threat first — and were told to look the other way.",
    status: "redacted" as const,
  },
];

export function ChapterPreview() {
  return (
    <section
      id="chapters"
      className="grain-overlay concrete-texture section-transition relative overflow-hidden border-t border-paper/10 bg-charcoal-deep py-24 sm:py-32"
    >
      {/* Faint grid overlay */}
      <div
        className="absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #b08d57 1px, transparent 1px), linear-gradient(to bottom, #b08d57 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <Reveal className="mb-6 flex items-center gap-4">
          <span className="font-mono-dossier text-[0.65rem] tracking-label text-gold">
            DOSSIER CONTENTS
          </span>
          <span className="h-px flex-1 bg-paper/10" />
        </Reveal>

        <Reveal>
          <h2 className="font-display text-[clamp(2rem,4vw,3.2rem)] font-semibold leading-[1.04] tracking-display text-paper">
            12 chapters.
            <br />
            <span className="text-gold">One open case file.</span>
          </h2>
          <p className="mt-5 max-w-2xl font-body text-lg leading-relaxed text-paper-mute">
            Each chapter peels back another layer of the prison-gang
            ecosystem &mdash; from the founders to the task-force officers
            who refused to stay silent.
          </p>
        </Reveal>

        {/* Chapter cards grid */}
        <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden border border-paper/10 bg-paper/10 sm:grid-cols-2 lg:grid-cols-3">
          {CHAPTERS.map((ch, i) => (
            <Reveal key={ch.num} delay={i * 0.06}>
              <div
                className={`group relative bg-charcoal-deep p-6 transition-all duration-500 sm:p-8 ${
                  ch.status === "sample"
                    ? "hover:bg-charcoal-raised cursor-pointer"
                    : "cursor-default"
                }`}
              >
                {/* Chapter number */}
                <div className="flex items-center gap-3 mb-5">
                  <span className="font-mono-dossier text-[0.55rem] tracking-label text-gold/50">
                    CHAPTER
                  </span>
                  <span className="font-display text-2xl font-semibold leading-none text-paper/20">
                    {ch.num}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-display text-lg font-semibold leading-snug tracking-display text-paper transition-colors duration-300 group-hover:text-gold">
                  {ch.title}
                </h3>

                {/* Description */}
                <p className="mt-3 font-body text-sm leading-relaxed text-paper-mute/70">
                  {ch.desc}
                </p>

                {/* Status badge */}
                <div className="mt-5 flex items-center gap-2">
                  {ch.status === "sample" ? (
                    <>
                      <BookOpen className="h-3.5 w-3.5 text-gold/60" />
                      <span className="font-mono-dossier text-[0.5rem] tracking-label text-gold/60">
                        SAMPLE AVAILABLE
                      </span>
                    </>
                  ) : (
                    <>
                      <Lock className="h-3.5 w-3.5 text-paper-mute/30" />
                      <span className="font-mono-dossier text-[0.5rem] tracking-label text-paper-mute/30">
                        CLASSIFIED
                      </span>
                    </>
                  )}
                </div>

                {/* Hover accent line */}
                <div
                  className="absolute bottom-0 left-0 h-px w-0 bg-gold/50 transition-all duration-500 group-hover:w-full"
                  aria-hidden
                />
              </div>
            </Reveal>
          ))}
        </div>

        {/* Bottom CTA */}
        <Reveal delay={0.3}>
          <div className="mt-10 text-center">
            <p className="font-mono-dossier text-[0.55rem] tracking-label text-paper-mute/40">
              + 6 MORE CHAPTERS &middot; EPILOGUE &middot; APPENDICES
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}