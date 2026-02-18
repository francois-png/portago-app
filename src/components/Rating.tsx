import { Star } from "lucide-react";

export function Rating({
  rating,
  reviewCount,
}: {
  rating: number | null;
  reviewCount?: number | null;
}) {
  if (!rating) return null;
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            size={14}
            className={
              i <= Math.round(rating)
                ? "fill-[var(--gold)] text-[var(--gold)]"
                : "text-gray-300"
            }
          />
        ))}
      </div>
      <span className="text-sm text-[var(--text-light)]">
        {rating.toFixed(1)}
        {reviewCount != null && ` (${reviewCount})`}
      </span>
    </div>
  );
}
