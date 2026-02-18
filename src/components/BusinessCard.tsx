import Link from "next/link";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { Rating } from "./Rating";
import type { Business } from "@/lib/types";

export function BusinessCard({
  business,
  areaName,
  photoUrl,
}: {
  business: Business;
  areaName?: string | null;
  photoUrl?: string | null;
}) {
  const imgSrc = photoUrl || business.photos?.[0] || null;

  return (
    <Link
      href={`/listing/${business.slug}`}
      className="group bg-white rounded-[var(--radius)] overflow-hidden border border-[rgba(201,169,110,0.1)] shadow-[0_2px_20px_rgba(44,36,24,0.06)] hover:shadow-[0_12px_40px_rgba(44,36,24,0.12)] hover:-translate-y-1 transition-all duration-400"
    >
      <div className="relative h-[220px] overflow-hidden">
        {imgSrc ? (
          <Image
            src={imgSrc}
            alt={business.name}
            fill
            className="object-cover group-hover:scale-[1.06] transition-transform duration-[600ms]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-[var(--sand)]">
            <span className="text-5xl font-[family-name:var(--font-playfair)] text-[var(--text-light)]">
              {business.name.charAt(0)}
            </span>
          </div>
        )}
        {business.rating && business.rating >= 4.5 && (
          <span className="absolute top-4 left-4 bg-[var(--gold)] text-white text-[11px] font-semibold tracking-[1px] uppercase px-3 py-1 rounded-full">
            Featured
          </span>
        )}
      </div>
      <div className="p-6">
        <h3 className="font-[family-name:var(--font-playfair)] text-xl font-semibold text-[var(--warm-dark)] mb-2 line-clamp-1">
          {business.name}
        </h3>
        <div className="flex items-center gap-4 mb-3 text-[13px] text-[var(--text-light)]">
          {areaName && (
            <span className="flex items-center gap-1">
              <MapPin size={13} className="text-[var(--gold)]" />
              {areaName}
            </span>
          )}
          <Rating rating={business.rating} reviewCount={business.review_count} />
        </div>
        {business.description && (
          <p className="text-sm text-[var(--text-light)] leading-relaxed font-light line-clamp-2 mb-4">
            {business.description}
          </p>
        )}
        {business.tags && business.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {business.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-medium px-3 py-1 rounded-full bg-[var(--sand)] text-[var(--text)] tracking-[0.3px]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
