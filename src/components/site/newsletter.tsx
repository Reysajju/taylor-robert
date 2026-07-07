"use client";

import { useState } from "react";
import { useTransition } from "react";
import { ArrowRight, Check, Loader2, Mail } from "lucide-react";
import { Reveal } from "./reveal";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isPending) return;
    setStatus("idle");
    setMessage("");

    startTransition(async () => {
      try {
        const res = await fetch("/api/newsletter", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });
        const data = await res.json();
        if (res.ok && data.ok) {
          setStatus("success");
          setMessage("You're on the list. Watch your inbox.");
          setEmail("");
        } else {
          setStatus("error");
          setMessage(data?.error ?? "Something went wrong.");
        }
      } catch {
        setStatus("error");
        setMessage("Network error. Please try again.");
      }
    });
  };

  return (
    <section
      id="newsletter"
      className="grain-overlay section-transition relative overflow-hidden border-t border-paper/10 bg-charcoal-deep py-24 sm:py-32"
    >
      {/* Faint backdrop type */}
      <span
        className="pointer-events-none absolute inset-0 flex items-center justify-center font-display text-[24vw] font-semibold leading-none text-paper/[0.02] sm:text-[18vw]"
        aria-hidden
      >
        STAY INFORMED
      </span>

      <div className="relative z-10 mx-auto max-w-2xl px-5 text-center sm:px-8">
        <Reveal>
          <span className="font-mono-dossier inline-flex items-center gap-2 border border-gold/30 px-3 py-1.5 text-[0.55rem] tracking-label text-gold/90">
            <Mail className="h-3 w-3" />
            CASE FILE OPEN
          </span>
        </Reveal>

        <Reveal delay={0.08}>
          <h2 className="mt-7 font-display text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-[1.05] tracking-display text-paper">
            Get word when the next file opens.
          </h2>
        </Reveal>

        <Reveal delay={0.14}>
          <p className="mx-auto mt-5 max-w-md font-body text-lg leading-relaxed text-paper-mute">
            Updates on Robert B. Taylor&rsquo;s next book, readings, and
            advance excerpts. No noise. Unsubscribe anytime.
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <form
            onSubmit={onSubmit}
            className="mx-auto mt-9 max-w-md"
            noValidate
          >
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  aria-label="Email address"
                  className="h-12 w-full border border-paper/20 bg-charcoal-soft px-4 font-mono-dossier text-sm text-paper placeholder:text-paper-mute/40 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/40"
                />
              </div>
              <button
                type="submit"
                disabled={isPending}
                className="group inline-flex h-12 items-center justify-center gap-2 bg-rust px-6 font-mono-dossier text-[0.7rem] tracking-label text-paper transition-colors hover:bg-rust-bright disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : status === "success" ? (
                  <>
                    <Check className="h-4 w-4" />
                    SUBSCRIBED
                  </>
                ) : (
                  <>
                    SUBSCRIBE
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </div>

            {message && (
              <p
                role="status"
                className={`mt-3 font-mono-dossier text-[0.6rem] tracking-label-sm ${
                  status === "success" ? "text-gold" : "text-rust-bright"
                }`}
              >
                {message}
              </p>
            )}
          </form>
        </Reveal>

        <Reveal delay={0.26}>
          <p className="mt-6 font-mono-dossier text-[0.5rem] tracking-label text-paper-mute/40">
            WE KEEP YOUR INFORMATION CONFIDENTIAL. NO THIRD-PARTY SHARING.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
