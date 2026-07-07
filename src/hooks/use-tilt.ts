"use client";

import { useEffect, useRef, useState } from "react";

interface TiltState {
  rotateX: number;
  rotateY: number;
  glareX: number;
  glareY: number;
}

const MAX_TILT = 6; // degrees — subtle, per brief (3-5°, we go a touch higher for depth)

/**
 * Cursor-aware parallax tilt for the book cover.
 * Returns a ref to attach and the live tilt state.
 */
export function useTilt<T extends HTMLElement>(enabled = true) {
  const ref = useRef<T | null>(null);
  const [tilt, setTilt] = useState<TiltState>({
    rotateX: 0,
    rotateY: 0,
    glareX: 50,
    glareY: 50,
  });

  useEffect(() => {
    if (!enabled) return;
    const el = ref.current;
    if (!el) return;

    let rafId = 0;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width; // 0..1
      const py = (e.clientY - rect.top) / rect.height; // 0..1
      // center-relative, -1..1
      const cx = px - 0.5;
      const cy = py - 0.5;
      targetY = cx * MAX_TILT * 2; // rotateY follows horizontal
      targetX = -cy * MAX_TILT * 2; // rotateX follows vertical (inverted)
      setTilt((prev) => ({
        ...prev,
        glareX: px * 100,
        glareY: py * 100,
      }));
    };

    const handleLeave = () => {
      targetX = 0;
      targetY = 0;
    };

    const tick = () => {
      // ease toward target
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;
      setTilt((prev) => ({
        ...prev,
        rotateX: currentX,
        rotateY: currentY,
      }));
      rafId = requestAnimationFrame(tick);
    };

    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);
    rafId = requestAnimationFrame(tick);

    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
      cancelAnimationFrame(rafId);
    };
  }, [enabled]);

  return { ref, tilt };
}
