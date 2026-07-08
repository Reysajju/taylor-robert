"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Lock, X, List } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

/* ── data ─────────────────────────────────────────────────────────── */

const CHAPTERS = [
  {
    num: "01",
    title: "The Birth of the Gangs",
    desc: "How California's prison system birthed the most powerful criminal organizations in American history.",
    status: "sample" as const,
  },
  {
    num: "02",
    title: "La EMe — The Mexican Mafia",
    desc: "Inside the formation and expansion of the prison gang that would come to control the streets.",
    status: "sample" as const,
  },
  {
    num: "03",
    title: "The Aryan Brotherhood",
    desc: "White supremacist prison gangs built on violence, racial allegiance, and absolute loyalty.",
    status: "classified" as const,
  },
  {
    num: "04",
    title: "Black Guerrilla Family",
    desc: "Revolutionary rhetoric masked a criminal enterprise that thrived behind walls.",
    status: "classified" as const,
  },
  {
    num: "05",
    title: "Nuestra Familia",
    desc: "The Northern California rival that warred with La EMe and spilled blood across the state.",
    status: "classified" as const,
  },
  {
    num: "06",
    title: "The Task Forces",
    desc: "The officers who saw the threat first — and were told to look the other way.",
    status: "classified" as const,
  },
  {
    num: "07",
    title: "The Street Connection",
    desc: "How prison gangs extended their reach from cell blocks to neighborhood corners.",
    status: "classified" as const,
  },
  {
    num: "08",
    title: "Codes and Silence",
    desc: "The intricate systems of communication, loyalty oaths, and consequence.",
    status: "classified" as const,
  },
  {
    num: "09",
    title: "The Human Cost",
    desc: "Stories of those caught in the crossfire — inmates, families, officers.",
    status: "classified" as const,
  },
  {
    num: "10",
    title: "Reform and Resistance",
    desc: "The people and programs fighting to break the cycle.",
    status: "classified" as const,
  },
  {
    num: "11",
    title: "Inside the Walls Today",
    desc: "The current state of California's prison-gang landscape.",
    status: "classified" as const,
  },
  {
    num: "12",
    title: "Afterword: The Light",
    desc: "A personal reflection on good, evil, and the distance between them.",
    status: "classified" as const,
  },
];

const EPILOGUE = {
  num: "EP",
  title: "Perdition Awaits",
  desc: "Final thoughts from the author on the ongoing battle.",
};

/* ── animation helpers ────────────────────────────────────────────── */

const listVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const epilogueVariants = {
  hidden: { opacity: 0, y: 16, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
      delay: 0.8,
    },
  },
};

/* ── trigger button ───────────────────────────────────────────────── */

export function TableOfContentsTrigger() {
  return (
    <DialogTrigger asChild>
      <button
        type="button"
        className="group inline-flex items-center gap-2.5 border border-paper/15 bg-charcoal-deep px-5 py-2.5 font-mono-dossier text-[0.65rem] uppercase tracking-label text-paper/80 transition-all duration-300 hover:border-gold/40 hover:text-gold hover:shadow-[0_0_20px_rgba(176,141,87,0.08)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold/50"
      >
        <List className="h-3.5 w-3.5 transition-transform duration-300 group-hover:scale-110" />
        <span>Full Table of Contents</span>
      </button>
    </DialogTrigger>
  );
}

/* ── main modal ───────────────────────────────────────────────────── */

