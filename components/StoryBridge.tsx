export default function StoryBridge() {
  return (
    <section className="section-padding px-6 bg-deep-blue">
      <div className="max-w-4xl mx-auto">
        <div
          className="
            rounded-2xl border border-gold/20 p-10 lg:p-14
            relative overflow-hidden
          "
          style={{
            background:
              "linear-gradient(135deg, rgba(26,39,68,0.9) 0%, rgba(13,27,42,0.95) 100%)",
          }}
        >
          {/* Gold corner accent */}
          <div className="absolute top-0 left-0 w-24 h-24 pointer-events-none">
            <div
              className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-gold/60 to-transparent"
            />
            <div
              className="absolute top-0 left-0 h-full w-px bg-gradient-to-b from-gold/60 to-transparent"
            />
          </div>
          <div className="absolute bottom-0 right-0 w-24 h-24 pointer-events-none">
            <div
              className="absolute bottom-0 right-0 w-full h-px bg-gradient-to-l from-gold/60 to-transparent"
            />
            <div
              className="absolute bottom-0 right-0 h-full w-px bg-gradient-to-t from-gold/60 to-transparent"
            />
          </div>

          <div className="relative z-10 text-center flex flex-col items-center gap-6">
            {/* Decorative glyph */}
            <span className="text-gold text-3xl">✦</span>

            <p className="text-gold text-sm font-semibold tracking-[0.2em] uppercase">
              The Wider World
            </p>

            <h2 className="font-serif text-3xl sm:text-4xl text-cream leading-snug max-w-xl">
              There&apos;s a whole workshop behind this.
            </h2>

            <p className="text-cream-dim text-base lg:text-lg leading-relaxed max-w-lg">
              ToothSafe didn&apos;t come from nowhere. It came from the same
              place that Arlo stumbled into — a world older and stranger and
              more wonderful than most people suspect. Visit the workshop to
              learn where teeth really go.
            </p>

            <a
              href="https://wigglytoothworkshop.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="
                mt-2 inline-flex items-center gap-2
                px-7 py-3 rounded-lg
                border border-gold text-gold
                hover:bg-gold hover:text-deep-blue
                font-semibold text-sm tracking-wide
                transition-all duration-200
              "
            >
              Enter the Wiggly Tooth Workshop
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
