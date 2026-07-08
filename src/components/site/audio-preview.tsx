"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Reveal } from "./reveal";
import { ScrambleHeading } from "./scramble-heading";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Loader2,
  RotateCcw,
  Headphones,
} from "lucide-react";

const AUDIO_SEGMENTS = [
  {
    id: "intro",
    chapter: "INTRODUCTION",
    title: "The System That Forged Them",
    text: "California's prison system did not merely house these organizations. It forged them. In the de facto racial segregation of the cell blocks, in the violence that the state both punished and provoked, the gangs found their reason to exist. This is the story of that forging.",
    duration: "~38s",
  },
  {
    id: "chapter1",
    chapter: "CHAPTER 01",
    title: "The Birth of the Gangs",
    text: "At Deuel Vocational Institution in 1957, a group of young Mexican-American inmates banded together for protection. They called themselves La Eme, the Mexican Mafia. Within a decade, what began as a survival pact had become the most powerful criminal organization inside California's prison walls.",
    duration: "~42s",
  },
  {
    id: "chapter3",
    chapter: "CHAPTER 03",
    title: "San Quentin and the Brotherhood",
    text: "San Quentin State Prison, 1967. In the shadow of the gas chamber, a different kind of organization took root. The Aryan Brotherhood was born not from survival but from ideology, and its reach would extend far beyond any prison gate.",
    duration: "~40s",
  },
];

