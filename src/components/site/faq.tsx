"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Reveal } from "./reveal";
import { cn } from "@/lib/utils";

interface FAQItem {
  question: string;
  answer: string;
  tag?: string;
}

const FAQS: FAQItem[] = [
  {
    question: "What is this book about?",
    answer:
      "Where Evil Dwells: Perdition Awaits traces the rise of California's four most powerful prison gangs — La EMe (the Mexican Mafia), the Aryan Brotherhood, the Black Guerrilla Family, and Nuestra Familia. Written by a former LAPD officer and L.A. County Probation Chief, it combines decades of firsthand experience with investigative research to tell the story of how these organizations formed, grew, and eventually reached beyond prison walls to control criminal enterprises on the streets.",
    tag: "OVERVIEW",
  },
  {
    question: "Who is Robert B. Taylor?",
    answer:
      "Robert B. Taylor served with the Los Angeles Police Department before becoming Chief of the Los Angeles County Probation Department. Across a career spanning decades, he worked directly with the prison-gang task forces, reformers, and community leaders whose stories fill this book. He writes not as an outsider looking in, but as someone who stood at the intersection of policy and human consequence.",
    tag: "AUTHOR",
  },
  {
    question: "Is this book based on real events?",
    answer:
      "Yes. Where Evil Dwells is a work of true-crime nonfiction. Every major event, organization, and figure described in the book is drawn from public records, court documents, task-force reports, and the author's own professional experience. Names and specific details have been documented through extensive research and sourcing.",
    tag: "GENRE",
  },
  {
    question: "Where can I buy the book?",
    answer:
      "The book is available in paperback and ebook formats. You can purchase it through Amazon (US and Canada), Kindle, and Blackwell's. Visit the Acquire section on this page for direct links to all retailers.",
    tag: "PURCHASE",
  },
  {
    question: "Is the book suitable for academic use?",
    answer:
      "Absolutely. With its detailed sourcing, comprehensive chronology of prison-gang formation, and policy analysis, the book serves as a valuable resource for courses in criminal justice, sociology, and corrections. It includes an epilogue and appendices with supplementary reference material.",
    tag: "ACADEMIC",
  },
  {
    question: "How long is the book?",
    answer:
      "The paperback edition runs 289 pages across 12 chapters, plus an epilogue and appendices. It is published by Wadsworth Publishing as a First Edition (2026).",
    tag: "SPECIFICATIONS",
  },
  {
    question: "Will there be a sequel or additional books?",
    answer:
      "Robert B. Taylor is continuing to write and research. Sign up for the newsletter on this page to be the first to know about new releases, readings, and advance excerpts.",
    tag: "FUTURE",
  },
];

