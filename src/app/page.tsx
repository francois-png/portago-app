import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { HeroRotator } from "@/components/HeroRotator";
import { SearchBar } from "@/components/SearchBar";
import { BusinessCard } from "@/components/BusinessCard";
import { AIConciergeChat } from "@/components/AIConciergeChat";
import type { Business, Category, Area } from "@/lib/types";

/* ── Exact image URLs from static site ── */
const categoryImageMap: Record<string, string> = {
  restaurants:   "https://images.unsplash.com/photo-1519067438913-7aab3bff2281?w=600&q=80",
  property:      "https://images.unsplash.com/photo-1602361427267-c5395584b411?w=600&q=80",
  wellness:      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=600&q=80",
  architecture:  "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&q=80",
  marinas:       "https://images.unsplash.com/photo-1752913552418-4465bd6996e2?w=600&q=80",
  schools:       "https://images.unsplash.com/photo-1414432667065-fbbcad756703?w=600&q=80",
  shopping:      "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=80",
  transport:     "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&q=80",
};

const categoryDescMap: Record<string, string> = {
  restaurants:   "Fine dining to hidden chiringuitos",
  property:      "Agents, developers & interior design",
  wellness:      "Spas, clinics, yoga & fitness",
  architecture:  "Studios shaping the island's skyline",
  marinas:       "Charters, moorings & yacht services",
  schools:       "International schools & academies",
  shopping:      "Boutiques, markets & luxury brands",
  transport:     "Car hire, transfers & getting around",
};

const categoryCountMap: Record<string, string> = {
  restaurants:  "240+ listings",
  property:     "180+ listings",
  wellness:     "120+ listings",
  architecture: "90+ listings",
  marinas:      "65+ listings",
  schools:      "45+ listings",
  shopping:     "110+ listings",
  transport:    "75+ listings",
};

const areaImageMap: Record<string, { img: string; subtitle: string }> = {
  palma:    { img: "https://images.unsplash.com/photo-1629537744044-04a035cbf675?w=480&q=80", subtitle: "The cosmopolitan heart" },
  deia:     { img: "https://images.unsplash.com/photo-1631724813552-aee57e1d97cf?w=480&q=80", subtitle: "Artists' mountain village" },
  soller:   { img: "https://images.unsplash.com/photo-1629301057724-536804f557f9?w=480&q=80", subtitle: "Valley of oranges" },
  pollenca: { img: "https://images.unsplash.com/photo-1602085337677-2bd838a4f880?w=480&q=80", subtitle: "Northern charm" },
  alaro:    { img: "https://images.unsplash.com/photo-1623690105020-9ece96a71ff5?w=480&q=80", subtitle: "Mountain village life" },
  santanyi: { img: "https://images.unsplash.com/photo-1708165089726-a40d71cba16c?w=480&q=80", subtitle: "Golden stone, crystal waters" },
};

