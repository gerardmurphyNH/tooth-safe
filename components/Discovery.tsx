export default function Discovery() {
  return (
    <section id="the-story" className="section-padding px-6 bg-midnight relative overflow-hidden">
      <div className="divider-gold absolute top-0 left-0 right-0" />

      {/* Subtle background texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30 starfield"
      />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Section label */}
        <p className="text-gold text-sm font-semibold tracking-[0.2em] uppercase mb-4 text-center">
          The Story
        </p>

        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-cream text-center mb-12 leading-snug">
          How Arlo Found It
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Story text */}
          <div className="flex flex-col gap-5 text-cream-dim leading-relaxed text-base lg:text-lg">
            <p>
              It was tucked behind a loose stone in the old wall — the one at
              the back of his grandfather&apos;s garden that nobody ever bothered
              with anymore.
            </p>
            <p>
              Small. Heavier than it looked. Carved from something he
              couldn&apos;t quite name, with markings along the lid that
              weren&apos;t quite a language and weren&apos;t quite decorations.
            </p>
            <p>
              Inside, a velvet hollow. Exactly the right size for a tooth.
            </p>
          </div>

          {/* Pull-quote / aside */}
          <div className="flex flex-col gap-6">
            <blockquote
              className="border-l-2 border-gold pl-6 py-2"
            >
              <p className="font-serif italic text-xl lg:text-2xl text-cream leading-snug">
                &ldquo;It wasn&apos;t lost. It was waiting.&rdquo;
              </p>
              <footer className="mt-3 text-sm text-gold tracking-wide">
                — Arlo, age 8
              </footer>
            </blockquote>

            <p className="text-cream-dim leading-relaxed">
              Arlo didn&apos;t know where it came from. But he knew — the way
              children know things before adults explain them away — that it had
              been made with extraordinary care. For an extraordinary purpose.
            </p>
          </div>
        </div>
      </div>

      <div className="divider-gold absolute bottom-0 left-0 right-0" />
    </section>
  );
}
