import EmailForm from "./EmailForm";

export default function CTASection() {
  return (
    <section id="join-the-list" className="section-padding px-6 bg-deep-blue relative overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 100%, rgba(201,160,54,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-2xl mx-auto text-center flex flex-col items-center gap-7">
        {/* Decorative */}
        <span className="text-gold text-2xl">✦</span>

        <p className="text-gold text-sm font-semibold tracking-[0.2em] uppercase">
Prototype Stage
        </p>

        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-cream leading-snug">
Help us get the ToothSafe into production.
        </h2>

        <p className="text-cream-dim text-lg leading-relaxed">
          The ToothSafe exists — it has been designed, built and tested, and
          you can watch it in the film. What it isn&apos;t yet is production
          ready, and getting there takes showing that families actually want
          one. Every name on this list is that argument. No payment, no
          commitment.
        </p>

        <EmailForm
          placeholder="Your email address"
          buttonText="Count Me In"
          className="w-full max-w-md"
          location="cta_section"
        />

        <p className="text-cream-muted text-xs">
          ✦ One email when there&apos;s real news. Unsubscribe in a click.
        </p>
      </div>
    </section>
  );
}
