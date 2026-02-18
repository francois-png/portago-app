import Link from "next/link";
import { MapPin } from "lucide-react";
import { WaitlistForm } from "./WaitlistForm";

export function Footer() {
  return (
    <footer className="bg-[var(--dark)] text-white">
      {/* Newsletter */}
      <div className="border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-playfair)] mb-3">
            Stay in the know
          </h2>
          <p className="text-gray-400 mb-8 max-w-lg mx-auto">
            Get the latest on Mallorca&apos;s best restaurants, experiences, and hidden gems
            delivered to your inbox.
          </p>
          <div className="flex justify-center">
            <WaitlistForm />
          </div>
        </div>
      </div>

      {/* Links */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold text-[var(--gold)] mb-4 font-[family-name:var(--font-playfair)]">
              Portago
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Your curated guide to the finest experiences across Mallorca.
            </p>
            <div className="flex items-center gap-1.5 mt-3 text-sm text-gray-400">
              <MapPin size={14} className="text-[var(--gold)]" />
              Mallorca, Spain
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li><Link href="/category/restaurants" className="hover:text-[var(--gold)] transition-colors">Restaurants</Link></li>
              <li><Link href="/category/activities" className="hover:text-[var(--gold)] transition-colors">Activities</Link></li>
              <li><Link href="/category/wellness" className="hover:text-[var(--gold)] transition-colors">Wellness</Link></li>
              <li><Link href="/category/property" className="hover:text-[var(--gold)] transition-colors">Property</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">
              Areas
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li><Link href="/area/palma" className="hover:text-[var(--gold)] transition-colors">Palma</Link></li>
              <li><Link href="/area/port-dandratx" className="hover:text-[var(--gold)] transition-colors">Port d&apos;Andratx</Link></li>
              <li><Link href="/area/sller" className="hover:text-[var(--gold)] transition-colors">Soller</Link></li>
              <li><Link href="/area/valldemossa" className="hover:text-[var(--gold)] transition-colors">Valldemossa</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li><Link href="/list-your-business" className="hover:text-[var(--gold)] transition-colors">List Your Business</Link></li>
              <li><Link href="/search" className="hover:text-[var(--gold)] transition-colors">Search</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Portago. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