function FAQAccordionItem({
  item,
  isOpen,
  isFocused,
  onToggle,
  onFocus,
  index,
}: {
  item: FAQItem;
  isOpen: boolean;
  isFocused?: boolean;
  onToggle: () => void;
  onFocus: () => void;
  index: number;
}) {
  return (
    <div className={cn(
      "border-b border-paper/10 last:border-b-0 transition-colors duration-300",
      isFocused && "bg-gold/[0.03]"
    )}>
      <button
        onClick={onToggle}
        onFocus={onFocus}
        aria-expanded={isOpen}
        className="group flex w-full items-start gap-4 py-5 text-left transition-colors hover:text-gold sm:py-6"
      >
        <span className={cn(
          "font-mono-dossier mt-1 text-[0.5rem] tracking-label transition-colors shrink-0 w-6",
          isFocused ? "text-gold" : "text-paper-mute/40 group-hover:text-gold/60"
        )}>
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className={cn(
          "flex-1 font-display text-base font-semibold leading-snug tracking-display transition-colors duration-300 sm:text-lg",
          isFocused ? "text-gold" : "text-paper group-hover:text-gold"
        )}>
          {item.question}
        </span>
        <ChevronDown
          className={cn(
            "mt-1 h-4 w-4 shrink-0 transition-all duration-300",
            isOpen || isFocused ? "text-gold" : "text-paper-mute/40 group-hover:text-gold",
            isOpen && "rotate-180",
          )}
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="pl-10 pb-5 sm:pl-10 sm:pb-6">
              {item.tag && (
                <span className="mb-2 inline-block font-mono-dossier text-[0.5rem] tracking-label text-rust-bright/70">
                  {item.tag}
                </span>
              )}
              <p className="font-body text-sm leading-relaxed text-paper-mute sm:text-base sm:leading-relaxed max-w-2xl">
                {item.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const toggleItem = useCallback((i: number) => {
    setOpenIndex((prev) => (prev === i ? null : i));
  }, []);

  // Keyboard navigation for FAQ items
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
      },
      { threshold: 0.1 }
    );
    observer.observe(section);

    const handleKeyDown = (e: KeyboardEvent) => {
      const buttons = section.querySelectorAll<HTMLButtonElement>(
        'button[aria-expanded]'
      );
      if (!buttons.length) return;

      // Only handle if one of the FAQ buttons is focused or section is visible
      const activeEl = document.activeElement;
      const isFaqButton = activeEl && buttons.includes(activeEl as HTMLButtonElement);
      if (!isFaqButton) return;

      const currentIndex = Array.from(buttons).indexOf(activeEl as HTMLButtonElement);

      switch (e.key) {
        case "ArrowDown":
        case "ArrowRight": {
          e.preventDefault();
          const next = (currentIndex + 1) % buttons.length;
          buttons[next].focus();
          setFocusedIndex(next);
          break;
        }
        case "ArrowUp":
        case "ArrowLeft": {
          e.preventDefault();
          const prev = (currentIndex - 1 + buttons.length) % buttons.length;
          buttons[prev].focus();
          setFocusedIndex(prev);
          break;
        }
        case "Home": {
          e.preventDefault();
          buttons[0].focus();
          setFocusedIndex(0);
          break;
        }
        case "End": {
          e.preventDefault();
          buttons[buttons.length - 1].focus();
          setFocusedIndex(buttons.length - 1);
          break;
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      observer.disconnect();
    };
  }, []);

  return (
    <section
      id="faq"
      ref={sectionRef}
      className="grain-overlay concrete-texture relative overflow-hidden border-t border-paper/10 bg-charcoal-soft py-24 sm:py-32"
    >
      <div className="relative z-10 mx-auto max-w-3xl px-5 sm:px-8">
        <Reveal className="mb-6 flex items-center gap-4">
          <span className="font-mono-dossier text-[0.65rem] tracking-label text-gold">
            DOSSIER INDEX
          </span>
          <span className="h-px flex-1 bg-paper/10" />
        </Reveal>

        <Reveal>
          <h2 className="font-display text-[clamp(2rem,4vw,3.2rem)] font-semibold leading-[1.04] tracking-display text-paper">
            Frequently asked
            <br />
            <span className="text-gold">questions.</span>
          </h2>
          <p className="mt-5 max-w-xl font-body text-lg leading-relaxed text-paper-mute">
            The essential details &mdash; from subject matter to purchasing
            options.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-12 border-t border-paper/10">
            {FAQS.map((item, i) => (
              <FAQAccordionItem
                key={i}
                item={item}
                index={i}
                isOpen={openIndex === i}
                isFocused={focusedIndex === i}
                onToggle={() => toggleItem(i)}
                onFocus={() => setFocusedIndex(i)}
              />
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-10 text-center">
            <p className="font-mono-dossier text-[0.55rem] tracking-label text-paper-mute/40">
              HAVE ADDITIONAL QUESTIONS?{" "}
              <a
                href="#newsletter"
                className="text-gold/60 hover:text-gold transition-colors link-underline"
              >
                CONTACT US
              </a>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}