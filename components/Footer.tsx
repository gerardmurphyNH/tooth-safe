export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="px-6 py-8 bg-navy border-t border-white/8">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-cream-muted">
        <p className="font-serif tracking-wide">ToothSafe</p>

        <p>
          Part of the{" "}
          <a
            href="https://wigglytoothworkshop.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold hover:text-gold-light transition-colors duration-200"
          >
            Wiggly Tooth Workshop
          </a>{" "}
          universe
        </p>

        <p>&copy; {year} ToothSafe. All rights reserved.</p>
      </div>
    </footer>
  );
}
