import chair from "@/assets/product-chair.jpg";
import desk from "@/assets/product-desk.jpg";
import accessory from "@/assets/product-accessory.jpg";
import stool from "@/assets/product-stool.jpg";
import room from "@/assets/room-scene.jpg";

export const productImages = { chair, desk, accessory, stool, room };

export type Swatch = {
  name: string;
  /** css color for the chip */
  color: string;
  soldOut?: boolean;
};

export type Product = {
  slug: string;
  name: string;
  category: "Chairs" | "Desks" | "Accessories";
  price: number;
  compareAt?: number;
  rating: number;
  reviews: number;
  badge?: { label: string; tone: "sage" | "sand" | "dusty" | "sale" };
  image: string;
  swatches: Swatch[];
  sizes?: string[];
  material: string;
  blurb: string;
  specs: { label: string; value: string }[];
};

export const products: Product[] = [
  {
    slug: "aster-task-chair",
    name: "Aster Task Chair",
    category: "Chairs",
    price: 749,
    rating: 4.8,
    reviews: 412,
    badge: { label: "Bestseller", tone: "sand" },
    image: chair,
    swatches: [
      { name: "Terracotta", color: "oklch(0.6 0.13 38)" },
      { name: "Charcoal", color: "oklch(0.32 0.01 60)" },
      { name: "Sage", color: "oklch(0.72 0.05 145)" },
      { name: "Bone", color: "oklch(0.92 0.02 84)", soldOut: true },
    ],
    sizes: ["Standard", "Tall"],
    material: "Recycled wool blend",
    blurb:
      "Twelve points of adjustment, a breathable wool seat, and a posture that holds you up through the long afternoons.",
    specs: [
      { label: "Seat height", value: '16.5" – 21"' },
      { label: "Weight capacity", value: "300 lb" },
      { label: "Warranty", value: "12 years" },
      { label: "Assembly", value: "Under 10 minutes" },
    ],
  },
  {
    slug: "linea-standing-desk",
    name: "Linea Standing Desk",
    category: "Desks",
    price: 1090,
    compareAt: 1290,
    rating: 4.7,
    reviews: 268,
    badge: { label: "Sale", tone: "sale" },
    image: desk,
    swatches: [
      { name: "White Oak", color: "oklch(0.83 0.05 78)" },
      { name: "Walnut", color: "oklch(0.48 0.06 55)" },
      { name: "Ash", color: "oklch(0.9 0.02 84)" },
    ],
    sizes: ['48"', '60"', '72"'],
    material: "FSC white oak veneer",
    blurb:
      "A whisper-quiet dual motor lift, four height memories, and a solid oak top that earns its place in a living room.",
    specs: [
      { label: "Height range", value: '25" – 50.5"' },
      { label: "Lift speed", value: "1.5 in/sec" },
      { label: "Warranty", value: "10 years" },
      { label: "Assembly", value: "25 minutes, two people" },
    ],
  },
  {
    slug: "field-desk-mat-set",
    name: "Field Desk Mat Set",
    category: "Accessories",
    price: 128,
    rating: 4.9,
    reviews: 156,
    badge: { label: "New", tone: "sage" },
    image: accessory,
    swatches: [
      { name: "Sage", color: "oklch(0.74 0.05 145)" },
      { name: "Sand", color: "oklch(0.86 0.04 78)" },
      { name: "Slate", color: "oklch(0.55 0.03 250)" },
    ],
    sizes: ["Medium", "Large"],
    material: "Merino felt + oak",
    blurb:
      "Wool felt underfoot for your keyboard, a solid oak riser for your screen. Quietly fixes a whole desk.",
    specs: [
      { label: "Mat size", value: '35" × 17"' },
      { label: "Riser height", value: '3.5"' },
      { label: "Warranty", value: "5 years" },
      { label: "Care", value: "Spot clean" },
    ],
  },
  {
    slug: "perch-stool",
    name: "Perch Swivel Stool",
    category: "Chairs",
    price: 395,
    rating: 4.6,
    reviews: 98,
    badge: { label: "Limited", tone: "dusty" },
    image: stool,
    swatches: [
      { name: "Sage", color: "oklch(0.7 0.05 145)" },
      { name: "Clay", color: "oklch(0.65 0.1 40)" },
      { name: "Ink", color: "oklch(0.35 0.03 250)", soldOut: true },
    ],
    sizes: ["Low", "Counter"],
    material: "Oak frame, boucle seat",
    blurb: "For the perch-and-pivot half of your day — light enough to move, kind enough to stay in.",
    specs: [
      { label: "Seat height", value: '18" – 23"' },
      { label: "Weight", value: "14 lb" },
      { label: "Warranty", value: "8 years" },
      { label: "Assembly", value: "5 minutes" },
    ],
  },
];

export const byCategory = (cat?: string) =>
  cat ? products.filter((p) => p.category === cat) : products;

export const findProduct = (slug: string) => products.find((p) => p.slug === slug);

export const money = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

export const FREE_SHIPPING_THRESHOLD = 1200;
