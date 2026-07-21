"use client";

import Link from "next/link";
import { Reveal, Stagger, StaggerItem } from "./reveal";
import {
  BookOpen,
  FileText,
  Clock,
  Network,
  Users,
  MessageCircle,
  Headphones,
  HelpCircle,
  Briefcase,
  Camera,
  Library,
  CalendarDays,
  ShoppingBag,
  ArrowUpRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ExploreCard {
  href: string;
  label: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  accent?: string;
  external?: boolean;
}

const CARDS: ExploreCard[] = [
  {
    href: "/chapters",
    label: "DOSSIER CONTENTS",
    title: "Chapters",
    description: "12 chapters and an epilogue — each peeling back another layer.",
    icon: <BookOpen className="h-5 w-5" />,
  },
  {
    href: "/excerpt",
    label: "§ 02 — EXCERPT",
    title: "Read an Excerpt",
    description: "A declassified passage from the Introduction.",
    icon: <FileText className="h-5 w-5" />,
  },
  {
    href: "/timeline",
    label: "CHRONOLOGY",
    title: "Timeline",
    description: "Decades of escalation — from 1951 to the 2000s.",
    icon: <Clock className="h-5 w-5" />,
  },
  {
    href: "/case-board",
    label: "EVIDENCE BOARD",
    title: "Evidence Board",
    description: "Interactive map — connect the dots between gangs, places, and events.",
    icon: <Network className="h-5 w-5" />,
  },
  {
    href: "/subjects",
    label: "SUBJECT FILES",
    title: "The Prison Gangs",
    description: "La EMe, Aryan Brotherhood, BGF, Nuestra Familia — four organizations inside.",
    icon: <Users className="h-5 w-5" />,
  },
  {
    href: "/author-qa",
    label: "INTERVIEW TRANSCRIPT",
    title: "Author Q&A",
    description: "Robert B. Taylor on the system, the book, and the distance between documentation and justice.",
    icon: <MessageCircle className="h-5 w-5" />,
  },
  {
    href: "/reviews",
    label: "FIELD REPORTS",
    title: "Reviews",
    description: "What readers and critics are saying about Where Evil Dwells.",
    icon: <StarIcon />,
  },
  {
    href: "/audio",
    label: "AUDIO PREVIEW",
    title: "Audio Preview",
    description: "Hear the opening pages — AI-narrated excerpts from the book.",
    icon: <Headphones className="h-5 w-5" />,
  },
  {
    href: "/faq",
    label: "DOSSIER INDEX",
    title: "FAQ",
    description: "The essential details — from subject matter to purchasing options.",
    icon: <HelpCircle className="h-5 w-5" />,
  },
  {
    href: "/press",
    label: "MEDIA RESOURCES",
    title: "Press Kit",
    description: "Book cover, author headshot, press release, and fact sheet.",
    icon: <Briefcase className="h-5 w-5" />,
  },
  {
    href: "/research",
    label: "PHOTOGRAPHIC EVIDENCE",
    title: "Behind the Research",
    description: "The places, documents, and artifacts that shaped the investigation.",
    icon: <Camera className="h-5 w-5" />,
  },
  {
    href: "/related",
    label: "FURTHER READING",
    title: "Further Reading",
    description: "Essential works that shaped the research behind this book.",
    icon: <Library className="h-5 w-5" />,
  },
  {
    href: "/events",
    label: "EVENT LOG",
    title: "Events",
    description: "Upcoming readings, book signings, and public appearances.",
    icon: <CalendarDays className="h-5 w-5" />,
  },
  {
    href: "https://www.amazon.com/WHERE-EVIL-DWELLS-PERDITION-AWAITS/dp/B0H2KK7RJQ",
    external: true,
    label: "§ 05 — ACQUIRE",
    title: "Buy the Book",
    description: "Available in paperback and ebook — Amazon, Kindle, and more.",
    icon: <ShoppingBag className="h-5 w-5" />,
    accent: "border-rust/30 hover:border-rust/60",
  },
];

function StarIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

const cardInner = (card: ExploreCard) => (
  <>
    {/* Label */}
    <span className="font-mono-dossier text-[0.45rem] tracking-label text-paper-mute/40">
      {card.label}
    </span>

    {/* Icon + Title */}
    <div className="mt-4 flex items-start justify-between gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-paper/15 text-paper-mute/60 transition-all duration-300 group-hover:border-gold/40 group-hover:text-gold group-hover:shadow-[0_0_12px_rgba(176,141,87,0.08)]">
        {card.icon}
      </div>
      <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-paper-mute/20 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-gold/60" />
    </div>

    {/* Title */}
    <h3 className="mt-3 font-display text-lg font-semibold tracking-display text-paper transition-colors duration-300 group-hover:text-gold">
      {card.title}
    </h3>

    {/* Description */}
    <p className="mt-2 text-sm leading-relaxed text-paper-mute/60 line-clamp-2">
      {card.description}
    </p>

    {/* Bottom accent line */}
    <div
      className="absolute bottom-0 left-0 h-px w-0 bg-gold/50 transition-all duration-500 group-hover:w-full"
      aria-hidden
    />
  </>
);

export function ExploreGrid() {
  return (
    <section className="grain-overlay concrete-texture section-transition relative overflow-hidden border-t border-paper/10 bg-charcoal-deep py-24 sm:py-32">
      {/* Faint watermark */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden>
        <span className="font-display text-[18vw] font-semibold leading-none text-paper/[0.015] sm:text-[14vw]">
          EXPLORE
        </span>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <Reveal className="mb-6 flex items-center gap-4">
          <span className="font-mono-dossier text-[0.65rem] tracking-label text-gold">
            THE FILE CONTINUES
          </span>
          <span className="h-px flex-1 bg-paper/10" />
        </Reveal>

        <Reveal>
          <h2 className="font-display text-[clamp(2rem,4vw,3.2rem)] font-semibold leading-[1.04] tracking-display text-paper text-glow-gold">
            Dive deeper into the case.
          </h2>
          <p className="mt-3 max-w-2xl font-body text-lg leading-relaxed text-paper-mute">
            Every angle of the investigation — from chapter breakdowns to audio previews
            and behind-the-scenes research. Choose a file to examine.
          </p>
        </Reveal>

        <Stagger
          className="mt-14 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          stagger={0.04}
          delay={0.1}
        >
          {CARDS.map((card) => (
            <StaggerItem key={card.label}>
              {card.external ? (
                <a
                  href={card.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "group relative flex flex-col border border-paper/10 bg-charcoal-soft/40 p-5 sm:p-6 transition-all duration-500 hover:border-gold/30 hover:bg-charcoal-soft",
                    card.accent
                  )}
                >
                  {cardInner(card)}
                </a>
              ) : (
                <Link
                  href={card.href}
                  className={cn(
                    "group relative flex flex-col border border-paper/10 bg-charcoal-soft/40 p-5 sm:p-6 transition-all duration-500 hover:border-gold/30 hover:bg-charcoal-soft",
                    card.accent
                  )}
                >
                  {cardInner(card)}
                </Link>
              )}
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}