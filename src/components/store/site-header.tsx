import { Link } from "@tanstack/react-router";
import { Menu, Search, ShoppingBag, User, X, ChevronDown } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useCart } from "./cart-context";
import { productImages } from "@/lib/products";

const nav = [
  {
    label: "Chairs",
    to: "/shop",
    search: { category: "Chairs" as const },
    columns: [
      {
        title: "Shop chairs",
        links: ["Task chairs", "Executive", "Stools", "Guest seating"],
      },
      { title: "By need", links: ["All-day support", "Small spaces", "Under $500", "Bestsellers"] },
    ],
    image: productImages.chair,
  },
  {
    label: "Desks",
    to: "/shop",
    search: { category: "Desks" as const },
    columns: [
      { title: "Shop desks", links: ["Standing desks", "Fixed height", "Compact", "Corner"] },
      { title: "By need", links: ["Dual monitor", "Apartment friendly", "Solid wood", "New arrivals"] },
    ],
    image: productImages.desk,
  },
  {
    label: "Accessories",
    to: "/shop",
    search: { category: "Accessories" as const },
    columns: [
      { title: "Desktop", links: ["Desk mats", "Monitor risers", "Cable trays", "Lighting"] },
      { title: "Comfort", links: ["Footrests", "Lumbar", "Anti-fatigue mats", "Gift cards"] },
    ],
    image: productImages.accessory,
  },
];

const suggestions = ["Aster task chair", "Standing desk 60 inch", "Desk mat sage", "Under $500"];

export function SiteHeader() {
  const { count, setOpen } = useCart();
  const [promo, setPromo] = useState(true);
  const [search, setSearch] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50">
      {promo && (
        <div className="relative bg-surface text-surface-foreground">
          <p className="container-page py-2 text-center text-xs tracking-wide text-muted-foreground">
            Free shipping on orders over $1,200 · 100-day trial on every chair
          </p>
          <button
            onClick={() => setPromo(false)}
            aria-label="Dismiss announcement"
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted-foreground transition-colors hover:text-foreground"
          >
            <X width={14} height={14} />
          </button>
        </div>
      )}

      <div className="border-b border-border bg-background/90 backdrop-blur-md">
        <div className="container-page grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 py-3.5 md:py-4">
          <div className="flex min-w-0 items-center gap-6">
            <button
              className="-ml-1 rounded-md p-1.5 md:hidden"
              onClick={() => setMobile((v) => !v)}
              aria-label="Open menu"
            >
              {mobile ? <Menu width={20} height={20} /> : <Menu width={20} height={20} />}
            </button>
            <Link to="/" className="font-display text-xl font-semibold tracking-tight">
              norden
            </Link>
            <nav className="hidden items-center gap-1 md:flex">
              {nav.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setOpenMenu(item.label)}
                  onMouseLeave={() => setOpenMenu(null)}
                >
                  <Link
                    to={item.to}
                    search={item.search}
                    className="inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm text-foreground/80 transition-colors duration-200 hover:text-foreground"
                  >
                    {item.label}
                    <ChevronDown width={13} height={13} className="text-muted-foreground" />
                  </Link>
                  {openMenu === item.label && (
                    <div className="absolute left-0 top-full w-[34rem] pt-2">
                      <div className="grid grid-cols-[minmax(0,1fr)_9rem] gap-6 rounded-xl border border-border bg-popover p-6 shadow-lift">
                        <div className="grid grid-cols-2 gap-6">
                          {item.columns.map((col) => (
                            <div key={col.title}>
                              <p className="eyebrow">{col.title}</p>
                              <ul className="mt-3 space-y-2">
                                {col.links.map((l) => (
                                  <li key={l}>
                                    <Link
                                      to={item.to}
                                      search={item.search}
                                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                                    >
                                      {l}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                        <Link to={item.to} search={item.search} className="group block">
                          <img
                            src={item.image}
                            alt={item.label}
                            loading="lazy"
                            className="aspect-square w-full rounded-lg bg-surface object-cover"
                          />
                          <p className="mt-2 text-xs text-muted-foreground group-hover:text-primary">
                            Shop all {item.label.toLowerCase()}
                          </p>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              <Link
                to="/shop"
                className="rounded-md px-3 py-2 text-sm text-foreground/80 transition-colors hover:text-foreground"
              >
                Shop all
              </Link>
            </nav>
          </div>

          <div />

          <div className="flex items-center gap-1">
            <button
              onClick={() => setSearch((v) => !v)}
              aria-label="Search"
              className="rounded-md p-2 text-foreground/80 transition-colors hover:bg-surface hover:text-foreground"
            >
              <Search width={18} height={18} />
            </button>
            <button
              aria-label="Account"
              className="hidden rounded-md p-2 text-foreground/80 transition-colors hover:bg-surface hover:text-foreground sm:inline-flex"
            >
              <User width={18} height={18} />
            </button>
            <button
              onClick={() => setOpen(true)}
              aria-label="Open cart"
              className="relative rounded-md p-2 text-foreground/80 transition-colors hover:bg-surface hover:text-foreground"
            >
              <ShoppingBag width={18} height={18} />
              {count > 0 && (
                <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-primary px-1 text-[10px] font-semibold text-primary-foreground">
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>

        {search && (
          <div className="border-t border-border bg-popover">
            <div className="container-page py-5">
              <div className="flex items-center gap-3 rounded-lg border border-input bg-background px-3.5 py-2.5 focus-within:ring-2 focus-within:ring-ring/40">
                <Search width={16} height={16} className="shrink-0 text-muted-foreground" />
                <input
                  autoFocus
                  placeholder="Search chairs, desks, accessories"
                  className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                />
                <button onClick={() => setSearch(false)} aria-label="Close search">
                  <X width={16} height={16} className="text-muted-foreground" />
                </button>
              </div>
              <p className="eyebrow mt-5">Suggested</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    className="rounded-full bg-surface px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {mobile && (
          <div className="border-t border-border bg-popover md:hidden">
            <div className="container-page py-3">
              {nav.map((item) => (
                <div key={item.label} className="border-b border-border/70 last:border-0">
                  <button
                    onClick={() => setOpenAccordion((v) => (v === item.label ? null : item.label))}
                    className="flex w-full items-center justify-between py-3.5 text-sm"
                  >
                    {item.label}
                    <ChevronDown
                      width={15}
                      height={15}
                      className={cn(
                        "text-muted-foreground transition-transform duration-200",
                        openAccordion === item.label && "rotate-180",
                      )}
                    />
                  </button>
                  {openAccordion === item.label && (
                    <ul className="grid grid-cols-2 gap-2 pb-4">
                      {item.columns.flatMap((c) => c.links).map((l) => (
                        <li key={l}>
                          <Link
                            to={item.to}
                            search={item.search}
                            onClick={() => setMobile(false)}
                            className="text-sm text-muted-foreground"
                          >
                            {l}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
              <Button asChild className="mt-4 w-full">
                <Link to="/shop" onClick={() => setMobile(false)}>
                  Shop all
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
