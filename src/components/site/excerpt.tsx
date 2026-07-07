"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Lock, ArrowRight } from "lucide-react";
import { Reveal } from "./reveal";

/**
 * A "redacted" span — gray bar covers the text and slides open
 * (scaleX 1 → 0, origin left) when scrolled into view.
 */
function Redacted({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -60px 0px" });
  return (
    <span ref={ref} className={`relative inline-block ${className}`}>
      <span className="relative z-10">{children}</span>
      <motion.span
        className="absolute inset-0 z-20 bg-paper-mute/70"
        style={{ originX: 0 }}
        initial={{ scaleX: 1 }}
        animate={inView ? { scaleX: 0 } : { scaleX: 1 }}
        transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden
      />
    </span>
  );
}

export function Excerpt() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "0px 0px -100px 0px" });

  return (
    <section
      id="excerpt"
      className="concrete-texture bg-charcoal relative overflow-hidden border-t-2 border-b-2 border-paper/10 py-24 sm:py-32"
    >
      {/* Faint horizontal ruled lines — typewriter page on dark surface */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, transparent 0, transparent 31px, #ede8dd 31px, #ede8dd 32px)",
        }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-3xl px-5 sm:px-8">
        {/* Header with declassify stamp */}
        <div ref={headerRef} className="mb-10">
          <div className="flex flex-wrap items-center gap-4">
            <span className="font-mono-dossier text-[0.65rem] tracking-label text-rust">
              § 02 — THE EXCERPT
            </span>
            <span className="h-px flex-1 bg-paper/15" />
            {/* Declassify stamp that reveals */}
            <div className="relative">
              <span className="font-mono-dossier inline-flex items-center gap-1.5 border border-paper/15 px-2.5 py-1 text-[0.5rem] tracking-label text-paper/50">
                <Lock className="h-2.5 w-2.5" />
                CLASSIFIED
              </span>
              <motion.span
                className="font-mono-dossier absolute inset-0 flex items-center justify-center gap-1.5 border border-gold/50 bg-charcoal-deep px-2.5 py-1 text-[0.5rem] tracking-label text-gold"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={
                  headerInView
                    ? { scaleX: 1, opacity: 1 }
                    : { scaleX: 0, opacity: 0 }
                }
                transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                style={{ originX: 0 }}
              >
                DECLASSIFIED FOR RELEASE
              </motion.span>
            </div>
          </div>
        </div>

        <Reveal>
          <p className="font-mono-dossier mb-2 text-[0.6rem] tracking-label text-paper/50">
            DOCUMENT: INTRODUCTION &middot; PAGES iii&ndash;iv
          </p>
          <h2 className="font-display text-[clamp(2rem,4.5vw,3.4rem)] font-semibold leading-[1.02] tracking-display text-paper">
            From the Introduction
          </h2>
        </Reveal>

        {/* The typed document */}
        <Reveal delay={0.1}>
          <article className="mt-10 font-body text-[1.075rem] leading-[1.85] text-paper/85 sm:text-lg sm:leading-[1.9]">
            <p className="first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-[4.2rem] first-letter:font-semibold first-letter:leading-[0.82] first-letter:text-rust">
              We must understand and accept that{" "}
              <Redacted delay={0.2} className="font-semibold text-paper">
                evil exists
              </Redacted>{" "}
              in the world and acknowledge that some of our fellow human beings
              will commit evil deeds. Without delving deeply into scripture, the
              Bible views evil as a force opposed to God and good, highlighting
              its presence in the world and stressing the importance of
              resisting it.
            </p>

            <p className="mt-6">
              The book you are about to read is not a book about scripture,
              though many of the characters in the book later understood the
              importance of confronting evil and committing to good deeds. Those
              good deeds were not committed to the expressed purpose of going to
              heaven. They were an engagement and dedication to doing what is
              right and just.
            </p>

            <p className="mt-6">
              The characters and events described herein are a part of our
              history. Sometimes history is dark, but recognizing this darkness
              and being willing to{" "}
              <Redacted delay={0.35} className="font-semibold text-rust">
                expose evil to the light
              </Redacted>{" "}
              gives us some understanding and hope of overcoming it.
            </p>

            <p className="mt-6">
              Gang violence manifests itself on our streets and in our prison
              system. Most of these gangs are formed around ethnic or geographic
              lines. Gangs infect our youth and our communities&hellip;
            </p>
          </article>
        </Reveal>

        {/* Signature / attribution */}
        <Reveal delay={0.1}>
          <div className="mt-10 flex items-center justify-between border-t border-paper/10 pt-6">
            <div>
              <p className="font-display text-sm font-semibold italic text-paper">
                &mdash; Robert B. Taylor
              </p>
              <p className="font-mono-dossier mt-1 text-[0.55rem] tracking-label text-paper-dim">
                FROM &ldquo;WHERE EVIL DWELLS: PERDITION AWAITS&rdquo;
              </p>
            </div>
            <a
              href="#buy"
              className="group inline-flex items-center gap-2 border border-paper/30 px-5 py-3 font-mono-dossier text-[0.65rem] tracking-label text-paper transition-colors hover:border-gold hover:bg-gold/10 hover:text-gold"
            >
              CONTINUE READING
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}