"use client";

import { useEffect, useRef, useState } from "react";
import { Reveal } from "./reveal";
import { BookOpen, Users, FileText, Clock } from "lucide-react";

interface StatProps {
  icon: React.ReactNode;
  value: number;
  suffix?: string;
  label: string;
  sublabel?: string;
  delay?: number;
}

function AnimatedStat({ icon, value, suffix = "", label, sublabel, delay = 0 }: StatProps) {
  const [count, setCount] = useState<number | null>(null);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          // Show initial value immediately, then animate
          setCount(0);
          // Animate from 0 to value over 1.5s
          const duration = 1500;
          const start = performance.now();
          const tick = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * value));
            if (progress < 1) requestAnimationFrame(tick);
          };
          // Start after delay
          setTimeout(() => requestAnimationFrame(tick), delay * 1000);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value, delay]);

  return (
    <span ref={ref} className="tabular-nums">
      {count === null ? "\u2014" : count}
      {suffix}
    </span>
  );
}

const STATS = [
  {
    icon: <BookOpen className="h-5 w-5" />,
    value: 12,
    suffix: "",
    label: "CHAPTERS",
    sublabel: "+ EPILOGUE",
  },
  {
    icon: <FileText className="h-5 w-5" />,
    value: 289,
    suffix: "",
    label: "PAGES",
    sublabel: "PAPERBACK",
  },
  {
    icon: <Users className="h-5 w-5" />,
    value: 4,
    suffix: "",
    label: "GANGS",
    sublabel: "PROFILED",
  },
  {
    icon: <Clock className="h-5 w-5" />,
    value: 30,
    suffix: "+",
    label: "YEARS",
    sublabel: "RESEARCHED",
  },
];

export function StatsBar() {
  return (
    <section className="relative overflow-hidden border-t border-b border-paper/10 bg-charcoal">
      {/* Subtle top gold line */}
      <div className="absolute inset-x-0 top-0 h-px rule-gold" aria-hidden />

      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 py-12 sm:py-14">
        <Reveal>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 sm:gap-6">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="group flex flex-col items-center text-center"
              >
                <span className="mb-3 flex h-10 w-10 items-center justify-center border border-gold/25 text-gold/70 transition-all duration-300 group-hover:border-gold/60 group-hover:text-gold group-hover:shadow-[0_0_16px_rgba(176,141,87,0.1)]">
                  {stat.icon}
                </span>
                <span className="font-display text-3xl font-semibold leading-none tracking-display text-paper sm:text-4xl">
                  <AnimatedStat {...stat} delay={0.1} />
                </span>
                <span className="mt-2 font-mono-dossier text-[0.6rem] tracking-label text-gold/70">
                  {stat.label}
                </span>
                {stat.sublabel && (
                  <span className="mt-0.5 font-mono-dossier text-[0.45rem] tracking-label text-paper-mute/40">
                    {stat.sublabel}
                  </span>
                )}
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      {/* Subtle bottom gold line */}
      <div className="absolute inset-x-0 bottom-0 h-px rule-gold" aria-hidden />
    </section>
  );
}