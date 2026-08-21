import Link from "next/link";

export default function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Wordmark */}
        <Link href="/" className="font-serif text-xl text-cream tracking-wide hover:text-gold transition-colors duration-200">
          ToothSafe
        </Link>

        {/* Film link — on-page, so the visitor isn't sent off-site from the nav */}
        <a
          href="#the-film"
          className="
            text-sm text-cream-dim hover:text-gold
            transition-colors duration-200
            flex items-center gap-1.5
          "
        >
          Watch the Film
          <span aria-hidden="true" className="text-gold">→</span>
        </a>
      </div>

      {/* Subtle bottom border */}
      <div className="absolute bottom-0 left-0 right-0 divider-gold opacity-50" />
    </nav>
  );
}
