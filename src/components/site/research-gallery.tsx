"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { Reveal, Stagger, StaggerItem } from "./reveal";
import { ScrambleHeading } from "./scramble-heading";
import { X, ZoomIn, Maximize2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const GALLERY_ITEMS = [
  {
    src: "/assets/research/corridor.png",
    alt: "Prison cell block corridor — documentary photograph",
    caption: "Inside the walls. The corridors where alliances were forged and orders were given.",
    ref: "CORRIDOR — DVI / SAN QUENTIN",
    aspect: "landscape" as const,
  },
  {
    src: "/assets/research/aerial.png",
    alt: "Aerial view of California prison complex",
    caption: "The system from above. The scale of institutional control that bred these organizations.",
    ref: "AERIAL SURVEY — CDCR COMPLEX",
    aspect: "landscape" as const,
  },
  {
    src: "/assets/research/manuscript.png",
    alt: "Research manuscript and notes",
    caption: "The raw material. Thousands of pages of court records, interviews, and field notes.",
    ref: "RESEARCH NOTES — AUTHOR ARCHIVE",
    aspect: "square" as const,
  },
  {
    src: "/assets/research/evidence-room.png",
    alt: "Evidence filing room",
    caption: "Where the records live. The bureaucratic infrastructure that both documented and obscured the truth.",
    ref: "EVIDENCE ROOM — TASK FORCE ARCHIVES",
    aspect: "square" as const,
  },
  {
    src: "/assets/research/case-files.png",
    alt: "Case files connected with red string",
    caption: "The investigation board. Each thread connects a person, an event, and a consequence.",
    ref: "CASE BOARD — MULTI-AGENCY TASK FORCE",
    aspect: "square" as const,
  },
  {
    src: "/assets/research/tower.png",
    alt: "Prison guard tower at sunset",
    caption: "The watchtower. A symbol of the control that defined every hour inside.",
    ref: "GUARD TOWER — TWILIGHT",
    aspect: "square" as const,
  },
];

export function ResearchGallery() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  const openLightbox = useCallback((index: number) => setLightbox(index), []);
  const closeLightbox = useCallback(() => setLightbox(null), []);

  const navigateLightbox = useCallback(
    (direction: "prev" | "next") => {
      setLightbox((current) => {
        if (current === null) return null;
        const next = direction === "next"
          ? (current + 1) % GALLERY_ITEMS.length
          : (current - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length;
        return next;
      });
    },
    []
  );

  return (
    <section
      id="research"
      className="grain-overlay concrete-texture section-transition relative overflow-hidden border-t border-paper/10 bg-charcoal py-24 sm:py-32"
    >
      <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-8 lg:px-10">
        {/* Section header */}
        <Reveal className="mb-6 flex items-center gap-4">
          <span className="font-mono-dossier text-[0.65rem] tracking-label text-gold">
            PHOTOGRAPHIC EVIDENCE
          </span>
          <span className="h-px flex-1 bg-paper/10" />
          <span className="font-mono-dossier text-[0.5rem] tracking-label text-paper-mute/30">
            {GALLERY_ITEMS.length} IMAGES
          </span>
        </Reveal>

        <Reveal>
          <ScrambleHeading className="font-display text-[clamp(2rem,4vw,3.2rem)] font-semibold tracking-display text-paper text-glow-gold">
            Behind the research.
          </ScrambleHeading>
          <p className="mt-3 max-w-2xl text-paper-mute">
            The places, documents, and artifacts that shaped the
            investigation. Click any image to examine.
          </p>
        </Reveal>

        {/* Gallery grid — masonry-style */}
        <Stagger className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08} delay={0.1}>
          {GALLERY_ITEMS.map((item, i) => (
            <StaggerItem key={i} direction="up">
              <button
                type="button"
                onClick={() => openLightbox(i)}
                className="group relative overflow-hidden border border-paper/10 bg-charcoal-soft/30 text-left transition-all duration-500 hover:border-gold/30 noise-text"
                aria-label={`View: ${item.caption}`}
              >
                <div
                  className={`relative overflow-hidden ${
                    item.aspect === "landscape"
                      ? "aspect-[16/10]"
                      : "aspect-square"
                  }`}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-deep/90 via-transparent to-charcoal-deep/30 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  {/* Zoom icon */}
                  <div className="absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-sm border border-paper/20 bg-charcoal-deep/60 text-paper/40 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:border-gold/30 group-hover:text-gold/70">
                    <ZoomIn className="h-3.5 w-3.5" />
                  </div>

                  {/* Expand icon top right */}
                  <div className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-sm border border-paper/15 bg-charcoal-deep/60 text-paper/30 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:border-gold/20 group-hover:text-gold/60">
                    <Maximize2 className="h-3 w-3" />
                  </div>
                </div>

                {/* Caption */}
                <div className="border-t border-paper/[0.08] px-3 py-3 sm:px-4 sm:py-3.5">
                  <p className="font-body text-xs leading-relaxed text-paper-dim/80 sm:text-sm line-clamp-2">
                    {item.caption}
                  </p>
                  <p className="mt-1.5 font-mono-dossier text-[0.45rem] tracking-label text-paper-mute/30">
                    {item.ref}
                  </p>
                </div>
              </button>
            </StaggerItem>
          ))}
        </Stagger>

        {/* Bottom note */}
        <Reveal delay={0.3}>
          <div className="mt-10 flex items-center gap-3">
            <span className="h-px flex-1 bg-paper/10" />
            <span className="font-mono-dossier text-[0.5rem] tracking-label text-paper-mute/30">
              ALL PHOTOGRAPHS PROPERTY OF ROBERT B. TAYLOR
            </span>
            <span className="h-px flex-1 bg-paper/10" />
          </div>
        </Reveal>
      </div>

      {/* ── Lightbox ──────────────────────────────────────── */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-charcoal-deep/95 backdrop-blur-md"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative mx-4 w-full max-w-4xl sm:mx-8"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={closeLightbox}
                className="absolute -right-2 -top-2 z-10 flex h-8 w-8 items-center justify-center rounded-sm border border-paper/20 bg-charcoal-deep text-paper/60 transition-colors hover:border-gold/40 hover:text-gold sm:right-3 sm:-top-3 sm:h-9 sm:w-9"
                aria-label="Close lightbox"
              >
                <X className="h-4 w-4" />
              </button>

              {/* Image */}
              <div className="relative aspect-[16/10] overflow-hidden border border-paper/10 bg-charcoal">
                <Image
                  src={GALLERY_ITEMS[lightbox].src}
                  alt={GALLERY_ITEMS[lightbox].alt}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  priority
                />
              </div>

              {/* Caption bar */}
              <div className="mt-3 flex items-start justify-between gap-4 border-t border-paper/10 pt-3">
                <div className="min-w-0 flex-1">
                  <p className="font-body text-sm leading-relaxed text-paper-dim">
                    {GALLERY_ITEMS[lightbox].caption}
                  </p>
                  <p className="mt-1 font-mono-dossier text-[0.5rem] tracking-label text-paper-mute/40">
                    {GALLERY_ITEMS[lightbox].ref}
                  </p>
                </div>
                <span className="shrink-0 font-mono-dossier text-[0.5rem] tracking-label text-paper-mute/30">
                  {lightbox + 1} / {GALLERY_ITEMS.length}
                </span>
              </div>

              {/* Nav arrows */}
              <button
                onClick={() => navigateLightbox("prev")}
                className="absolute left-0 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center border border-paper/15 bg-charcoal-deep/80 text-paper/40 transition-colors hover:border-gold/30 hover:text-gold"
                aria-label="Previous image"
              >
                ←
              </button>
              <button
                onClick={() => navigateLightbox("next")}
                className="absolute right-0 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center border border-paper/15 bg-charcoal-deep/80 text-paper/40 transition-colors hover:border-gold/30 hover:text-gold"
                aria-label="Next image"
              >
                →
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}