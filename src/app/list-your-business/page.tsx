import { ListBusinessForm } from "./form";
import { CheckCircle, Users, TrendingUp, Globe } from "lucide-react";

export default function ListYourBusiness() {
  return (
    <>
      <section className="bg-[var(--dark)] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold font-[family-name:var(--font-playfair)] mb-4">
            List Your Business on{" "}
            <span className="text-[var(--gold)]">Portago</span>
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Join Mallorca&apos;s premier lifestyle directory and connect with discerning visitors
            and locals looking for the best the island has to offer.
          </p>
        </div>
      </section>

      {/* Value Props */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-10">
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
              <div className="w-14 h-14 rounded-full bg-[var(--cream)] flex items-center justify-center mx-auto mb-4">
                <item.icon size={24} className="text-[var(--gold)]" />
              </div>
              <h3 className="text-lg font-semibold font-[family-name:var(--font-playfair)] text-[var(--dark)] mb-2">
                {item.title}
              </h3>
              <p className="text-[var(--text-light)] text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Form */}
      <section className="bg-white py-16">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl font-bold font-[family-name:var(--font-playfair)] text-[var(--dark)] mb-2 text-center">
            Get Started
          </h2>
          <p className="text-[var(--text-light)] text-center mb-8">
            Fill in the details below and our team will be in touch.
          </p>
          <ListBusinessForm />
        </div>
      </section>

      {/* Checklist */}
      <section className="max-w-3xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold font-[family-name:var(--font-playfair)] text-[var(--dark)] mb-6 text-center">
          What You Get
        </h2>
        <div className="space-y-3">
          {[
            "Dedicated listing page with photos and details",
            "Appear in category and area search results",
            "Customer reviews and ratings",
            "Map integration for easy discovery",
            "Mobile-optimised experience",
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <CheckCircle size={18} className="text-[var(--gold)] shrink-0" />
              <span className="text-[var(--text)]">{item}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
