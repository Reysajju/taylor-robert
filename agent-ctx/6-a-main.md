# Task 6-a — Loading Screen & Search Modal

## Files Created

1. **`/home/z/my-project/src/components/site/loading-screen.tsx`**
   - Full-screen noir preloader (fixed inset-0, z-100, bg-charcoal-deep)
   - Dossier stamp: gold-bordered box with large "R" (font-display, 5xl, text-gold), scales in
   - "WHERE EVIL DWELLS" in font-mono-dossier tracking-label text-paper-mute/40, fades in at 0.5s delay
   - "CLASSIFIED DOSSIER — LOADING..." with blinking gold cursor (reuses caret-blink keyframe)
   - Gold rule-gold line sweeps from left (scaleX 0→1) over 1.2s
   - After 2s total: triggers fade-out via AnimatePresence (opacity 0, translateY -10px, 0.6s)
   - Fully unmounts from DOM after fade completes (visible state → false)
   - Exported as `LoadingScreen`

2. **`/home/z/my-project/src/components/site/search-modal.tsx`**
   - Cmd+K / Ctrl+K keyboard shortcut to toggle
   - Uses shadcn/ui Dialog component (DialogContent, DialogTitle, DialogDescription)
   - Search input with magnifying glass (Search icon from lucide-react)
   - 11 searchable sections with label + desc + href
   - Case-insensitive filtering on both label and desc fields
   - Matching text highlighted in gold via HighlightMatch sub-component
   - Each result: label (font-display, text-paper), desc (font-body, text-paper-mute/60, text-xs), ArrowRight icon
   - hover:bg-charcoal-raised on results, noir styling throughout
   - "NO RESULTS" empty state with muted text
   - Footer shows result count + "ESC to close" hint
   - Click result → closes dialog + smooth scrolls to section href
   - Two exports: `SearchModal` (full component with inline trigger) and `SearchTrigger` (standalone button for external use)

## Lint Status
- Both files pass ESLint cleanly (no new errors introduced; 3 pre-existing errors in theme-switcher.tsx and examples/websocket/frontend.tsx)

## Design System Alignment
- Uses project palette: charcoal-deep, paper, paper-mute, gold, charcoal-raised, charcoal-soft
- Uses project typography: font-display, font-body, font-mono-dossier, tracking-label, tracking-label-sm
- Reuses existing CSS: rule-gold, caret-blink animation
- Matches component patterns from existing site/ components