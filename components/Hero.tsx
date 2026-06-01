import Image from "next/image";
import EmailForm from "./EmailForm";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 pb-16 px-6 overflow-hidden starfield">
      {/* Background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(26,39,68,0.8) 0%, transparent 70%)",
        }}
      />

      {/* Gold glow behind the product area */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(201,160,54,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Text column */}
          <div className="flex flex-col gap-6">
            {/* Eyebrow label */}
            <p className="text-gold text-sm font-semibold tracking-[0.2em] uppercase">
              From CeCe&apos;s Workshop
            </p>

            {/* Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-cream leading-[1.1] glow-gold-text">
              Some things are too important{" "}
              <em className="not-italic text-gold">to lose.</em>
            </h1>

            {/* Subheadline */}
            <p className="text-cream-dim text-lg leading-relaxed max-w-lg">
              Arlo asked the Tooth Fairy a question. She took him to her
              workshop — and let him keep one of her cleverest inventions.
            </p>

            {/* CTA block */}
            <div className="flex flex-col gap-3 mt-2">
              <p className="text-cream-dim text-sm">
                Be the first to know when ToothSafe is ready.
              </p>
              <EmailForm
                placeholder="Your email address"
                buttonText="Join the List"
                className="max-w-md"
                location="hero"
              />
            </div>

            {/* Social proof nudge */}
            <p className="text-cream-muted text-xs">
              ✦ No spam. Just a quiet note when it&apos;s time.
            </p>
          </div>

          {/* Product image column */}
          <div className="relative w-full animate-float">
            {/* Glow behind the product */}
            <div
              className="absolute inset-0 blur-3xl pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse, rgba(201,160,54,0.18) 0%, transparent 70%)",
                transform: "scale(1.15)",
              }}
            />

            {/* Product image — natural 966×418 ratio, fills the column */}
            <Image
              src="/images/toothsafe-product.png"
              alt="The ToothSafe — front and back of the circular purple keepsake disc, showing a tooth with a safe icon on the front and a green label panel on the back"
              width={966}
              height={418}
              className="relative w-full h-auto drop-shadow-2xl"
              priority
              sizes="(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 560px"
            />
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-shimmer">
        <div className="w-px h-8 bg-gradient-to-b from-gold/60 to-transparent" />
        <span className="text-gold-dim text-xs tracking-widest uppercase">Scroll</span>
      </div>
    </section>
  );
}
