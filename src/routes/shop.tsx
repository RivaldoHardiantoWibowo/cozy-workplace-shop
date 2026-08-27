import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SlidersHorizontal, X, Plus } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ProductCard } from "@/components/store/product-card";
import { money, products } from "@/lib/products";

const searchSchema = z.object({
  category: z.enum(["Chairs", "Desks", "Accessories"]).optional(),
});

export const Route = createFileRoute("/shop")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Shop Chairs, Desks & Accessories | Norden" },
      {
        name: "description",
        content:
          "Browse the full Norden catalog: ergonomic task chairs, standing desks and desktop accessories. Filter by category, color and material.",
      },
      { property: "og:title", content: "Shop Chairs, Desks & Accessories | Norden" },
      {
        property: "og:description",
        content: "Filter the full Norden catalog by category, color and material.",
      },
    ],
  }),
  component: Shop,
});

const categories = ["Chairs", "Desks", "Accessories"] as const;
const colorFilters = [
  { name: "Terracotta", color: "oklch(0.6 0.13 38)" },
  { name: "Sage", color: "oklch(0.72 0.05 145)" },
  { name: "Charcoal", color: "oklch(0.32 0.01 60)" },
  { name: "Oak", color: "oklch(0.83 0.05 78)" },
];
const materials = ["Recycled wool blend", "FSC white oak veneer", "Merino felt + oak", "Oak frame, boucle seat"];

const sorts = ["Featured", "Price: low to high", "Price: high to low", "Top rated"] as const;

