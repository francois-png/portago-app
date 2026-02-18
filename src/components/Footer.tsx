import Link from "next/link";
import Image from "next/image";
import { WaitlistForm } from "./WaitlistForm";

export function Footer() {
  return (
    <footer className="bg-[var(--dark)] text-[rgba(255,255,255,0.5)]">
      {/* Newsletter */}
      <div className="bg-gradient-to-br from-[var(--warm-dark)] to-[#3D2E1A] text-center py-24 px-5">
        <div className="section-tag">Stay Connected</div>
        <h2 className="section-title !text-white">The Portago Weekly</h2>
        <p className="section-sub !text-[rgba(255,255,255,0.6)] mx-auto mb-8">
          Curated picks, insider tips, and the best of Mallorca — delivered every Thursday.
        </p>
        <div className="flex justify-center">
          <WaitlistForm />
        </div>
      </div>

      {/* Links */}
      <div className="max-w-[1200px] mx-auto px-10 pt-14 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-10 mb-10">
          <div>
            <Link href="/" className="block mb-3">
              <Image
                src="/portago-logo-transparent.png"
                alt="Portago"
                width={120}
                height={55}
                className="h-[45px] w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-sm leading-relaxed font-light">
              The definitive lifestyle directory for Mallorca. Curated for discerning residents
              and visitors who expect more from island living.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-semibold tracking-[2px] uppercase text-[rgba(255,255,255,0.8)] mb-4">
              Discover
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/category/restaurants" className="hover:text-[var(--gold)] transition-colors">Restaurants</Link></li>
              <li><Link href="/category/property" className="hover:text-[var(--gold)] transition-colors">Property</Link></li>
              <li><Link href="/category/wellness" className="hover:text-[var(--gold)] transition-colors">Wellness</Link></li>
              <li><Link href="/category/architecture" className="hover:text-[var(--gold)] transition-colors">Architecture</Link></li>
              <li><Link href="/category/schools" className="hover:text-[var(--gold)] transition-colors">Schools</Link></li>
              <li><Link href="/category/marinas" className="hover:text-[var(--gold)] transition-colors">Marinas</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold tracking-[2px] uppercase text-[rgba(255,255,255,0.8)] mb-4">
              Areas
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/area/palma" className="hover:text-[var(--gold)] transition-colors">Palma</Link></li>
              <li><Link href="/area/deia" className="hover:text-[var(--gold)] transition-colors">Deia</Link></li>
              <li><Link href="/area/soller" className="hover:text-[var(--gold)] transition-colors">Soller</Link></li>
              <li><Link href="/area/pollenca" className="hover:text-[var(--gold)] transition-colors">Pollenca</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold tracking-[2px] uppercase text-[rgba(255,255,255,0.8)] mb-4">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/" className="hover:text-[var(--gold)] transition-colors">About</Link></li>
              <li><Link href="/list-your-business" className="hover:text-[var(--gold)] transition-colors">List Your Business</Link></li>
              <li><Link href="/search" className="hover:text-[var(--gold)] transition-colors">Search</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-[rgba(255,255,255,0.08)] pt-6 flex flex-col sm:flex-row justify-between text-[13px]">
          <span>&copy; {new Date().getFullYear()} Portago. All rights reserved.</span>
          <span className="mt-2 sm:mt-0">
            <Link href="#" className="hover:text-[var(--gold)] transition-colors">Privacy</Link>
            {" · "}
            <Link href="#" className="hover:text-[var(--gold)] transition-colors">Terms</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
