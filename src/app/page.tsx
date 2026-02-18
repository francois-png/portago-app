import Link from "next/link";
import { ArrowRight, Search, MapPin, Sparkles } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { HeroRotator } from "@/components/HeroRotator";
import { SearchBar } from "@/components/SearchBar";
import { BusinessCard } from "@/components/BusinessCard";
import { CategoryIcon } from "@/components/CategoryIcon";
import type { Business, Category, Area } from "@/lib/types";

export default async function Home() {
  const supabase = await createClient();

  const [{ data: categories }, { data: featured }, { data: areas }] = await Promise.all([
    supabase.from("categories").select("*").order("sort_order"),
    supabase
      .from("businesses")
      .select("*")
      .eq("status", "active")
      .order("rating", { ascending: false })
      .limit(6),
    supabase.from("areas").select("*").limit(8),
  ]);

  return (
    <>
      {/* Hero */}
      <section className="relative bg-[var(--dark)] text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--dark)] via-[var(--dark-light)] to-[var(--dark)] opacity-90" />
        <div className="relative max-w-7xl mx-auto px-4 py-24 md:py-36 lg:py-44">
          <HeroRotator />
          <p className="mt-6 text-lg md:text-xl text-gray-300 max-w-2xl">
            Discover the finest restaurants, experiences, and services across the island.
            Curated for those who appreciate the extraordinary.
          </p>
          <div className="mt-10 max-w-xl">
            <SearchBar />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-playfair)] text-[var(--dark)]">
            Explore by Category
          </h2>
          <p className="mt-3 text-[var(--text-light)] max-w-lg mx-auto">
            From world-class dining to island adventures, find exactly what you are looking for.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {(categories as Category[])?.map((cat) => (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              className="group flex flex-col items-center gap-3 p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5"
            >
              <div className="w-12 h-12 rounded-full bg-[var(--cream)] flex items-center justify-center group-hover:bg-[var(--gold)] transition-colors">
                <CategoryIcon
                  slug={cat.slug}
                  size={22}
                  className="text-[var(--gold)] group-hover:text-white transition-colors"
                />
              </div>
              <span className="font-semibold text-[var(--dark)] text-sm text-center">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-playfair)] text-[var(--dark)]">
                Top Rated
              </h2>
              <p className="mt-2 text-[var(--text-light)]">
                The highest-rated places across Mallorca
              </p>
            </div>
            <Link
              href="/search"
              className="hidden md:flex items-center gap-2 text-[var(--gold)] hover:text-[var(--gold-dark)] font-semibold transition-colors"
            >
              View all <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(featured as (Business & { area: Area | null })[])?.map((biz) => (
              <BusinessCard
                key={biz.id}
                business={biz}
                areaName={undefined}
                photoUrl={biz.photos?.[0]}
              />
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-playfair)] text-[var(--dark)]">
            How Portago Works
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-10">
          {[
            {
              icon: Search,
              title: "Discover",
              desc: "Browse curated categories or search for exactly what you need across Mallorca.",
            },
            {
              icon: MapPin,
              title: "Explore",
              desc: "Read reviews, view photos, and find the perfect spot for any occasion.",
            },
            {
              icon: Sparkles,
              title: "Experience",
              desc: "Visit with confidence, knowing every listing has been vetted for quality.",
            },
          ].map((step, i) => (
            <div key={i} className="text-center">
              <div className="w-16 h-16 rounded-full bg-[var(--cream)] flex items-center justify-center mx-auto mb-5">
                <step.icon size={28} className="text-[var(--gold)]" />
              </div>
              <h3 className="text-xl font-semibold font-[family-name:var(--font-playfair)] text-[var(--dark)] mb-2">
                {step.title}
              </h3>
              <p className="text-[var(--text-light)] leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Areas */}
      {areas && areas.length > 0 && (
        <section className="bg-white py-20">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-playfair)] text-[var(--dark)] text-center mb-12">
              Explore by Area
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {(areas as Area[]).map((area) => (
                <Link
                  key={area.id}
                  href={`/area/${area.slug}`}
                  className="group relative p-6 bg-[var(--cream)] rounded-lg hover:bg-[var(--dark)] transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <MapPin
                      size={16}
                      className="text-[var(--gold)]"
                    />
                    <span className="font-semibold text-[var(--dark)] group-hover:text-white transition-colors">
                      {area.name}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
