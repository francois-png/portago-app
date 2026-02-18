import { ListBusinessForm } from "./form";
import { CheckCircle, Users, TrendingUp, Globe } from "lucide-react";

export default function ListYourBusiness() {
  return (
    <>
      <section className="relative bg-gradient-to-br from-[var(--warm-dark)] to-[var(--dark)] text-white pt-32 pb-20 px-5 md:px-10">
        <div className="max-w-[1200px] mx-auto text-center">
          <div className="section-tag">Join Portago</div>
          <h1 className="font-[family-name:var(--font-playfair)] text-3xl md:text-5xl font-semibold mb-4 text-white">
            List Your Business on{" "}
            <span className="text-[var(--gold)]">Portago</span>
          </h1>
          <p className="text-[rgba(255,255,255,0.7)] max-w-2xl mx-auto text-lg font-light">
            Join Mallorca&apos;s premier lifestyle directory and connect with discerning visitors
            and locals looking for the best the island has to offer.
          </p>
        </div>
      </section>

      {/* Value Props */}
      <section className="max-w-[1200px] mx-auto px-5 md:px-10 py-20">
        <div className="grid md:grid-cols-3 gap-12">
          {[
            {
              icon: Users,
              title: "Reach New Customers",
              desc: "Get discovered by visitors and residents actively searching for quality experiences in Mallorca.",
            },
            {
              icon: TrendingUp,
              title: "Grow Your Presence",
              desc: "Showcase your business with photos, reviews, and detailed information in an elegant, curated setting.",
            },
            {
              icon: Globe,
              title: "Stand Out",
              desc: "Be part of a selective directory that highlights the best Mallorca has to offer.",
            },
          ].map((item, i) => (
            <div key={i} className="text-center">
              <div className="w-16 h-16 rounded-full bg-[var(--cream)] flex items-center justify-center mx-auto mb-5">
                <item.icon size={28} className="text-[var(--gold)]" />
              </div>
              <h3 className="font-[family-name:var(--font-playfair)] text-xl font-semibold text-[var(--warm-dark)] mb-2">
                {item.title}
              </h3>
              <p className="text-[var(--text-light)] text-sm leading-relaxed font-light">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Form */}
      <section className="bg-white py-20 px-5 md:px-10">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <div className="section-tag">Get Started</div>
            <h2 className="section-title">Tell us about your business</h2>
            <p className="section-sub mx-auto">
              Fill in the details below and our team will be in touch.
            </p>
          </div>
          <ListBusinessForm />
        </div>
      </section>

      {/* Checklist */}
      <section className="max-w-3xl mx-auto px-5 md:px-10 py-20">
        <div className="text-center mb-10">
          <div className="section-tag">Benefits</div>
          <h2 className="section-title">What You Get</h2>
        </div>
        <div className="space-y-4">
          {[
            "Dedicated listing page with photos and details",
            "Appear in category and area search results",
            "Customer reviews and ratings",
            "Map integration for easy discovery",
            "Mobile-optimised experience",
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-white border border-[rgba(201,169,110,0.1)]">
              <CheckCircle size={20} className="text-[var(--gold)] shrink-0" />
              <span className="text-[var(--text)] font-light">{item}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
