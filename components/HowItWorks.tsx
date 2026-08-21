const steps = [
  {
    number: "01",
    title: "Spin the Tooth",
    description:
      "A tooth-shaped lever sits on top. Your child turns it, and the first compartment opens — sized for one small tooth and nothing else.",
    icon: "✦",
  },
  {
    number: "02",
    title: "Leave It Out at Bedtime",
    description:
      "The tooth goes in. ToothSafe sits where the pillow used to — impossible to lose in the bedding, and easy for the Tooth Fairy to find.",
    icon: "◆",
  },
  {
    number: "03",
    title: "Spin Again in the Morning",
    description:
      "Keep turning the lever and a second, hidden compartment appears. The tooth is gone. A coin or a folded dollar is waiting in its place.",
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
            How the Tooth Fairy Box Works
          </h2>
          <p className="mt-4 text-cream-dim text-base lg:text-lg leading-relaxed max-w-xl mx-auto">
            About the size of a hockey puck, with a tooth-shaped lever on top
            and two compartments hidden inside.
          </p>
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
