import { createClient } from "@/lib/supabase/server";
import { BusinessCard } from "@/components/BusinessCard";
import { SearchBar } from "@/components/SearchBar";
import type { Business, Area } from "@/lib/types";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string; area?: string }>;
}) {
  const filters = await searchParams;
  const supabase = await createClient();

  const q = filters.q?.trim() || "";

  let query = supabase
    .from("businesses")
    .select("*, area:areas(name, slug), category:categories(name, slug)")
    .eq("status", "active")
    .order("rating", { ascending: false, nullsFirst: false });

  if (q) {
    query = query.ilike("name", `%${q}%`);
  }

  if (filters.category) {
    const { data: cat } = await supabase
      .from("categories")
      .select("id")
      .eq("slug", filters.category)
      .single();
    if (cat) query = query.eq("category_id", cat.id);
  }

  if (filters.area) {
    const { data: areaData } = await supabase
      .from("areas")
      .select("id")
      .eq("slug", filters.area)
      .single();
    if (areaData) query = query.eq("area_id", areaData.id);
  }

  const { data: businesses } = await query.limit(30);

  const [{ data: categories }, { data: areas }] = await Promise.all([
    supabase.from("categories").select("name, slug").order("sort_order"),
    supabase.from("areas").select("name, slug").order("name"),
  ]);

  return (
    <>
      <section className="bg-[var(--dark)] text-white py-12">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-playfair)] mb-6 text-center">
            Search
          </h1>
          <SearchBar />
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          <a
            href="/search"
            className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
              !filters.category
                ? "bg-[var(--gold)] text-white"
                : "bg-white text-[var(--text-light)] hover:bg-gray-100"
            }`}
          >
            All
          </a>
          {categories?.map((c) => (
            <a
              key={c.slug}
              href={`/search?${q ? `q=${encodeURIComponent(q)}&` : ""}category=${c.slug}${filters.area ? `&area=${filters.area}` : ""}`}
              className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                filters.category === c.slug
                  ? "bg-[var(--gold)] text-white"
                  : "bg-white text-[var(--text-light)] hover:bg-gray-100"
              }`}
            >
              {c.name}
            </a>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {areas?.map((a) => (
            <a
              key={a.slug}
              href={`/search?${q ? `q=${encodeURIComponent(q)}&` : ""}${filters.category ? `category=${filters.category}&` : ""}area=${a.slug}`}
              className={`px-3 py-1.5 rounded-full text-xs transition-colors ${
                filters.area === a.slug
                  ? "bg-[var(--dark)] text-white"
                  : "bg-gray-100 text-[var(--text-light)] hover:bg-gray-200"
              }`}
            >
              {a.name}
            </a>
          ))}
        </div>

        {q && (
          <p className="text-[var(--text-light)] mb-6">
            {businesses?.length || 0} result{businesses?.length !== 1 ? "s" : ""} for &ldquo;{q}&rdquo;
          </p>
        )}

        {businesses && businesses.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(businesses as (Business & { area: Area | null })[]).map((biz) => (
              <BusinessCard
                key={biz.id}
                business={biz}
                areaName={undefined}
                photoUrl={biz.photos?.[0]}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-[var(--text-light)]">
            <p className="text-lg">No listings found. Try a different search.</p>
          </div>
        )}
      </div>
    </>
  );
}
