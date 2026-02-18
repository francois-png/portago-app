import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { BusinessCard } from "@/components/BusinessCard";
import { MapPin } from "lucide-react";
import type { Business, Category } from "@/lib/types";

export default async function AreaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: area } = await supabase
    .from("areas")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!area) notFound();

  const { data: businesses } = await supabase
    .from("businesses")
    .select("*, category:categories(name, slug)")
    .eq("area_id", area.id)
    .eq("status", "active")
    .order("rating", { ascending: false, nullsFirst: false })
    .limit(100);

  const grouped: Record<string, { category: Category; businesses: Business[] }> = {};
  for (const biz of (businesses || []) as (Business & { category: Category | null })[]) {
    const catName = biz.category?.name || "Other";
    const catSlug = biz.category?.slug || "other";
    if (!grouped[catName]) {
      grouped[catName] = {
        category: biz.category || { id: "", name: catName, slug: catSlug, description: null, icon: null, sort_order: 99 },
        businesses: [],
      };
    }
    grouped[catName].businesses.push(biz);
  }

  return (
    <>
      <section className="relative bg-gradient-to-br from-[var(--warm-dark)] to-[var(--dark)] text-white pt-32 pb-16 px-5 md:px-10">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <MapPin size={24} className="text-[var(--gold)]" />
            <h1 className="font-[family-name:var(--font-playfair)] text-3xl md:text-5xl font-semibold">
              {area.name}
            </h1>
          </div>
          {area.description && (
            <p className="text-[rgba(255,255,255,0.7)] max-w-2xl text-lg font-light">{area.description}</p>
          )}
          <p className="text-[rgba(255,255,255,0.5)] mt-2 text-sm">
            {businesses?.length || 0} listing{businesses?.length !== 1 ? "s" : ""}
          </p>
        </div>
      </section>

      <div className="max-w-[1200px] mx-auto px-5 md:px-10 py-16 space-y-16">
        {Object.entries(grouped).map(([catName, group]) => (
          <div key={catName}>
            <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-semibold text-[var(--warm-dark)] mb-8">
              {catName}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
              {group.businesses.map((biz) => (
                <BusinessCard
                  key={biz.id}
                  business={biz}
                  areaName={area.name}
                  photoUrl={biz.photos?.[0]}
                />
              ))}
            </div>
          </div>
        ))}

        {Object.keys(grouped).length === 0 && (
          <div className="text-center py-20 text-[var(--text-light)]">
            <p className="text-lg font-light">No listings found in this area yet.</p>
          </div>
        )}
      </div>
    </>
  );
}
