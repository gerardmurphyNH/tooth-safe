"use client";

/**
 * VideoBlock — the short film, embedded.
 *
 * Embedded rather than linked out on purpose: a user-initiated play inside a
 * standard iframe still counts toward the public YouTube view count, so we get
 * the view AND keep the visitor on the page with the signup form — instead of
 * handing them to YouTube's recommendation sidebar.
 *
 * The iframe is behind a click-to-play facade (poster + button). The YouTube
 * player pulls well over a megabyte of JS, which would undo the page's image
 * budget if it loaded on every visit. On click we swap in the real iframe with
 * autoplay=1; because the click is user-initiated, the view still counts.
 */

import { useState } from "react";
import Image from "next/image";
import { FILM } from "@/lib/config";
import { trackVideoInteract, trackOutboundClick } from "@/lib/analytics";

const { toothSafeChapter: chapter } = FILM;

/** 250 → "4:10" */
const runtime = `${Math.floor(FILM.durationSeconds / 60)}:${String(
  FILM.durationSeconds % 60
).padStart(2, "0")}`;

export default function VideoBlock() {
  const [playing, setPlaying] = useState(false);
  const [startAt, setStartAt] = useState(0);

  function play(seconds: number, label: string) {
    setStartAt(seconds);
    setPlaying(true);
    trackVideoInteract(label);
  }

  const embedSrc =
    `https://www.youtube-nocookie.com/embed/${FILM.id}` +
    `?autoplay=1&rel=0&modestbranding=1&iv_load_policy=3&color=white` +
    (startAt ? `&start=${startAt}` : "");

  return (
    <section id="the-film" className="section-padding px-6 bg-midnight relative">
      <div className="divider-gold absolute top-0 left-0 right-0" />

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-gold text-sm font-semibold tracking-[0.2em] uppercase mb-4">
            The Short Film
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl text-cream leading-snug">
            Watch where the ToothSafe came from
          </h2>
          <p className="mt-4 text-cream-dim text-base lg:text-lg leading-relaxed max-w-xl mx-auto">
            {FILM.title} is a {Math.round(FILM.durationSeconds / 60)}-minute
            animated short. Arlo asks the Tooth Fairy his questions, she takes
            him to her workshop — and at {chapter.timestamp}, she shows him the
            ToothSafe.
          </p>
        </div>

        {/* Player */}
        <div className="rounded-xl overflow-hidden border border-white/10 glow-gold">
          <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
            {playing ? (
              <iframe
                className="absolute inset-0 w-full h-full"
                src={embedSrc}
                title={FILM.fullTitle}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <button
                type="button"
                onClick={() => play(0, "film_play_from_start")}
                aria-label={`Play ${FILM.fullTitle}`}
                className="absolute inset-0 w-full h-full group cursor-pointer"
              >
                <Image
                  src={FILM.poster}
                  alt={`Still from ${FILM.title} — CeCe the Tooth Fairy in her workshop`}
                  width={1280}
                  height={720}
                  className="absolute inset-0 w-full h-full object-cover"
                  sizes="(max-width: 896px) 100vw, 896px"
                />

                {/* Darkening scrim so the play button stays legible */}
                <span className="absolute inset-0 bg-deep-blue/40 group-hover:bg-deep-blue/25 transition-colors duration-300" />

                {/* Play button */}
                <span className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                  <span
                    className="
                      w-20 h-20 rounded-full
                      border-2 border-gold bg-deep-blue/70
                      flex items-center justify-center
                      group-hover:bg-gold transition-colors duration-300
                    "
                  >
                    <span
                      className="w-0 h-0 ml-1.5 transition-colors duration-300"
                      style={{
                        borderTop: "13px solid transparent",
                        borderBottom: "13px solid transparent",
                        borderLeft: "22px solid #C9A036",
                      }}
                    />
                  </span>
                  <span className="text-cream font-semibold text-sm tracking-wide">
                    Watch the film — {runtime}
                  </span>
                </span>
              </button>
            )}
          </div>
        </div>

        {/* Chapter jump + YouTube link */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          {!playing && (
            <button
              type="button"
              onClick={() => play(chapter.startSeconds, "film_play_toothsafe_chapter")}
              className="
                text-sm text-gold hover:text-gold-light
                transition-colors duration-200 cursor-pointer
                inline-flex items-center gap-2
              "
            >
              <span aria-hidden="true">✦</span>
              Skip to the ToothSafe chapter ({chapter.timestamp})
            </button>
          )}

          <a
            href={FILM.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackOutboundClick("film_youtube", FILM.youtubeUrl)}
            className="
              text-sm text-cream-muted hover:text-gold
              transition-colors duration-200
              inline-flex items-center gap-2
            "
          >
            Watch on YouTube
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>

      <div className="divider-gold absolute bottom-0 left-0 right-0" />
    </section>
  );
}
