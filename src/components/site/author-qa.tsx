"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "./reveal";
import { ScrambleHeading } from "./scramble-heading";

interface QA {
  question: string;
  answer: string;
  topic: string;
}

const QA_ITEMS: QA[] = [
  {
    topic: "MOTIVATION",
    question: "What made you write this book after decades in law enforcement?",
    answer:
      "I kept meeting people — officers, inmates, families — whose stories were never going to be told by the media or by the system itself. The task-force officers who saw the threat in the 1970s and were told to stand down. The inmates who wanted out but had no off-ramp. Father Greg Boyle, who proved that an off-ramp could exist. These stories demanded a witness, and I was positioned to be one.",
  },
  {
    topic: "RESEARCH",
    question: "How did you research the prison gangs without compromising ongoing investigations?",
    answer:
      "Many of the cases I describe are historical — the founding of La EMe, the early task-force struggles, the riots of the 1990s. For more recent material, I worked from publicly available court records, published reports, and interviews with retired officers. Where names or details could jeopardize anyone's safety, I made the editorial decision to withhold or generalize. This is a work of history, not an intelligence brief.",
  },
  {
    topic: "PROCESS",
    question: "How long did it take to write Where Evil Dwells?",
    answer:
      "The research alone spanned several years — cross-referencing CDCR records, interviewing former colleagues, and visiting the institutions described in the book. The actual writing took another two years of sustained effort. Some chapters, like the one on the Aryan Brotherhood's federal prosecution, required months of careful documentary work to get right.",
  },
  {
    topic: "CONTROVERSY",
    question: "The book is critical of the corrections system. Have you faced pushback?",
    answer:
      "Criticism, yes. Pushback, no — not from anyone willing to engage honestly. The failures I describe are matters of public record: the underfunding of intelligence units, the racial segregation that the state itself enforced, the decades of bureaucratic inertia. These aren't accusations. They're documentation. Most corrections professionals I've spoken with recognize these problems. Many of them tried to fix them from the inside.",
  },
  {
    topic: "IMPACT",
    question: "Do you believe the prison-gang problem can actually be solved?",
    answer:
      "Solved? Perhaps not in our lifetimes. But it can be managed — and reduced. Programs like Homeboy Industries prove that intervention works when it's genuine and sustained. The task-force model, when properly resourced, produces real intelligence. The question isn't whether solutions exist. It's whether the political will exists to fund and sustain them.",
  },
  {
    topic: "AUDIENCE",
    question: "Who should read this book?",
    answer:
      "Criminal justice professionals, certainly. But also anyone who wants to understand how institutions can fail the people they're designed to serve. This isn't just a prison book. It's a book about how systems create the very problems they claim to solve — and about the individuals who refuse to accept that failure as inevitable.",
  },
  {
    topic: "PERSONAL",
    question: "Was there a moment during your career that changed how you saw the system?",
    answer:
      "Early in my tenure at Probation, I reviewed a case file of a young man who had cycled through the system three times. Same charges, same interventions, same outcome. The file itself was almost identical each time — photocopied failure. That's when I understood that the system wasn't broken in the way people think. It was functioning exactly as designed. And its design was the problem.",
  },
  {
    topic: "LEGACY",
    question: "What do you hope readers take away from Where Evil Dwells?",
    answer:
      "Two things. First, that the distance between 'us' and 'them' — between the public and the incarcerated — is far smaller than we pretend. The organizations in this book were built by human beings responding to human conditions. Second, that documentation matters. The officers who sounded the alarm early, the reformers who built alternatives — their work deserves to be known. This book is my contribution to that record.",
  },
];

export function AuthorQA() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      id="author-qa"
      className="grain-overlay concrete-texture section-transition relative overflow-hidden border-t border-paper/10 bg-charcoal-deep py-24 sm:py-32"
    >
      <div className="relative z-10 mx-auto max-w-4xl px-5 sm:px-8 lg:px-10">
        {/* Section header */}
        <Reveal className="mb-6 flex items-center gap-4">
          <span className="font-mono-dossier text-[0.65rem] tracking-label text-gold">
            INTERVIEW TRANSCRIPT
          </span>
          <span className="h-px flex-1 bg-paper/10" />
          <span className="font-mono-dossier text-[0.5rem] tracking-label text-paper-mute/30">
            8 QUESTIONS
          </span>
        </Reveal>

        <Reveal>
          <ScrambleHeading className="font-display text-[clamp(2rem,4vw,3.2rem)] font-semibold tracking-display text-paper text-glow-gold">
            In the author's own words.
          </ScrambleHeading>
          <p className="mt-3 max-w-2xl text-paper-mute">
            Questions put to Robert B. Taylor about the book, the system,
            and the distance between documentation and justice.
          </p>
        </Reveal>

        {/* Q&A items */}
        <Stagger className="mt-12 divide-y divide-paper/[0.06]" stagger={0.06} delay={0.1}>
          {QA_ITEMS.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <StaggerItem key={i} direction="up">
                <div className="border-reveal rounded-sm">
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="group flex w-full items-start gap-4 py-5 text-left transition-colors duration-300 hover:bg-charcoal-raised/30 sm:gap-5 sm:py-6"
                    aria-expanded={isOpen}
                  >
                    {/* Question number + topic */}
                    <div className="flex w-12 shrink-0 flex-col items-start gap-1 sm:w-14">
                      <span className="font-display text-lg font-semibold leading-none text-paper/15 sm:text-xl">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-mono-dossier text-[0.45rem] tracking-label text-gold/50">
                        {item.topic}
                      </span>
                    </div>

                    {/* Question text */}
                    <div className="min-w-0 flex-1">
                      <h3 className="font-display text-sm font-medium leading-snug tracking-display text-paper transition-colors duration-300 group-hover:text-gold sm:text-base">
                        {item.question}
                      </h3>
                    </div>

                    {/* Chevron */}
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="mt-1 shrink-0 text-paper-mute/30 transition-colors group-hover:text-gold/60"
                    >
                      <ChevronDown className="h-4 w-4" />
                    </motion.div>
                  </button>

                  {/* Answer */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-paper/[0.06] pb-5 pl-12 pt-4 sm:pl-14 sm:pb-6">
                          <p className="font-body text-sm leading-[1.85] text-paper-dim sm:text-[0.9rem]">
                            {item.answer}
                          </p>
                          {/* Divider line with quote marks */}
                          <div className="mt-4 flex items-center gap-3">
                            <span className="h-px flex-1 bg-paper/[0.06]" />
                            <span className="font-mono-dossier text-[0.45rem] tracking-label text-paper-mute/20">
                              R.B.T.
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}