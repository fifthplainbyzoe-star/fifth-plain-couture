import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/site/ProductCard";
import { Reveal } from "@/components/site/Reveal";

const categories = ["All", "T-Shirts", "Hoodies", "Tracksuits", "Fragrance"];

export const Route = createFileRoute("/shop/")({
  head: () => ({
    meta: [
      { title: "Shop — Fifth Plain" },
      { name: "description", content: "The full Fifth Plain collection — essentials, outerwear, fragrance, and The Medallion." },
      { property: "og:title", content: "Shop — Fifth Plain" },
      { property: "og:description", content: "Browse the full maison collection." },
      { property: "og:url", content: "/shop" },
    ],
    links: [{ rel: "canonical", href: "/shop" }],
  }),
  component: Shop,
});

function Shop() {
  const [cat, setCat] = useState("All");
  const [sort, setSort] = useState("featured");

  const list = useMemo(() => {
    let l = cat === "All" ? products : products.filter((p) => p.category === cat);
    if (sort === "asc") l = [...l].sort((a, b) => a.price - b.price);
    if (sort === "desc") l = [...l].sort((a, b) => b.price - a.price);
    return l;
  }, [cat, sort]);

  return (
    <>
      <section className="border-b border-border">
        <div className="mx-auto max-w-[1600px] px-6 lg:px-12 pt-24 pb-16 text-center">
          <div className="text-[10px] uppercase tracking-[0.4em] text-gold">The Collection</div>
          <h1 className="mt-6 font-editorial text-5xl md:text-7xl text-ivory">The Atelier</h1>
          <p className="mt-6 max-w-xl mx-auto text-muted-foreground">
            A curated edit of the season — each piece composed in our Florence atelier.
          </p>
        </div>
      </section>

      <section className="sticky top-16 lg:top-20 z-30 bg-background/85 backdrop-blur-xl border-b border-border">
        <div className="mx-auto max-w-[1600px] px-6 lg:px-12 py-4 flex items-center justify-between gap-6 overflow-x-auto">
          <div className="flex gap-1">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`text-[11px] uppercase tracking-[0.28em] px-4 py-2 transition-colors shrink-0 ${
                  cat === c ? "text-gold border-b border-gold" : "text-ivory/60 hover:text-ivory"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="bg-transparent text-[11px] uppercase tracking-[0.28em] text-ivory border border-border px-3 py-2 outline-none focus:border-gold"
          >
            <option value="featured">Featured</option>
            <option value="asc">Price ↑</option>
            <option value="desc">Price ↓</option>
          </select>
        </div>
      </section>

      <section className="mx-auto max-w-[1600px] px-6 lg:px-12 py-16">
        <div className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {list.map((p, i) => (
            <Reveal key={p.id} delay={(i % 4) * 80}>
              <ProductCard p={p} />
            </Reveal>
          ))}
        </div>
        {list.length === 0 && (
          <p className="text-center text-muted-foreground py-24">No pieces in this chapter — yet.</p>
        )}
      </section>
    </>
  );
}
