import Image from "next/image";

/**
 * Prototype — the real object, after the film stills have done the selling.
 *
 * This section carries the CTA's whole argument: the thing exists, here it is,
 * and the gap between here and a shop shelf is what the waitlist is for.
 */
export default function Prototype() {
  return (
    <section
      id="the-prototype"
      className="section-padding px-6 bg-midnight relative overflow-hidden"
    >
      <div className="divider-gold absolute top-0 left-0 right-0" />

      {/* Gold glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(201,160,54,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-gold text-sm font-semibold tracking-[0.2em] uppercase mb-4">
            Off the Screen
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-cream leading-snug">
            The prototype, built and tested
          </h2>
          <p className="mt-4 text-cream-dim text-base lg:text-lg leading-relaxed max-w-xl mx-auto">
            CeCe&apos;s invention exists off the screen too. This is the working
            prototype — it opens, it holds a tooth, and it hides a coin exactly
            the way it does in the film.
          </p>
        </div>

        {/* Prototype photo */}
        <figure className="flex flex-col gap-4">
          <div className="rounded-xl overflow-hidden border border-white/10 glow-gold bg-deep-blue">
            <Image
              src="/images/toothsafe-product.webp"
              alt="The ToothSafe prototype photographed front and back — a circular purple tooth fairy box with a tooth motif on the lid and a label panel on the reverse"
              width={1402}
              height={561}
              className="w-full h-auto"
              loading="lazy"
              sizes="(max-width: 1024px) 92vw, 896px"
            />
          </div>
          <figcaption className="text-cream-muted text-sm text-center">
            The current prototype, front and back.
          </figcaption>
        </figure>

        {/* The honest gap */}
        <div className="mt-12 max-w-2xl mx-auto text-center">
          <div className="divider-gold w-32 mx-auto mb-6" />
          <p className="text-cream-dim text-base lg:text-lg leading-relaxed">
            What it isn&apos;t yet is production ready. Tooling, materials and
            child-safety testing for a real manufacturing run all have to be
            paid for before anyone can own one — which is what the list below is
            for.
          </p>
        </div>
      </div>

      <div className="divider-gold absolute bottom-0 left-0 right-0" />
    </section>
  );
}
