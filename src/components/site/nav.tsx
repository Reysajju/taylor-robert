"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "#book", label: "The Book" },
  { href: "#excerpt", label: "Excerpt" },
  { href: "#author", label: "Author" },
];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-charcoal/85 backdrop-blur-md border-b border-paper/10"
          : "bg-transparent border-b border-transparent",
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-12">
        <a
          href="#top"
          className="group flex items-center gap-3"
          aria-label="Where Evil Dwells — home"
        >
          <span
            className="flex h-8 w-8 items-center justify-center border border-gold/50 font-display text-sm font-semibold text-gold transition-colors group-hover:border-gold"
            aria-hidden
          >
            R
          </span>
          <span className="hidden flex-col leading-none sm:flex">
            <span className="font-display text-[0.95rem] font-semibold tracking-display text-paper">
              Where Evil Dwells
            </span>
            <span className="font-mono-dossier mt-1 text-[0.55rem] tracking-label text-gold/80">
              PERDITION AWAITS
            </span>
          </span>
        </a>

        <div className="hidden items-center gap-9 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="link-underline font-mono-dossier text-[0.7rem] tracking-label text-paper-mute hover:text-paper"
            >
              {l.label}
            </a>
          ))}
          <a
            href="https://www.amazon.com/WHERE-EVIL-DWELLS-PERDITION-AWAITS/dp/B0H2KK7RJQ"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center overflow-hidden border border-rust px-5 py-2.5 font-mono-dossier text-[0.7rem] tracking-label text-paper transition-colors hover:bg-rust"
          >
            <span className="relative z-10">Buy the Book</span>
          </a>
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center text-paper md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={cn(
          "overflow-hidden border-t border-paper/10 bg-charcoal-deep/95 backdrop-blur-md transition-[max-height,opacity] duration-500 md:hidden",
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <div className="flex flex-col gap-1 px-5 py-4">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="flex items-center justify-between border-b border-paper/5 py-3 font-mono-dossier text-[0.75rem] tracking-label text-paper-mute hover:text-paper"
            >
              {l.label}
              <span className="text-gold/60">↘</span>
            </a>
          ))}
          <a
            href="https://www.amazon.com/WHERE-EVIL-DWELLS-PERDITION-AWAITS/dp/B0H2KK7RJQ"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="mt-3 inline-flex items-center justify-center border border-rust px-5 py-3 font-mono-dossier text-[0.7rem] tracking-label text-paper"
          >
            Buy the Book
          </a>
        </div>
      </div>
    </header>
  );
}
