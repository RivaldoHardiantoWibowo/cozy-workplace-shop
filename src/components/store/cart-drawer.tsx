import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { useCart } from "./cart-context";
import { FREE_SHIPPING_THRESHOLD, money, products } from "@/lib/products";

export function CartDrawer() {
  const { open, setOpen, lines, setQty, remove, subtotal } = useCart();
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const recos = products.filter((p) => !lines.some((l) => l.slug === p.slug)).slice(0, 3);

  return (
    <>
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-60 bg-foreground/25 transition-opacity duration-200 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden
      />
      <aside
        aria-label="Cart"
        className={`fixed right-0 top-0 z-70 flex h-dvh w-full max-w-[26rem] flex-col bg-background shadow-lift transition-transform duration-250 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="text-lg font-semibold">Your Cart</h2>
          <button onClick={() => setOpen(false)} aria-label="Close cart" className="rounded-md p-1.5">
            <X width={18} height={18} />
          </button>
        </div>

        <div className="border-b border-border px-5 py-4">
          <div className="h-1 w-full overflow-hidden rounded-full bg-surface">
            <div
              className="h-full rounded-full bg-primary transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            {remaining > 0
              ? `You're ${money(remaining)} away from free shipping.`
              : "Nice — free shipping unlocked."}
          </p>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
            <div className="grid size-14 place-items-center rounded-full bg-surface">
              <ShoppingBag width={22} height={22} className="text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">
              Nothing here yet. Let's find the chair you'll keep for a decade.
            </p>
            <Button asChild onClick={() => setOpen(false)}>
              <Link to="/shop">Start Shopping</Link>
            </Button>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto">
            <ul className="divide-y divide-border px-5">
              {lines.map((l) => (
                <li key={l.id} className="flex gap-4 py-4">
                  <img
                    src={l.image}
                    alt={l.name}
                    loading="lazy"
                    className="size-20 shrink-0 rounded-lg bg-surface object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="truncate text-sm font-medium">{l.name}</p>
                      <button onClick={() => remove(l.id)} aria-label="Remove item">
                        <Trash2 width={14} height={14} className="text-muted-foreground" />
                      </button>
                    </div>
                    <p className="text-xs text-muted-foreground">{l.variant}</p>
                    <div className="mt-2.5 flex items-center justify-between">
                      <div className="inline-flex items-center rounded-md border border-input">
                        <button
                          onClick={() => setQty(l.id, l.qty - 1)}
                          aria-label="Decrease quantity"
                          className="px-2 py-1.5"
                        >
                          <Minus width={12} height={12} />
                        </button>
                        <span className="min-w-6 text-center text-sm">{l.qty}</span>
                        <button
                          onClick={() => setQty(l.id, l.qty + 1)}
                          aria-label="Increase quantity"
                          className="px-2 py-1.5"
                        >
                          <Plus width={12} height={12} />
                        </button>
                      </div>
                      <span className="text-sm font-semibold">{money(l.price * l.qty)}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="border-t border-border px-5 py-5">
              <p className="eyebrow">Pairs well with</p>
              <div className="-mx-5 mt-3 flex gap-3 overflow-x-auto px-5 pb-1">
                {recos.map((p) => (
                  <Link
                    key={p.slug}
                    to="/product/$slug"
                    params={{ slug: p.slug }}
                    onClick={() => setOpen(false)}
                    className="w-28 shrink-0"
                  >
                    <img
                      src={p.image}
                      alt={p.name}
                      loading="lazy"
                      className="aspect-square w-full rounded-lg bg-surface object-cover"
                    />
                    <p className="mt-1.5 truncate text-xs">{p.name}</p>
                    <p className="text-xs font-semibold">{money(p.price)}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {lines.length > 0 && (
          <div className="border-t border-border bg-background px-5 py-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="text-base font-semibold">{money(subtotal)}</span>
            </div>
            <Button className="mt-3 w-full" size="lg">
              Checkout
            </Button>
            <p className="mt-2 text-center text-xs text-muted-foreground">
              Taxes and shipping calculated at checkout
            </p>
          </div>
        )}
      </aside>
    </>
  );
}
