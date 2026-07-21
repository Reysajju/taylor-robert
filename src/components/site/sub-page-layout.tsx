"use client";

import Link from "next/link";
import { SiteNav } from "./nav";
import { BackToTop } from "./back-to-top";
import { ThemeSwitcher } from "./theme-switcher";
import { NoirToggle } from "./noir-toggle";
import { SiteFooter } from "./site-footer";
import { ContactModal } from "./contact-modal";

export function SubPageLayout({
  children,
  title,
  label,
}: {
  children: React.ReactNode;
  title: string;
  label: string;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-charcoal">
      <SiteNav />

      {/* Page header */}
      <header className="grain-overlay concrete-texture border-t border-paper/10 pt-28 sm:pt-32 pb-6 sm:pb-10">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono-dossier text-[0.65rem] tracking-label text-paper-mute hover:text-gold transition-colors duration-300"
          >
            <span aria-hidden="true">←</span> BACK TO FILE
          </Link>

          <div className="mt-4 flex items-center gap-4">
            <span className="font-mono-dossier text-[0.65rem] tracking-label text-gold">
              {label}
            </span>
            <span className="h-px flex-1 bg-paper/10" />
          </div>

          <h1 className="mt-4 font-display text-[clamp(2rem,4vw,3.2rem)] font-semibold leading-[1.04] tracking-display text-paper text-glow-gold">
            {title}
          </h1>
        </div>
      </header>

      <main className="flex-1">
        {children}
      </main>

      <SiteFooter />
      <ContactModal />
      <BackToTop />
      <ThemeSwitcher />
      <NoirToggle />
    </div>
  );
}