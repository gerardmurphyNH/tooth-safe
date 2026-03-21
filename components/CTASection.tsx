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
          Coming Soon
        </p>

        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-cream leading-snug">
          The first batch is nearly ready.
        </h2>

        <p className="text-cream-dim text-lg leading-relaxed">
          ToothSafe will be available in limited quantities. Leave your email
          and we&apos;ll reach out before anyone else hears.
        </p>

        <EmailForm
          placeholder="Your email address"
          buttonText="Reserve My Spot"
          className="w-full max-w-md"
        />

        <p className="text-cream-muted text-xs">
          ✦ No spam. A single note when the time comes.
        </p>
      </div>
    </section>
  );
}
