"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "#book", label: "The Book" },
  { href: "#excerpt", label: "Excerpt" },
  { href: "#author", label: "Author" },
  { href: "#faq", label: "FAQ" },
  { href: "#buy", label: "Buy" },
];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);

      // Track active section for gold underline highlight
      const sections = LINKS.map((l) => l.href.replace("#", ""));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-charcoal/90 backdrop-blur-lg border-b border-paper/10 shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
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
            className="flex h-8 w-8 items-center justify-center border border-gold/50 font-display text-sm font-semibold text-gold transition-all duration-300 group-hover:border-gold group-hover:shadow-[0_0_12px_rgba(176,141,87,0.15)]"
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
              className={cn(
                "link-underline font-mono-dossier text-[0.7rem] tracking-label transition-colors duration-300",
                activeSection === l.href.replace("#", "")
                  ? "text-paper link-underline-active"
                  : "text-paper-mute hover:text-paper",
              )}
            >
              {l.label}
            </a>
          ))}
          <a
            href="https://www.amazon.com/WHERE-EVIL-DWELLS-PERDITION-AWAITS/dp/B0H2KK7RJQ"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center overflow-hidden border border-rust px-5 py-2.5 font-mono-dossier text-[0.7rem] tracking-label text-paper transition-all duration-300 hover:bg-rust hover:shadow-[0_0_20px_rgba(122,46,29,0.3)]"
          >
            <span className="relative z-10">Buy the Book</span>
          </a>
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center text-paper transition-colors hover:text-gold md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile menu — full-screen overlay */}
      <div
        className={cn(
          "fixed inset-0 top-0 z-40 bg-charcoal-deep/[0.98] backdrop-blur-xl transition-all duration-500 md:hidden",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
        aria-hidden={!open}
      >
        <div className="flex h-full flex-col justify-center px-8">
          {/* Decorative line */}
          <div className="mb-8 flex items-center gap-4">
            <span className="h-px flex-1 bg-gold/20" />
            <span className="font-mono-dossier text-[0.5rem] tracking-label text-gold/50">
              DOSSIER NAVIGATION
            </span>
            <span className="h-px flex-1 bg-gold/20" />
          </div>

          {LINKS.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="group flex items-center gap-4 border-b border-paper/5 py-4 transition-all duration-300"
              style={{ transitionDelay: open ? `${i * 75}ms` : "0ms" }}
            >
              <span className="font-mono-dossier text-[0.55rem] tracking-label text-gold/40 transition-colors group-hover:text-gold">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-display text-2xl font-semibold tracking-display text-paper transition-colors group-hover:text-gold sm:text-3xl">
                {l.label}
              </span>
              <span className="ml-auto text-paper-mute/30 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-gold/60">
                &rarr;
              </span>
            </a>
          ))}

          {/* Buy CTA in mobile menu */}
          <a
            href="https://www.amazon.com/WHERE-EVIL-DWELLS-PERDITION-AWAITS/dp/B0H2KK7RJQ"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="mt-8 inline-flex items-center justify-center border border-rust bg-rust/10 px-6 py-4 font-mono-dossier text-[0.72rem] tracking-label text-paper transition-all duration-300 hover:bg-rust"
          >
            BUY THE BOOK
          </a>

          {/* Bottom metadata */}
          <div className="mt-auto pb-8 pt-8">
            <div className="rule-gold mb-4" />
            <p className="font-mono-dossier text-[0.5rem] tracking-label text-paper-mute/30">
              WHERE EVIL DWELLS &middot; PERDITION AWAITS &middot; 2026
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}