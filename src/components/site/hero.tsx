"use client";

import { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, BookOpen } from "lucide-react";
import { BookCover } from "./book-cover";
import { useTilt } from "@/hooks/use-tilt";
import { DustParticles } from "./dust-particles";

const ease = [0.22, 1, 0.36, 1] as const;

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.16, delayChildren: 0.15 } },
};
const item = {
  hidden: { opacity: 0, y: 26, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease },
  },
};

export function Hero() {
  const { ref, tilt } = useTilt<HTMLDivElement>(true);

  // Parallax mouse tracking for the background texture
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const smoothX = useSpring(mouseX, { stiffness: 30, damping: 25 });
  const smoothY = useSpring(mouseY, { stiffness: 30, damping: 25 });
  const bgX = useTransform(smoothX, [0, 1], ["-8px", "8px"]);
  const bgY = useTransform(smoothY, [0, 1], ["-8px", "8px"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  return (
    <section
      id="top"
      className="grain-drift vignette relative flex min-h-[100svh] items-center overflow-hidden bg-charcoal"
      onMouseMove={handleMouseMove}
    >
      {/* Slow-panning atmospheric background image with parallax */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="slow-pan absolute inset-0 bg-cover bg-center opacity-40"
          style={{
            backgroundImage: "url(/assets/hero-texture.png)",
            x: bgX,
            y: bgY,
          }}
        />
        {/* Charcoal wash to guarantee text contrast even before image loads */}
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/80 via-charcoal/70 to-charcoal" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/40 to-charcoal/80" />
      </div>

      {/* Faint grid — declassified-dossier feel */}
      <div
        className="absolute inset-0 z-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #ede8dd 1px, transparent 1px), linear-gradient(to bottom, #ede8dd 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
        aria-hidden
      />

      {/* Floating dust particles */}
      <DustParticles />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-5 pb-20 pt-32 sm:px-8 lg:grid-cols-12 lg:gap-8 lg:px-12 lg:pb-24 lg:pt-28">
        {/* Left: text */}
        <motion.div
          className="lg:col-span-7"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            variants={item}
            className="mb-6 flex items-center gap-3"
          >
            <span className="h-px w-10 bg-gold/60" />
            <span className="font-mono-dossier text-[0.65rem] tracking-label text-gold/90">
              A WORK OF TRUE-CRIME NONFICTION
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="font-display text-[clamp(2.8rem,7vw,5.6rem)] font-semibold leading-[0.9] tracking-display text-paper"
          >
            Where Evil
            <br />
            Dwells
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-4 font-display text-[clamp(1.1rem,2.2vw,1.7rem)] font-medium italic tracking-[0.12em] text-gold"
          >
            <TypewriterText text="Perdition Awaits" />
          </motion.p>

          <motion.p
            variants={item}
            className="mt-8 max-w-xl font-body text-lg leading-relaxed text-paper-mute sm:text-xl"
          >
            Inside the gangs that rule California&rsquo;s prisons &mdash; and the
            men who dared to stand against them.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
          >
            <a
              href="#excerpt"
              className="group inline-flex items-center justify-center gap-2.5 bg-rust px-7 py-4 font-mono-dossier text-[0.72rem] tracking-label text-paper transition-all duration-300 hover:bg-rust-bright hover:shadow-[0_0_24px_rgba(122,46,29,0.25)]"
            >
              <BookOpen className="h-4 w-4" />
              Read an Excerpt
            </a>
            <a
              href="https://www.amazon.com/WHERE-EVIL-DWELLS-PERDITION-AWAITS/dp/B0H2KK7RJQ"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2.5 border border-paper/30 px-7 py-4 font-mono-dossier text-[0.72rem] tracking-label text-paper transition-all duration-300 hover:border-gold hover:text-gold hover:shadow-[0_0_16px_rgba(176,141,87,0.08)]"
            >
              Buy the Book
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono-dossier text-[0.6rem] tracking-label text-paper-mute/60"
          >
            <span>PUBLISHED BY WADSWORTH</span>
            <span className="h-3 w-px bg-paper/20" />
            <span>289 PAGES</span>
            <span className="h-3 w-px bg-paper/20" />
            <span>12 CHAPTERS &middot; EPILOGUE</span>
          </motion.div>
        </motion.div>

        {/* Right: book cover with cursor tilt */}
        <motion.div
          className="flex justify-center lg:col-span-5 lg:justify-end"
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.1, delay: 0.35, ease }}
        >
          <div className="relative w-[min(78vw,22rem)] sm:w-[min(60vw,24rem)] lg:w-[22rem]">
            {/* Multi-layer glow behind the cover — rust + gold + deep shadow */}
            <div
              className="absolute -inset-8 rounded-xl bg-rust/[0.08] blur-[60px]"
              aria-hidden
            />
            <div
              className="absolute -inset-4 rounded-lg bg-gold/[0.06] blur-[40px]"
              aria-hidden
            />
            <div
              className="absolute -inset-12 rounded-2xl bg-charcoal-deep/50 blur-[80px]"
              aria-hidden
            />
            <div
              ref={ref}
              className="relative will-change-transform"
              style={{
                transform: `perspective(1100px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
                transformStyle: "preserve-3d",
                transition: "transform 0.1s linear",
              }}
            >
              {/* Glare that follows cursor */}
              <div
                className="pointer-events-none absolute -inset-1 z-20 rounded-sm opacity-0 transition-opacity duration-300 hover:opacity-100"
                style={{
                  background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(237,232,221,0.18), transparent 55%)`,
                }}
                aria-hidden
              />
              <BookCover />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
      >
        <span className="font-mono-dossier text-[0.55rem] tracking-label text-paper-mute/60">
          SCROLL TO ENTER THE FILE
        </span>
        <span className="h-10 w-px bg-gradient-to-b from-gold/60 to-transparent" />
      </motion.div>
    </section>
  );
}

/** Typewriter effect that types out text character by character */
function TypewriterText({ text, delay = 0.8 }: { text: string; delay?: number }) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), delay * 1000);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    if (displayed.length >= text.length) return;

    const timeout = setTimeout(() => {
      setDisplayed(text.slice(0, displayed.length + 1));
    }, 65);
    return () => clearTimeout(timeout);
  }, [displayed, started, text]);

  return (
    <>
      {displayed}
      {displayed.length < text.length && (
        <span className="inline-block w-[0.08em] h-[1em] bg-gold/80 ml-0.5 align-middle animate-pulse" />
      )}
    </>
  );
}