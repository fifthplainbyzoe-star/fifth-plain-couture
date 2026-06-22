import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "@/assets/hero.jpg";
import medallionImg from "@/assets/medallion.jpg";
import fragranceImg from "@/assets/fragrance.jpg";
import lookbookImg from "@/assets/lookbook.jpg";
import { Reveal } from "@/components/site/Reveal";
import { Marquee } from "@/components/site/Marquee";
import { ProductCard } from "@/components/site/ProductCard";
import { products } from "@/lib/products";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FIFTH PLAIN — Luxury Beyond Limits" },
      { name: "description", content: "Where timeless design, elevated essentials, and premium craftsmanship meet." },
      { property: "og:title", content: "FIFTH PLAIN — Luxury Beyond Limits" },
      { property: "og:description", content: "Where timeless design, elevated essentials, and premium craftsmanship meet." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[100svh] -mt-16 lg:-mt-20 overflow-hidden bg-background">
        <img
          src={heroImg}
          alt="Fifth Plain editorial hero"
          className="absolute inset-0 h-full w-full object-cover opacity-70 slow-zoom"
          width={1536}
          height={1920}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/10 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-transparent" />

        <div className="relative z-10 mx-auto max-w-[1600px] px-6 lg:px-12 pt-40 lg:pt-56 pb-24 min-h-[100svh] flex flex-col justify-end">
          <div className="max-w-3xl reveal">
            <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.4em] text-gold">
              <span className="h-px w-10 bg-gold" /> ESTABLISHED 2026
            </div>
            <h1 className="mt-8 font-display text-5xl md:text-7xl lg:text-[8rem] leading-[0.95] text-ivory">
              The art
              <br />
              of&nbsp;<span className="shimmer font-editorial italic">PRESENCE</span>
            </h1>
            <p className="mt-8 max-w-xl text-base md:text-lg text-ivory/80 leading-relaxed font-editorial">
              {"\n"}
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/shop"
                className="group inline-flex items-center gap-3 bg-ivory text-background px-8 py-4 text-[11px] uppercase tracking-[0.3em] hover:bg-gold transition-colors duration-500"
              >
                Shop Collection
                <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
              </Link>
              <Link
                to="/medallion"
                className="group inline-flex items-center gap-3 border border-gold/60 text-gold px-8 py-4 text-[11px] uppercase tracking-[0.3em] hover:border-gold hover:bg-gold/10 transition-all duration-500"
              >
                Explore The Medallion
                <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.3em] text-ivory/60 flex flex-col items-center gap-3">
          Scroll
          <span className="h-10 w-px bg-gradient-to-b from-gold to-transparent" />
        </div>
      </section>

      <Marquee items={["Free worldwide shipping over R1500", "Crafted in South africa", "\u00a0 \u00a0 \u00a0 The Medallion", "\n", "Premium material Only"]} />

      {/* FEATURED COLLECTIONS */}
      <section className="mx-auto max-w-[1600px] px-6 lg:px-12 py-28 lg:py-40">
        <div className="grid lg:grid-cols-[1fr_auto] items-end gap-8 mb-16">
          <Reveal>
            <div className="text-[10px] uppercase tracking-[0.4em] text-gold">Chapter I</div>
            <h2 className="mt-4 font-editorial text-4xl md:text-6xl lg:text-7xl text-ivory leading-[1.05]">
              {"\n"}
            </h2>
          </Reveal>
          <Reveal delay={150}>
            <p className="max-w-sm text-sm text-muted-foreground leading-relaxed">
              Each universe within Fifth Plain is composed with intention, distinct, yet bound by the same standard of craft.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {[
            { title: "The Medallion", caption: "Rare. Collectible.", img: medallionImg, to: "/medallion" as const },
            { title: "The Fragrance Lab", caption: "\u00a0ARTISTRY.", img: fragranceImg, to: "/fragrance" as const },
          ].map((c, i) => (
            <Reveal key={c.title} delay={i * 120}>
              <Link to={c.to} className="group block relative overflow-hidden bg-surface aspect-[3/4]">
                <img src={c.img} alt={c.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-[1.08]" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                <div className="absolute inset-x-8 bottom-8">
                  <div className="text-[10px] uppercase tracking-[0.32em] text-gold">{c.caption}</div>
                  <h3 className="mt-3 font-editorial text-3xl text-ivory">{c.title}</h3>
                  <div className="mt-4 h-px w-12 bg-gold transition-all duration-700 group-hover:w-32" />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* BRAND STORY */}
      <section className="bg-surface border-y border-border">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12 py-32 lg:py-44 grid lg:grid-cols-12 gap-12">
          <Reveal className="lg:col-span-4">
            <div className="text-[10px] uppercase tracking-[0.4em] text-gold">Our Philosophy</div>
            <h2 className="mt-6 font-display text-3xl md:text-5xl text-ivory leading-tight">
              Legacy is built<br />in silence.
            </h2>
          </Reveal>
          <Reveal delay={150} className="lg:col-span-8 lg:pl-12 lg:border-l lg:border-border">
            <p className="font-editorial text-2xl md:text-3xl leading-[1.5] text-ivory/90 text-balance">
              Fifth Plain exists at the intersection of restraint and ambition, a house devoted to objects of quiet consequence. We design for the moment before the moment; the weight of a perfectly cut sleeve, the slow opening of a fragrance, the gleam of gold against unmarked black.
            </p>
            <div className="mt-12 grid sm:grid-cols-4 gap-8">
              {[
                ["01", "Legacy"],
                ["02", "Excellence"],
                ["03", "Identity"],
                ["04", "Craftsmanship"],
              ].map(([n, t]) => (
                <div key={t}>
                  <div className="text-[10px] tracking-[0.32em] text-gold">{n}</div>
                  <div className="mt-2 font-editorial text-xl text-ivory">{t}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="mx-auto max-w-[1600px] px-6 lg:px-12 py-28 lg:py-40">
        <div className="flex items-end justify-between mb-14">
          <Reveal>
            <div className="text-[10px] uppercase tracking-[0.4em] text-gold">Selected Pieces</div>
            <h2 className="mt-4 font-editorial text-4xl md:text-6xl text-ivory">The Atelier Floor</h2>
          </Reveal>
          <Reveal delay={150}>
            <Link to="/shop" className="hidden md:inline text-[11px] uppercase tracking-[0.28em] text-ivory hover:text-gold">View All →</Link>
          </Reveal>
        </div>
        <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {products.slice(0, 4).map((p, i) => (
            <Reveal key={p.id} delay={i * 80}>
              <ProductCard p={p} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* MEDALLION FEATURE */}
      <section className="relative bg-background overflow-hidden">
        <div className="mx-auto max-w-[1600px] px-6 lg:px-12 py-32 lg:py-48 grid lg:grid-cols-2 gap-16 items-center">
          <Reveal>
            <div className="relative aspect-square">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gold/20 to-transparent blur-3xl" />
              <img src={medallionImg} alt="The Medallion emblem" loading="lazy" className="relative h-full w-full object-cover" width={1280} height={1280} />
            </div>
          </Reveal>
          <Reveal delay={200}>
            <div className="text-[10px] uppercase tracking-[0.4em] text-gold">A House Within a House</div>
            <h2 className="mt-6 font-display text-5xl md:text-7xl text-ivory leading-[0.95]">
              The <span className="gold-text">Medallion</span>
            </h2>
            <p className="mt-8 font-editorial text-2xl md:text-3xl text-ivory/90 leading-[1.4]">
              Crafted for those who carry distinction.
            </p>
            <p className="mt-6 text-base text-muted-foreground leading-relaxed max-w-lg">
              A rarefied line of pieces numbered, archived, and offered only to a quiet audience.
              Each Medallion edition is hallmarked with our hexagonal emblem in 24k gold finish.
            </p>
            <div className="mt-10 flex gap-4">
              <Link to="/medallion" className="inline-flex items-center gap-3 border border-gold text-gold px-8 py-4 text-[11px] uppercase tracking-[0.3em] hover:bg-gold hover:text-background transition-colors duration-500">
                Enter The Medallion →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* LOOKBOOK STRIP */}
      <section className="relative h-[80svh] overflow-hidden">
        <img src={lookbookImg} alt="Lookbook" loading="lazy" className="absolute inset-0 h-full w-full object-cover" width={1920} height={1200} />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/30 to-transparent" />
        <div className="relative h-full mx-auto max-w-[1600px] px-6 lg:px-12 flex items-center">
          <Reveal>
            <div className="max-w-xl">
              <div className="text-[10px] uppercase tracking-[0.4em] text-gold">{"\n"}</div>
              <h2 className="mt-6 font-editorial text-4xl md:text-6xl text-ivory leading-tight">{"\n"}</h2>
              <p className="mt-6 text-base text-ivory/80 max-w-md leading-relaxed">{"\n"}</p>
              <Link to="/medallion" className="mt-8 inline-flex items-center gap-3 text-ivory text-[11px] uppercase tracking-[0.3em] border-b border-gold pb-2 hover:text-gold"></Link>
            </div>
          </Reveal>
        </div>
      </section>


      {/* NEWSLETTER */}
      <section className="bg-surface border-y border-border">
        <div className="mx-auto max-w-3xl px-6 py-28 text-center">
          <Reveal>
            <div className="text-[10px] uppercase tracking-[0.4em] text-gold">THE PLOT</div>
            <h2 className="mt-6 font-display text-4xl md:text-5xl text-ivory leading-tight">An invitation, not a list.</h2>
            <p className="mt-6 text-muted-foreground">Private previews, members, only fragrance editions, and the occasional letter from the atelier.</p>
            <form className="mt-10 mx-auto max-w-md flex border-b border-border focus-within:border-gold transition-colors">
              <input type="email" placeholder="Your email address" className="flex-1 bg-transparent py-4 text-sm outline-none placeholder:text-muted-foreground" />
              <button className="text-[11px] uppercase tracking-[0.28em] text-gold px-2">Request →</button>
            </form>
          </Reveal>
        </div>
      </section>
    </>
  );
}
