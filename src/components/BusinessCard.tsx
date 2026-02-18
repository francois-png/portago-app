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
  const imgSrc =
    photoUrl || business.photos?.[0] || null;

  return (
    <Link
      href={`/listing/${business.slug}`}
      className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="relative aspect-[4/3] bg-gray-100">
        {imgSrc ? (
          <Image
            src={imgSrc}
            alt={business.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-300">
            <span className="text-5xl font-[family-name:var(--font-playfair)]">
              {business.name.charAt(0)}
            </span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-[family-name:var(--font-playfair)] text-lg font-semibold text-[var(--dark)] group-hover:text-[var(--gold)] transition-colors line-clamp-1">
          {business.name}
        </h3>
        {areaName && (
          <div className="flex items-center gap-1 mt-1 text-sm text-[var(--text-light)]">
            <MapPin size={13} className="text-[var(--gold)]" />
            {areaName}
          </div>
        )}
        <div className="mt-2">
          <Rating rating={business.rating} reviewCount={business.review_count} />
        </div>
        {business.description && (
          <p className="mt-2 text-sm text-[var(--text-light)] line-clamp-2">
            {business.description}
          </p>
        )}
        {business.tags && business.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {business.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-xs bg-[var(--cream)] text-[var(--text-light)] px-2 py-0.5 rounded-full"
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
