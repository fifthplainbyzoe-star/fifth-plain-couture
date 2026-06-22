import { createFileRoute } from "@tanstack/react-router";
import fragrance from "@/assets/fragrance.jpg";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/fragrance")({
  head: () => ({
    meta: [
      { title: "The Fragrance Lab — Fifth Plain" },
      { name: "description", content: "Rare olfactory compositions from the Fifth Plain Fragrance Lab." },
      { property: "og:title", content: "The Fragrance Lab — Fifth Plain" },
      { property: "og:description", content: "Olfactory artistry, composed in Grasse." },
      { property: "og:url", content: "/fragrance" },
      { property: "og:image", content: fragrance },
    ],
    links: [{ rel: "canonical", href: "/fragrance" }],
  }),
  component: Fragrance,
});

const scents = [
  { n: "I",   t: "Noir Velours", notes: "Oud · Smoked Vanilla · Iris" },
  { n: "II",  t: "Or Ambré",     notes: "Amber · Saffron · Cedar" },
  { n: "III", t: "Marbre",       notes: "White Pepper · Vetiver · Musk" },
  { n: "IV",  t: "Crépuscule",   notes: "Bergamot · Leather · Tonka" },
];

function Fragrance() {
  return (
    <>
      <section className="relative min-h-[100svh] -mt-16 lg:-mt-20 overflow-hidden">
        <img src={fragrance} alt="Fragrance" className="absolute inset-0 h-full w-full object-cover opacity-80 slow-zoom" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/50 to-transparent" />
        <div className="relative z-10 mx-auto max-w-[1600px] px-6 lg:px-12 min-h-[100svh] flex items-center">
          <div className="reveal max-w-xl">
            <div className="text-[10px] uppercase tracking-[0.4em] text-gold">Maison Fifth Plain</div>
            <h1 className="mt-6 font-display text-5xl md:text-7xl text-ivory leading-[0.95]">
              The <span className="gold-text">Fragrance</span> Lab
            </h1>
            <p className="mt-8 font-editorial italic text-2xl text-ivory/90">
              Composed in Grasse. Bottled in obsidian.
            </p>
            <p className="mt-6 max-w-md text-muted-foreground">
              Four rare olfactive compositions developed in collaboration with master perfumers
              of the South of France.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1600px] px-6 lg:px-12 py-32">
        <Reveal>
          <div className="text-[10px] uppercase tracking-[0.4em] text-gold">Signature Scents</div>
          <h2 className="mt-4 font-editorial text-4xl md:text-6xl text-ivory">The Quartet</h2>
        </Reveal>
        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {scents.map((s, i) => (
            <Reveal key={s.t} delay={i * 100}>
              <div className="group border border-border bg-surface p-10 hover:border-gold transition-colors duration-500 aspect-[3/4] flex flex-col justify-between">
                <div>
                  <div className="font-display text-4xl gold-text">{s.n}</div>
                  <h3 className="mt-10 font-editorial text-3xl text-ivory">{s.t}</h3>
                  <p className="mt-3 text-sm text-muted-foreground tracking-wide">{s.notes}</p>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.28em] text-gold">From 250</div>
                  <div className="mt-4 h-px w-12 bg-gold transition-all duration-700 group-hover:w-full" />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-surface">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-12 py-32 grid md:grid-cols-2 gap-16 items-center">
          <Reveal>
            <div className="text-[10px] uppercase tracking-[0.4em] text-gold">Discovery</div>
            <h2 className="mt-4 font-editorial text-4xl md:text-5xl text-ivory leading-tight">The Discovery Set</h2>
            <p className="mt-6 text-muted-foreground">
              Four 10ml flacons housed in a hand-laquered black case with gold foiling.
              The complete olfactive vocabulary of the maison.
            </p>
            <div className="mt-8 flex items-baseline gap-6">
              <span className="font-editorial text-3xl gold-text">$120</span>
              <span className="text-[10px] uppercase tracking-[0.32em] text-muted-foreground">Set of 4</span>
            </div>
            <button className="mt-8 bg-gold text-background px-8 py-4 text-[11px] uppercase tracking-[0.3em] hover:bg-ivory transition-colors">Add To Atelier</button>
          </Reveal>
          <Reveal delay={200}>
            <div className="aspect-square bg-background overflow-hidden">
              <img src={fragrance} alt="Discovery Set" loading="lazy" className="h-full w-full object-cover" />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-6 py-32 text-center">
        <Reveal>
          <div className="text-[10px] uppercase tracking-[0.4em] text-gold">Reviews</div>
          <p className="mt-10 font-editorial italic text-3xl md:text-4xl text-ivory leading-[1.4] text-balance">
            &ldquo;The most intelligent debut in luxury fragrance this decade. Or Ambré is destined to become a cult object.&rdquo;
          </p>
          <div className="mt-8 text-[10px] uppercase tracking-[0.32em] text-gold">— Fragrantica Editorial</div>
        </Reveal>
      </section>
    </>
  );
}
