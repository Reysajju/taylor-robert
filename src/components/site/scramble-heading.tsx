"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";

/**
 * ScrambleHeading — A heading that plays a brief decode/scramble animation
 * when it scrolls into view. Wraps text in a span that can be used as
 * a drop-in replacement for h2 headings.
 */
export function ScrambleHeading({
  children,
  className = "",
  as: Tag = "h2",
  delay = 0,
}: {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4";
  delay?: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);
  const [displayed, setDisplayed] = useState(children);

  const scramble = useCallback(() => {
    const text = children;
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayed(
        text
          .split("")
          .map((char, i) => {
            if (char === " " || char === "\u00a0" || i < iteration) return text[i];
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );
      if (iteration >= text.length) {
        clearInterval(interval);
      }
      iteration += 1 / 2;
    }, 25);
  }, [children]);

  useEffect(() => {
    const el = ref.current;
    if (!el || hasAnimated.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          setTimeout(() => scramble(), delay * 1000);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [scramble, delay]);

  // @ts-expect-error — dynamic tag rendering
  return (
    <Tag ref={ref} className={className}>
      {displayed}
    </Tag>
  );
}