export function TableOfContents() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <TableOfContentsTrigger />

      <DialogContent
        showCloseButton={false}
        className="z-[100] max-h-[88vh] w-[calc(100%-1.5rem)] max-w-2xl overflow-hidden rounded-none border-paper/10 bg-charcoal-deep p-0 shadow-2xl sm:max-w-2xl"
      >
        {/* Custom dark overlay is handled by DialogOverlay, but we add blur */}
        <style>{`
          [data-slot="dialog-overlay"] {
            backdrop-filter: blur(8px) saturate(0.6);
            background-color: rgba(0, 0, 0, 0.75) !important;
          }
        `}</style>

        {/* Sticky header */}
        <div className="flex items-start justify-between border-b border-paper/10 px-6 py-5 sm:px-8">
          <DialogHeader className="gap-1.5">
            <DialogTitle className="font-mono-dossier text-[0.6rem] uppercase tracking-label text-gold/70">
              Confidential Document
            </DialogTitle>
            <DialogDescription className="sr-only">
              Full table of contents for the book
            </DialogDescription>
            <h2 className="font-display text-xl font-semibold leading-tight tracking-display text-paper sm:text-2xl">
              Table of Contents
            </h2>
          </DialogHeader>

          {/* Close button */}
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-sm text-gold/60 transition-all duration-200 hover:bg-paper/5 hover:text-gold focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold/50"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Scrollable chapter list */}
        <div className="max-h-[calc(88vh-80px)] overflow-y-auto overscroll-contain custom-scrollbar px-6 pb-6 pt-4 sm:px-8 sm:pb-8">
          <AnimatePresence>
            {open && (
              <motion.ol
                className="relative flex flex-col"
                variants={listVariants}
                initial="hidden"
                animate="visible"
                aria-label="Chapter list"
              >
                {/* Vertical gold rule */}
                <div
                  className="absolute top-2 bottom-2 left-[1.15rem] w-px bg-paper/[0.06] sm:left-[1.35rem]"
                  aria-hidden
                />

                {CHAPTERS.map((ch) => {
                  const isSample = ch.status === "sample";
                  return (
                    <motion.li
                      key={ch.num}
                      variants={itemVariants}
                      className="group relative flex gap-4 py-4 sm:gap-5 sm:py-5"
                    >
                      {/* Number + dot */}
                      <div className="relative flex w-9 shrink-0 flex-col items-center sm:w-11">
                        <span className="font-display text-sm font-semibold leading-none text-paper/20 sm:text-base">
                          {ch.num}
                        </span>
                        <span
                          className={`mt-2.5 h-1.5 w-1.5 rounded-full transition-colors duration-300 ${
                            isSample ? "bg-gold/60" : "bg-paper/15"
                          }`}
                          aria-hidden
                        />
                      </div>

                      {/* Content */}
                      <div className="min-w-0 flex-1 border-b border-paper/[0.06] pb-4 sm:pb-5">
                        <h3 className="font-display text-base font-semibold leading-snug tracking-display text-paper transition-colors duration-300 group-hover:text-gold sm:text-lg">
                          {ch.title}
                        </h3>
                        <p className="mt-1.5 font-body text-sm leading-relaxed text-paper-mute/60">
                          {ch.desc}
                        </p>
                        {/* Status badge */}
                        <div className="mt-3 flex items-center gap-2">
                          {isSample ? (
                            <>
                              <BookOpen className="h-3 w-3 text-gold/50" />
                              <span className="font-mono-dossier text-[0.5rem] uppercase tracking-label text-gold/50">
                                Sample Available
                              </span>
                            </>
                          ) : (
                            <>
                              <Lock className="h-3 w-3 text-paper-mute/25" />
                              <span className="font-mono-dossier text-[0.5rem] uppercase tracking-label text-paper-mute/25">
                                Classified
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </motion.li>
                  );
                })}
              </motion.ol>
            )}
          </AnimatePresence>

          {/* Epilogue */}
          <AnimatePresence>
            {open && (
              <motion.div
                variants={epilogueVariants}
                initial="hidden"
                animate="visible"
                className="relative mt-6 border-t border-rust/20 pt-6 sm:mt-8 sm:pt-8"
              >
                <div className="flex items-start gap-4 sm:gap-5">
                  {/* Epilogue marker */}
                  <div className="flex w-9 shrink-0 flex-col items-center sm:w-11">
                    <span className="font-mono-dossier text-[0.5rem] uppercase tracking-label text-rust/60">
                      Epilogue
                    </span>
                    <span
                      className="mt-2 h-1.5 w-1.5 rounded-full bg-rust/40"
                      aria-hidden
                    />
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="font-display text-base font-semibold leading-snug tracking-display text-paper sm:text-lg">
                      {EPILOGUE.title}
                    </h3>
                    <p className="mt-1.5 font-body text-sm leading-relaxed text-paper-mute/60">
                      {EPILOGUE.desc}
                    </p>
                    <div className="mt-3 flex items-center gap-2">
                      <span className="inline-block h-2 w-2 rotate-45 border border-rust/40" aria-hidden />
                      <span className="font-mono-dossier text-[0.5rem] uppercase tracking-label text-rust/40">
                        End of File
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Footer metadata */}
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="mt-8 border-t border-paper/[0.06] pt-5"
              >
                <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between">
                  <p className="font-mono-dossier text-[0.5rem] uppercase tracking-label text-paper-mute/30">
                    12 Chapters &middot; 1 Epilogue &middot; Appendices
                  </p>
                  <p className="font-mono-dossier text-[0.5rem] uppercase tracking-label text-paper-mute/30">
                    Document Ref: TOC-2024-CLASSIFIED
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
}