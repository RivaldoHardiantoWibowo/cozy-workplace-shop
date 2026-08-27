import { Link } from "@tanstack/react-router";
import { Instagram, Twitter, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const columns = [
  { title: "Shop", links: ["Chairs", "Desks", "Accessories", "Bundles", "Gift cards"] },
  { title: "Company", links: ["Our story", "Materials", "Sustainability", "Showrooms", "Careers"] },
  { title: "Support", links: ["Shipping", "Returns & trial", "Assembly guides", "Warranty", "Contact"] },
  { title: "Legal", links: ["Privacy", "Terms", "Accessibility", "Cookie settings"] },
];

export function SiteFooter() {
  return (
    <footer className="mt-8 border-t border-border bg-surface">
      <div className="container-page grid gap-12 py-14 lg:grid-cols-[1.2fr_2fr] md:py-20">
        <div className="max-w-sm">
          <Link to="/" className="font-display text-xl font-semibold tracking-tight">
            norden
          </Link>
          <p className="mt-4 text-sm text-muted-foreground">
            Furniture for the way people actually work. Designed in Copenhagen, built to be kept.
          </p>
          <form className="mt-6 flex gap-2" onSubmit={(e) => e.preventDefault()}>
            <Input type="email" placeholder="you@email.com" aria-label="Email address" />
            <Button type="submit">Join</Button>
          </form>
          <div className="mt-6 flex gap-2">
            {[Instagram, Twitter, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-background hover:text-foreground"
                aria-label="Social link"
              >
                <Icon width={17} height={17} />
              </a>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {columns.map((col) => (
            <div key={col.title}>
              <p className="eyebrow">{col.title}</p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l}>
                    <Link
                      to="/shop"
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
      </div>
      <div className="container-page flex flex-col gap-2 border-t border-border py-6 text-xs text-muted-foreground sm:flex-row sm:justify-between">
        <p>© {new Date().getFullYear()} Norden Studio. All rights reserved.</p>
        <p>Refshalevej 147, Copenhagen K</p>
      </div>
    </footer>
  );
}