function Shop() {
  const { category } = Route.useSearch();
  const navigate = Route.useNavigate();
  const [colors, setColors] = useState<string[]>([]);
  const [mats, setMats] = useState<string[]>([]);
  const [sort, setSort] = useState<(typeof sorts)[number]>("Featured");
  const [drawer, setDrawer] = useState(false);

  const list = useMemo(() => {
    let out = products.filter((p) => (category ? p.category === category : true));
    if (colors.length) out = out.filter((p) => p.swatches.some((s) => colors.includes(s.name)));
    if (mats.length) out = out.filter((p) => mats.includes(p.material));
    if (sort === "Price: low to high") out = [...out].sort((a, b) => a.price - b.price);
    if (sort === "Price: high to low") out = [...out].sort((a, b) => b.price - a.price);
    if (sort === "Top rated") out = [...out].sort((a, b) => b.rating - a.rating);
    return out;
  }, [category, colors, mats, sort]);

  const toggle = (arr: string[], set: (v: string[]) => void, v: string) =>
    set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

  const compare = list.length > 1 ? list.slice(0, 4) : products.slice(0, 4);

  const filters = (
    <div className="space-y-8">
      <div>
        <p className="eyebrow">Category</p>
        <ul className="mt-3 space-y-2.5">
          <li>
            <button
              onClick={() => navigate({ search: {} })}
              className={`text-sm ${!category ? "font-medium text-primary" : "text-muted-foreground"}`}
            >
              All products
            </button>
          </li>
          {categories.map((c) => (
            <li key={c}>
              <button
                onClick={() => navigate({ search: { category: c } })}
                className={`text-sm ${
                  category === c ? "font-medium text-primary" : "text-muted-foreground"
                }`}
              >
                {c}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <p className="eyebrow">Color</p>
        <div className="mt-3 space-y-2.5">
          {colorFilters.map((c) => (
            <label key={c.name} className="flex cursor-pointer items-center gap-2.5 text-sm">
              <Checkbox
                checked={colors.includes(c.name)}
                onCheckedChange={() => toggle(colors, setColors, c.name)}
              />
              <span
                className="size-4 rounded-full border border-border"
                style={{ backgroundColor: c.color }}
              />
              <span className="text-muted-foreground">{c.name}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <p className="eyebrow">Material</p>
        <div className="mt-3 space-y-2.5">
          {materials.map((m) => (
            <label key={m} className="flex cursor-pointer items-start gap-2.5 text-sm">
              <Checkbox
                className="mt-0.5"
                checked={mats.includes(m)}
                onCheckedChange={() => toggle(mats, setMats, m)}
              />
              <span className="text-muted-foreground">{m}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="container-page py-10 md:py-14">
      <p className="eyebrow">{category ?? "All products"}</p>
      <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">
        {category ?? "The whole collection"}
      </h1>
      <p className="mt-3 max-w-md text-sm text-muted-foreground">
        Every piece ships free over $1,200 and comes with a 100-day trial.
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-[15rem_minmax(0,1fr)]">
        <aside className="hidden lg:block">{filters}</aside>

        <div>
          <div className="flex items-center justify-between gap-4 border-b border-border pb-4">
            <p className="text-sm text-muted-foreground">{list.length} products</p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="lg:hidden" onClick={() => setDrawer(true)}>
                <SlidersHorizontal width={14} height={14} /> Filters
              </Button>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as (typeof sorts)[number])}
                aria-label="Sort products"
                className="rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring/40"
              >
                {sorts.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-10 xl:grid-cols-3">
            {list.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>

          {/* Comparison table */}
          <section className="mt-20">
            <h2 className="text-2xl font-semibold">Compare side by side</h2>
            <div className="mt-6 overflow-x-auto rounded-xl border border-border">
              <table className="w-full min-w-3xl border-collapse text-sm">
                <thead className="sticky top-0 bg-surface">
                  <tr>
                    <th className="w-40 px-4 py-3 text-left font-medium text-muted-foreground">
                      Attribute
                    </th>
                    {compare.map((p) => (
                      <th key={p.slug} className="px-4 py-3 text-left font-medium">
                        {p.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {["Price", "Rating", "Material", "Warranty"].map((row) => (
                    <tr key={row} className="border-t border-border">
                      <td className="px-4 py-3 text-muted-foreground">{row}</td>
                      {compare.map((p) => (
                        <td key={p.slug} className="px-4 py-3">
                          {row === "Price" && <span className="font-semibold">{money(p.price)}</span>}
                          {row === "Rating" && `${p.rating} (${p.reviews})`}
                          {row === "Material" && p.material}
                          {row === "Warranty" &&
                            (p.specs.find((s) => s.label === "Warranty")?.value ?? "—")}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Bundles */}
          <section className="mt-20">
            <h2 className="text-2xl font-semibold">Bundle and save</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              {[
                [products[0]!, products[1]!],
                [products[1]!, products[2]!],
              ].map((pair, i) => {
                const a = pair[0]!;
                const b = pair[1]!;
                const original = a.price + b.price;
                const bundle = Math.round(original * 0.9);
                return (
                  <article key={i} className="rounded-xl border border-border bg-card p-5">
                    <div className="flex items-center gap-3">
                      <img
                        src={a.image}
                        alt={a.name}
                        loading="lazy"
                        className="size-24 flex-1 rounded-lg bg-surface object-cover"
                      />
                      <Plus width={16} height={16} className="shrink-0 text-muted-foreground" />
                      <img
                        src={b.image}
                        alt={b.name}
                        loading="lazy"
                        className="size-24 flex-1 rounded-lg bg-surface object-cover"
                      />
                    </div>
                    <p className="mt-4 text-sm font-medium">
                      {a.name} + {b.name}
                    </p>
                    <div className="mt-1 flex items-center gap-2">
                      <span className="text-lg font-semibold">{money(bundle)}</span>
                      <span className="text-sm text-muted-foreground line-through">
                        {money(original)}
                      </span>
                      <span className="rounded-full bg-sale/12 px-2 py-0.5 text-[11px] font-medium text-sale">
                        Save 10%
                      </span>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        </div>
      </div>

      {/* Mobile filter sheet */}
      {drawer && (
        <div className="fixed inset-0 z-70 lg:hidden">
          <div className="absolute inset-0 bg-foreground/25" onClick={() => setDrawer(false)} />
          <div className="absolute inset-x-0 bottom-0 max-h-[80dvh] overflow-y-auto rounded-t-2xl bg-background p-6">
            <div className="flex items-center justify-between pb-4">
              <h2 className="text-lg font-semibold">Filters</h2>
              <button onClick={() => setDrawer(false)} aria-label="Close filters">
                <X width={18} height={18} />
              </button>
            </div>
            {filters}
            <Button className="mt-8 w-full" onClick={() => setDrawer(false)}>
              Show {list.length} products
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
