"use client";

import { Reveal, Stagger, StaggerItem } from "./reveal";
import { ExternalLink, BookOpen, FileText } from "lucide-react";

interface RelatedWork {
  title: string;
  author: string;
  year: string;
  description: string;
  type: "book" | "report";
  relevance: string;
}

const WORKS: RelatedWork[] = [
  {
    title: "The Mexican Mafia",
    author: "Tony Rafael",
    year: "2007",
    description:
      "The definitive account of La EMe's stranglehold on Southern California. Rafael traces the gang from its prison origins to its street-level empire.",
    type: "book",
    relevance: "Direct subject coverage",
  },
  {
    title: "The Gangs of Los Angeles",
    author: "William Dunn",
    year: "2011",
    description:
      "A former LAPD officer's inside perspective on the street gangs that served as La EMe's distribution network and enforcement arm.",
    type: "book",
    relevance: "LAPD perspective",
  },
  {
    title: "Blood In, Blood Out",
    author: "John Lee Brook",
    year: "2012",
    description:
      "The most detailed examination of the Aryan Brotherhood ever published, drawn from court transcripts and confidential sources.",
    type: "book",
    relevance: "AB deep-dive",
  },
  {
    title: "Tattoos of the Heart",
    author: "Fr. Greg Boyle",
    year: "2010",
    description:
      "The spiritual counter-narrative to the gang world. Boyle's Homeboy Industries offers the human side that Taylor's investigation documents.",
    type: "book",
    relevance: "Counter-narrative",
  },
  {
    title: "California Department of Corrections: Strategic Plan",
    author: "CDCR",
    year: "2004",
    description:
      "Official state response to the prison-gang crisis. This document reveals the bureaucratic inertia that Taylor critiques throughout his book.",
    type: "report",
    relevance: "Policy context",
  },
  {
    title: "The New Jim Crow",
    author: "Michelle Alexander",
    year: "2010",
    description:
      "Alexander's framework of mass incarceration provides the structural analysis that underpins Taylor's on-the-ground reporting.",
    type: "book",
    relevance: "Structural analysis",
  },
];

export function RelatedWorks() {
  return (
    <section
      id="related-works"
      className="grain-overlay concrete-texture section-transition relative overflow-hidden border-t border-paper/10 bg-charcoal"
    >
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 lg:px-10">
        {/* Section header */}
        <Reveal>
          <div className="flex items-center gap-4">
            <span className="font-mono-dossier text-[0.65rem] tracking-label text-gold">
              FURTHER READING
            </span>
            <span className="h-px flex-1 bg-paper/10" />
          </div>

          <h2 className="mt-6 font-display text-[clamp(2rem,4vw,3.2rem)] font-semibold tracking-display text-paper text-glow-gold">
            The case file extends.
          </h2>
          <p className="mt-3 max-w-2xl text-paper-mute">
            Essential reading that shaped the research behind Where Evil Dwells.
            Each work illuminates a different angle of the prison-gang crisis.
          </p>
        </Reveal>

        {/* Works list */}
        <Stagger className="mt-12 space-y-0 divide-y divide-paper/10" stagger={0.08} delay={0.1}>
          {WORKS.map((work, i) => (
            <StaggerItem key={i} direction="up">
              <article className="group grid grid-cols-1 gap-4 py-6 transition-colors duration-300 hover:bg-charcoal-soft/20 sm:grid-cols-[auto_1fr_auto] sm:gap-6 sm:px-4 sm:py-8">
                {/* Type icon */}
                <div className="flex items-start pt-1">
                  <div className="flex h-9 w-9 items-center justify-center rounded-sm border border-paper/10 text-paper-mute/60 transition-colors group-hover:border-gold/30 group-hover:text-gold">
                    {work.type === "book" ? (
                      <BookOpen className="h-4 w-4" />
                    ) : (
                      <FileText className="h-4 w-4" />
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="min-w-0">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h3 className="font-display text-base font-medium text-paper transition-colors group-hover:text-gold sm:text-lg">
                      {work.title}
                    </h3>
                    <span className="font-mono-dossier text-[0.5rem] tracking-label text-paper-mute/40">
                      {work.year}
                    </span>
                  </div>
                  <p className="mt-1 font-mono-dossier text-[0.6rem] tracking-label text-gold/60">
                    {work.author.toUpperCase()}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-paper-mute/80">
                    {work.description}
                  </p>
                </div>

                {/* Relevance badge */}
                <div className="flex items-start pt-1 sm:justify-end">
                  <span className="inline-flex items-center gap-1.5 rounded-sm border border-paper/10 px-2.5 py-1 font-mono-dossier text-[0.5rem] tracking-label text-paper-mute/50 transition-colors group-hover:border-gold/20 group-hover:text-gold/60">
                    {work.relevance}
                  </span>
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>

        {/* Bottom note */}
        <Reveal delay={0.3}>
          <div className="mt-8 flex items-center gap-3 px-4">
            <div className="h-px flex-1 bg-paper/10" />
            <span className="font-mono-dossier text-[0.5rem] tracking-label text-paper-mute/30">
              6 WORKS CITED IN RESEARCH
            </span>
            <div className="h-px flex-1 bg-paper/10" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}