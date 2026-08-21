import Image from "next/image";
import { FILM } from "@/lib/config";

/**
 * FilmStills — the ToothSafe as it appears in the short film.
 *
 * Doubles as product photography and as promotion for the film: these are the
 * only images of the object in use, and the captions carry the story beats.
 *
 * Intentionally NOT cropped to a uniform ratio. The sources are a mix of 4:3
 * and 16:9, and forcing 16:9 either cut Arlo's head or cut the ToothSafe out
 * of frame. Ragged row heights are a fair price for keeping the frames intact.
 */
type Still = {
  src: string;
  alt: string;
  caption: string;
  w: number;
  h: number;
};

const workshop: Still[] = [
  {
    src: "/images/film/toothsafe-workshop-arlo-holds.webp",
    w: 1400,
    h: 999,
    alt: "Arlo holding the ToothSafe tooth fairy box in the Tooth Fairy's workshop, a sparkle catching its lid",
    caption: "Arlo sees the ToothSafe for the first time.",
  },
  {
    src: "/images/film/toothsafe-workshop-cece-and-arlo.webp",
    w: 1400,
    h: 783,
    alt: "CeCe the Tooth Fairy showing Arlo the ToothSafe in her workshop, tools hanging on the pegboard behind them",
    caption: "CeCe built it herself. She explains what it is for.",
  },
  {
    src: "/images/film/toothsafe-workshop-arlo-surprised.webp",
    w: 1400,
    h: 970,
    alt: "Arlo looking surprised as he holds up the purple ToothSafe disc, roughly the size of a hockey puck",
    caption: "About the size of a hockey puck.",
  },
];

const morning: Still[] = [
  {
    src: "/images/film/toothsafe-under-pillow.webp",
    w: 1400,
    h: 788,
    alt: "A hand lifting a pillow to reveal the ToothSafe waiting underneath, where a tooth fairy pillow would usually sit",
    caption: "The next morning, under the pillow.",
  },
  {
    src: "/images/film/toothsafe-morning-in-bed.webp",
    w: 1400,
    h: 808,
    alt: "Arlo sitting up in bed in the morning light, holding the ToothSafe he was given in the workshop",
    caption: "Which is how Arlo knew the night had been real.",
  },
  {
    src: "/images/film/toothsafe-open-with-dollar.webp",
    w: 1400,
    h: 799,
    alt: "The ToothSafe opened to show a folded dollar bill inside the second, hidden compartment",
    caption: "The second compartment. The tooth is gone; the money is not.",
  },
];

function Row({ stills }: { stills: Still[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {stills.map((s) => (
        <figure key={s.src} className="flex flex-col gap-3 self-start">
          <div className="rounded-xl overflow-hidden border border-white/10 bg-deep-blue">
            <Image
              src={s.src}
              alt={s.alt}
              width={s.w}
              height={s.h}
              className="w-full h-auto"
              loading="lazy"
              sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 380px"
            />
          </div>
          <figcaption className="text-cream-muted text-sm leading-relaxed">
            {s.caption}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

export default function FilmStills() {
  return (
    <section
      id="in-the-film"
      className="section-padding px-6 bg-deep-blue relative overflow-hidden"
    >
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-gold text-sm font-semibold tracking-[0.2em] uppercase mb-4">
            From the Film
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-cream leading-snug">
            The ToothSafe, on screen
          </h2>
          <p className="mt-4 text-cream-dim text-base lg:text-lg leading-relaxed max-w-xl mx-auto">
            Every one of these is a frame from{" "}
            {FILM.title} — the ToothSafe as CeCe made it, and as Arlo used it.
          </p>
        </div>

        {/* In the workshop */}
        <h3 className="font-serif text-xl text-gold mb-5">In the workshop</h3>
        <Row stills={workshop} />

        {/* The next morning */}
        <h3 className="font-serif text-xl text-gold mt-14 mb-5">
          The next morning
        </h3>
        <Row stills={morning} />

        {/* Back into the film */}
        <p className="mt-12 text-center text-cream-muted text-sm">
          The ToothSafe chapter starts at {FILM.toothSafeChapter.timestamp} —{" "}
          <a
            href="#the-film"
            className="text-gold hover:text-gold-light transition-colors duration-200"
          >
            watch it here
          </a>
          .
        </p>
      </div>
    </section>
  );
}
