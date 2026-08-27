import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Feather, Leaf, RotateCcw, ShieldCheck, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/store/product-card";
import { products, productImages, money } from "@/lib/products";
import hero from "@/assets/hero-office.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Norden — Office Furniture for Better Workdays" },
      {
        name: "description",
        content:
          "Chairs, desks and accessories designed for comfort that lasts. Free 100-day trial, 12-year warranty, shipped flat and assembled in minutes.",
      },
      { property: "og:title", content: "Norden — Office Furniture for Better Workdays" },
      {
        property: "og:description",
        content: "Warm, considered furniture for the way people actually work.",
      },
    ],
  }),
  component: Home,
});

const values = [
  { icon: RotateCcw, label: "100-day trial", copy: "Live with it. Send it back free if it isn't right." },
  { icon: ShieldCheck, label: "12-year warranty", copy: "Parts, mechanisms and upholstery all covered." },
  { icon: Feather, label: "10-minute setup", copy: "Ships flat with tools and plain-language steps." },
  { icon: Leaf, label: "Made to be kept", copy: "FSC wood, recycled wool, replaceable parts." },
];

const collections = {
  Rooms: [
    { label: "The small apartment", image: productImages.stool },
    { label: "The shared studio", image: productImages.room },
    { label: "The focus corner", image: productImages.chair },
  ],
  Roles: [
    { label: "The all-day sitter", image: productImages.chair },
    { label: "The stand-up switcher", image: productImages.desk },
    { label: "The minimalist", image: productImages.accessory },
  ],
  Budget: [
    { label: "Under $500", image: productImages.stool },
    { label: "The full setup", image: productImages.room },
    { label: "Finishing touches", image: productImages.accessory },
  ],
};

const hotspots = [
  { n: 1, x: 33, y: 62, slug: "aster-task-chair" },
  { n: 2, x: 55, y: 52, slug: "linea-standing-desk" },
  { n: 3, x: 72, y: 45, slug: "field-desk-mat-set" },
];

