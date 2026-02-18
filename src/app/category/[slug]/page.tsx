import { createClient } from "@/lib/supabase/server";
import { BusinessCard } from "@/components/BusinessCard";
import { CategoryIcon } from "@/components/CategoryIcon";
import { notFound } from "next/navigation";
import type { Business, Area } from "@/lib/types";

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ area?: string; rating?: string }>;
}) {
  const { slug } = await params;
  const filters = await searchParams;
  const supabase = await createClient();

  const { data: category } = await supabase
    .from("categories")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!category) notFound();

  let query = supabase
    .from("businesses")
    .select("*, area:areas(name, slug)")
    .eq("category_id", category.id)
    .eq("status", "active")
    .order("rating", { ascending: false, nullsFirst: false });

  if (filters.area) {
    const { data: areaData } = await supabase
      .from("areas")
      .select("id")
      .eq("slug", filters.area)
      .single();
    if (areaData) query = query.eq("area_id", areaData.id);
  }

  if (filters.rating) {
    query = query.gte("rating", parseFloat(filters.rating));
  }

  const { data: businesses } = await query.limit(50);

  const { data: areas } = await supabase
    .from("areas")
    .select("id, name, slug")
    .order("name");

  return (
    <>
      {/* Header */}
      <section className="relative bg-gradient-to-br from-[var(--warm-dark)] to-[var(--dark)] text-white pt-32 pb-16 px-5 md:px-10">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-full bg-[rgba(255,255,255,0.1)] flex items-center justify-center">
              <CategoryIcon slug={slug} size={28} className="text-[var(--gold)]" />
            </div>
            <h1 className="font-[family-name:var(--font-playfair)] text-3xl md:text-5xl font-semibold">
              {category.name}
            </h1>
          </div>
          {category.description && (
            <p className="text-[rgba(255,255,255,0.7)] max-w-2xl text-lg font-light">{category.description}</p>
          )}
          <p className="text-[rgba(255,255,255,0.5)] mt-2 text-sm">
            {businesses?.length || 0} listing{businesses?.length !== 1 ? "s" : ""}
          </p>
        </div>
      </section>

      <div className="bg-[var(--warm-white)] min-h-screen">
      <div className="max-w-[1200px] mx-auto px-5 md:px-10 py-12">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Sidebar */}
          <aside className="lg:w-64 shrink-0">
            <div className="sticky top-24 space-y-8">
              <div>
                <h3 className="text-[11px] font-semibold uppercase tracking-[2px] text-[var(--text-light)] mb-4">
                  Area
                </h3>
                <ul className="space-y-2">
                  <li>
                    <a
                      href={`/category/${slug}`}
                      className={`text-sm block py-1 transition-colors ${!filters.area ? "text-[var(--gold)] font-semibold" : "text-[var(--text-light)] hover:text-[var(--warm-dark)]"}`}
                    >
                      All Areas
                    </a>
                  </li>
                  {(areas as Area[])?.map((a) => (
                    <li key={a.id}>
                      <a
                        href={`/category/${slug}?area=${a.slug}${filters.rating ? `&rating=${filters.rating}` : ""}`}
                        className={`text-sm block py-1 transition-colors ${filters.area === a.slug ? "text-[var(--gold)] font-semibold" : "text-[var(--text-light)] hover:text-[var(--warm-dark)]"}`}
                      >
                        {a.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-[11px] font-semibold uppercase tracking-[2px] text-[var(--text-light)] mb-4">
                  Minimum Rating
                </h3>
                <ul className="space-y-2">
                  {["4.5", "4.0", "3.5"].map((r) => (
                    <li key={r}>
                      <a
                        href={`/category/${slug}?${filters.area ? `area=${filters.area}&` : ""}rating=${r}`}
                        className={`text-sm block py-1 transition-colors ${filters.rating === r ? "text-[var(--gold)] font-semibold" : "text-[var(--text-light)] hover:text-[var(--warm-dark)]"}`}
                      >
                        {r}+
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>

          {/* Grid */}
          <div className="flex-1">
            {businesses && businesses.length > 0 ? (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-7">
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
                <p className="text-lg font-light">No listings found for these filters.</p>
              </div>
            )}
          </div>
        </div>
      </div>
      </div>
    </>
  );
}
