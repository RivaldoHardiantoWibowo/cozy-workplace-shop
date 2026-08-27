import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Minus, Plus, Ruler, ShieldCheck, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Stars } from "@/components/store/stars";
import { useCart } from "@/components/store/cart-context";
import { findProduct, money, products, productImages } from "@/lib/products";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }) => {
    const product = findProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.product;
    return {
      meta: p
        ? [
            { title: `${p.name} — ${money(p.price)} | Norden` },
            { name: "description", content: p.blurb },
            { property: "og:title", content: `${p.name} | Norden` },
            { property: "og:description", content: p.blurb },
          ]
        : [],
    };
  },
  component: ProductPage,
});

const ratingBreakdown = [
  { star: 5, pct: 78 },
  { star: 4, pct: 14 },
  { star: 3, pct: 5 },
  { star: 2, pct: 2 },
  { star: 1, pct: 1 },
];

const keywordTags = ["Comfort", "Assembly", "Value", "Lumbar support", "Fabric"];

const reviews = [
  {
    name: "Mira L.",
    rating: 5,
    text: "Six months in and my lower back has stopped complaining by 4pm. The wool still looks new.",
  },
  {
    name: "Otto K.",
    rating: 4,
    text: "Assembly took nine minutes, exactly as promised. I'd like one more inch of seat depth.",
  },
  {
    name: "Jen H.",
    rating: 5,
    text: "It looks like furniture, not office equipment. That was the whole reason I bought it.",
  },
];

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { add } = useCart();
  const [swatch, setSwatch] = useState(product.swatches[0]!.name);
  const [size, setSize] = useState(product.sizes?.[0] ?? "");
  const [qty, setQty] = useState(1);
  const [addons, setAddons] = useState<string[]>([]);
  const gallery = [product.image, productImages.room, productImages.accessory];
  const [mainImage, setMainImage] = useState(product.image);

  const addonList = [
    { label: "Headrest attachment", price: 89 },
    { label: "Rolling casters for hard floors", price: 39 },
  ];

  const total = product.price + addons.length * 0;

  return (
    <div className="container-page py-8 md:py-12">
      <nav className="text-xs text-muted-foreground">
        <Link to="/" className="hover:text-foreground">
          Home
        </Link>{" "}
        /{" "}
        <Link to="/shop" search={{ category: product.category }} className="hover:text-foreground">
          {product.category}
        </Link>{" "}
        / <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-14">
        {/* Gallery */}
        <div>
          <div className="overflow-hidden rounded-2xl bg-surface">
            <img
              key={mainImage}
              src={mainImage}
              alt={product.name}
              width={1024}
              height={1280}
              className="aspect-4/5 w-full animate-in fade-in duration-200 object-cover"
            />
          </div>
          <div className="mt-4 flex gap-3">
            {gallery.map((g, i) => (
              <button
                key={i}
                onClick={() => setMainImage(g)}
                className={cn(
                  "overflow-hidden rounded-lg bg-surface transition-all duration-200",
                  mainImage === g && "ring-2 ring-primary ring-offset-2 ring-offset-background",
                )}
              >
                <img src={g} alt="" loading="lazy" className="size-20 object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <h1 className="text-3xl font-semibold sm:text-4xl">{product.name}</h1>
          <a href="#reviews" className="mt-3 inline-block">
            <Stars rating={product.rating} reviews={product.reviews} />
          </a>
          <p className="mt-4 text-2xl font-semibold">
            {money(product.price)}
            {product.compareAt && (
              <span className="ml-2 text-base font-normal text-muted-foreground line-through">
                {money(product.compareAt)}
              </span>
            )}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            {product.material} · {product.specs[0]!.label} {product.specs[0]!.value} · Ships in 3–5 days
          </p>
          <p className="mt-5 text-sm text-muted-foreground">{product.blurb}</p>

          <div className="mt-8">
            <p className="eyebrow">Color / material</p>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              {product.swatches.map((s) => (
                <button
                  key={s.name}
                  disabled={s.soldOut}
                  onClick={() => setSwatch(s.name)}
                  aria-label={s.name}
                  className={cn(
                    "size-8 rounded-full border border-border/70 transition-all duration-200",
                    swatch === s.name && "ring-2 ring-primary ring-offset-2 ring-offset-background",
                    s.soldOut && "cursor-not-allowed opacity-35",
                  )}
                  style={{ backgroundColor: s.color }}
                />
              ))}
              <span className="text-sm text-muted-foreground">
                {swatch}
                {product.swatches.find((s) => s.name === swatch)?.soldOut && " — sold out"}
              </span>
            </div>
          </div>

          {product.sizes && (
            <div className="mt-6">
              <p className="eyebrow">Size</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={cn(
                      "rounded-md border px-4 py-2 text-sm transition-colors duration-200",
                      size === s
                        ? "border-primary text-primary"
                        : "border-input text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8 flex items-center gap-3">
            <div className="inline-flex items-center rounded-md border border-input">
              <button
                onClick={() => setQty(Math.max(1, qty - 1))}
                aria-label="Decrease quantity"
                className="px-3 py-2.5"
              >
                <Minus width={13} height={13} />
              </button>
              <span className="min-w-7 text-center text-sm">{qty}</span>
              <button onClick={() => setQty(qty + 1)} aria-label="Increase quantity" className="px-3 py-2.5">
                <Plus width={13} height={13} />
              </button>
            </div>
            <Button
              size="lg"
              className="flex-1"
              onClick={() =>
                add(
                  {
                    slug: product.slug,
                    name: product.name,
                    variant: [swatch, size].filter(Boolean).join(" · "),
                    price: total,
                    image: product.image,
                  },
                  qty,
                )
              }
            >
              Add to cart — {money(total * qty)}
            </Button>
          </div>

          <div className="mt-5 space-y-2.5">
            {addonList.map((a) => (
              <label key={a.label} className="flex cursor-pointer items-center gap-3 text-sm">
                <Checkbox
                  checked={addons.includes(a.label)}
                  onCheckedChange={() =>
                    setAddons((prev) =>
                      prev.includes(a.label) ? prev.filter((x) => x !== a.label) : [...prev, a.label],
                    )
                  }
                />
                <span className="flex-1 text-muted-foreground">Add {a.label}</span>
                <span className="font-medium">+{money(a.price)}</span>
              </label>
            ))}
          </div>

          <div className="mt-6 rounded-xl border border-border bg-card p-4">
            <p className="text-sm font-medium">Bundle & save 10%</p>
            <div className="mt-3 flex items-center gap-3">
              <img
                src={product.image}
                alt=""
                loading="lazy"
                className="size-14 rounded-md bg-surface object-cover"
              />
              <Plus width={14} height={14} className="text-muted-foreground" />
              <img
                src={productImages.accessory}
                alt=""
                loading="lazy"
                className="size-14 rounded-md bg-surface object-cover"
              />
              <div className="ml-auto text-right">
                <p className="font-semibold">{money(Math.round((product.price + 128) * 0.9))}</p>
                <p className="text-xs text-muted-foreground line-through">{money(product.price + 128)}</p>
              </div>
            </div>
          </div>

          <ul className="mt-6 space-y-2 text-xs text-muted-foreground">
            <li className="flex items-center gap-2">
              <Truck width={14} height={14} /> Free shipping over $1,200
            </li>
            <li className="flex items-center gap-2">
              <ShieldCheck width={14} height={14} /> 100-day trial, easy returns
            </li>
          </ul>
        </div>
      </div>

      {/* Tabs */}
      <section className="mt-20">
        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="specs">Specs & Dimensions</TabsTrigger>
            <TabsTrigger value="materials">Materials</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="max-w-2xl pt-6 text-sm text-muted-foreground">
            <p>{product.blurb}</p>
            <p className="mt-4">
              Every mechanism is serviceable, every panel replaceable. We'd rather sell you one piece
              that lasts twelve years than three that don't.
            </p>
          </TabsContent>
          <TabsContent value="specs" className="pt-6">
            <dl className="grid max-w-2xl gap-y-3 text-sm sm:grid-cols-2">
              {product.specs.map((s) => (
                <div key={s.label} className="flex justify-between gap-4 border-b border-border pb-2">
                  <dt className="text-muted-foreground">{s.label}</dt>
                  <dd className="font-medium">{s.value}</dd>
                </div>
              ))}
            </dl>
          </TabsContent>
          <TabsContent value="materials" className="max-w-2xl pt-6 text-sm text-muted-foreground">
            <p>
              {product.material}. Wool sourced from mills in Denmark and Portugal; wood is FSC-certified
              and finished with a plant-based oil.
            </p>
          </TabsContent>
        </Tabs>
      </section>

      {/* Feature grid */}
      <section className="section-y">
        <div className="grid gap-8 sm:grid-cols-3">
          {[
            { icon: Ruler, title: "Fits your body", copy: "Twelve adjustment points, no manual required." },
            { icon: ShieldCheck, title: "Built to last", copy: "Serviceable parts and a 12-year warranty." },
            { icon: Truck, title: "Arrives ready", copy: "Flat-packed, assembled in under ten minutes." },
          ].map((f) => (
            <div key={f.title}>
              <img
                src={productImages.room}
                alt=""
                loading="lazy"
                className="aspect-video w-full rounded-xl bg-surface object-cover"
              />
              <f.icon width={18} height={18} strokeWidth={1.5} className="mt-4 text-primary" />
              <p className="mt-2 font-medium">{f.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{f.copy}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="scroll-mt-28 border-t border-border pt-14">
        <h2 className="text-2xl font-semibold sm:text-3xl">Reviews</h2>
        <div className="mt-8 grid gap-10 lg:grid-cols-[18rem_minmax(0,1fr)]">
          <div>
            <p className="text-4xl font-semibold">{product.rating.toFixed(1)}</p>
            <Stars rating={product.rating} className="mt-2" />
            <p className="mt-1 text-xs text-muted-foreground">Based on {product.reviews} reviews</p>
            <div className="mt-5 space-y-2">
              {ratingBreakdown.map((r) => (
                <div key={r.star} className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="w-3">{r.star}</span>
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface">
                    <div className="h-full rounded-full bg-primary" style={{ width: `${r.pct}%` }} />
                  </div>
                  <span className="w-8 text-right">{r.pct}%</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              {keywordTags.map((t) => (
                <button
                  key={t}
                  className="rounded-full bg-surface px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                  {t}
                </button>
              ))}
              <select
                aria-label="Sort reviews"
                className="ml-auto rounded-md border border-input bg-background px-3 py-1.5 text-xs outline-none"
              >
                <option>Most recent</option>
                <option>Highest rated</option>
                <option>Lowest rated</option>
              </select>
            </div>
            <ul className="mt-6 space-y-5">
              {reviews.map((r) => (
                <li key={r.name} className="rounded-xl border border-border bg-card p-5">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-sm font-medium">{r.name}</span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-sage px-2 py-0.5 text-[11px] text-sage-foreground">
                      <Check width={10} height={10} /> Verified
                    </span>
                    <Stars rating={r.rating} className="ml-auto" />
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">{r.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* You may also like */}
      <section className="section-y">
        <h2 className="text-2xl font-semibold">You may also like</h2>
        <div className="mt-8 grid grid-cols-2 gap-5 lg:grid-cols-4">
          {products
            .filter((p) => p.slug !== product.slug)
            .map((p) => (
              <Link key={p.slug} to="/product/$slug" params={{ slug: p.slug }} className="group">
                <img
                  src={p.image}
                  alt={p.name}
                  loading="lazy"
                  className="aspect-4/5 w-full rounded-xl bg-surface object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                />
                <p className="mt-3 text-sm font-medium">{p.name}</p>
                <p className="text-sm font-semibold">{money(p.price)}</p>
              </Link>
            ))}
        </div>
      </section>

      {/* Sticky mobile add to cart */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 px-4 py-3 backdrop-blur lg:hidden">
        <Button
          className="w-full"
          size="lg"
          onClick={() =>
            add(
              {
                slug: product.slug,
                name: product.name,
                variant: [swatch, size].filter(Boolean).join(" · "),
                price: total,
                image: product.image,
              },
              qty,
            )
          }
        >
          Add to cart — {money(total * qty)}
        </Button>
      </div>
    </div>
  );
}
