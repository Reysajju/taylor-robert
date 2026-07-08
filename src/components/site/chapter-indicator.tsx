"use client";

import { useEffect, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * Section ID → label mapping for the floating chapter indicator.
 * Desktop labels can be longer; mobile labels are shortened for space.
 */
const SECTION_MAP: Record<
  string,
  { desktop: string; mobile: string }
> = {
  "#top": { desktop: "FILE OPEN", mobile: "FILE OPEN" },
  "#book": { desktop: "§ 01", mobile: "§ 01" },
  "#chapters": { desktop: "§ 03", mobile: "§ 03" },
  "#excerpt": { desktop: "§ 02", mobile: "§ 02" },
  "#timeline": { desktop: "CHRONOLOGY", mobile: "CHRONOLOGY" },
  "#author": { desktop: "§ 03", mobile: "§ 03" },
  "#voices": { desktop: "§ 04", mobile: "§ 04" },
  "#faq": { desktop: "§ 05", mobile: "§ 05" },
  "#press": { desktop: "PRESS", mobile: "PRESS" },
  "#buy": { desktop: "§ 05 ACQUIRE", mobile: "§ 05" },
  "#newsletter": { desktop: "CASE FILE", mobile: "CASE FILE" },
};

const SECTION_IDS = Object.keys(SECTION_MAP);
const THRESHOLD = 120;

/**
 * Floating chapter indicator — shows which section the user is currently
 * reading as they scroll. Fixed bottom-right, noir pill badge style.
 * Uses Framer Motion AnimatePresence for smooth label transitions.
 */
export function ChapterIndicator() {
  const [activeLabel, setActiveLabel] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  const detectActive = useCallback(() => {
    for (const id of SECTION_IDS) {
      const el = document.querySelector(id);
      if (!el) continue;
      const rect = el.getBoundingClientRect();
      // Section is "active" when its top is at or above the threshold
      if (rect.top <= THRESHOLD) {
        setActiveLabel(id);
        return;
      }
    }
    // Above all tracked sections (at the very top of the page)
    setActiveLabel(null);
  }, []);

  useEffect(() => {
    // Detect mobile for shorter labels
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    const raf = requestAnimationFrame(checkMobile);
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  useEffect(() => {
    const raf = requestAnimationFrame(detectActive);
    window.addEventListener("scroll", detectActive, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", detectActive);
    };
  }, [detectActive]);

  if (!activeLabel) return null;

  const mapping = SECTION_MAP[activeLabel];
  if (!mapping) return null;

  const label = isMobile ? mapping.mobile : mapping.desktop;

  return (
    <div
      className="fixed right-4 bottom-32 z-40 sm:right-6 sm:bottom-36"
      aria-live="polite"
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={label}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-2 rounded-sm border border-gold/30 bg-charcoal-deep/95 px-3 py-1.5 font-mono-dossier text-[0.5rem] tracking-label text-gold backdrop-blur-sm"
        >
          {/* Animated dot indicator */}
          <span
            className="inline-block h-[2px] w-[2px] rounded-full bg-gold animate-pulse"
            aria-hidden
          />
          {label}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}