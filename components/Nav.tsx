import Link from "next/link";
import TrackedLink from "./TrackedLink";

export default function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Wordmark */}
        <Link href="/" className="font-serif text-xl text-cream tracking-wide hover:text-gold transition-colors duration-200">
          ToothSafe
        </Link>

        {/* Workshop link */}
        <TrackedLink
          href="https://wigglytoothworkshop.com/"
          label="nav_workshop"
          target="_blank"
          rel="noopener noreferrer"
          className="
            text-sm text-cream-dim hover:text-gold
            transition-colors duration-200
            flex items-center gap-1.5
          "
        >
          Visit the Workshop
          <span aria-hidden="true" className="text-gold">→</span>
        </TrackedLink>
      </div>

      {/* Subtle bottom border */}
      <div className="absolute bottom-0 left-0 right-0 divider-gold opacity-50" />
    </nav>
  );
}
