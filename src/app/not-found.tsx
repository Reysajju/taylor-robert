import { FileQuestion } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <html lang="en">
      <body className="bg-charcoal antialiased">
        <div className="grain-overlay concrete-texture page-frame flex min-h-screen flex-col items-center justify-center bg-charcoal px-5">
          <div className="relative z-10 flex max-w-lg flex-col items-center text-center">
            {/* Case number */}
            <span className="font-mono-dossier text-[0.6rem] tracking-label text-gold/60">
              CASE FILE REF: 404-NF
            </span>

            {/* Stamp */}
            <div className="my-8 rotate-[-3deg] border-4 border-rust/60 px-8 py-5">
              <span className="font-display text-6xl font-bold text-rust sm:text-8xl">
                404
              </span>
            </div>

            {/* Heading */}
            <h1 className="font-display text-[clamp(1.5rem,4vw,2.5rem)] font-semibold tracking-display text-paper text-glow-gold">
              Evidence Missing.
            </h1>
            <p className="mt-4 font-body text-base leading-relaxed text-paper-mute sm:text-lg">
              The file you requested could not be located in the archives.
              It may have been reclassified, moved, or never existed.
            </p>

            {/* Status details */}
            <div className="mt-8 w-full border border-paper/10 bg-charcoal-soft/40 p-5">
              <div className="grid grid-cols-2 gap-4 text-left">
                <div>
                  <span className="block font-mono-dossier text-[0.5rem] tracking-label text-paper-mute/50">
                    STATUS
                  </span>
                  <span className="mt-1 block font-mono-dossier text-sm text-rust-bright/80">
                    FILE NOT FOUND
                  </span>
                </div>
                <div>
                  <span className="block font-mono-dossier text-[0.5rem] tracking-label text-paper-mute/50">
                    REFERENCE
                  </span>
                  <span className="mt-1 block font-mono-dossier text-sm text-paper-mute">
                    404-NF
                  </span>
                </div>
                <div>
                  <span className="block font-mono-dossier text-[0.5rem] tracking-label text-paper-mute/50">
                    ARCHIVE
                  </span>
                  <span className="mt-1 block font-mono-dossier text-sm text-paper-mute">
                    WHERE-EVIL-DWELLS
                  </span>
                </div>
                <div>
                  <span className="block font-mono-dossier text-[0.5rem] tracking-label text-paper-mute/50">
                    ACTION
                  </span>
                  <span className="mt-1 block font-mono-dossier text-sm text-gold/70">
                    RETURN TO DOSSIER
                  </span>
                </div>
              </div>
            </div>

            {/* CTA */}
            <Link
              href="/"
              className="mt-8 magnetic-btn inline-flex items-center gap-2.5 border border-gold/40 bg-gold/10 px-7 py-3 font-mono-dossier text-[0.7rem] tracking-label text-gold transition-all duration-300 hover:border-gold hover:bg-gold/20"
            >
              <FileQuestion className="h-4 w-4" />
              RETURN TO CASE FILE
            </Link>

            {/* Bottom note */}
            <p className="mt-12 font-mono-dossier text-[0.45rem] tracking-label text-paper-mute/20">
              WHERE EVIL DWELLS &middot; PERDITION AWAITS &middot; 2026
            </p>
          </div>
        </div>
      </body>
    </html>
  );
}