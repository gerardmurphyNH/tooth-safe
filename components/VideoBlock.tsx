"use client";

/**
 * VideoBlock — YouTube embed section
 *
 * To activate: set NEXT_PUBLIC_YOUTUBE_VIDEO_ID in .env.local
 * e.g. NEXT_PUBLIC_YOUTUBE_VIDEO_ID=dQw4w9WgXcQ
 *
 * Fires a GA4 `video_interact` event when the user clicks into the embed.
 */

import { trackVideoInteract } from "@/lib/analytics";

const VIDEO_ID = process.env.NEXT_PUBLIC_YOUTUBE_VIDEO_ID;

export default function VideoBlock() {
  return (
    <section id="the-story-in-motion" className="section-padding px-6 bg-midnight relative">
      <div className="divider-gold absolute top-0 left-0 right-0" />

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-gold text-sm font-semibold tracking-[0.2em] uppercase mb-4">
            See It
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl text-cream leading-snug">
            The Story in Motion
          </h2>
        </div>

        {/* Video container */}
        <div className="rounded-xl overflow-hidden border border-white/10 glow-gold">
          {VIDEO_ID ? (
            /* Real YouTube embed — click overlay fires GA4 event */
            <div
              className="relative w-full"
              style={{ paddingBottom: "56.25%" }}
              onClick={() => trackVideoInteract("ToothSafe — The Story")}
            >
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/${VIDEO_ID}?rel=0&modestbranding=1`}
                title="ToothSafe — The Story"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            /* Placeholder */
            <div
              className="
                w-full aspect-video flex flex-col items-center justify-center gap-4
                bg-deep-blue
              "
            >
              <div className="w-16 h-16 rounded-full border-2 border-gold/40 flex items-center justify-center">
                <div
                  className="w-0 h-0 ml-1"
                  style={{
                    borderTop: "10px solid transparent",
                    borderBottom: "10px solid transparent",
                    borderLeft: "18px solid rgba(201,160,54,0.5)",
                  }}
                />
              </div>
              <p className="text-cream-muted text-sm">
                Video coming soon
              </p>
              <p className="text-cream-muted/50 text-xs">
                Set{" "}
                <code className="text-gold/60">NEXT_PUBLIC_YOUTUBE_VIDEO_ID</code>{" "}
                in .env.local to activate
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="divider-gold absolute bottom-0 left-0 right-0" />
    </section>
  );
}
