'use client';

import { useState } from 'react';
import { Film } from 'lucide-react';

export function NoirToggle() {
  const [active, setActive] = useState(false);

  const toggle = () => {
    const next = !active;
    setActive(next);
    if (next) {
      document.documentElement.classList.add('noir-filter-active');
    } else {
      document.documentElement.classList.remove('noir-filter-active');
    }
  };

  return (
    <div className="group fixed bottom-20 right-4 z-40 sm:bottom-24 sm:right-6">
      <button
        onClick={toggle}
        className={`flex h-10 items-center gap-1.5 rounded border px-2.5 font-mono text-[11px] tracking-[0.16em] uppercase transition-all duration-300 bg-charcoal-deep border-paper/15 text-paper-mute hover:text-gold hover:border-gold/40 ${active ? 'border-gold/40 text-gold' : ''}`}
        aria-label="Toggle film noir visual filter"
      >
        <Film className="h-3.5 w-3.5" />
        <span>NOIR</span>
      </button>
      {/* Tooltip */}
      <span
        className="pointer-events-none absolute bottom-full right-0 mb-2 whitespace-nowrap rounded border border-gold/30 bg-charcoal-deep px-2.5 py-1 font-mono text-[10px] tracking-[0.18em] text-gold opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        aria-hidden="true"
      >
        FILM NOIR EFFECT
      </span>
    </div>
  );
}