function Home() {
  const [tab, setTab] = useState<keyof typeof collections>("Rooms");
  const [active, setActive] = useState<number | null>(1);

  return (
    <>
      {/* Hero */}
      <section className="relative">
        <div className="relative h-[78vh] min-h-[30rem] w-full overflow-hidden">
          <img
            src={hero}
            alt="Terracotta task chair at an oak desk in a sunlit home office"
            width={1920}
            height={1200}
            className="size-full object-cover"
          />
          <div className="absolute inset-0 bg-foreground/25" />
          <div className="absolute inset-0 flex items-end">
            <div className="container-page pb-14 md:pb-20">
              <p className="eyebrow text-primary-foreground/80">Autumn collection</p>
              <h1 className="mt-4 max-w-2xl text-4xl font-semibold text-primary-foreground sm:text-5xl md:text-6xl">
                A better way to spend eight hours.
              </h1>
              <p className="mt-4 max-w-md text-base text-primary-foreground/85">
                Chairs and desks built around comfort, not conference rooms.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <Link to="/shop">Shop the collection</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
                >
                  <Link to="/product/$slug" params={{ slug: "aster-task-chair" }}>
                    Meet the Aster chair
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value props */}
      <section className="border-b border-border">
        <div className="container-page grid grid-cols-2 gap-x-8 gap-y-10 py-14 md:grid-cols-4 md:py-16">
          {values.map((v) => (
            <div key={v.label}>
              <v.icon width={20} height={20} strokeWidth={1.5} className="text-primary" />
              <p className="mt-3 text-sm font-semibold">{v.label}</p>
              <p className="mt-1 text-sm text-muted-foreground">{v.copy}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Collections */}
      <section className="section-y">
        <div className="container-page">
          <div className="grid gap-6 sm:flex sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow">Curated</p>
              <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">Shop by how you work</h2>
            </div>
            <div className="flex gap-1 rounded-full bg-surface p-1">
              {(Object.keys(collections) as (keyof typeof collections)[]).map((k) => (
                <button
                  key={k}
                  onClick={() => setTab(k)}
                  className={`rounded-full px-4 py-1.5 text-sm transition-colors duration-200 ${
                    tab === k ? "bg-background font-medium shadow-soft" : "text-muted-foreground"
                  }`}
                >
                  {k}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {collections[tab].map((c) => (
              <Link
                key={c.label}
                to="/shop"
                className="group relative overflow-hidden rounded-xl bg-surface"
              >
                <img
                  src={c.image}
                  alt={c.label}
                  loading="lazy"
                  className="aspect-4/5 w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-linear-to-t from-foreground/55 to-transparent" />
                <span className="absolute bottom-5 left-5 text-lg font-medium text-primary-foreground">
                  {c.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Shop the room */}
      <section className="section-y bg-surface">
        <div className="container-page">
          <p className="eyebrow">Shop the room</p>
          <h2 className="mt-3 max-w-xl text-3xl font-semibold sm:text-4xl">
            Everything in Ada's Copenhagen study
          </h2>

          <div className="relative mt-10 overflow-hidden rounded-2xl">
            <img
              src={productImages.room}
              alt="Styled home office with oak desk, green task chair and open shelving"
              loading="lazy"
              width={1600}
              height={1104}
              className="w-full object-cover"
            />
            {hotspots.map((h) => {
              const p = products.find((x) => x.slug === h.slug)!;
              return (
                <div key={h.n} className="absolute" style={{ left: `${h.x}%`, top: `${h.y}%` }}>
                  <button
                    onClick={() => setActive(active === h.n ? null : h.n)}
                    aria-label={`View ${p.name}`}
                    className={`grid size-7 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full text-xs font-semibold transition-all duration-200 ${
                      active === h.n
                        ? "bg-primary text-primary-foreground"
                        : "bg-background/90 text-foreground hover:bg-background"
                    }`}
                  >
                    {h.n}
                  </button>
                  {active === h.n && (
                    <Link
                      to="/product/$slug"
                      params={{ slug: p.slug }}
                      className="absolute left-5 top-3 flex w-56 items-center gap-3 rounded-xl bg-popover p-3 shadow-lift"
                    >
                      <img
                        src={p.image}
                        alt={p.name}
                        loading="lazy"
                        className="size-12 shrink-0 rounded-md bg-surface object-cover"
                      />
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-medium">{p.name}</span>
                        <span className="block text-sm font-semibold">{money(p.price)}</span>
                      </span>
                      <ArrowRight width={14} height={14} className="shrink-0 text-muted-foreground" />
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bestsellers */}
      <section className="section-y">
        <div className="container-page">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="eyebrow">Most loved</p>
              <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">The pieces people keep</h2>
            </div>
            <Link
              to="/shop"
              className="hidden shrink-0 items-center gap-1.5 text-sm text-primary hover:underline sm:inline-flex"
            >
              Shop all <ArrowRight width={14} height={14} />
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4">
            {products.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* UGC */}
      <section className="section-y border-t border-border">
        <div className="container-page">
          <p className="eyebrow">From our customers</p>
          <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">Real desks, real Tuesdays</h2>
          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
            {[productImages.room, productImages.chair, productImages.desk, productImages.accessory].map(
              (img, i) => (
                <figure key={i} className="overflow-hidden rounded-xl bg-surface">
                  <img
                    src={img}
                    alt="Customer photo of a Norden setup"
                    loading="lazy"
                    className="aspect-square w-full object-cover contrast-[1.04] saturate-[0.95]"
                  />
                  <figcaption className="px-3 py-2.5 text-xs text-muted-foreground">
                    @{["mira.builds", "otto.k", "studio.fern", "jhwrites"][i]}
                  </figcaption>
                </figure>
              ),
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export { X };
