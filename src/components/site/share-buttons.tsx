"use client";

import { useState } from "react";
import { Share2, Check, Twitter, Facebook, Link2 } from "lucide-react";
import { cn } from "@/lib/utils";

const BOOK_URL = "https://www.amazon.com/WHERE-EVIL-DWELLS-PERDITION-AWAITS/dp/B0H2KK7RJQ";
const BOOK_TITLE = "Where Evil Dwells: Perdition Awaits — Robert B. Taylor";

const SHARE_CHANNELS = [
  {
    name: "Twitter / X",
    icon: <Twitter className="h-4 w-4" />,
    getHref: () =>
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(BOOK_TITLE)}&url=${encodeURIComponent(BOOK_URL)}`,
  },
  {
    name: "Facebook",
    icon: <Facebook className="h-4 w-4" />,
    getHref: () =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(BOOK_URL)}`,
  },
];

export function ShareButtons({ compact = false }: { compact?: boolean }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(BOOK_URL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback: select text in a temporary input
    }
  };

  return (
    <div className={cn("flex items-center gap-2", compact && "gap-1.5")}>
      {!compact && (
        <span className="font-mono-dossier mr-1 text-[0.5rem] tracking-label text-paper-mute/40">
          SHARE
        </span>
      )}

      {SHARE_CHANNELS.map((ch) => (
        <a
          key={ch.name}
          href={ch.getHref()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Share on ${ch.name}`}
          className={cn(
            "group flex items-center justify-center border border-paper/15 text-paper-mute/60 transition-all duration-300 hover:border-gold/50 hover:text-gold hover:shadow-[0_0_12px_rgba(176,141,87,0.08)]",
            compact
              ? "h-8 w-8"
              : "h-9 w-9 gap-2 px-3 font-mono-dossier text-[0.55rem] tracking-label",
          )}
        >
          {ch.icon}
          {!compact && <span className="hidden sm:inline">{ch.name.toUpperCase()}</span>}
        </a>
      ))}

      {/* Copy link */}
      <button
        onClick={handleCopy}
        aria-label={copied ? "Link copied" : "Copy link"}
        className={cn(
          "group flex items-center justify-center border transition-all duration-300",
          copied
            ? "border-gold/60 bg-gold/10 text-gold"
            : "border-paper/15 text-paper-mute/60 hover:border-gold/50 hover:text-gold",
          compact
            ? "h-8 w-8"
            : "h-9 w-9 gap-2 px-3 font-mono-dossier text-[0.55rem] tracking-label",
        )}
      >
        {copied ? (
          <Check className="h-3.5 w-3.5" />
        ) : (
          <Link2 className="h-3.5 w-3.5" />
        )}
        {!compact && (
          <span className="hidden sm:inline">
            {copied ? "COPIED" : "COPY LINK"}
          </span>
        )}
      </button>
    </div>
  );
}

/* Standalone share section with label for use in footer/buy area */
export function ShareSection() {
  return (
    <div className="flex flex-col items-center gap-4">
      <Share2 className="h-4 w-4 text-gold/60" />
      <ShareButtons />
    </div>
  );
}