# Task 6-b — Theme Switcher & Quote Carousel

## Files Created
1. `/home/z/my-project/src/components/site/theme-switcher.tsx`
2. `/home/z/my-project/src/components/site/quote-carousel.tsx`

## Work Log
- Read worklog.md and globals.css to understand the noir design system (charcoal/paper/gold/rust palette, font families, utility classes)
- Studied existing noir-toggle.tsx for floating button pattern (z-40, positioning, tooltip styling)
- Studied endorsements.tsx for quote styling patterns (large decorative quotation mark, rule-gold, font-mono-dossier attribution)

### ThemeSwitcher
- Floating button at bottom-right, z-39 (below NoirToggle at z-40), Palette icon from lucide-react
- Simple div-based popover (no dialog) with absolute positioning, bg-charcoal-deep, border-paper/15, square edges
- 3 themes: Case File (default gold), Interrogation (steel-blue), Crime Scene (blood-red)
- Each theme shows 20x20px swatch circle with accent color + label
- Active theme has gold ring border (box-shadow technique: 2px gap + 3px gold ring)
- Applies CSS custom properties to `document.documentElement.style` via setProperty/removeProperty
- Case File resets by removing all override properties (restoring CSS defaults)
- Persists to localStorage key "noir-theme", restores via lazy useState initializer
- Closes on outside click via ref + document mousedown listener
- Initial lint error (setState in effect) fixed by using lazy initializer + appliedRef for DOM sync

### QuoteCarousel
- 4 quotes cycling every 8 seconds with smooth crossfade
- Large opening quotation mark (font-display, 8rem, text-gold/15, absolute positioned)
- Quote text: font-body text-xl italic text-paper/90, max-w-3xl, centered
- Attribution: rule-gold line, author in font-mono-dossier tracking-label text-gold/80, note in font-body text-sm text-paper-mute italic
- Navigation dots: bg-gold for active, bg-paper/20 for inactive
- Framer Motion AnimatePresence with opacity + y transitions (0.5s, custom easing)
- Pause on hover via onMouseEnter/onMouseLeave
- Proper ARIA roles (tablist, tab, aria-selected)

## Lint Status
- Both new files pass ESLint cleanly (0 errors, 0 warnings)
- 2 pre-existing errors in search-modal.tsx and examples/websocket/frontend.tsx (not from this task)