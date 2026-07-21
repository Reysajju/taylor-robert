"use client";

import { useRef, useCallback, useState, useEffect } from "react";
import { Reveal } from "./reveal";
import { TableOfContents } from "./table-of-contents";
import { BookOpen, Lock, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

/* ── Deep-dive data for chapters 01–06 ──────────────────── */

interface ChapterDeep {
  num: string;
  title: string;
  fullDesc: string;
  themes: string[];
  keyFigures: string[];
  pages: string;
  status: "sample" | "classified";
}

const DEEP_DATA: Record<string, ChapterDeep> = {
  "01": {
    num: "01",
    title: "The Birth of the Gangs",
    fullDesc:
      "In the early 1950s, California's prison system was a pressure cooker of racial tension, overcrowding, and institutional neglect. Deuel Vocational Institution became the unlikely cradle for what would become the most sophisticated criminal organizations in American corrections. This chapter traces the systemic failures — from de facto racial segregation to the state's deliberate underfunding of rehabilitation — that created the conditions for gang formation. Drawing on archival records and firsthand accounts, Taylor reconstructs the world that produced La EMe, the Aryan Brotherhood, and their rivals.",
    themes: [
      "Systemic neglect and overcrowding",
      "De facto racial segregation",
      "The failure of rehabilitation",
      "Prison as crucible",
    ],
    keyFigures: ["Luis 'Huero Buff' Flores", "Unknown DVI inmates (1957)", "CDC administration"],
    pages: "pp. 1–28",
    status: "sample",
  },
  "02": {
    num: "02",
    title: "La EMe — The Mexican Mafia",
    fullDesc:
      "From a self-protection pact among young Mexican-American inmates at Deuel, La EMe grew into a criminal empire that controlled drug trafficking, extortion, and murder — both inside prison walls and on the streets of Southern California. This chapter examines the gang's founding mythology, its organizational structure built on absolute loyalty and brutal enforcement, and the 'regla' — the code of silence that made prosecution nearly impossible for decades.",
    themes: [
      "Founding at Deuel Vocational Institution",
      "Organizational hierarchy and the regla",
      "Street taxation and drug operations",
      "Culture of absolute loyalty",
    ],
    keyFigures: ["Luis 'Huero Buff' Flores", "Rudy 'Cheyenne' Cadena", "Joe 'Pegleg' Morgan"],
    pages: "pp. 29–54",
    status: "sample",
  },
  "03": {
    num: "03",
    title: "The Aryan Brotherhood",
    fullDesc:
      "Forged in the violent racial politics of San Quentin's death row in 1967, the Aryan Brotherhood built a reputation as the most violent prison gang in America. Despite never numbering more than a few hundred members, the AB controlled trafficking corridors and orchestrated murders across the federal prison system. This chapter explores their ideology, their alliance structures, and the contradiction between their white supremacist rhetoric and their pragmatic criminal partnerships.",
    themes: [
      "Origins at San Quentin death row",
      "Violence as organizational principle",
      "Federal prosecution and RICO",
      "Ideology vs. pragmatism",
    ],
    keyFigures: ["Barry Mills", "Tyler 'The Hulk' Bingham", "Thomas Silverstein"],
    pages: "pp. 55–82",
    status: "classified",
  },
  "04": {
    num: "04",
    title: "Black Guerrilla Family",
    fullDesc:
      "Founded by George Lester Jackson in 1966, the BGF blended revolutionary Black nationalist ideology with criminal enterprise. Jackson, a charismatic and polarizing figure, framed the gang's mission in political terms — but the reality was far more complex. This chapter traces the BGF from its revolutionary origins through its evolution into a sophisticated drug-trafficking operation.",
    themes: [
      "George Jackson and revolutionary politics",
      "Ideology as criminal cover",
      "Alliances with outside groups",
      "The Soledad Brothers",
    ],
    keyFigures: ["George Lester Jackson", "W.L. Nolen", "Huey P. Newton (context)"],
    pages: "pp. 83–110",
    status: "classified",
  },
  "05": {
    num: "05",
    title: "Nuestra Familia",
    fullDesc:
      "Born in the California prison system's racial segregation, Nuestra Familia emerged as Northern California's answer to La EMe's dominance. What began as a protection pact among Northern Latino inmates escalated into one of the state's most violent gang rivalries, spilling blood across Northern California communities.",
    themes: [
      "North vs. South geographic divide",
      "Rivalry with La EMe",
      "Norteño street gang network",
      "Rural vs. urban prison dynamics",
    ],
    keyFigures: ["Robert 'Robot' Salas", "Jimmy 'Gorilla' Palma", "César 'Chuy' Rodríguez"],
    pages: "pp. 111–138",
    status: "classified",
  },
  "06": {
    num: "06",
    title: "The Task Forces",
    fullDesc:
      "While the gangs consolidated power, a small group of correctional officers and law enforcement officials recognized the growing threat — and were systematically ignored. This chapter tells the story of the early prison-gang task forces: their intelligence-gathering methods, their battles with institutional inertia, and the officers who risked their careers to sound the alarm.",
    themes: [
      "Institutional resistance to intelligence",
      "Early gang intelligence units",
      "Cross-agency cooperation failures",
      "Whistleblower consequences",
    ],
    keyFigures: ["Sgt. Richard 'Rick' Duran", "CDC Internal Affairs", "FBI infiltration units"],
    pages: "pp. 139–166",
    status: "classified",
  },
};

/* ── Chapter cards data ─────────────────────────────────── */

const CHAPTERS = [
  { num: "01", title: "The Birth of the Gangs", desc: "How California's prison system birthed the most powerful criminal organizations in American history.", status: "sample" as const },
  { num: "02", title: "La EMe — The Mexican Mafia", desc: "Inside the formation and expansion of the prison gang that would come to control the streets.", status: "sample" as const },
  { num: "03", title: "The Aryan Brotherhood", desc: "White supremacist prison gangs built on violence, racial allegiance, and absolute loyalty.", status: "redacted" as const },
  { num: "04", title: "Black Guerrilla Family", desc: "Revolutionary rhetoric masked a criminal enterprise that thrived behind walls.", status: "redacted" as const },
  { num: "05", title: "Nuestra Familia", desc: "The Northern California rival that warred with La EMe and spilled blood across the state.", status: "redacted" as const },
  { num: "06", title: "The Task Forces", desc: "The officers who saw the threat first — and were told to look the other way.", status: "redacted" as const },
];

/* ── Main Component ─────────────────────────────────────── */

export function ChapterPreview() {
  const [deepOpen, setDeepOpen] = useState(false);
  const [activeChapter, setActiveChapter] = useState<ChapterDeep | null>(null);

  const openDeepDive = useCallback((num: string) => {
    const data = DEEP_DATA[num];
    if (data) {
      setActiveChapter(data);
      setDeepOpen(true);
    }
  }, []);

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
          <h2 className="font-display text-[clamp(2rem,4vw,3.2rem)] font-semibold leading-[1.04] tracking-display text-paper text-glow-gold">
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

        {/* Chapter cards grid — now clickable */}
        <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden border border-paper/10 bg-paper/10 sm:grid-cols-2 lg:grid-cols-3">
          {CHAPTERS.map((ch, i) => (
            <Reveal key={ch.num} delay={i * 0.06}>
              <button
                type="button"
                onClick={() => openDeepDive(ch.num)}
                className={`group relative w-full bg-charcoal-deep p-6 text-left transition-all duration-500 hover-lift border-reveal sm:p-8 ${
                  ch.status === "sample"
                    ? "hover:bg-charcoal-raised cursor-pointer"
                    : "cursor-pointer"
                }`}
              >
                {/* Chapter number */}
                <div className="mb-5 flex items-center gap-3">
                  <span className="font-mono-dossier text-[0.55rem] tracking-label text-gold/50">
                    CHAPTER
                  </span>
                  <span className="font-display text-2xl font-semibold leading-none text-paper/20">
                    {ch.num}
                  </span>
                  <ChevronRight className="ml-auto h-4 w-4 text-paper-mute/20 transition-all duration-300 group-hover:translate-x-1 group-hover:text-gold/60" />
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
              </button>
            </Reveal>
          ))}
        </div>

        {/* Bottom CTA */}
        <Reveal delay={0.3}>
          <div className="mt-10 flex flex-col items-center gap-5 sm:flex-row sm:justify-center">
            <p className="font-mono-dossier text-[0.55rem] tracking-label text-paper-mute/40">
              + 6 MORE CHAPTERS &middot; EPILOGUE &middot; APPENDICES
            </p>
            <span className="hidden h-3 w-px bg-paper/10 sm:block" />
            <TableOfContents />
          </div>
        </Reveal>
      </div>

      {/* ── Chapter Deep-Dive Modal ──────────────────────── */}
      <Dialog open={deepOpen} onOpenChange={setDeepOpen}>
        <DialogContent
          showCloseButton={false}
          className="z-[100] max-h-[90vh] w-[calc(100%-1.5rem)] max-w-3xl overflow-hidden rounded-none border-paper/10 bg-charcoal-deep p-0 shadow-2xl"
        >
          <style>{`
            [data-slot="dialog-overlay"] {
              backdrop-filter: blur(8px) saturate(0.6);
              background-color: rgba(0, 0, 0, 0.75) !important;
            }
          `}</style>

          {activeChapter && (
            <AnimatePresence>
              <motion.div
                key={activeChapter.num}
                initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Header */}
                <div className="relative border-b border-paper/10 px-6 py-5 sm:px-8">
                  <DialogTitle className="sr-only">
                    Chapter {activeChapter.num}: {activeChapter.title}
                  </DialogTitle>
                  <DialogDescription className="sr-only">
                    Detailed information about Chapter {activeChapter.num}
                  </DialogDescription>

                  <div className="flex items-start justify-between">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-3">
                        <span className="font-mono-dossier text-[0.6rem] tracking-label text-gold/70">
                          CHAPTER {activeChapter.num}
                        </span>
                        <span className="h-px max-w-[60px] flex-1 bg-paper/10" />
                        {activeChapter.status === "classified" ? (
                          <span className="flex items-center gap-1.5 font-mono-dossier text-[0.5rem] tracking-label text-rust-bright/80">
                            <Lock className="h-3 w-3" />
                            CLASSIFIED
                          </span>
                        ) : (
                          <span className="flex items-center gap-1.5 font-mono-dossier text-[0.5rem] tracking-label text-gold/60">
                            <BookOpen className="h-3 w-3" />
                            SAMPLE AVAILABLE
                          </span>
                        )}
                      </div>

                      <h2 className="mt-3 font-display text-xl font-semibold leading-tight tracking-display text-paper sm:text-2xl">
                        {activeChapter.title}
                      </h2>

                      <p className="mt-1.5 font-mono-dossier text-[0.55rem] tracking-label text-paper-mute/50">
                        {activeChapter.pages}
                      </p>
                    </div>

                    <button
                      onClick={() => setDeepOpen(false)}
                      className="ml-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-sm text-gold/60 transition-colors hover:bg-paper/5 hover:text-gold"
                      aria-label="Close"
                    >
                      ✕
                    </button>
                  </div>

                  {/* Classified warning */}
                  {activeChapter.status === "classified" && (
                    <div className="mt-4 flex items-center gap-2.5 rounded-sm border border-rust/20 bg-rust/[0.05] px-4 py-2.5">
                      <span className="text-rust-bright/70">⚠</span>
                      <span className="font-mono-dossier text-[0.55rem] tracking-label text-rust-bright/80">
                        FULL CONTENT CLASSIFIED — EXCERPT AVAILABLE UPON PUBLICATION
                      </span>
                    </div>
                  )}
                </div>

                {/* Scrollable body */}
                <div className="max-h-[calc(90vh-200px)] overflow-y-auto overscroll-contain px-6 pb-8 pt-6 sm:px-8">
                  {/* Synopsis */}
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.4 }}
                  >
                    <div className="mb-2 flex items-center gap-2">
                      <span className="h-px w-4 bg-gold/40" />
                      <span className="font-mono-dossier text-[0.55rem] tracking-label text-gold/60">
                        SYNOPSIS
                      </span>
                    </div>
                    <p className="font-body text-sm leading-[1.85] text-paper-dim">
                      {activeChapter.fullDesc}
                    </p>
                  </motion.div>

                  {/* Themes */}
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25, duration: 0.4 }}
                    className="mt-8"
                  >
                    <div className="mb-3 flex items-center gap-2">
                      <span className="h-3 w-3 border border-gold/50" />
                      <span className="font-mono-dossier text-[0.55rem] tracking-label text-gold/60">
                        KEY THEMES
                      </span>
                    </div>
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                      {activeChapter.themes.map((theme, i) => (
                        <div
                          key={i}
                          className="evidence-marker pl-6 py-1.5 text-sm text-paper-mute"
                        >
                          {theme}
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Key Figures */}
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35, duration: 0.4 }}
                    className="mt-8"
                  >
                    <div className="mb-3 flex items-center gap-2">
                      <span className="text-gold/60">◉</span>
                      <span className="font-mono-dossier text-[0.55rem] tracking-label text-gold/60">
                        KEY FIGURES
                      </span>
                    </div>
                    <div className="divide-y divide-paper/[0.06]">
                      {activeChapter.keyFigures.map((figure, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between py-3"
                        >
                          <span className="font-display text-sm font-medium text-paper">
                            {figure}
                          </span>
                          {i === 0 && (
                            <span className="font-mono-dossier text-[0.5rem] tracking-label text-gold/50">
                              PRIMARY SUBJECT
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Bottom CTA */}
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45, duration: 0.4 }}
                    className="mt-8 border-t border-paper/10 pt-6"
                  >
                    {activeChapter.status === "classified" ? (
                      <p className="font-mono-dossier text-[0.55rem] tracking-label text-paper-mute/40">
                        PRE-ORDER TO ACCESS FULL CHAPTER UPON PUBLICATION
                      </p>
                    ) : (
                      <Link
                        href="/excerpt"
                        className="magnetic-btn inline-flex items-center gap-2 border border-gold/30 bg-gold/5 px-5 py-2.5 font-mono-dossier text-[0.65rem] tracking-label text-gold transition-colors hover:bg-gold/10"
                      >
                        <BookOpen className="h-3.5 w-3.5" />
                        READ THE EXCERPT
                      </Link>
                    )}
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}