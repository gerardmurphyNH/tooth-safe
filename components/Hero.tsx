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

          {/* Film stills column — the object in use beats a product shot */}
          <div className="relative w-full flex flex-col gap-3">
            {/* Glow behind the stack */}
            <div
              className="absolute inset-0 blur-3xl pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse, rgba(201,160,54,0.18) 0%, transparent 70%)",
                transform: "scale(1.15)",
              }}
            />

            {/* Lead still — pairs directly with the "Not a pillow" headline */}
            <div className="relative rounded-xl overflow-hidden border border-white/10 glow-gold">
              <Image
                src="/images/film/toothsafe-under-pillow.webp"
                alt="A hand lifting a pillow to reveal the ToothSafe waiting underneath, where a tooth fairy pillow would usually sit"
                width={1400}
                height={788}
                className="w-full h-auto"
                priority
                sizes="(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 560px"
              />
            </div>

            {/* Two supporting frames. Both sources are ~1.77, same as the lead
                still, so they need no cropping and their heights match. */}
            <div className="relative grid grid-cols-2 gap-3">
              <div className="rounded-lg overflow-hidden border border-white/10">
                <Image
                  src="/images/film/toothsafe-workshop-cece-and-arlo.webp"
                  alt="CeCe the Tooth Fairy giving Arlo the ToothSafe in her workshop"
                  width={1400}
                  height={783}
                  className="w-full h-auto"
                  sizes="(max-width: 1024px) 45vw, 275px"
                />
              </div>
              <div className="rounded-lg overflow-hidden border border-white/10">
                <Image
                  src="/images/film/toothsafe-open-with-dollar.webp"
                  alt="The ToothSafe opened to show a folded dollar bill in the hidden second compartment"
                  width={1400}
                  height={799}
                  className="w-full h-auto"
                  sizes="(max-width: 1024px) 45vw, 275px"
                />
              </div>
            </div>

            <a
              href="#the-film"
              className="relative text-cream-muted hover:text-gold text-xs text-center transition-colors duration-200"
            >
              Frames from the short film — watch it →
            </a>
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
