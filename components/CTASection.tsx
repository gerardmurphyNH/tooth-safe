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
          Not Made Yet
        </p>

        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-cream leading-snug">
          Help us get the ToothSafe made.
        </h2>

        <p className="text-cream-dim text-lg leading-relaxed">
          Right now ToothSafe is a prototype and a film. Getting it properly
          made takes showing that families actually want one — so every name on
          this list is the argument. No payment, no commitment: just add yours
          and we&apos;ll tell you when it becomes real.
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
