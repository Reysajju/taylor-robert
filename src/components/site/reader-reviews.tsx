"use client";

import { Star } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "./reveal";

const REVIEWS = [
  {
    stars: 5,
    text: "Taylor\u2019s firsthand account brings a credibility that no journalist could match. This is the definitive book on California\u2019s prison gang crisis.",
    name: "David M.",
    credential: "Criminal Justice Professor",
    badge: "VERIFIED PURCHASE",
  },
  {
    stars: 5,
    text: "I\u2019ve read dozens of true-crime books. This one stands apart \u2014 it\u2019s not sensationalism, it\u2019s documentation. The kind of book that should be required reading.",
    name: "Sarah K.",
    credential: "Advance Reader",
    badge: "ADVANCE COPY",
  },
  {
    stars: 4,
    text: "Dense, detailed, and unflinching. Taylor doesn\u2019t glamorize \u2014 he testifies. The chapter on the task forces alone is worth the price.",
    name: "Marcus T.",
    credential: "Book Reviewer",
    badge: "VERIFIED PURCHASE",
  },
  {
    stars: 5,
    text: "As someone who worked inside the system, I can tell you: this is accurate. Painfully, importantly accurate.",
    name: "Retired Correctional Officer",
    credential: "",
    badge: "VERIFIED PURCHASE",
  },
  {
    stars: 4,
    text: "A necessary and sobering read. Taylor connects the dots between prison policy and street-level consequences with clarity and moral urgency.",
    name: "Linda R.",
    credential: "Educator",
    badge: "ADVANCE COPY",
  },
] as const;

/** Average of all review star counts */
const AVG_RATING = (
  REVIEWS.reduce((sum, r) => sum + r.stars, 0) / REVIEWS.length
).toFixed(1);

function StarRating({ count }: { count: number }) {
  return (
    <span className="inline-flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-3.5 w-3.5 ${
            i < count
              ? "fill-gold text-gold"
              : "fill-transparent text-paper-mute/30"
          }`}
        />
      ))}
    </span>
  );
}

export function ReaderReviews() {
  return (
    <section
      id="reviews"
      className="grain-overlay concrete-texture section-transition relative overflow-hidden border-t border-paper/10 bg-charcoal-soft py-24 sm:py-32 classified-watermark"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        {/* Section header */}
        <Reveal className="mb-16">
          <div className="flex items-center gap-4">
            <span className="font-mono-dossier text-[0.65rem] tracking-label text-gold">
              FIELD REPORTS
            </span>
            <span className="h-px flex-1 bg-paper/10" />
          </div>

          <h2 className="mt-6 font-display text-[clamp(2rem,4vw,3.2rem)] font-semibold tracking-display text-paper text-glow-gold">
            What readers are saying.
          </h2>

          <p className="mt-3 font-body text-paper-mute">
            Early reactions from advance readers and reviewers.
          </p>
        </Reveal>

        {/* Average rating dossier stat */}
        <Reveal delay={0.1}>
          <div className="corner-brackets mb-14 inline-flex items-center gap-5 border border-paper/10 bg-charcoal/50 px-6 py-4 sm:gap-6 sm:px-8 sm:py-5 shimmer-line">
            <span className="font-display text-4xl font-bold leading-none text-gold sm:text-5xl">
              {AVG_RATING}
            </span>
            <div className="flex flex-col gap-1">
              <StarRating count={Math.round(Number(AVG_RATING))} />
              <span className="font-mono-dossier text-[0.6rem] tracking-label text-paper-mute/70">
                {REVIEWS.length} reviews &middot; Advance reading period
              </span>
            </div>
          </div>
        </Reveal>

        {/* Review cards */}
        <Stagger className="mx-auto flex max-w-3xl flex-col gap-5" stagger={0.12}>
          {REVIEWS.map((review, i) => (
            <StaggerItem key={i} direction="up">
              <article
                className={`relative border-l-2 border-l-gold/30 bg-charcoal/40 p-5 transition-all duration-500 hover:bg-charcoal/60 sm:p-6 hover-lift ${
                  i % 2 === 0 ? "sm:mr-6" : "sm:ml-6"
                }`}
              >
                {/* Corner brackets decoration */}
                <div className="corner-brackets" />

                {/* Evidence stamp badge */}
                <span className="evidence-stamp absolute right-4 top-4 sm:right-5 sm:top-5">
                  {review.badge}
                </span>

                {/* Stars */}
                <div className="mb-3">
                  <StarRating count={review.stars} />
                </div>

                {/* Review text */}
                <p className="font-body text-sm leading-relaxed text-paper-dim sm:text-[0.9rem]">
                  &ldquo;{review.text}&rdquo;
                </p>

                {/* Reviewer info */}
                <div className="mt-4 border-t border-paper/10 pt-3">
                  <span className="font-mono-dossier text-[0.6rem] text-paper-mute/70">
                    {review.name}
                    {review.credential && (
                      <span className="text-paper-mute/40">
                        {" "}
                        &middot; {review.credential}
                      </span>
                    )}
                  </span>
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}