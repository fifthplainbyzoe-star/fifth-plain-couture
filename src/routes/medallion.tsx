import { createFileRoute, Link } from "@tanstack/react-router";
import medallion from "@/assets/medallion.jpg";
import lookbook from "@/assets/lookbook.jpg";
import productMedallion from "@/assets/product-medallion.jpg";
import hoodie from "@/assets/product-hoodie.jpg";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/medallion")({
  head: () => ({
    meta: [
      { title: "The Medallion — Fifth Plain" },
      { name: "description", content: "A rarefied line within Fifth Plain — numbered, archived, and hallmarked with the gold medallion emblem." },
      { property: "og:title", content: "The Medallion — Fifth Plain" },
      { property: "og:description", content: "Crafted for those who carry distinction." },
      { property: "og:url", content: "/medallion" },
      { property: "og:image", content: "/__l5e/og-medallion.jpg" },
    ],
    links: [{ rel: "canonical", href: "/medallion" }],
  }),
  component: Medallion,
});

function Medallion() {
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[100svh] -mt-16 lg:-mt-20 overflow-hidden">
        <div className="absolute inset-0 bg-background" />
        <img src={medallion} alt="" className="absolute inset-0 h-full w-full object-cover opacity-40 slow-zoom" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        <div className="relative z-10 mx-auto max-w-[1600px] px-6 lg:px-12 pt-40 lg:pt-56 pb-24 min-h-[100svh] flex flex-col justify-center items-center text-center">
          <div className="reveal">
            <div className="flex items-center justify-center gap-4 text-[10px] uppercase tracking-[0.4em] text-gold">
              <span className="h-px w-10 bg-gold" /> Maison Fifth Plain <span className="h-px w-10 bg-gold" />
            </div>
            <h1 className="mt-10 font-display text-6xl md:text-8xl lg:text-[12rem] leading-[0.85] gold-text">
              MEDALLION
            </h1>
            <p className="mt-8 font-editorial italic text-2xl md:text-3xl text-ivory/90">
              Crafted for those who carry distinction.
            </p>
            <p className="mt-6 max-w-xl mx-auto text-sm text-muted-foreground">
              An exclusive chapter within Fifth Plain. Numbered, archived, hallmarked.
            </p>
          </div>
        </div>
      </section>

      {/* STORY */}
      <section className="mx-auto max-w-[1200px] px-6 lg:px-12 py-32 lg:py-44 text-center">
        <Reveal>
          <div className="text-[10px] uppercase tracking-[0.4em] text-gold">The Story</div>
          <p className="mt-10 font-editorial text-3xl md:text-5xl text-ivory leading-[1.3] text-balance">
            A house within a house — created for the few who recognize the difference between
            <span className="gold-text"> wearing </span> and <span className="gold-text">carrying</span>.
          </p>
        </Reveal>
      </section>

      {/* COLLECTIONS */}
      <section className="bg-surface border-y border-border">
        <div className="mx-auto max-w-[1600px] px-6 lg:px-12 py-28 grid lg:grid-cols-3 gap-8">
          {[
            { n: "I", t: "Founder Collection", c: "12 numbered pieces" },
            { n: "II", t: "Hexagon Series", c: "Hallmarked outerwear" },
            { n: "III", t: "Or Noir", c: "24k accents on obsidian" },
          ].map((c, i) => (
            <Reveal key={c.t} delay={i * 120}>
              <div className="border border-border p-10 bg-background hover:border-gold transition-colors duration-500 group">
                <div className="font-display text-5xl gold-text">{c.n}</div>
                <h3 className="mt-8 font-editorial text-2xl text-ivory">{c.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{c.c}</p>
                <div className="mt-8 h-px w-12 bg-gold transition-all duration-500 group-hover:w-full" />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FEATURED PIECES */}
      <section className="mx-auto max-w-[1600px] px-6 lg:px-12 py-32 grid lg:grid-cols-2 gap-12">
        <Reveal>
          <div className="relative overflow-hidden bg-surface aspect-[4/5] group">
            <img src={productMedallion} alt="Medallion pendant" loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] group-hover:scale-105" />
          </div>
        </Reveal>
        <Reveal delay={150} className="flex flex-col justify-center">
          <div className="text-[10px] uppercase tracking-[0.4em] text-gold">Founder Piece N°001</div>
          <h2 className="mt-6 font-editorial text-4xl md:text-6xl text-ivory leading-tight">The Hexagon Pendant</h2>
          <p className="mt-6 text-muted-foreground leading-relaxed max-w-md">
            Cast in solid brass with 24k gold plating, the founding piece of The Medallion universe.
            Hand-finished in our Florence atelier. Edition of 250, numbered.
          </p>
          <div className="mt-10 flex items-baseline gap-6">
            <span className="font-editorial text-3xl gold-text">$2,400</span>
            <span className="text-[10px] uppercase tracking-[0.32em] text-muted-foreground">N°001 / 250</span>
          </div>
          <div className="mt-8 flex gap-3">
            <button className="bg-gold text-background px-8 py-4 text-[11px] uppercase tracking-[0.3em] hover:bg-ivory transition-colors">Add To Atelier</button>
            <button className="border border-border px-8 py-4 text-[11px] uppercase tracking-[0.3em] hover:border-gold">Request Viewing</button>
          </div>
        </Reveal>
      </section>

      {/* LOOKBOOK */}
      <section className="relative h-[90svh] overflow-hidden">
        <img src={lookbook} alt="Lookbook" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-background/40" />
        <div className="relative h-full flex items-end">
          <div className="mx-auto max-w-[1600px] w-full px-6 lg:px-12 pb-20">
            <Reveal>
              <div className="text-[10px] uppercase tracking-[0.4em] text-gold">Lookbook</div>
              <h2 className="mt-4 font-editorial text-5xl md:text-7xl text-ivory">Or Noir</h2>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FOUNDER COLLECTION */}
      <section className="mx-auto max-w-[1600px] px-6 lg:px-12 py-32">
        <Reveal>
          <div className="text-center text-[10px] uppercase tracking-[0.4em] text-gold">Founder Collection</div>
          <h2 className="mt-6 text-center font-display text-4xl md:text-6xl text-ivory">Numbered 001 — 012</h2>
        </Reveal>
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <Reveal key={i} delay={i * 60}>
              <div className="relative aspect-[3/4] bg-surface overflow-hidden group">
                <img src={i % 2 ? hoodie : productMedallion} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="font-display text-[11px] tracking-[0.32em] gold-text">N°{String(i + 1).padStart(3, "0")}</div>
                  <div className="mt-1 font-editorial text-ivory">Piece {String.fromCharCode(65 + i)}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* MEMBERSHIP CTA */}
      <section className="bg-background border-t border-gold/30">
        <div className="mx-auto max-w-2xl px-6 py-32 text-center">
          <Reveal>
            <div className="text-[10px] uppercase tracking-[0.4em] text-gold">The Medallion Circle</div>
            <h2 className="mt-6 font-display text-4xl md:text-5xl text-ivory">By invitation only.</h2>
            <p className="mt-6 text-muted-foreground">Apply for early access to Medallion drops, private viewings, and member fragrances.</p>
            <Link to="/circle" className="mt-10 inline-flex items-center gap-3 border border-gold px-10 py-4 text-[11px] uppercase tracking-[0.3em] text-gold hover:bg-gold hover:text-background transition-colors">
              Apply To The Circle →
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
