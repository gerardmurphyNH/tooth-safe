const reasons = [
  {
    title: "First teeth don't stay long.",
    body: "They're here for a moment — a small, shining milestone — and then they're gone. ToothSafe makes sure the memory doesn't go with them.",
  },
  {
    title: "Some objects carry more than weight.",
    body: "The right container changes what something means. A tooth in a paper envelope is a tooth. A tooth in ToothSafe is a keepsake.",
  },
  {
    title: "Children deserve magic that lasts.",
    body: "The wonder of a lost tooth is real. ToothSafe is built to honor that — not as a novelty, but as an heirloom.",
  },
];

export default function WhyItMatters() {
  return (
    <section id="why-it-matters" className="section-padding px-6 bg-midnight relative overflow-hidden">
      <div className="divider-gold absolute top-0 left-0 right-0" />

      {/* Gold radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(201,160,54,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-gold text-sm font-semibold tracking-[0.2em] uppercase mb-4">
            Why It Exists
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-cream leading-snug max-w-2xl mx-auto">
            Why ToothSafe Matters
          </h2>
        </div>

        {/* Reasons grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reasons.map((reason, i) => (
            <div key={i} className="flex flex-col gap-3">
              <div className="w-8 h-px bg-gold mb-1" />
              <h3 className="font-serif text-lg text-cream leading-snug">
                {reason.title}
              </h3>
              <p className="text-cream-dim text-sm leading-relaxed">
                {reason.body}
              </p>
            </div>
          ))}
        </div>

        {/* Center statement */}
        <div className="mt-16 text-center">
          <p className="font-serif italic text-xl sm:text-2xl text-gold leading-relaxed max-w-2xl mx-auto">
            &ldquo;Arlo found it. Now you can have one too.&rdquo;
          </p>
        </div>
      </div>

      <div className="divider-gold absolute bottom-0 left-0 right-0" />
    </section>
  );
}
