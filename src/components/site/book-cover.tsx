"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface BookCoverProps {
  className?: string;
  /** show the floating shadow + 3D page edge */
  dimensional?: boolean;
  /** visual size hint for the image sizes attribute */
  sizes?: string;
  priority?: boolean;
}

/**
 * The real book cover — "Where Evil Dwells: Perdition Awaits"
 * by Robert B. Taylor. Image supplied by the author.
 *
 * Renders with a 3D flip on hover: front face shows the cover,
 * back face shows the back cover. On mobile, tap to toggle.
 *
 * Noir frame: hairline border, spine highlight on the left (front)
 * or right (back), and a faint corner-gloss so it reads as a
 * physical object rather than a flat thumbnail.
 */
export function BookCover({
  className,
  dimensional = true,
  sizes = "(max-width: 640px) 78vw, (max-width: 1024px) 24rem, 22rem",
  priority = false,
}: BookCoverProps) {
  const [flipped, setFlipped] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const handlePointerDown = (e: React.PointerEvent) => {
    // Detect touch device on first interaction
    if (e.pointerType === "touch" && !isTouchDevice) {
      setIsTouchDevice(true);
    }
    if (e.pointerType === "touch") {
      setFlipped((prev) => !prev);
    }
  };

  return (
    <div
      className={cn(
        "group relative aspect-[2/3] w-full select-none",
        dimensional && "drop-shadow-[0_40px_60px_rgba(0,0,0,0.65)]",
        className,
      )}
      onPointerDown={handlePointerDown}
    >
      {/* Spine highlight — left edge for front, right edge for back */}
      {dimensional && (
        <>
          <div
            className="absolute -left-2 top-0 z-30 h-full w-3 rounded-l-sm bg-gradient-to-r from-black/70 to-transparent transition-opacity duration-700 group-hover:opacity-0"
            aria-hidden
          />
          <div
            className="absolute -right-2 top-0 z-30 h-full w-3 rounded-r-sm bg-gradient-to-l from-black/70 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100"
            aria-hidden
          />
        </>
      )}

      {/* Flip container — rotates on hover (desktop) or tap (mobile) */}
      <div
        className="relative h-full w-full"
        style={{
          transformStyle: "preserve-3d",
          transition: "transform 0.8s cubic-bezier(0.4, 0.0, 0.2, 1)",
          ...(flipped || isTouchDevice
            ? { transform: "rotateY(180deg)" }
            : {}),
        }}
        onMouseEnter={() => !isTouchDevice && setFlipped(true)}
        onMouseLeave={() => !isTouchDevice && setFlipped(false)}
      >
        {/* ===== FRONT FACE ===== */}
        <div
          className="absolute inset-0 overflow-hidden rounded-sm border border-paper/15 bg-charcoal-deep"
          style={{ backfaceVisibility: "hidden" }}
        >
          <Image
            src="/assets/book-cover-real@2x.jpg"
            alt="Book cover — Where Evil Dwells: Perdition Awaits by Robert B. Taylor"
            fill
            sizes={sizes}
            priority={priority}
            quality={100}
            className="object-cover"
            style={{ imageRendering: "auto" }}
          />
          {/* Subtle inner border */}
          <span
            className="pointer-events-none absolute inset-0 rounded-sm ring-1 ring-inset ring-paper/10"
            aria-hidden
          />
          {/* Gloss overlay */}
          {dimensional && (
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-white/[0.05]"
              aria-hidden
            />
          )}
        </div>

        {/* ===== BACK FACE ===== */}
        <div
          className="absolute inset-0 overflow-hidden rounded-sm border border-paper/15 bg-charcoal-deep"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <Image
            src="/assets/book-cover-back.jpg"
            alt="Back cover — Where Evil Dwells: Perdition Awaits by Robert B. Taylor"
            fill
            sizes={sizes}
            priority={false}
            quality={98}
            className="object-cover"
            style={{ imageRendering: "auto" }}
          />
          {/* Subtle inner border */}
          <span
            className="pointer-events-none absolute inset-0 rounded-sm ring-1 ring-inset ring-paper/10"
            aria-hidden
          />
          {/* Reverse gloss for back */}
          {dimensional && (
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-tl from-transparent via-transparent to-white/[0.04]"
              aria-hidden
            />
          )}
        </div>
      </div>
    </div>
  );
}