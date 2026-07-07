"use client";

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
 * Rendered with a subtle noir frame: hairline border, spine highlight
 * on the left, and a faint corner-gloss so it reads as a physical
 * object rather than a flat thumbnail.
 *
 * Sharpness: uses the @2x image as primary source with high-quality
 * JPEG and image-rendering optimizations for crisp text & graphics.
 */
export function BookCover({
  className,
  dimensional = true,
  sizes = "(max-width: 640px) 78vw, (max-width: 1024px) 24rem, 22rem",
  priority = false,
}: BookCoverProps) {
  return (
    <div
      className={cn(
        "relative aspect-[2/3] w-full select-none",
        dimensional && "drop-shadow-[0_40px_60px_rgba(0,0,0,0.65)]",
        className,
      )}
    >
      {/* Spine highlight on the left edge — sells the 3D page feel */}
      {dimensional && (
        <div
          className="absolute -left-2 top-0 h-full w-3 rounded-l-sm bg-gradient-to-r from-black/70 to-transparent"
          aria-hidden
        />
      )}

      {/* Cover face */}
      <div className="relative h-full w-full overflow-hidden rounded-sm border border-paper/15 bg-charcoal-deep">
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

        {/* Subtle inner border to seat the cover into the dark page */}
        <span
          className="pointer-events-none absolute inset-0 rounded-sm ring-1 ring-inset ring-paper/10"
          aria-hidden
        />

        {/* Gloss for the dimensional feel */}
        {dimensional && (
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-white/[0.05]"
            aria-hidden
          />
        )}
      </div>
    </div>
  );
}