"use client";

import { useEffect, useState, useRef } from "react";

const SECTION_LABELS: { id: string; label: string }[] = [
  { id: "top", label: "FILE OPEN" },
  { id: "book", label: "§01 THE BOOK" },
  { id: "chapters", label: "DOSSIER CONTENTS" },
  { id: "excerpt", label: "§02 THE EXCERPT" },
  { id: "timeline", label: "CHRONOLOGY" },
  { id: "case-board", label: "EVIDENCE BOARD" },
  { id: "subjects", label: "SUBJECT FILES" },
  { id: "author", label: "§03 THE AUTHOR" },
  { id: "author-qa", label: "INTERVIEW" },
  { id: "voices", label: "§04 VOICES" },
  { id: "reviews", label: "FIELD REPORTS" },
  { id: "audio-preview", label: "AUDIO PREVIEW" },
  { id: "faq", label: "§05 FAQ" },
  { id: "press", label: "PRESS KIT" },
  { id: "buy", label: "§05 ACQUIRE" },
  { id: "research", label: "RESEARCH GALLERY" },
  { id: "related-works", label: "FURTHER READING" },
  { id: "events", label: "EVENT LOG" },
  { id: "newsletter", label: "CASE FILE" },
];

export function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  const [activeLabel, setActiveLabel] = useState("FILE OPEN");
  const tooltipRef = useRef<HTMLDivElement>(null);
  const isVisible = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        const pct = Math.min((scrollTop / docHeight) * 100, 100);
        setProgress(pct);

        // Find which section is currently active
        for (let i = SECTION_LABELS.length - 1; i >= 0; i--) {
          const el = document.getElementById(SECTION_LABELS[i].id);
          if (el && el.getBoundingClientRect().top <= 120) {
            setActiveLabel(SECTION_LABELS[i].label);
            break;
          }
        }
      }
      // Show tooltip only after scrolling has started
      isVisible.current = scrollTop > 50;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="fixed inset-x-0 top-0 z-[60]"
      aria-hidden
    >
      {/* Progress bar */}
      <div className="h-[2px] bg-transparent">
        <div
          className="h-full bg-gradient-to-r from-gold-dim via-gold to-gold-soft transition-[width] duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Section label tooltip — appears on scroll */}
      <div
        ref={tooltipRef}
        className="fixed top-2 left-1/2 z-[61] -translate-x-1/2 transition-all duration-300"
        style={{
          opacity: isVisible.current && progress > 1 ? 1 : 0,
          pointerEvents: "none",
        }}
      >
        <div className="whitespace-nowrap rounded-sm border border-gold/20 bg-charcoal-deep/95 px-3 py-1.5 backdrop-blur-sm">
          <span className="block text-center font-mono-dossier text-[0.5rem] tracking-label text-gold/70">
            {activeLabel}
          </span>
          <div className="mx-auto mt-1 h-px w-12 bg-gold/20" />
          <span className="block text-center font-mono-dossier text-[0.4rem] text-paper-mute/40">
            {Math.round(progress)}%
          </span>
        </div>
      </div>
    </div>
  );
}