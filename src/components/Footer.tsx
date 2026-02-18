export function Footer() {
  return (
    <footer className="bg-[var(--dark)] text-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold text-[var(--gold)] mb-4 font-[family-name:var(--font-playfair)]">
              Portago
            </h3>
            <p className="text-sm text-gray-400">
              Your guide to the best of Puerto Portals &amp; Portals Nous, Mallorca.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="/explore" className="hover:text-[var(--gold)]">Explore</a></li>
              <li><a href="/areas" className="hover:text-[var(--gold)]">Areas</a></li>
              <li><a href="/list-your-business" className="hover:text-[var(--gold)]">List Your Business</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Contact</h4>
            <p className="text-sm text-gray-400">
              Puerto Portals, Mallorca, Spain
            </p>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Portago. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
