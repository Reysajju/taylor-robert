# Task 7-b — Enhanced Timeline & Chapter Indicator

## Agent: Component Agent

## Work Log
- Read worklog.md for full project context (6 prior phases, noir-themed book landing page)
- Read existing timeline.tsx to preserve all functionality (8 events, alternating layout, gold line, pulsing dots, hover-to-gold, Reveal animations)
- Read reading-progress.tsx for scroll listener pattern reference
- Read globals.css for CSS utilities (evidence-stamp, corner-brackets, etc.)
- Read reveal.tsx for animation component API
- Read page.tsx for section IDs and import structure
- Grepped all section IDs: #top, #book, #chapters, #excerpt, #timeline, #author, #voices, #faq, #press, #buy, #newsletter

### Files Created/Modified

1. **`/home/z/my-project/src/components/site/timeline.tsx`** — REWRITTEN
   - Preserved all existing functionality: 8 events (1951-2000s), alternating left/right, mobile stacked, gold center line, pulsing dots, hover-to-gold, Reveal staggered animations
   - Added scroll-driven center line parallax: `useRef` on section + line div, `useEffect` scroll listener calculates 0-1 progress through timeline section, applies `translateY(progress * lineHeight * 0.3)` with `transition-transform duration-300 ease-out` for smooth movement
   - Enhanced card hover states: `hover:border-gold/40 hover:bg-charcoal-raised`, year text grows from 0.55rem to 0.6rem on hover, red thread horizontal line appears on hover connecting card to center dot, description opacity shifts from `text-paper-mute/70` to `text-paper-mute` on hover
   - Added evidence stamp footer: "CHRONOLOGY REF: CR-2026-0042" in font-mono-dossier text-[0.45rem] tracking-[0.18em] uppercase text-paper-mute/20

2. **`/home/z/my-project/src/components/site/chapter-indicator.tsx`** — NEW
   - "use client" component with useEffect scroll listener + getBoundingClientRect
   - Tracks 11 sections by ID with 120px threshold (top of viewport ≤ 120px)
   - Section-to-label mapping: #top→FILE OPEN, #book→§ 01, #chapters→§ 03, #excerpt→§ 02, #timeline→CHRONOLOGY, #author→§ 03, #voices→§ 04, #faq→§ 05, #press→PRESS, #buy→§ 05 ACQUIRE (desktop) / § 05 (mobile), #newsletter→CASE FILE
   - Fixed bottom-right positioning (z-40, right-4 bottom-32 / sm:right-6 sm:bottom-36 to avoid overlap with BackToTop and NoirToggle)
   - Framer Motion AnimatePresence for smooth enter/exit on section change (opacity + y: 6px animation)
   - Noir pill badge: bg-charcoal-deep/95, border-gold/30, font-mono-dossier text-[0.5rem] tracking-label text-gold, backdrop-blur-sm
   - Animated 2px pulsing gold dot before label text
   - Returns null when no section is active
   - Mobile detection via resize listener for shorter labels

3. **`/home/z/my-project/src/app/page.tsx`** — MODIFIED
   - Added import for ChapterIndicator
   - Added `<ChapterIndicator />` between BackToTop and ThemeSwitcher

## Stage Summary
- Timeline now has scroll-driven parallax on the center gold line, enhanced hover states with border/bg/size/opacity transitions, and an evidence stamp reference number
- Chapter indicator is a floating pill badge that shows the current section label as the user scrolls, with smooth AnimatePresence transitions and mobile-aware shorter labels
- Both components follow the established noir design system and patterns