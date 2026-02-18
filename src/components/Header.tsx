"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export function Header() {
  const [open, setOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Discover" },
    { href: "/search", label: "Search" },
    { href: "/category/restaurants", label: "Dining" },
    { href: "/category/wellness", label: "Wellness" },
    { href: "/category/property", label: "Property" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-5 md:px-10 py-4 flex items-center justify-between bg-[rgba(255,252,247,0.85)] backdrop-blur-[20px] border-b border-[rgba(201,169,110,0.15)] transition-all duration-300">
      <Link href="/">
        <Image
          src="/portago-logo-transparent.png"
          alt="Portago"
          width={120}
          height={55}
          className="h-[45px] w-auto"
          priority
        />
      </Link>

      <nav className="hidden lg:flex items-center gap-8">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-[13px] font-medium text-[var(--text-light)] tracking-[0.5px] uppercase hover:text-[var(--gold)] transition-colors no-underline"
          >
            {link.label}
          </Link>
        ))}
        <Link
          href="/list-your-business"
          className="bg-[var(--warm-dark)] text-white px-6 py-2.5 rounded-full text-[13px] font-medium tracking-[0.8px] uppercase hover:bg-[var(--gold)] transition-all no-underline"
        >
          List Your Business
        </Link>
      </nav>

      <button
        className="lg:hidden text-[var(--warm-dark)] hover:text-[var(--gold)]"
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
      >
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>

      {open && (
        <nav className="absolute top-full left-0 right-0 bg-[rgba(255,252,247,0.95)] backdrop-blur-[20px] border-b border-[rgba(201,169,110,0.15)] px-5 py-6 space-y-4 lg:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block text-sm font-medium text-[var(--text-light)] uppercase tracking-wider hover:text-[var(--gold)] transition-colors"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/list-your-business"
            className="block bg-[var(--warm-dark)] text-white text-center px-6 py-2.5 rounded-full text-sm font-medium uppercase tracking-wider hover:bg-[var(--gold)] transition-all"
            onClick={() => setOpen(false)}
          >
            List Your Business
          </Link>
        </nav>
      )}
    </header>
  );
}