export function AudioPreview() {
  const [activeSegment, setActiveSegment] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressInterval = useRef<ReturnType<typeof setInterval> | null>(null);
  const animFrameRef = useRef<number | null>(null);

  /* Cleanup */
  useEffect(() => {
    return () => {
      if (audioUrl) URL.revokeObjectURL(audioUrl);
      if (progressInterval.current) clearInterval(progressInterval.current);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [audioUrl]);

  const stopPlayback = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
      progressInterval.current = null;
    }
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    setIsPlaying(false);
    setProgress(0);
  }, []);

  const handlePlay = useCallback(
    async (segmentId: string) => {
      setError(null);

      // If clicking the same segment that's playing, pause/resume
      if (activeSegment === segmentId && audioRef.current) {
        if (isPlaying) {
          audioRef.current.pause();
          setIsPlaying(false);
          if (progressInterval.current) {
            clearInterval(progressInterval.current);
            progressInterval.current = null;
          }
          if (animFrameRef.current) {
            cancelAnimationFrame(animFrameRef.current);
            animFrameRef.current = null;
          }
        } else {
          audioRef.current.play();
          setIsPlaying(true);
          startProgressTracking();
        }
        return;
      }

      // Stop current and load new
      stopPlayback();
      setActiveSegment(segmentId);
      setIsLoading(true);

      try {
        const segment = AUDIO_SEGMENTS.find((s) => s.id === segmentId);
        if (!segment) return;

        const res = await fetch("/api/tts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: segment.text, voice: "jam", speed: 0.9 }),
        });

        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || "Audio generation failed");
        }

        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);

        const audio = new Audio(url);
        audioRef.current = audio;
        audio.volume = isMuted ? 0 : 1;

        audio.onended = () => {
          stopPlayback();
        };

        audio.onerror = () => {
          setError("Playback error. Please try again.");
          stopPlayback();
        };

        await audio.play();
        setIsPlaying(true);
        startProgressTracking();
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to generate audio."
        );
      } finally {
        setIsLoading(false);
      }
    },
    [activeSegment, isPlaying, isMuted, stopPlayback]
  );

  const startProgressTracking = useCallback(() => {
    const tick = () => {
      if (audioRef.current && audioRef.current.duration) {
        setProgress(
          (audioRef.current.currentTime / audioRef.current.duration) * 100
        );
      }
      animFrameRef.current = requestAnimationFrame(tick);
    };
    animFrameRef.current = requestAnimationFrame(tick);
  }, []);

  const toggleMute = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 1 : 0;
    }
    setIsMuted(!isMuted);
  }, [isMuted]);

  const handleReset = useCallback(() => {
    stopPlayback();
    setActiveSegment(null);
    if (audioUrl) URL.revokeObjectURL(audioUrl);
    setAudioUrl(null);
  }, [stopPlayback, audioUrl]);

  return (
    <section
      id="audio-preview"
      className="grain-overlay concrete-texture section-transition atmosphere-fog relative overflow-hidden border-t border-paper/10 bg-charcoal-soft"
    >
      <div className="mx-auto max-w-5xl px-5 py-24 sm:px-8 lg:px-12">
        {/* Section header */}
        <Reveal>
          <div className="flex items-center gap-4">
            <span className="font-mono-dossier text-[0.65rem] tracking-label text-gold">
              AUDIO PREVIEW
            </span>
            <span className="h-px flex-1 bg-paper/10" />
          </div>

          <ScrambleHeading className="mt-6 font-display text-[clamp(2rem,4vw,3.2rem)] font-semibold tracking-display text-paper text-glow-gold">
            Hear the opening pages.
          </ScrambleHeading>
          <p className="mt-3 max-w-2xl text-paper-mute">
            AI-narrated excerpts from the Introduction and first chapters.
            Click a segment to listen.
          </p>
        </Reveal>

        {/* Audio player card */}
        <Reveal delay={0.1}>
          <div className="mt-10 overflow-hidden rounded-sm border border-paper/10 bg-charcoal/60">
            {/* Waveform visualization area */}
            <div className="relative flex h-24 items-center justify-center overflow-hidden border-b border-paper/10 bg-charcoal-deep/50 sm:h-28">
              {/* Animated waveform bars */}
              <div className="audio-waveform flex items-end gap-[3px]">
                {Array.from({ length: 60 }).map((_, i) => {
                  const isActive = activeSegment && (isPlaying || isLoading);
                  const h = isActive
                    ? `${15 + Math.sin(i * 0.5 + (isPlaying ? Date.now() * 0.003 : 0)) * 60 + (isLoading ? 10 : 0)}%`
                    : `${8 + Math.sin(i * 0.3) * 12}%`;
                  return (
                    <div
                      key={i}
                      className="w-[3px] rounded-t-sm transition-all duration-150 sm:w-[4px]"
                      style={{
                        height: h,
                        background:
                          activeSegment === AUDIO_SEGMENTS[Math.floor(i / 20)]?.id
                            ? `linear-gradient(to top, #b08d57, #c9a86f)`
                            : "#3a3935",
                        opacity:
                          activeSegment === AUDIO_SEGMENTS[Math.floor(i / 20)]?.id
                            ? 1
                            : 0.4,
                      }}
                    />
                  );
                })}
              </div>

              {/* Center overlay text when nothing playing */}
              {!activeSegment && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex flex-col items-center gap-2 opacity-40">
                    <Headphones className="h-8 w-8 text-gold" />
                    <span className="font-mono-dossier text-[0.55rem] tracking-label text-paper-mute">
                      SELECT A SEGMENT BELOW
                    </span>
                  </div>
                </div>
              )}

              {/* Progress bar */}
              {activeSegment && (
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-paper/10">
                  <div
                    className="h-full bg-gold transition-[width] duration-100"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              )}
            </div>

            {/* Controls + segment list */}
            <div className="p-5 sm:p-6">
              {/* Transport controls */}
              <div className="mb-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {activeSegment ? (
                    <button
                      onClick={handleReset}
                      className="flex h-9 w-9 items-center justify-center rounded-sm border border-paper/10 text-paper-mute transition-colors hover:border-gold/40 hover:text-gold"
                      aria-label="Reset playback"
                    >
                      <RotateCcw className="h-4 w-4" />
                    </button>
                  ) : null}
                  <button
                    onClick={toggleMute}
                    className="flex h-9 w-9 items-center justify-center rounded-sm border border-paper/10 text-paper-mute transition-colors hover:border-gold/40 hover:text-gold"
                    aria-label={isMuted ? "Unmute" : "Mute"}
                  >
                    {isMuted ? (
                      <VolumeX className="h-4 w-4" />
                    ) : (
                      <Volume2 className="h-4 w-4" />
                    )}
                  </button>
                  {activeSegment && (
                    <span className="font-mono-dossier text-[0.55rem] tracking-label text-paper-mute/50">
                      NOW PLAYING
                    </span>
                  )}
                </div>

                {error && (
                  <span className="font-mono-dossier text-[0.6rem] text-rust-bright">
                    {error}
                  </span>
                )}
              </div>

              {/* Segment cards */}
              <div className="space-y-3">
                {AUDIO_SEGMENTS.map((segment, idx) => {
                  const isActive = activeSegment === segment.id;
                  const isLoadingThis = isLoading && isActive;
                  return (
                    <button
                      key={segment.id}
                      onClick={() => handlePlay(segment.id)}
                      disabled={isLoading && !isActive}
                      className={`group flex w-full items-start gap-4 rounded-sm border p-4 text-left transition-all duration-300 sm:gap-5 sm:p-5 ${
                        isActive
                          ? "border-gold/40 bg-gold/[0.05]"
                          : "border-paper/10 bg-charcoal/40 hover:border-paper/20 hover:bg-charcoal/60"
                      }`}
                    >
                      {/* Play/Pause icon */}
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border transition-colors ${
                          isActive
                            ? "border-gold/50 bg-gold/10 text-gold"
                            : "border-paper/15 bg-charcoal-soft text-paper-mute group-hover:border-gold/30 group-hover:text-gold"
                        }`}
                      >
                        {isLoadingThis ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : isActive && isPlaying ? (
                          <Pause className="h-4 w-4" />
                        ) : (
                          <Play className="ml-0.5 h-4 w-4" />
                        )}
                      </div>

                      {/* Content */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-3">
                          <span className="font-mono-dossier text-[0.55rem] tracking-label text-gold/70">
                            {segment.chapter}
                          </span>
                          <span className="h-px flex-1 bg-paper/10" />
                          <span className="font-mono-dossier text-[0.5rem] text-paper-mute/40">
                            {segment.duration}
                          </span>
                        </div>
                        <h3 className="mt-1.5 font-display text-sm font-medium text-paper">
                          {segment.title}
                        </h3>
                        <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-paper-mute/70">
                          {segment.text}
                        </p>
                      </div>

                      {/* Track number */}
                      <span
                        className={`mt-1 font-mono-dossier text-[0.65rem] ${
                          isActive ? "text-gold" : "text-paper-mute/30"
                        }`}
                      >
                        0{idx + 1}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}