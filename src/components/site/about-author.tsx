"use client";

import Image from "next/image";
import { Reveal } from "./reveal";
import { ScrambleHeading } from "./scramble-heading";
import { ShieldCheck, BookMarked, ScrollText } from "lucide-react";

export function AboutAuthor() {
  return (
    <section
      id="author"
      className="grain-overlay concrete-texture relative overflow-hidden border-t border-paper/10 bg-charcoal py-24 sm:py-32"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        {/* Section label */}
        <Reveal className="mb-14 flex items-center gap-4">
          <span className="font-mono-dossier text-[0.65rem] tracking-label text-gold">
            § 03 — THE AUTHOR
          </span>
          <span className="h-px flex-1 bg-paper/10" />
        </Reveal>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Portrait — real author photo with noir grading */}
          <Reveal direction="right" className="lg:col-span-5">
            <div className="relative mx-auto max-w-sm">
              {/* Subtle ambient glow behind the frame */}
              <div className="absolute -inset-3 rounded-sm bg-gold/[0.03] blur-2xl" aria-hidden />
              {/* Frame */}
              <div className="relative border border-paper/15 p-3">
                <div className="relative aspect-[4/5] overflow-hidden bg-charcoal-deep">
                  <Image
                    src="/assets/author-photo@2x.jpg"
                    alt="Robert B. Taylor — author of Where Evil Dwells"
                    fill
                    sizes="(max-width: 640px) 85vw, (max-width: 1024px) 24rem, 20rem"
                    priority={false}
                    quality={95}
                    className="object-cover object-top contrast-110 brightness-[0.93]"
                  />
                  {/* Vignette — darkened edges for cinematic noir depth */}
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(8,8,7,0.7)_100%)]" />
                  {/* Bottom fade — seamless blend into dark page */}
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/30 to-transparent" />
                  {/* Warm noir color grading tint */}
                  <div className="absolute inset-0 bg-rust/[0.04] mix-blend-overlay" />
                  {/* Corner ticks — dossier photo feel */}
                  <span className="absolute left-2 top-2 h-3 w-3 border-l border-t border-gold/60" />
                  <span className="absolute right-2 top-2 h-3 w-3 border-r border-t border-gold/60" />
                  <span className="absolute bottom-2 left-2 h-3 w-3 border-b border-l border-gold/60" />
                  <span className="absolute bottom-2 right-2 h-3 w-3 border-b border-r border-gold/60" />
                </div>
                {/* Caption */}
                <div className="mt-3 flex items-center justify-between">
                  <span className="font-mono-dossier text-[0.55rem] tracking-label text-paper-mute/70">
                    SUBJECT: TAYLOR, R. B.
                  </span>
                  <span className="font-mono-dossier text-[0.55rem] tracking-label text-gold/70">
                    FILE PHOTO
                  </span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Bio */}
          <div className="lg:col-span-7">
            <Reveal>
              <p className="font-mono-dossier mb-5 text-[0.6rem] tracking-label text-rust-bright/90">
                ABOUT THE AUTHOR
              </p>
              <ScrambleHeading className="font-display text-[clamp(2rem,4vw,3.2rem)] font-semibold leading-[1.02] tracking-display text-paper text-glow-gold">
                A career spent where
                <br />
                the system meets the street.
              </ScrambleHeading>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-8 space-y-5 font-body text-lg leading-relaxed text-paper-mute">
                <p>
                  Robert B. Taylor writes from the inside of a career few
                  authors survive to recount. Over decades of service with the
                  Los Angeles Police Department and later as Chief of the Los
                  Angeles County Probation Department, he worked the corridors
                  where policy collides with human wreckage &mdash; the same
                  corridors where California&rsquo;s prison gangs were forged
                  and fattened.
                </p>
                <p>
                  He knew the figures in this book not as headlines but as
                  names: officers on the early prison-gang task forces whose
                  warnings went unheeded, and reformers like Father Greg Boyle,
                  whose Homeboy Industries offered an off-ramp from the cycle.
                  <em className="text-paper"> Where Evil Dwells</em> is his
                  record of that distance traveled &mdash; from the cold
                  institutional logic of La eMe and the Aryan Brotherhood to the
                  stubborn, human insistence that evil be brought to light.
                </p>
                <p>
                  It is a book about power, yes. But more than that, it is a
                  book about the people who refused to look away.
                </p>
              </div>
            </Reveal>

            {/* Credibility strip */}
            <Reveal delay={0.18}>
              <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-paper/10 pt-7">
                <CredibilityItem
                  icon={<BookMarked className="h-4 w-4" />}
                  label="Published by"
                  value="Wadsworth Publishing"
                />
                <span className="hidden h-8 w-px bg-paper/10 sm:block" />
                <CredibilityItem
                  icon={<ShieldCheck className="h-4 w-4" />}
                  label="Former"
                  value="Chief, L.A. County Probation"
                />
                <span className="hidden h-8 w-px bg-paper/10 sm:block" />
                <CredibilityItem
                  icon={<ScrollText className="h-4 w-4" />}
                  label="Veteran"
                  value="LAPD"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function CredibilityItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-9 w-9 items-center justify-center border border-gold/30 text-gold">
        {icon}
      </span>
      <div className="flex flex-col leading-tight">
        <span className="font-mono-dossier text-[0.55rem] tracking-label text-paper-mute/60">
          {label.toUpperCase()}
        </span>
        <span className="font-display text-sm font-medium text-paper">
          {value}
        </span>
      </div>
    </div>
  );
}