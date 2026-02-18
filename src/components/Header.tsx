"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Search } from "lucide-react";
import { useRouter } from "next/navigation";

export function Header() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      setSearchOpen(false);
      setQuery("");
    }
  };

  const navLinks = [
    { href: "/category/restaurants", label: "Restaurants" },
    { href: "/category/activities", label: "Activities" },
    { href: "/category/wellness", label: "Wellness" },
    { href: "/category/property", label: "Property" },
  ];

  return (
    <header className="bg-[var(--dark)] text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="text-2xl font-bold font-[family-name:var(--font-playfair)]"
        >
          <span className="text-[var(--gold)]">Portago</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-[var(--gold)] transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="hover:text-[var(--gold)] transition-colors"
            aria-label="Search"
          >
            <Search size={18} />
          </button>
          <Link
            href="/list-your-business"
            className="bg-[var(--gold)] hover:bg-[var(--gold-dark)] text-white px-5 py-2 rounded-lg font-semibold transition-colors text-sm"
          >
            List Your Business
          </Link>
        </nav>

        <button
          className="lg:hidden hover:text-[var(--gold)]"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {searchOpen && (
        <div className="border-t border-gray-700 py-3 px-4 max-w-7xl mx-auto">
          <form onSubmit={handleSearch} className="relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search listings..."
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[var(--dark-light)] text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--gold)]"
            />
          </form>
        </div>
      )}

      {open && (
        <nav className="lg:hidden border-t border-gray-700 px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block hover:text-[var(--gold)] transition-colors"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/search"
            className="block hover:text-[var(--gold)] transition-colors"
            onClick={() => setOpen(false)}
          >
            Search
          </Link>
          <Link
            href="/list-your-business"
            className="block bg-[var(--gold)] hover:bg-[var(--gold-dark)] text-white px-5 py-2 rounded-lg font-semibold transition-colors text-sm text-center"
            onClick={() => setOpen(false)}
          >
            List Your Business
          </Link>
        </nav>
      )}
    </header>
  );
}
