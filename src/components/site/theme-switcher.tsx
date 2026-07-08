'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Palette } from 'lucide-react';

type NoirTheme = 'case-file' | 'interrogation' | 'crime-scene';

interface ThemeOption {
  id: NoirTheme;
  label: string;
  swatch: string;
  vars: Record<string, string> | null;
}

const THEMES: ThemeOption[] = [
  {
    id: 'case-file',
    label: 'Case File',
    swatch: '#b08d57',
    vars: null,
  },
  {
    id: 'interrogation',
    label: 'Interrogation',
    swatch: '#6b8fa3',
    vars: {
      '--color-gold': '#6b8fa3',
      '--color-gold-soft': '#8aabbf',
      '--color-gold-dim': '#556e7e',
      '--color-rust': '#3a5a6e',
      '--color-rust-bright': '#4a7a94',
    },
  },
  {
    id: 'crime-scene',
    label: 'Crime Scene',
    swatch: '#a34028',
    vars: {
      '--color-gold': '#a34028',
      '--color-gold-soft': '#c45a3a',
      '--color-gold-dim': '#7e2e1e',
      '--color-rust': '#8a2020',
      '--color-rust-bright': '#b03030',
    },
  },
];

const CSS_VARS_KEYS = [
  '--color-gold',
  '--color-gold-soft',
  '--color-gold-dim',
  '--color-rust',
  '--color-rust-bright',
];

function applyTheme(theme: NoirTheme) {
  const el = document.documentElement;
  const option = THEMES.find((t) => t.id === theme)!;

  if (option.vars === null) {
    // Reset to defaults — remove all overrides
    CSS_VARS_KEYS.forEach((key) => {
      el.style.removeProperty(key);
    });
  } else {
    CSS_VARS_KEYS.forEach((key) => {
      if (option.vars && option.vars[key]) {
        el.style.setProperty(key, option.vars[key]);
      } else {
        el.style.removeProperty(key);
      }
    });
  }
}

function getInitialTheme(): NoirTheme {
  if (typeof window === 'undefined') return 'case-file';
  const saved = localStorage.getItem('noir-theme') as NoirTheme | null;
  if (saved && THEMES.some((t) => t.id === saved)) return saved;
  return 'case-file';
}

export function ThemeSwitcher() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<NoirTheme>(getInitialTheme);
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const appliedRef = useRef(false);

  // Apply the initial theme on mount (DOM side-effect only, no state)
  useEffect(() => {
    if (!appliedRef.current) {
      applyTheme(active);
      appliedRef.current = true;
    }
  }, [active]);

  const handleSelect = useCallback((themeId: NoirTheme) => {
    setActive(themeId);
    applyTheme(themeId);
    localStorage.setItem('noir-theme', themeId);
    setOpen(false);
  }, []);

  // Close on outside click
  useEffect(() => {
    if (!open) return;

    const handleClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        panelRef.current &&
        !panelRef.current.contains(target) &&
        buttonRef.current &&
        !buttonRef.current.contains(target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  return (
    <div className="fixed bottom-10 right-4 z-39 sm:bottom-14 sm:right-6">
      {/* Popover panel */}
      {open && (
        <div
          ref={panelRef}
          className="absolute bottom-full right-0 mb-2 border border-paper/15 bg-charcoal-deep p-4"
          style={{ minWidth: 160 }}
        >
          <p className="mb-3 font-mono-dossier text-[0.55rem] tracking-[0.18em] uppercase text-paper-mute/60">
            Color Temperature
          </p>
          <div className="flex gap-4">
            {THEMES.map((theme) => (
              <button
                key={theme.id}
                onClick={() => handleSelect(theme.id)}
                className="flex flex-col items-center gap-1.5 transition-opacity duration-200 hover:opacity-100"
                style={{ opacity: active === theme.id ? 1 : 0.6 }}
                aria-label={`Switch to ${theme.label} theme`}
              >
                <span
                  className="flex h-5 w-5 items-center justify-center"
                  style={{
                    backgroundColor: theme.swatch,
                    boxShadow:
                      active === theme.id
                        ? `0 0 0 2px #080807, 0 0 0 3px #b08d57`
                        : 'none',
                  }}
                />
                <span className="font-mono-dossier text-[0.5rem] tracking-[0.14em] uppercase text-paper/70 whitespace-nowrap">
                  {theme.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Trigger button */}
      <button
        ref={buttonRef}
        onClick={() => setOpen((prev) => !prev)}
        className={`flex h-10 w-10 items-center justify-center rounded border transition-all duration-300 bg-charcoal-deep border-paper/15 text-paper-mute hover:text-gold hover:border-gold/40 ${open ? 'border-gold/40 text-gold' : ''}`}
        aria-label="Switch color theme"
      >
        <Palette className="h-4 w-4" />
      </button>
    </div>
  );
}