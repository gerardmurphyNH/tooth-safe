import Image from "next/image";

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
          How Arlo Came to Have It
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Story text */}
          <div className="flex flex-col gap-5 text-cream-dim leading-relaxed text-base lg:text-lg">
            <p>
              Arlo had questions. When he lost his first tooth, he wanted to
              know what the Tooth Fairy actually did with it. So he left her
              a note.
            </p>
            <p>
              That night, CeCe appeared — goggles on, tools at her waist, and
              no time for nonsense. She showed Arlo the truth: every lost tooth
              holds something special, like bravery, kindness, patience, and
              creativity. CeCe uses those qualities to quietly help keep the
              world in balance.
            </p>
            <p>
              In her workshop, Arlo noticed one of CeCe&apos;s cleverest
              inventions: the ToothSafe. It was built to keep lost teeth safe,
              easy to find, and ready for the Tooth Fairy&apos;s visit.
            </p>
          </div>

          {/* Pull-quote / aside */}
          <div className="flex flex-col gap-6">
            <Image
              src="/images/toothsafe-drawing.webp"
              alt="Hand-drawn illustration of the ToothSafe tooth fairy box — a purple circular disc with a tooth on the front, as depicted in the book"
              width={633}
              height={468}
              className="w-full h-auto rounded-xl"
              loading="lazy"
              sizes="(max-width: 768px) 90vw, 480px"
            />

            <blockquote
              className="border-l-2 border-gold pl-6 py-2"
            >
              <p className="font-serif italic text-xl lg:text-2xl text-cream leading-snug">
                &ldquo;Every lost tooth holds something special.&rdquo;
              </p>
              <footer className="mt-3 text-sm text-gold tracking-wide">
                — CeCe, the Tooth Fairy
              </footer>
            </blockquote>

            <p className="text-cream-dim leading-relaxed">
              CeCe let Arlo keep it. The next morning, he reached under his
              pillow and found the ToothSafe waiting — with his thank-you
              tucked safely inside.
            </p>
          </div>
        </div>
      </div>

      <div className="divider-gold absolute bottom-0 left-0 right-0" />
    </section>
  );
}
