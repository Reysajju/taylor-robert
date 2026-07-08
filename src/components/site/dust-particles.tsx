"use client";

import { useEffect, useRef } from "react";

/**
 * Atmospheric floating dust particles for the Hero section.
 * Pure CSS animations with randomized positions, sizes, and delays.
 * Creates a moody, noir atmosphere — like dust in a dimly lit archive room.
 */
export function DustParticles() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Generate particles once on mount to avoid hydration mismatch
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create 20 particles with random properties
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement("span");
      const size = Math.random() * 2 + 1; // 1-3px
      const left = Math.random() * 100; // 0-100%
      const delay = Math.random() * 15; // 0-15s
      const duration = Math.random() * 10 + 12; // 12-22s
      const opacity = Math.random() * 0.25 + 0.05; // 0.05-0.3

      particle.style.cssText = `
        position: absolute;
        bottom: -10px;
        left: ${left}%;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(237,232,221,${opacity}), transparent);
        pointer-events: none;
        animation: dust-float ${duration}s ${delay}s linear infinite;
      `;

      container.appendChild(particle);
    }

    return () => {
      if (container) {
        container.innerHTML = "";
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 z-[3] overflow-hidden"
      aria-hidden
    />
  );
}