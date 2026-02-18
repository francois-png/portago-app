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
            size={13}
            className={
              i <= Math.round(rating)
                ? "fill-[var(--gold)] text-[var(--gold)]"
                : "text-[var(--sand)]"
            }
          />
        ))}
      </div>
      <span className="text-[13px] text-[var(--text-light)]">
        {rating.toFixed(1)}
        {reviewCount != null && ` (${reviewCount})`}
      </span>
    </div>
  );
}
