export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-4">
      <h1 className="text-5xl md:text-6xl font-bold text-[var(--dark)] mb-6 text-center">
        Welcome to <span className="text-[var(--gold)]">Portago</span>
      </h1>
      <p className="text-xl text-[var(--text-light)] max-w-2xl text-center mb-12">
        Your guide to the best restaurants, services, and experiences in Puerto
        Portals &amp; Portals Nous, Mallorca.
      </p>
      <div className="flex gap-4">
        <a
          href="#"
          className="bg-[var(--gold)] hover:bg-[var(--gold-dark)] text-white px-8 py-3 rounded-lg font-semibold transition-colors"
        >
          Explore Listings
        </a>
        <a
          href="#"
          className="border-2 border-[var(--dark)] text-[var(--dark)] hover:bg-[var(--dark)] hover:text-white px-8 py-3 rounded-lg font-semibold transition-colors"
        >
          List Your Business
        </a>
      </div>
    </div>
  );
}
