import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "You're on the list — ToothSafe",
  description: "Thank you for signing up. We'll be in touch soon.",
};

export default function ConfirmedPage() {
  return (
    <main className="min-h-screen bg-deep-blue flex items-center justify-center px-6 starfield">
      {/* Gold glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(201,160,54,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-lg text-center flex flex-col items-center gap-6">
        {/* Decorative */}
        <span className="text-gold text-4xl animate-shimmer">✦</span>

        <h1 className="font-serif text-4xl sm:text-5xl text-cream leading-snug">
          You&apos;re on the list.
        </h1>

        <p className="text-cream-dim text-lg leading-relaxed">
          Arlo would be pleased. We&apos;ll send you a quiet note when ToothSafe
          is ready — before anyone else hears.
        </p>

        <div className="divider-gold w-32 my-2" />

        <p className="text-cream-muted text-sm">
          While you wait, you might enjoy the wider world this came from.
        </p>

        <a
          href="https://wigglytoothworkshop.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="
            px-7 py-3 rounded-lg
            border border-gold text-gold
            hover:bg-gold hover:text-deep-blue
            font-semibold text-sm tracking-wide
            transition-all duration-200
            inline-flex items-center gap-2
          "
        >
          Visit the Wiggly Tooth Workshop
          <span aria-hidden="true">→</span>
        </a>

        <Link
          href="/"
          className="text-cream-muted text-sm hover:text-cream-dim transition-colors duration-200"
        >
          ← Back to ToothSafe
        </Link>
      </div>
    </main>
  );
}
