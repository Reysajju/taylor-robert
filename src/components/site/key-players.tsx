"use client";

import { Reveal, Stagger, StaggerItem } from "./reveal";
import { ScrambleHeading } from "./scramble-heading";

interface Gang {
  name: string;
  founded: string;
  status: "ACTIVE" | "DORMANT";
  description: string;
  fileStatus: "CLASSIFIED" | "FILE OPEN";
}

const gangs: Gang[] = [
  {
    name: "La EMe (Mexican Mafia)",
    founded: "Founded 1957",
    status: "ACTIVE",
    description:
      "California's most powerful prison gang. Originated at Deuel Vocational Institution, now controls street-level drug operations across the Southwest.",
    fileStatus: "CLASSIFIED",
  },
  {
    name: "Aryan Brotherhood",
    founded: "Founded 1967",
    status: "ACTIVE",
    description:
      "A violent white supremacist organization forged at San Quentin. Built on absolute loyalty, extreme discipline, and a reach that extends far beyond prison walls.",
    fileStatus: "FILE OPEN",
  },
  {
    name: "Black Guerrilla Family",
    founded: "Founded 1966",
    status: "DORMANT",
    description:
      "Founded by George Jackson with revolutionary rhetoric. Blended political ideology with criminal enterprise behind California prison walls.",
    fileStatus: "CLASSIFIED",
  },
  {
    name: "Nuestra Familia",
    founded: "Founded 1968",
    status: "ACTIVE",
    description:
      "Northern California's answer to La EMe. A bitter rivalry that spilled blood across the state and reshaped the prison-gang landscape.",
    fileStatus: "FILE OPEN",
  },
];

export function KeyPlayers() {
  return (
    <section
      id="subjects"
      className="grain-overlay concrete-texture section-transition bg-charcoal-deep"
    >
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 lg:px-10">
        {/* Section label */}
        <Reveal direction="up" delay={0}>
          <span className="font-mono-dossier text-[0.65rem] tracking-label text-gold">
            SUBJECT FILES
          </span>
          <hr className="mt-3 border-gold/20" />
        </Reveal>

        {/* Heading */}
        <Reveal direction="up" delay={0.1}>
          <ScrambleHeading className="mt-6 font-display text-[clamp(2rem,4vw,3.2rem)] font-semibold tracking-display text-paper text-glow-gold">
            The organizations inside.
          </ScrambleHeading>
        </Reveal>

        {/* Subtitle */}
        <Reveal direction="up" delay={0.15}>
          <p className="mt-3 max-w-2xl text-paper-mute">
            Four dominant prison gangs whose rivalries and alliances shaped the
            California correctional system — and the streets beyond its walls.
          </p>
        </Reveal>

        {/* Cards grid */}
        <Stagger
          className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
          stagger={0.12}
          delay={0.2}
        >
          {gangs.map((gang) => (
            <StaggerItem key={gang.name} direction="up">
              <div className="group relative corner-brackets hover-lift inner-glow border-glow-hover card-spotlight rounded-sm border border-paper/10 bg-charcoal-soft/60 p-5 transition-colors duration-300 hover:border-gold/40">
                {/* Status badge */}
                <div className="flex items-center gap-1.5">
                  <span
                    className={`relative inline-block h-1.5 w-1.5 rounded-full ${
                      gang.status === "ACTIVE" ? "bg-gold pulse-ring" : "bg-paper-mute/40"
                    }`}
                  />
                  <span className="font-mono-dossier text-[0.6rem] tracking-label text-paper-dim uppercase">
                    {gang.status}
                  </span>
                </div>

                {/* Gang name */}
                <h3 className="mt-4 font-display text-lg font-semibold text-paper transition-colors duration-300 group-hover:text-gold">
                  {gang.name}
                </h3>

                {/* Founded date */}
                <p className="mt-1 font-mono-dossier text-[0.65rem] tracking-label text-paper-dim">
                  {gang.founded}
                </p>

                {/* Description */}
                <p className="mt-3 text-sm leading-relaxed text-paper-mute">
                  {gang.description}
                </p>

                {/* File status label */}
                <div className="mt-4 border-t border-paper/10 pt-3">
                  <span
                    className={`font-mono-dossier text-[0.6rem] tracking-label ${
                      gang.fileStatus === "CLASSIFIED"
                        ? "text-rust-bright/80"
                        : "text-gold/70"
                    }`}
                  >
                    {gang.fileStatus}
                  </span>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}