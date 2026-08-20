import TrackedLink from "./TrackedLink";
import { FILM } from "@/lib/config";

/**
 * FAQ — visible answers to the questions people actually search for.
 *
 * Paired with FAQPage JSON-LD in StructuredData.tsx. Keep the two in sync:
 * Google requires the marked-up Q&A to match the on-page text.
 */
export const faqs = [
  {
    q: "What do you do with a baby tooth after it falls out?",
    a: "Most parents keep it. A first lost tooth is a one-time milestone, and a paper envelope in a drawer rarely survives the years. A keepsake made for the job keeps the tooth safe, findable, and easy to pass on years later — which is exactly what ToothSafe is for.",
  },
  {
    q: "Where can I watch the ToothSafe story?",
    a: "The Tooth Fairy's Secret Workshop is a free four-minute animated short on YouTube. Arlo asks the Tooth Fairy what she really does with the teeth she collects, and she takes him to her workshop to show him. The ToothSafe appears at 2:45, in the chapter called \u201cThe ToothSafe: A Treasure Chest for Teeth\u201d.",
  },
  {
    q: "What is a tooth fairy box?",
    a: "A tooth fairy box is a small container a child leaves out with a lost tooth, instead of tucking the tooth loose under a pillow. It makes the tooth easy for the Tooth Fairy to find, and it gives the family something to keep afterwards.",
  },
  {
    q: "What makes ToothSafe different from a regular tooth fairy box?",
    a: "ToothSafe comes from a story your child can watch. It is the keepsake CeCe the Tooth Fairy uses in her own workshop in The Tooth Fairy's Secret Workshop, and the one she let Arlo keep. Your child gets the object, the film, and the story behind it — not just a container.",
  },
  {
    q: "When will ToothSafe be available?",
    a: "The first batch is nearly ready and will be released in limited quantities. Join the waitlist and we will email you before the release goes public — no spam, one note when it is time.",
  },
  {
    q: "What age is ToothSafe for?",
    a: "Children typically lose their first tooth between ages four and seven, so ToothSafe is made with that moment in mind. It stays useful for every tooth after that, and it is meant to be kept long after the last one.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="section-padding px-6 bg-midnight relative overflow-hidden">
      <div className="divider-gold absolute top-0 left-0 right-0" />

      <div className="relative z-10 max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-gold text-sm font-semibold tracking-[0.2em] uppercase mb-4">
            Questions
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-cream leading-snug">
            Lost Teeth, Answered
          </h2>
        </div>

        {/* Questions */}
        <div className="flex flex-col gap-4">
          {faqs.map((item) => (
            <details
              key={item.q}
              className="
                group rounded-xl p-6
                bg-deep-blue border border-white/8
                hover:border-gold/30 transition-colors duration-300
              "
            >
              <summary
                className="
                  font-serif text-lg text-cream leading-snug
                  cursor-pointer list-none
                  flex items-start justify-between gap-4
                "
              >
                <span>{item.q}</span>
                <span
                  aria-hidden="true"
                  className="text-gold shrink-0 transition-transform duration-200 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-4 text-cream-dim text-base leading-relaxed">
                {item.a}
              </p>
            </details>
          ))}
        </div>

        {/* Soft CTA back into the funnel */}
        <p className="mt-10 text-center text-cream-muted text-sm">
          Still curious where teeth actually go?{" "}
          <TrackedLink
            href={FILM.watchPageUrl}
            label="faq_watch"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold hover:text-gold-light transition-colors duration-200"
          >
            Watch the four-minute film
          </TrackedLink>
          .
        </p>
      </div>

      <div className="divider-gold absolute bottom-0 left-0 right-0" />
    </section>
  );
}