const blogPosts = [
  {
    img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
    tag: "Architecture & Design",
    title: "The Architects Redefining Mallorca's Skyline",
    desc: "How a new generation of studios is blending Mediterranean tradition with contemporary vision.",
    large: true,
  },
  {
    img: "https://images.unsplash.com/photo-1602361427267-c5395584b411?w=600&q=80",
    tag: "Property",
    title: "Foreign Buyer's Guide to Mallorca 2026",
    desc: "Everything you need to know about purchasing property on the island.",
  },
  {
    img: "https://images.unsplash.com/photo-1519067438913-7aab3bff2281?w=600&q=80",
    tag: "Dining",
    title: "10 Hidden Restaurants Only Locals Know",
    desc: "Skip the tourist traps — these are the places Mallorcans actually eat.",
  },
  {
    img: "https://images.unsplash.com/photo-1414432667065-fbbcad756703?w=600&q=80",
    tag: "Education",
    title: "International Schools Compared: The 2026 Guide",
    desc: "Fees, curricula, languages and what parents really think.",
  },
];

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
      {/* ═══════ HERO ═══════ */}
      <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[var(--warm-dark)] to-[var(--dark)]">
        <video
          className="absolute inset-0 w-full h-full object-cover opacity-50"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/portago-hero-bg.mp4" type="video/mp4" />
          <source src="https://videos.pexels.com/video-files/3571264/3571264-hd_1920_1080_30fps.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(44,36,24,0.4)] to-[rgba(26,26,26,0.7)]" />
        <div className="relative z-10 text-center max-w-[800px] px-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/portago-logo-transparent.png"
            alt="Portago"
            className="h-[180px] mx-auto mb-7 block"
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
            <span>·</span>
            <Link href="/category/marinas" className="hover:text-[var(--gold)] transition-colors">Marinas</Link>
          </div>
        </div>
      </section>

      {/* ═══════ CATEGORIES ═══════ */}
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
          {(categories as Category[])?.map((cat) => {
            const imgUrl = categoryImageMap[cat.slug];
            const desc = categoryDescMap[cat.slug] || cat.description;
            const count = categoryCountMap[cat.slug];
            return (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                className="group relative h-[360px] rounded-[var(--radius)] overflow-hidden cursor-pointer block"
              >
                {imgUrl ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={imgUrl}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-[1.08] transition-transform duration-[600ms]"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--warm-dark)] to-[var(--dark)]" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(26,26,26,0.85)] via-transparent to-transparent flex flex-col justify-end p-7">
                  <h3 className="font-[family-name:var(--font-playfair)] text-2xl font-semibold text-white mb-1.5">
                    {cat.name}
                  </h3>
                  {desc && (
                    <p className="text-sm text-[rgba(255,255,255,0.7)] font-light">{desc}</p>
                  )}
                </div>
                {count && (
                  <span className="absolute top-5 right-5 bg-[rgba(255,255,255,0.15)] backdrop-blur-[10px] px-3.5 py-1.5 rounded-full text-xs text-white font-medium tracking-[0.5px]">
                    {count}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </section>

      {/* ═══════ FEATURED LISTINGS ═══════ */}
      <section className="bg-[var(--warm-white)] py-24 px-5 md:px-10">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="section-tag">Editor&apos;s Picks</div>
              <h2 className="section-title">Featured this week</h2>
            </div>
            <Link
              href="/search"
              className="flex items-center gap-1.5 text-sm font-medium text-[var(--gold)] tracking-[0.5px] uppercase hover:text-[var(--terracotta)] transition-colors"
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

      {/* ═══════ LIFESTYLE BANNER ═══════ */}
      <section className="bg-[var(--warm-dark)] grid grid-cols-1 md:grid-cols-2 min-h-[500px] overflow-hidden">
        <div className="p-12 md:py-20 md:px-[60px] flex flex-col justify-center">
          <div className="section-tag !text-[var(--gold)]">Why Mallorca</div>
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

      {/* ═══════ AREA GUIDES ═══════ */}
      <section className="bg-[var(--cream)] py-24 px-5 md:px-10 overflow-hidden relative">
        <video
          className="absolute inset-0 w-full h-[150%] -top-[10%] object-cover object-bottom opacity-50 z-0"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/portago-tramuntana-bg.mp4" type="video/mp4" />
        </video>
        <div className="relative z-[1]">
          <div className="text-center mb-14">
            <div className="section-tag">Area Guides</div>
            <h2 className="section-title">
              Find your corner<br />of the island
            </h2>
            <p className="section-sub mx-auto">
              From Palma&apos;s vibrant old town to the dramatic Serra de Tramuntana — every area tells its own story.
            </p>
          </div>
          <div
            className="flex gap-5 overflow-x-auto max-w-[1200px] mx-auto pb-5 scrollbar-hide"
            style={{ scrollbarWidth: "none" }}
          >
            {(areas as Area[])?.map((area) => {
              const mapped = areaImageMap[area.slug];
              const imgUrl = mapped?.img || "https://images.unsplash.com/photo-1599533078316-657de79ea89f?w=480&q=80";
              const subtitle = mapped?.subtitle || area.description;
              return (
                <Link
                  key={area.id}
                  href={`/area/${area.slug}`}
                  className="group relative min-w-[240px] h-[320px] rounded-[var(--radius)] overflow-hidden flex-shrink-0 block"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imgUrl}
                    alt={area.name}
                    className="w-full h-full object-cover group-hover:scale-[1.08] transition-transform duration-[600ms]"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/75 to-transparent">
                    <h4 className="font-[family-name:var(--font-playfair)] text-xl text-white font-semibold">
                      {area.name}
                    </h4>
                    {subtitle && (
                      <span className="text-xs text-[rgba(255,255,255,0.6)] font-light">
                        {subtitle}
                      </span>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════ AI CONCIERGE ═══════ */}
      <section className="relative overflow-hidden px-5 md:px-10 py-10 pb-20 bg-[#0A0F1C]">
        <video
          className="absolute inset-0 w-full h-full object-cover opacity-100"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/portago-hero-bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-br from-[rgba(10,15,28,0.3)] via-[rgba(10,15,28,0.2)] to-[rgba(10,15,28,0.3)] z-[1]" />
        <div className="relative z-[2] max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-[60px] items-center">
          <div>
            <div className="section-tag">Introducing</div>
            <h2 className="section-title !text-white">
              Your personal<br />Mallorca concierge
            </h2>
            <p className="section-sub !text-[rgba(255,255,255,0.7)]">
              Meet your AI-powered island assistant. Ask anything about Mallorca — restaurant recommendations,
              school comparisons, area guides, property advice, event planning — and get instant, personalised
              answers from an AI that knows the island inside out.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-8">
              {[
                {
                  icon: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></svg>`,
                  title: "Restaurant Recommendations",
                  desc: '"Find me a romantic dinner spot in Deià with a terrace and sea views"',
                },
                {
                  icon: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
                  title: "Property & Area Advice",
                  desc: '"Compare Alaró vs Sóller for a family with young kids and a €800k budget"',
                },
                {
                  icon: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 6 3 6 3s3 0 6-3v-5"/></svg>`,
                  title: "School & Service Finder",
                  desc: '"Which international schools near Palma offer the IB programme?"',
                },
                {
                  icon: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>`,
                  title: "Event & Lifestyle Planning",
                  desc: '"Plan a weekend itinerary for guests visiting in March"',
                },
                {
                  icon: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="m3 17 2 2 4-4"/><path d="m3 7 2 2 4-4"/><path d="M13 6h8"/><path d="M13 12h8"/><path d="M13 18h8"/></svg>`,
                  title: "Legal & Admin Guidance",
                  desc: '"What do I need to register as a tax resident in Spain?"',
                },
                {
                  icon: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/></svg>`,
                  title: "Construction & Renovation",
                  desc: '"I want to renovate a finca — what permits do I need?"',
                },
              ].map((f) => (
                <div
                  key={f.title}
                  className="flex gap-3.5 items-start p-4 rounded-xl bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] hover:bg-[rgba(255,255,255,0.08)] hover:border-[rgba(201,169,110,0.3)] transition-all"
                >
                  <div
                    className="shrink-0 mt-0.5 w-7 h-7 text-[#C9A96E]"
                    dangerouslySetInnerHTML={{ __html: f.icon }}
                  />
                  <div>
                    <h4 className="text-sm font-semibold text-white mb-1">{f.title}</h4>
                    <p className="text-xs text-[rgba(255,255,255,0.45)] italic leading-relaxed">
                      {f.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-9 flex flex-col sm:flex-row gap-6 items-start sm:items-center">
              <Link
                href="/list-your-business"
                className="inline-block bg-gradient-to-br from-[var(--gold)] to-[var(--terracotta)] text-white px-8 py-3.5 rounded-full text-[15px] font-semibold tracking-[0.3px] hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(201,169,110,0.3)] transition-all no-underline"
              >
                Join the Waitlist →
              </Link>
              <Link
                href="/search"
                className="text-sm text-[var(--gold-light)] font-medium hover:text-white transition-colors no-underline"
              >
                Learn more about how it works
              </Link>
            </div>
          </div>
          <AIConciergeChat />
        </div>
      </section>

      {/* ═══════ BLOG / STORIES ═══════ */}
      <section className="bg-[var(--warm-white)] py-24 px-5 md:px-10">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="section-tag">From the Blog</div>
              <h2 className="section-title">Stories, guides &amp; insights</h2>
            </div>
            <Link
              href="/search"
              className="flex items-center gap-1.5 text-sm font-medium text-[var(--gold)] tracking-[0.5px] uppercase hover:text-[var(--terracotta)] transition-colors"
            >
              All articles <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {blogPosts.map((post, i) => (
              <div
                key={i}
                className={`relative rounded-[var(--radius)] overflow-hidden cursor-pointer ${
                  post.large ? "md:row-span-2 h-[320px] md:h-auto" : "h-[280px]"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.img}
                  alt={post.title}
                  className="w-full h-full object-cover hover:scale-[1.06] transition-transform duration-[600ms]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(26,26,26,0.9)] via-transparent to-transparent flex flex-col justify-end p-7">
                  <span className="text-[11px] font-semibold tracking-[1.5px] uppercase text-[var(--gold)] mb-2.5">
                    {post.tag}
                  </span>
                  <h3
                    className={`font-[family-name:var(--font-playfair)] font-semibold text-white leading-[1.3] mb-2 ${
                      post.large ? "text-[28px]" : "text-[22px]"
                    }`}
                  >
                    {post.title}
                  </h3>
                  <p className="text-sm text-[rgba(255,255,255,0.65)] font-light leading-relaxed">
                    {post.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
