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
            {/* Eyebrow — doubles as the hook into the film section */}
            <a
              href="#the-film"
              className="
                text-gold hover:text-gold-light text-sm font-semibold
                tracking-[0.2em] uppercase transition-colors duration-200
                inline-flex items-center gap-2 self-start
              "
            >
              <span aria-hidden="true">✦</span>
              As Seen in the Short Film
            </a>

            {/* Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-cream leading-[1.1] glow-gold-text">
              Not a pillow. A tooth fairy box{" "}
              <em className="not-italic text-gold">with a secret.</em>
            </h1>

            {/* Subheadline */}
            <p className="text-cream-dim text-lg leading-relaxed max-w-lg">
              Spin the tooth-shaped lever and ToothSafe opens: one compartment
              for the lost tooth, and a second, hidden one for what the Tooth
              Fairy leaves behind. Arlo found his under his pillow — the morning
              after CeCe showed him her workshop.
            </p>

            {/* CTA block */}
            <div className="flex flex-col gap-3 mt-2">
              <p className="text-cream-dim text-sm">
                The prototype works. Add your name and help us get it into
                production.
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
              ✦ Free, no payment, no commitment. One email when there&apos;s
              real news.
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

            {/* Product image — natural 1402×561 ratio, fills the column */}
            <Image
              src="/images/toothsafe-product.webp"
              alt="ToothSafe keepsake box for a first lost tooth — front and back of the circular purple disc, showing a tooth with a safe icon on the front and a label panel on the back"
              width={1402}
              height={561}
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
