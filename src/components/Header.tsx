import Link from "next/link";

export function Header() {
  return (
    <header className="bg-[var(--dark)] text-white">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold font-[family-name:var(--font-playfair)]">
          <span className="text-[var(--gold)]">Portago</span>
        </Link>
        <nav className="hidden md:flex gap-8 text-sm font-medium">
          <Link href="/" className="hover:text-[var(--gold)] transition-colors">
            Home
          </Link>
          <Link href="/explore" className="hover:text-[var(--gold)] transition-colors">
            Explore
          </Link>
          <Link href="/areas" className="hover:text-[var(--gold)] transition-colors">
            Areas
          </Link>
          <Link href="/list-your-business" className="hover:text-[var(--gold)] transition-colors">
            List Your Business
          </Link>
        </nav>
      </div>
    </header>
  );
}
