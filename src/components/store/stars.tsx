import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function Stars({
  rating,
  reviews,
  className,
  size = 13,
}: {
  rating: number;
  reviews?: number;
  className?: string;
  size?: number;
}) {
  return (
    <span className={cn("inline-flex items-center gap-1.5", className)}>
      <span className="inline-flex items-center gap-0.5" aria-hidden>
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            width={size}
            height={size}
            strokeWidth={1.5}
            className={cn(
              i <= Math.round(rating) ? "fill-primary text-primary" : "text-muted-foreground/50",
            )}
          />
        ))}
      </span>
      <span className="text-xs text-muted-foreground">
        {rating.toFixed(1)}
        {reviews !== undefined && <> ({reviews})</>}
      </span>
      <span className="sr-only">
        {rating} out of 5 stars{reviews !== undefined ? `, ${reviews} reviews` : ""}
      </span>
    </span>
  );
}
