import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { findProduct, products } from "@/lib/products";
import { ProductCard } from "@/components/site/ProductCard";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/shop/$id")({
  loader: ({ params }) => {
    const p = findProduct(params.id);
    if (!p) throw notFound();
    return p;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.name ?? "Piece"} — Fifth Plain` },
      { name: "description", content: `${loaderData?.name} from Fifth Plain ${loaderData?.category}.` },
      { property: "og:title", content: `${loaderData?.name} — Fifth Plain` },
      { property: "og:image", content: loaderData?.image },
    ],
  }),
  component: ProductPage,
});

function ProductPage() {
  const p = Route.useLoaderData();
  const isFragrance = p.category === "Fragrance";
  const sizeOptions = isFragrance ? ["Velvet Fire", "Glass Wealth", "Black Authority"] : ["XS", "S", "M", "L", "XL"];
  const quantityOptions = isFragrance ? ["30ml", "50ml"] : [];
  const colorOptions = isFragrance ? [] : ["Black", "Mud Brown", "Beige Cream", "Pink", "Silver Grey"];
  const [selectedSize, setSelectedSize] = useState(sizeOptions[0]);
  const [selectedQty, setSelectedQty] = useState(quantityOptions[0] ?? "");
  const [selectedColor, setSelectedColor] = useState(colorOptions[0] ?? "");
  const related = products.filter((x) => x.id !== p.id).slice(0, 4);

  return (
    <>
      <section className="mx-auto max-w-[1600px] px-6 lg:px-12 pt-12 pb-24 grid lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-20">
        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-2 aspect-[4/5] bg-surface overflow-hidden">
            <img src={p.image} alt={p.name} className="h-full w-full object-cover slow-zoom" />
          </div>
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="aspect-square bg-surface overflow-hidden">
              <img src={p.image} alt="" loading="lazy" className="h-full w-full object-cover opacity-90 hover:opacity-100 transition" />
            </div>
          ))}
        </div>

        <div className="lg:sticky lg:top-28 self-start">
          <div className="text-[10px] uppercase tracking-[0.32em] text-gold">{p.category}</div>
          <h1 className="mt-4 font-editorial text-4xl md:text-5xl text-ivory">{p.name}</h1>
          <div className="mt-6 font-editorial text-2xl text-ivory">{isFragrance ? "From R250" : `R${p.price.toLocaleString()}`}</div>

          <p className="mt-8 text-muted-foreground leading-relaxed">
            {isFragrance 
              ? "A signature fragrance captured in a bottle, designed to define who you are in this exact moment and linger in the memory forever."
              : "Crafted from ultra-heavyweight fabric with a flawless minimalist drape, engineered to hold its structure today and for years to come."}
          </p>

          <div className="mt-10">
            <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.28em]">
              <span className="text-ivory">{isFragrance ? "Scent" : "Size"}</span>
              {!isFragrance && <button className="text-gold">Size Guide</button>}
            </div>
            <div className={`mt-3 grid gap-2 ${isFragrance ? "grid-cols-3" : "grid-cols-5"}`}>
              {sizeOptions.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  className={`py-3 border text-sm transition-colors ${
                    selectedSize === s ? "border-gold text-gold" : "border-border text-ivory hover:border-ivory"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {!isFragrance && colorOptions.length > 0 && (
            <div className="mt-6">
              <div className="text-[11px] uppercase tracking-[0.28em] text-ivory">Colors</div>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {colorOptions.map((c) => (
                  <button
                    key={c}
                    onClick={() => setSelectedColor(c)}
                    className={`py-3 border text-sm transition-colors ${
                      selectedColor === c ? "border-gold text-gold" : "border-border text-ivory hover:border-ivory"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}

          {isFragrance && quantityOptions.length > 0 && (
            <div className="mt-6">
              <div className="text-[11px] uppercase tracking-[0.28em] text-ivory">Quantity</div>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {quantityOptions.map((q) => (
                  <button
                    key={q}
                    onClick={() => setSelectedQty(q)}
                    className={`py-3 border text-sm transition-colors ${
                      selectedQty === q ? "border-gold text-gold" : "border-border text-ivory hover:border-ivory"
                    }`}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}


          <div className="mt-8 flex flex-col gap-3">
            <button className="bg-ivory text-background py-4 text-[11px] uppercase tracking-[0.3em] hover:bg-gold transition-colors">Add to Atelier</button>
            <button className="border border-gold text-gold py-4 text-[11px] uppercase tracking-[0.3em] hover:bg-gold hover:text-background transition-colors">Buy Now</button>
          </div>

        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-[1600px] px-6 lg:px-12 py-24">
          <Reveal>
            <div className="text-[10px] uppercase tracking-[0.4em] text-gold">Continue The Edit</div>
            <h2 className="mt-4 font-editorial text-3xl md:text-5xl text-ivory">Pieces to consider</h2>
          </Reveal>
          <div className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((r, i) => (
              <Reveal key={r.id} delay={i * 80}><ProductCard p={r} /></Reveal>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link to="/shop" className="text-[11px] uppercase tracking-[0.28em] text-gold border-b border-gold pb-1">Back to Collection</Link>
          </div>
        </div>
      </section>
    </>
  );
}
