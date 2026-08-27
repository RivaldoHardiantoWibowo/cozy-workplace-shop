import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { money, type Product } from "@/lib/products";
import { Stars } from "./stars";
import { useCart } from "./cart-context";

const toneClass: Record<string, string> = {
  sage: "bg-sage text-sage-foreground",
  sand: "bg-sand text-sand-foreground",
  dusty: "bg-dusty text-dusty-foreground",
  sale: "bg-sale/12 text-sale",
};

export function ProductCard({ product }: { product: Product }) {
  const [variant, setVariant] = useState(product.swatches[0]!.name);
  const { add } = useCart();

  return (
    <article className="group relative">
      <Link
        to="/product/$slug"
        params={{ slug: product.slug }}
        className="block overflow-hidden rounded-xl bg-surface"
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={1024}
          height={1280}
          className="aspect-4/5 w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
        />
      </Link>

      {product.badge && (
        <span
          className={cn(
            "absolute left-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-medium",
            toneClass[product.badge.tone],
          )}
        >
          {product.badge.label}
        </span>
      )}

      <button
        onClick={() =>
          add({
            slug: product.slug,
            name: product.name,
            variant,
            price: product.price,
            image: product.image,
          })
        }
        className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-background/95 px-3 py-1.5 text-xs font-medium shadow-soft transition-all duration-200 hover:bg-background md:opacity-0 md:group-hover:opacity-100"
      >
        <Plus width={13} height={13} /> Quick add
      </button>

      <div className="mt-4">
        <div className="flex items-start justify-between gap-3">
          <Link to="/product/$slug" params={{ slug: product.slug }} className="min-w-0">
            <h3 className="truncate text-[15px] font-medium">{product.name}</h3>
          </Link>
          <div className="shrink-0 text-right">
            <span className="text-base font-semibold">{money(product.price)}</span>
            {product.compareAt && (
              <span className="ml-1.5 text-xs text-muted-foreground line-through">
                {money(product.compareAt)}
              </span>
            )}
          </div>
        </div>
        <div className="mt-1.5">
          <Stars rating={product.rating} reviews={product.reviews} />
        </div>
        <div className="mt-3 flex items-center gap-2">
          {product.swatches.map((s) => (
            <button
              key={s.name}
              onClick={() => !s.soldOut && setVariant(s.name)}
              aria-label={s.name}
              title={s.soldOut ? `${s.name} — sold out` : s.name}
              className={cn(
                "size-5 rounded-full border border-border/70 transition-all duration-200",
                variant === s.name && "ring-2 ring-primary ring-offset-2 ring-offset-background",
                s.soldOut && "cursor-not-allowed opacity-35",
              )}
              style={{ backgroundColor: s.color }}
            />
          ))}
          <span className="text-xs text-muted-foreground">{variant}</span>
        </div>
      </div>
    </article>
  );
}
