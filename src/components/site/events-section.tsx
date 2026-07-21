"use client";

import { Reveal, Stagger, StaggerItem } from "./reveal";
import { MapPin } from "lucide-react";
import Link from "next/link";

interface EventItem {
  date: string;
  title: string;
  location: string;
  desc: string;
}

const EVENTS: EventItem[] = [
  {
    date: "August 15, 2026",
    title: "Book Launch & Signing — The Doheny Bookstore",
    location: "Pasadena, CA",
    desc: "Join Robert B. Taylor for the official launch and first public reading of Where Evil Dwells.",
  },
  {
    date: "September 22, 2026",
    title: "Criminal Justice Panel — USC",
    location: "Los Angeles, CA",
    desc: "Taylor participates in a criminal justice panel discussion at USC about prison-gang reform.",
  },
  {
    date: "October 8, 2026",
    title: "True Crime Festival — Times Square Lit",
    location: "New York, NY",
    desc: "Book reading and discussion at the annual Times Square Book Festival.",
  },
  {
    date: "November 3, 2026",
    title: "Library Talk — LAPD Historical Society",
    location: "Los Angeles, CA",
    desc: "Taylor discusses the LAPD's gang intelligence history and the origins of California's prison system at the LAPD Historical Society.",
  },
];

function formatDate(dateStr: string): string {
  // Parse human-readable date like "August 15, 2026"
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr; // fallback to raw string
  const months = [
    "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
    "JUL", "AUG", "SEP", "OCT", "NOV", "DEC",
  ];
  const day = String(d.getDate()).padStart(2, "0");
  const month = months[d.getMonth()];
  const year = d.getFullYear();
  return `${month} ${day}, ${year}`;
}

export function EventsSection() {
  return (
    <section
      id="events"
      className="grain-overlay concrete-texture section-transition relative overflow-hidden border-t border-paper/10 bg-charcoal py-24 sm:py-32"
    >
      {/* Faint backdrop type */}
      <span
        className="pointer-events-none absolute inset-0 flex items-center justify-center font-display text-[22vw] font-semibold leading-none text-paper/[0.015] sm:text-[16vw]"
        aria-hidden
      >
        APPEARANCES
      </span>

      <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-8 lg:px-12">
        <Reveal className="mb-6 flex items-center gap-4">
          <span className="font-mono-dossier text-[0.65rem] tracking-label text-gold">
            EVENT LOG
          </span>
          <span className="h-px flex-1 bg-paper/10" />
        </Reveal>

        <Reveal>
          <h2 className="font-display text-[clamp(2rem,4vw,3.2rem)] font-semibold leading-[1.04] tracking-display text-paper text-glow-gold">
            Where the story continues.
          </h2>
          <p className="mt-5 max-w-xl font-body text-lg leading-relaxed text-paper-mute">
            Upcoming readings, book signings, and public appearances.
          </p>
        </Reveal>

        <Stagger className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4" delay={0.1} stagger={0.1}>
          {EVENTS.map((event) => (
            <StaggerItem key={event.date}>
              <div className="group relative h-full border border-paper/10 bg-charcoal-soft/50 p-6 corner-brackets transition-all duration-500 hover:border-gold/40 hover:border-paper/15 hover:bg-charcoal-soft sm:p-6">
                {/* Date badge */}
                <p className="font-mono-dossier text-[0.55rem] tracking-label text-gold/80">
                  {formatDate(event.date)}
                </p>

                {/* Title */}
                <h3 className="mt-3 font-display text-lg font-semibold tracking-display text-paper transition-colors duration-300 group-hover:text-gold">
                  {event.title}
                </h3>

                {/* Location */}
                <div className="mt-2.5 flex items-center gap-1.5">
                  <MapPin className="h-3 w-3 shrink-0 text-paper-mute/40" />
                  <p className="font-mono-dossier text-[0.55rem] tracking-label text-paper-mute/50">
                    {event.location}
                  </p>
                </div>

                {/* Description */}
                <p className="mt-3 font-body text-sm leading-relaxed text-paper-mute/60 line-clamp-3 max-w-none">
                  {event.desc}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        {/* Bottom CTA */}
        <Reveal delay={0.3}>
          <div className="mt-14 flex items-center justify-center">
            <Link
              href="/"
              className="group inline-flex items-center gap-2 font-mono-dossier text-[0.6rem] tracking-label text-paper-mute/60 transition-colors duration-300 hover:text-gold"
            >
              FOLLOW FOR UPDATES
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}