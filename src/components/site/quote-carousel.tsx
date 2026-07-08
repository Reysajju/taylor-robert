'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface Quote {
  text: string;
  author: string;
  note: string;
}

const QUOTES: Quote[] = [
  {
    text: 'The real conflict is the inner conflict. Beyond armies of occupations and the hecatombs of extermination camps, there are two irreconcilable enemies in the depth of every soul: good and evil, sin and love. And what use are the victories on the battlefield if we ourselves are defeated in our innermost personal selves?',
    author: 'St. Maximilian Kolbe',
    note: 'Epigraph, Chapter One — patron saint of prisoners',
  },
  {
    text: 'Sometimes history is dark, but recognizing this darkness and being willing to expose evil to the light gives us some understanding and hope of overcoming it.',
    author: 'Robert B. Taylor',
    note: 'From the Introduction',
  },
  {
    text: 'The degree of civilization in a society can be judged by entering its prisons.',
    author: 'Fyodor Dostoevsky',
    note: 'Often cited in discussions of criminal justice reform',
  },
  {
    text: 'In the end, we will remember not the words of our enemies, but the silence of our friends.',
    author: 'Martin Luther King Jr.',
    note: 'On moral responsibility and complicity',
  },
];

const INTERVAL_MS = 8000;

export function QuoteCarousel() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const advance = useCallback(() => {
    setCurrent((prev) => (prev + 1) % QUOTES.length);
  }, []);

  // Auto-advance timer
  useEffect(() => {
    if (paused) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = setInterval(advance, INTERVAL_MS);
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [paused, advance]);

  const goTo = (index: number) => {
    setCurrent(index);
  };

  const quote = QUOTES[current];

  return (
    <div
      className="relative mx-auto max-w-3xl text-center"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AnimatePresence mode="wait">
        <motion.figure
          key={current}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Large decorative opening quotation mark */}
          <span
            className="font-display pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 text-[8rem] leading-none text-gold/15"
            aria-hidden
          >
            &ldquo;
          </span>

          <blockquote className="relative z-10 font-body text-xl italic leading-relaxed text-paper/90">
            {quote.text}
          </blockquote>

          <figcaption className="mt-8 flex flex-col items-center gap-2">
            <div className="rule-gold w-12" />
            <span className="font-mono-dossier text-[0.6rem] tracking-label text-gold/80">
              {quote.author.toUpperCase()}
            </span>
            <span className="font-body text-sm italic text-paper-mute">
              {quote.note}
            </span>
          </figcaption>
        </motion.figure>
      </AnimatePresence>

      {/* Navigation dots */}
      <div className="mt-10 flex items-center justify-center gap-2.5" role="tablist" aria-label="Quote navigation">
        {QUOTES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            role="tab"
            aria-selected={i === current}
            aria-label={`Go to quote ${i + 1}`}
            className={`h-2 w-2 transition-all duration-300 ${
              i === current ? 'bg-gold scale-125' : 'bg-paper/20 hover:bg-paper/40'
            }`}
          />
        ))}
      </div>
    </div>
  );
}