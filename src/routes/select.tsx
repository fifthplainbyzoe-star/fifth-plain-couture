import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import selectHero from "@/assets/select-hero.png";

export const Route = createFileRoute("/select")({
  head: () => ({
    meta: [
      { title: "FifthPlain Select — Coming Soon" },
      {
        name: "description",
        content:
          "FifthPlain Select — a curated collection of modest summer dresses and seasonal fashion. Coming soon.",
      },
      { property: "og:title", content: "FifthPlain Select — Coming Soon" },
      {
        property: "og:description",
        content:
          "Curated pieces for effortless, modest summer style. Coming soon to FifthPlain.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: selectHero.url },
    ],
    links: [{ rel: "canonical", href: "/select" }],
  }),
  component: FifthPlainSelect,
});

function FifthPlainSelect() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[85svh] overflow-hidden -mt-16 lg:-mt-20">
        <img
          src={selectHero.url}
          alt="Model in a flowing beige modest summer dress holding a straw bag"
          className="absolute inset-0 h-full w-full object-cover slow-zoom"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/20 to-background" />
        <div className="relative h-full mx-auto max-w-[1600px] px-6 lg:px-12 flex flex-col items-center justify-center text-center pb-24">
          <Reveal>
            <div className="text-[10px] uppercase tracking-[0.4em] text-gold">
              Curated Collection
            </div>
            <h1 className="mt-6 font-display text-5xl md:text-7xl lg:text-8xl text-ivory leading-[0.95]">
              FifthPlain Select
            </h1>
            <div className="mt-6 inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-gold">
              <span className="h-px w-8 bg-gold/50" />
              Coming Soon
              <span className="h-px w-8 bg-gold/50" />
            </div>
            <p className="mt-8 font-editorial text-xl md:text-2xl text-ivory/90 leading-[1.5] max-w-xl mx-auto">
              Curated pieces for effortless, modest summer style.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Editorial intro */}
      <section className="mx-auto max-w-3xl px-6 py-28 lg:py-40 text-center">
        <Reveal>
          <div className="text-[10px] uppercase tracking-[0.4em] text-gold">
            The Next Chapter
          </div>
          <h2 className="mt-8 font-editorial text-3xl md:text-5xl text-ivory leading-[1.15]">
            A collection imagined for the woman who dresses with intention.
          </h2>
          <div className="mt-10 space-y-6 text-ivory/70 leading-[1.8] max-w-2xl mx-auto">
            <p>
              FifthPlain Select is a forthcoming edit of modest summer dresses
              and seasonal pieces — flowing silhouettes, natural fabrics, and
              quiet details designed for warmth and movement.
            </p>
            <p>
              Each piece is considered, restrained, and made to be lived in.
              No excess, no noise — only the presence of good design.
            </p>
          </div>
        </Reveal>
      </section>

      {/* Feature band — soft fabric / silhouette cues */}
      <section className="border-y border-border bg-surface">
        <div className="mx-auto max-w-[1600px] px-6 lg:px-12 py-20 grid gap-12 md:grid-cols-3 text-center">
          {[
            { k: "Modest", v: "Long sleeves, high necklines, flowing lengths." },
            { k: "Seasonal", v: "Light fabrics and warm tones for summer days." },
            { k: "Curated", v: "A small, considered edit — never crowded." },
          ].map((f, i) => (
            <Reveal key={f.k} delay={i * 90}>
              <div className="text-[10px] uppercase tracking-[0.4em] text-gold">
                {f.k}
              </div>
              <p className="mt-4 text-ivory/70 leading-[1.7] text-sm max-w-xs mx-auto">
                {f.v}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-3xl px-6 py-28 lg:py-36 text-center">
        <Reveal>
          <div className="text-[10px] uppercase tracking-[0.4em] text-gold">
            While You Wait
          </div>
          <h2 className="mt-6 font-editorial text-3xl md:text-4xl text-ivory leading-[1.2]">
            Explore the existing FifthPlain collection.
          </h2>
          <div className="mt-10">
            <Link
              to="/"
              className="inline-flex items-center justify-center border border-gold px-10 py-4 text-[11px] uppercase tracking-[0.28em] text-gold hover:bg-gold hover:text-background transition-colors duration-300"
            >
              Explore FifthPlain
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
