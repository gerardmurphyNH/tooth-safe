const steps = [
  {
    number: "01",
    title: "Place the Tooth Inside",
    description:
      "Somewhere safe for a single tooth — held gently, the way something precious deserves to be held.",
    icon: "✦",
  },
  {
    number: "02",
    title: "Close It Up",
    description:
      "Closed, whatever is inside is safe. From loss, from time, from forgetting.",
    icon: "◆",
  },
  {
    number: "03",
    title: "Pass It On",
    description:
      "ToothSafe is built to last. Years from now, it can be opened again — and the moment will still be there, waiting.",
    icon: "◇",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="section-padding px-6 bg-deep-blue">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-gold text-sm font-semibold tracking-[0.2em] uppercase mb-4">
            The Object
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-cream leading-snug">
            How ToothSafe Works
          </h2>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step) => (
            <div
              key={step.number}
              className="
                flex flex-col gap-4 p-7 rounded-xl
                bg-midnight border border-white/8
                hover:border-gold/30 transition-colors duration-300
              "
            >
              {/* Number + icon row */}
              <div className="flex items-center justify-between">
                <span className="text-gold/40 font-serif text-5xl font-bold leading-none">
                  {step.number}
                </span>
                <span className="text-gold text-xl">{step.icon}</span>
              </div>

              {/* Title */}
              <h3 className="font-serif text-xl text-cream leading-snug">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-cream-dim text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
