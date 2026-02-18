import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin, Search, Star, Heart } from "lucide-react";

const categoryImages: Record<string, string> = {
  restaurants: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80",
  architecture: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80",
  property: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80",
  activities: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80",
  wellness: "https://images.unsplash.com/photo-1540555700478-4be289fbec6d?w=600&q=80",
  schools: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&q=80",
  shopping: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&q=80",
  transport: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&q=80",
  marinas: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=600&q=80",
  "home-garden": "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=600&q=80",
  events: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&q=80",
};

const areaImages: Record<string, string> = {
  palma: "https://images.unsplash.com/photo-1577000867069-97cc1e6d9606?w=600&q=80",
  soller: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=80",
};
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
      .limit(3),
    supabase.from("areas").select("*").limit(8),
  ]);

  return (
    <>
      {/* Hero — full viewport with video bg */}
      <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[var(--warm-dark)] to-[var(--dark)]">
        <video
          className="absolute inset-0 w-full h-full object-cover opacity-50"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="https://videos.pexels.com/video-files/3571264/3571264-hd_1920_1080_30fps.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(44,36,24,0.4)] to-[rgba(26,26,26,0.7)]" />
        <div className="relative z-10 text-center max-w-[800px] px-6">
          <Image
            src="/portago-logo-transparent.png"
            alt="Portago"
            width={360}
            height={180}
            className="h-[140px] md:h-[180px] w-auto mx-auto mb-7"
            priority
          />
          <div className="inline-block text-xs font-semibold tracking-[3px] uppercase text-[var(--gold)] mb-6 px-5 py-2 border border-[rgba(201,169,110,0.4)] rounded-full">
            Your Guide to Mallorca Living
          </div>
          <HeroRotator />
          <p className="text-lg text-[rgba(255,255,255,0.75)] leading-relaxed max-w-[560px] mx-auto mb-10 font-light">
            The definitive directory for discerning residents and visitors. Curated restaurants,
            trusted services, beautiful spaces — all in one place.
          </p>
          <SearchBar variant="hero" />
          <div className="mt-8 flex gap-4 justify-center flex-wrap text-[13px] text-[rgba(255,255,255,0.55)]">
            <Link href="/category/restaurants" className="hover:text-[var(--gold)] transition-colors">Restaurants</Link>
            <span>·</span>
            <Link href="/category/architecture" className="hover:text-[var(--gold)] transition-colors">Architecture</Link>
            <span>·</span>
            <Link href="/category/wellness" className="hover:text-[var(--gold)] transition-colors">Wellness</Link>
            <span>·</span>
            <Link href="/category/property" className="hover:text-[var(--gold)] transition-colors">Property</Link>
            <span>·</span>
            <Link href="/category/schools" className="hover:text-[var(--gold)] transition-colors">Schools</Link>
          </div>
        </div>
      </section>

      {/* Categories — image cards */}
      <section className="bg-[var(--cream)] py-24 px-5 md:px-10">
        <div className="text-center mb-14">
          <div className="section-tag">Explore by Category</div>
          <h2 className="section-title">
            Everything Mallorca,<br />beautifully curated
          </h2>
          <p className="section-sub mx-auto">
            From sunset restaurants to world-class architects — discover the island&apos;s finest,
            vetted and reviewed by locals who know.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1200px] mx-auto">
          {(categories as Category[])?.map((cat) => (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              className="group relative h-[360px] rounded-[var(--radius)] overflow-hidden cursor-pointer"
            >
              {/* Background image */}
              {categoryImages[cat.slug] ? (
                <Image
                  src={categoryImages[cat.slug]}
                  alt={cat.name}
                  fill
                  className="object-cover group-hover:scale-[1.06] transition-transform duration-[600ms]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--warm-dark)] to-[var(--dark)]" />
              )}
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(26,26,26,0.85)] via-transparent to-transparent z-10" />
              {/* Icon centered */}
              <div className="absolute inset-0 flex items-center justify-center z-[5] opacity-30 group-hover:opacity-40 transition-opacity">
                <CategoryIcon slug={cat.slug} size={80} className="text-[var(--gold)]" />
              </div>
              {/* Info */}
              <div className="absolute bottom-0 left-0 right-0 p-7 z-20">
                <h3 className="font-[family-name:var(--font-playfair)] text-2xl font-semibold text-white mb-1">
                  {cat.name}
                </h3>
                {cat.description && (
                  <p className="text-sm text-[rgba(255,255,255,0.7)] font-light">{cat.description}</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured listings */}
      <section className="bg-[var(--warm-white)] py-24 px-5 md:px-10">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <div className="section-tag">Editor&apos;s Picks</div>
              <h2 className="section-title">Featured this week</h2>
            </div>
            <Link
              href="/search"
              className="hidden md:flex items-center gap-1.5 text-sm font-medium text-[var(--gold)] tracking-[0.5px] uppercase hover:text-[var(--terracotta)] transition-colors"
            >
              View all <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
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

      {/* Lifestyle banner */}
      <section className="bg-[var(--warm-dark)] grid grid-cols-1 md:grid-cols-2 min-h-[500px] overflow-hidden">
        <div className="p-12 md:p-16 flex flex-col justify-center">
          <div className="section-tag">Why Mallorca</div>
          <h2 className="section-title !text-white">
            300 days of sunshine.<br />A lifetime of stories.
          </h2>
          <p className="section-sub !text-[rgba(255,255,255,0.65)]">
            Mallorca isn&apos;t just a destination — it&apos;s a way of living. World-class dining,
            ancient culture, mountain trails, crystal coves, and a community of people who chose the good life.
          </p>
          <div className="grid grid-cols-3 gap-6 mt-10">
            {[
              { num: "300+", label: "Sunny days a year" },
              { num: "18°C", label: "Average temperature" },
              { num: "262", label: "Beaches to explore" },
            ].map((s) => (
              <div key={s.num}>
                <h4 className="font-[family-name:var(--font-playfair)] text-4xl text-[var(--gold)] font-semibold">
                  {s.num}
                </h4>
                <p className="text-[13px] text-[rgba(255,255,255,0.5)] mt-1 tracking-[0.5px]">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div
          className="hidden md:block bg-cover bg-center min-h-[300px]"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1599533078316-657de79ea89f?w=960&q=80')",
          }}
        />
      </section>

      {/* How Portago Works */}
      <section className="bg-[var(--cream)] py-24 px-5 md:px-10">
        <div className="text-center mb-16">
          <div className="section-tag">Simple & Elegant</div>
          <h2 className="section-title">How Portago Works</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-12 max-w-[900px] mx-auto text-center">
          {[
            { icon: Search, title: "Discover", desc: "Browse curated categories or search for exactly what you need across the island." },
            { icon: Star, title: "Compare", desc: "Read verified reviews, check ratings, and find the best match for your taste." },
            { icon: Heart, title: "Enjoy", desc: "Save your favourites, share with friends, and experience the best of Mallorca." },
          ].map((step) => (
            <div key={step.title} className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-[var(--sand)] flex items-center justify-center mb-6">
                <step.icon size={32} className="text-[var(--gold)]" />
              </div>
              <h3 className="font-[family-name:var(--font-playfair)] text-xl font-semibold text-[var(--warm-dark)] mb-3">
                {step.title}
              </h3>
              <p className="text-sm text-[var(--text-light)] font-light leading-relaxed max-w-[260px]">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Area guides */}
      {areas && areas.length > 0 && (
        <section className="bg-[var(--cream)] py-24 px-5 md:px-10 overflow-hidden">
          <div className="text-center mb-14">
            <div className="section-tag">Area Guides</div>
            <h2 className="section-title">
              Find your corner<br />of the island
            </h2>
            <p className="section-sub mx-auto">
              From Palma&apos;s vibrant old town to the dramatic Serra de Tramuntana — every area tells its own story.
            </p>
          </div>
          <div className="flex gap-5 overflow-x-auto max-w-[1200px] mx-auto pb-5 scrollbar-hide"
               style={{ scrollbarWidth: "none" }}>
            {(areas as Area[]).map((area) => (
              <Link
                key={area.id}
                href={`/area/${area.slug}`}
                className="group relative min-w-[240px] h-[320px] rounded-[var(--radius)] overflow-hidden flex-shrink-0"
              >
                <Image
                  src={areaImages[area.slug] || "https://images.unsplash.com/photo-1599533078316-657de79ea89f?w=600&q=80"}
                  alt={area.name}
                  fill
                  className="object-cover group-hover:scale-[1.06] transition-transform duration-[600ms]"
                  sizes="240px"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/75 to-transparent">
                  <h4 className="font-[family-name:var(--font-playfair)] text-xl text-white font-semibold">
                    {area.name}
                  </h4>
                  {area.description && (
                    <span className="text-xs text-[rgba(255,255,255,0.6)] font-light">
                      {area.description}
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
