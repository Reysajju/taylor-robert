"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Search, ArrowRight } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

/* ------------------------------------------------------------------ */
/*  Searchable sections                                                */
/* ------------------------------------------------------------------ */

const SECTIONS = [
  {
    label: "The Book",
    desc: "Synopsis, specs, and details about Where Evil Dwells",
    href: "#book",
  },
  {
    label: "Chapter Preview",
    desc: "12 chapters and epilogue preview",
    href: "#chapters",
  },
  {
    label: "Excerpt",
    desc: "Read a declassified excerpt from the Introduction",
    href: "#excerpt",
  },
  {
    label: "Timeline",
    desc: "Chronology of California's prison-gang crisis (1951–2000s)",
    href: "#timeline",
  },
  {
    label: "Subject Files",
    desc: "Gang profiles — La EMe, Aryan Brotherhood, BGF, Nuestra Familia",
    href: "#subjects",
  },
  {
    label: "The Author",
    desc: "About Robert B. Taylor — LAPD, L.A. County Probation Chief",
    href: "#author",
  },
  {
    label: "Voices",
    desc: "Epigraph, pull-quote, and advance praise",
    href: "#voices",
  },
  {
    label: "Reader Reviews",
    desc: "Star ratings and early reader reactions",
    href: "#reviews",
  },
  {
    label: "FAQ",
    desc: "Frequently asked questions about the book",
    href: "#faq",
  },
  {
    label: "Press Kit",
    desc: "Media resources, book cover, headshot, press release",
    href: "#press",
  },
  {
    label: "Buy the Book",
    desc: "Purchase on Amazon, Kindle, Blackwell's",
    href: "#buy",
  },
  {
    label: "Newsletter",
    desc: "Subscribe for updates on future releases",
    href: "#newsletter",
  },
  {
    label: "Table of Contents",
    desc: "Full chapter listing with descriptions",
    href: "#chapters",
  },
] as const

/* ------------------------------------------------------------------ */
/*  Highlight matching text in gold                                    */
/* ------------------------------------------------------------------ */

function HighlightMatch({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <>{text}</>

  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  const regex = new RegExp(`(${escaped})`, "gi")
  const parts = text.split(regex)

  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <span key={i} className="text-gold">
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  )
}

/* ------------------------------------------------------------------ */
/*  SearchTrigger — standalone button                                  */
/* ------------------------------------------------------------------ */

export function SearchTrigger({
  onClick,
}: {
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center w-8 h-8 rounded-xs border border-paper/10 bg-charcoal-soft text-paper-mute/60 hover:text-paper hover:border-gold/40 transition-colors duration-200"
      aria-label="Search sections"
    >
      <Search className="size-4" />
    </button>
  )
}

/* ------------------------------------------------------------------ */
/*  SearchModal — full component with trigger + keyboard shortcut      */
/* ------------------------------------------------------------------ */

export function SearchModal() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  const filtered = query.trim()
    ? SECTIONS.filter(
        (s) =>
          s.label.toLowerCase().includes(query.toLowerCase()) ||
          s.desc.toLowerCase().includes(query.toLowerCase())
      )
    : SECTIONS

  /* Keyboard shortcut: Cmd+K / Ctrl+K */
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setOpen((prev) => !prev)
      }
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [])

  /* Auto-focus input when opened */
  useEffect(() => {
    if (open) {
      // small delay so the dialog animation starts first
      const t = setTimeout(() => inputRef.current?.focus(), 50)
      return () => clearTimeout(t)
    }
  }, [open])

  const handleSelect = useCallback(
    (href: string) => {
      setOpen(false)
      const el = document.querySelector(href)
      if (el) {
        el.scrollIntoView({ behavior: "smooth" })
      }
    },
    []
  )

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) setQuery(""); setOpen(v); }}>
      {/* Inline trigger button — also accepts external triggers via SearchTrigger */}
      <button
        onClick={() => setOpen(true)}
        className="flex items-center justify-center w-8 h-8 rounded-xs border border-paper/10 bg-charcoal-soft text-paper-mute/60 hover:text-paper hover:border-gold/40 transition-colors duration-200"
        aria-label="Search sections (⌘K)"
      >
        <Search className="size-4" />
      </button>

      <DialogContent
        showCloseButton={false}
        className="fixed top-[20%] left-1/2 -translate-x-1/2 translate-y-0 z-50 w-full max-w-lg bg-charcoal-deep border-paper/10 rounded-xs p-0 shadow-2xl overflow-hidden"
      >
        {/* Visually hidden for accessibility */}
        <DialogTitle className="sr-only">Search Sections</DialogTitle>
        <DialogDescription className="sr-only">
          Find and navigate to sections of the page
        </DialogDescription>

        {/* Search input */}
        <div className="flex items-center gap-3 border-b border-paper/10 px-4 py-3">
          <Search className="size-4 text-paper-mute/40 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search sections…"
            className="flex-1 bg-transparent font-body text-paper text-sm placeholder:text-paper-mute/30 outline-none"
          />
          <kbd className="hidden sm:inline-flex items-center gap-1 rounded-xs border border-paper/10 bg-charcoal px-1.5 py-0.5 font-mono-dossier text-[10px] text-paper-mute/40 tracking-wider">
            ESC
          </kbd>
        </div>

        {/* Results list */}
        <div className="max-h-72 overflow-y-auto">
          {filtered.length > 0 ? (
            <ul className="py-2" role="listbox">
              {filtered.map((item) => (
                <li key={item.href + item.label}>
                  <button
                    onClick={() => handleSelect(item.href)}
                    className={cn(
                      "flex items-center gap-3 w-full px-4 py-2.5 text-left transition-colors duration-150",
                      "hover:bg-charcoal-raised"
                    )}
                    role="option"
                    aria-selected={false}
                  >
                    {/* Label */}
                    <span className="font-display text-paper text-sm leading-tight shrink-0 min-w-[120px]">
                      <HighlightMatch text={item.label} query={query} />
                    </span>

                    {/* Description */}
                    <span className="font-body text-paper-mute/60 text-xs leading-snug flex-1 truncate">
                      <HighlightMatch text={item.desc} query={query} />
                    </span>

                    {/* Arrow */}
                    <ArrowRight className="size-3.5 text-paper-mute/20 shrink-0" />
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <span className="font-mono-dossier tracking-label text-paper-mute/20 text-xs uppercase">
                No Results
              </span>
              <span className="font-body text-paper-mute/15 text-xs mt-1">
                Try a different search term
              </span>
            </div>
          )}
        </div>

        {/* Footer hint */}
        <div className="flex items-center justify-between border-t border-paper/8 px-4 py-2">
          <span className="font-mono-dossier text-[10px] text-paper-mute/20 tracking-wider uppercase">
            {filtered.length} {filtered.length === 1 ? "result" : "results"}
          </span>
          <span className="font-mono-dossier text-[10px] text-paper-mute/20 tracking-wider">
            ESC to close
          </span>
        </div>
      </DialogContent>
    </Dialog>
  )
}