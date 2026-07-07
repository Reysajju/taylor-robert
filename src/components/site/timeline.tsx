"use client";

import { Reveal } from "./reveal";
import { cn } from "@/lib/utils";

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  side: "left" | "right";
}

const EVENTS: TimelineEvent[] = [
  {
    year: "1951",
    title: "The First Gang",
    description:
      "Rumors of the first organized prison gang surface in California's correctional system. Inmates begin forming along ethnic lines for mutual protection.",
    side: "left",
  },
  {
    year: "1957",
    title: "Deuel Vocational Institution",
    description:
      "The first documented prison gang in California forms at Deuel — a turning point that prison administrators fail to recognize in time.",
    side: "right",
  },
  {
    year: "1967",
    title: "La EMe Is Born",
    description:
      "The Mexican Mafia solidifies its structure inside California prisons, establishing a constitution, a code of silence, and a reach that extends to the streets.",
    side: "left",
  },
  {
    year: "1971",
    title: "San Quentin & the Brotherhood",
    description:
      "The Aryan Brotherhood forms at San Quentin — a violent white supremacist organization built on absolute loyalty and extreme discipline.",
    side: "right",
  },
  {
    year: "1976",
    title: "Black Guerrilla Family",
    description:
      "George Jackson's revolutionary vision gives rise to the BGF, a politicized prison gang that blends ideology with criminal enterprise.",
    side: "left",
  },
  {
    year: "1982",
    title: "The Task Forces Begin",
    description:
      "Law enforcement finally recognizes the prison gang crisis. The first dedicated gang-intelligence task forces are authorized inside California prisons.",
    side: "right",
  },
  {
    year: "1992",
    title: "Riots & Reckoning",
    description:
      "A wave of prison riots across California forces the system to confront the monster it created. Task-force officers gain new authority — and new enemies.",
    side: "left",
  },
  {
    year: "2000s",
    title: "The Walls Reach Out",
    description:
      "Prison gangs extend their grip to street-level drug operations, human trafficking, and cross-border cartel alliances. The war moves outside.",
    side: "right",
  },
];

export function Timeline() {
  return (
    <section
      id="timeline"
      className="concrete-texture section-transition relative overflow-hidden border-t border-paper/10 bg-charcoal py-24 sm:py-32"
    >
      {/* Faint vertical line watermark */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 z-0 h-full w-px -translate-x-1/2 bg-paper/[0.03]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <Reveal className="mb-6 flex items-center gap-4">
          <span className="font-mono-dossier text-[0.65rem] tracking-label text-gold">
            CHRONOLOGY
          </span>
          <span className="h-px flex-1 bg-paper/10" />
        </Reveal>

        <Reveal>
          <h2 className="font-display text-[clamp(2rem,4vw,3.2rem)] font-semibold leading-[1.04] tracking-display text-paper">
            Decades in the making.
            <br />
            <span className="text-gold">One relentless escalation.</span>
          </h2>
          <p className="mt-5 max-w-2xl font-body text-lg leading-relaxed text-paper-mute">
            A timeline of the events that shaped California&rsquo;s prison-gang
            crisis &mdash; from the first whispers of organized power to the
            sprawling criminal empires that followed.
          </p>
        </Reveal>

        {/* Timeline layout */}
        <div className="relative mt-16">
          {/* Central line */}
          <div
            className="absolute left-6 top-0 h-full w-px bg-gradient-to-b from-transparent via-gold/30 to-transparent sm:left-1/2 sm:-translate-x-px"
            aria-hidden
          />

          <div className="space-y-10 sm:space-y-14">
            {EVENTS.map((event, i) => (
              <Reveal key={event.year} delay={i * 0.06}>
                <div
                  className={`relative grid grid-cols-1 gap-4 sm:grid-cols-[1fr_auto_1fr] sm:gap-8 ${
                    event.side === "right" ? "sm:[&>*:first-child]:order-3" : ""
                  }`}
                >
                  {/* Left content */}
                  <div
                    className={`hidden sm:block ${
                      event.side === "left"
                        ? "text-right pr-8"
                        : "text-left pl-8"
                    }`}
                  >
                    {event.side === "left" ? (
                      <TimelineCard event={event} align="right" />
                    ) : (
                      <span className="font-mono-dossier text-[0.55rem] tracking-label text-paper-mute/30 pt-2 inline-block">
                        &nbsp;
                      </span>
                    )}
                  </div>

                  {/* Center dot */}
                  <div className="absolute left-6 sm:left-1/2 top-2 -translate-x-1/2 z-10">
                    <div className="relative flex h-3 w-3 items-center justify-center">
                      <div className="absolute h-full w-full rounded-full bg-gold/20 animate-pulse" />
                      <div className="h-1.5 w-1.5 rounded-full bg-gold" />
                    </div>
                  </div>

                  {/* Mobile: always show content on the right of dot */}
                  <div className="pl-14 sm:hidden">
                    <TimelineCard event={event} align="left" />
                  </div>

                  {/* Right content (desktop) */}
                  <div
                    className={`hidden sm:block ${
                      event.side === "right"
                        ? "text-left pl-8"
                        : "text-right pr-8"
                    }`}
                  >
                    {event.side === "right" ? (
                      <TimelineCard event={event} align="left" />
                    ) : (
                      <span className="font-mono-dossier text-[0.55rem] tracking-label text-paper-mute/30 pt-2 inline-block">
                        &nbsp;
                      </span>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Bottom note */}
        <Reveal delay={0.3}>
          <div className="mt-14 text-center">
            <p className="font-mono-dossier text-[0.55rem] tracking-label text-paper-mute/40">
              DETAILED CHRONOLOGY AVAILABLE IN THE FULL TEXT
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function TimelineCard({
  event,
  align,
}: {
  event: TimelineEvent;
  align: "left" | "right";
}) {
  return (
    <div
      className={`group cursor-default transition-all duration-500 ${
        align === "left" ? "text-left" : "text-right"
      }`}
    >
      <span className="font-mono-dossier text-[0.55rem] tracking-label text-gold/60 group-hover:text-gold transition-colors">
        {event.year}
      </span>
      <h3 className="mt-1.5 font-display text-base font-semibold tracking-display text-paper group-hover:text-gold transition-colors duration-300 sm:text-lg">
        {event.title}
      </h3>
      <p className={cn(
        "mt-2 font-body text-sm leading-relaxed text-paper-mute/70 max-w-sm sm:max-w-xs",
        align === "right" ? "sm:ml-0" : "sm:mr-0",
      )}>
        {event.description}
      </p>
    </div>
  );
}