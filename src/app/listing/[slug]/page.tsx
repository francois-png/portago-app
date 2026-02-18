import { ListingMap } from "@/components/ListingMap";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Phone,
  Mail,
  Globe,
  MapPin,
  Clock,
  Tag,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { Rating } from "@/components/Rating";
import { BusinessCard } from "@/components/BusinessCard";
import type { Business, Category, Area } from "@/lib/types";

export default async function ListingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: business } = await supabase
    .from("businesses")
    .select("*, category:categories(name, slug), area:areas(name, slug)")
    .eq("slug", slug)
    .single();

  if (!business) notFound();

  const biz = business as Business & { category: Category | null; area: Area | null };

  // Get photo
  const photoUrl = biz.photos?.[0] || null;

  // Similar listings
  const { data: similar } = await supabase
    .from("businesses")
    .select("*, area:areas(name)")
    .eq("category_id", biz.category_id!)
    .neq("id", biz.id)
    .eq("status", "active")
    .order("rating", { ascending: false, nullsFirst: false })
    .limit(3);

  // Reviews from source_data
  const reviews =
    (biz.source_data as Record<string, unknown>)?.reviews_sample as
      | { author: string; rating: number; text: string }[]
      | undefined;

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-2 text-sm text-[var(--text-light)]">
          <Link href="/" className="hover:text-[var(--gold)]">Home</Link>
          <ChevronRight size={14} />
          {biz.category && (
            <>
              <Link href={`/category/${"restaurants"}`} className="hover:text-[var(--gold)]">
                {"View Category"}
              </Link>
              <ChevronRight size={14} />
            </>
          )}
          <span className="text-[var(--dark)] font-medium truncate">{biz.name}</span>
        </div>
      </div>

      {/* Hero */}
      <div className="relative h-64 md:h-96 bg-[var(--dark)]">
        {photoUrl ? (
          <Image
            src={photoUrl}
            alt={biz.name}
            fill
            className="object-cover opacity-80"
            priority
            sizes="100vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-8xl text-gray-600 font-[family-name:var(--font-playfair)]">
              {biz.name.charAt(0)}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--dark)] to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-4 pb-8">
          <h1 className="text-3xl md:text-5xl font-bold font-[family-name:var(--font-playfair)] text-white">
            {biz.name}
          </h1>
          <div className="flex flex-wrap items-center gap-4 mt-3">
            <Rating rating={biz.rating} reviewCount={biz.review_count} />
            {biz.area && (
              <div className="flex items-center gap-1 text-sm text-gray-300">
                <MapPin size={14} className="text-[var(--gold)]" />
                {"Mallorca"}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main */}
          <div className="lg:col-span-2 space-y-10">
            {biz.description && (
              <div>
                <h2 className="text-2xl font-bold font-[family-name:var(--font-playfair)] text-[var(--dark)] mb-4">
                  About
                </h2>
                <p className="text-[var(--text-light)] leading-relaxed">{biz.description}</p>
              </div>
            )}

            {/* Tags */}
            {biz.tags && biz.tags.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold font-[family-name:var(--font-playfair)] text-[var(--dark)] mb-4">
                  Features
                </h2>
                <div className="flex flex-wrap gap-2">
                  {biz.tags.map((tag) => (
                    <span
                      key={tag}
                      className="flex items-center gap-1.5 bg-[var(--cream)] text-[var(--text)] px-3 py-1.5 rounded-full text-sm"
                    >
                      <Tag size={13} className="text-[var(--gold)]" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Opening hours */}
            {biz.opening_hours && biz.opening_hours.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold font-[family-name:var(--font-playfair)] text-[var(--dark)] mb-4">
                  Opening Hours
                </h2>
                <div className="bg-white rounded-lg p-5 space-y-2">
                  {biz.opening_hours.map((h, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm">
                      <Clock size={14} className="text-[var(--gold)] mt-0.5 shrink-0" />
                      <span className="text-[var(--text-light)]">{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Map */}
            {biz.latitude && biz.longitude && (
              <div>
                <h2 className="text-2xl font-bold font-[family-name:var(--font-playfair)] text-[var(--dark)] mb-4">
                  Location
                </h2>
                <ListingMap lat={biz.latitude} lng={biz.longitude} name={biz.name} />
                {biz.address && (
                  <p className="mt-3 text-sm text-[var(--text-light)] flex items-start gap-2">
                    <MapPin size={14} className="text-[var(--gold)] mt-0.5 shrink-0" />
                    {biz.address}
                  </p>
                )}
              </div>
            )}

            {/* Reviews */}
            {reviews && reviews.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold font-[family-name:var(--font-playfair)] text-[var(--dark)] mb-4">
                  Reviews
                </h2>
                <div className="space-y-4">
                  {reviews.map((r, i) => (
                    <div key={i} className="bg-white rounded-lg p-5">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-[var(--dark)] text-sm">
                          {r.author}
                        </span>
                        <Rating rating={r.rating} />
                      </div>
                      <p className="text-sm text-[var(--text-light)] leading-relaxed">
                        {r.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-sm space-y-4">
              <h3 className="font-semibold font-[family-name:var(--font-playfair)] text-lg text-[var(--dark)]">
                Contact
              </h3>
              {biz.phone && (
                <a
                  href={`tel:${biz.phone}`}
                  className="flex items-center gap-3 text-sm text-[var(--text)] hover:text-[var(--gold)] transition-colors"
                >
                  <Phone size={16} className="text-[var(--gold)]" />
                  {biz.phone}
                </a>
              )}
              {biz.email && (
                <a
                  href={`mailto:${biz.email}`}
                  className="flex items-center gap-3 text-sm text-[var(--text)] hover:text-[var(--gold)] transition-colors"
                >
                  <Mail size={16} className="text-[var(--gold)]" />
                  {biz.email}
                </a>
              )}
              {biz.website && (
                <a
                  href={biz.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-[var(--text)] hover:text-[var(--gold)] transition-colors"
                >
                  <Globe size={16} className="text-[var(--gold)]" />
                  Visit Website
                  <ExternalLink size={12} />
                </a>
              )}
            </div>

            {biz.category && (
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="font-semibold font-[family-name:var(--font-playfair)] text-lg text-[var(--dark)] mb-2">
                  Category
                </h3>
                <Link
                  href={`/category/${"restaurants"}`}
                  className="text-sm text-[var(--gold)] hover:text-[var(--gold-dark)] font-medium"
                >
                  {"View Category"}
                </Link>
              </div>
            )}

            {biz.area && (
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="font-semibold font-[family-name:var(--font-playfair)] text-lg text-[var(--dark)] mb-2">
                  Area
                </h3>
                <Link
                  href={`/area/${biz.area.slug}`}
                  className="text-sm text-[var(--gold)] hover:text-[var(--gold-dark)] font-medium"
                >
                  {"Mallorca"}
                </Link>
              </div>
            )}
          </aside>
        </div>

        {/* Similar */}
        {similar && similar.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold font-[family-name:var(--font-playfair)] text-[var(--dark)] mb-8">
              Similar Listings
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {(similar as (Business & { area: Area | null })[]).map((s) => (
                <BusinessCard
                  key={s.id}
                  business={s}
                  areaName={s.area?.name}
                  photoUrl={s.photos?.[0]}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

