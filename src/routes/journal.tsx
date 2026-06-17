import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import look from "@/assets/lookbook.jpg";
import medal from "@/assets/medallion.jpg";
import frag from "@/assets/fragrance.jpg";

export const Route = createFileRoute("/journal")({
  head: () => ({
    meta: [
      { title: "Journal — Fifth Plain" },
      { name: "description", content: "Editorial dispatches from the Fifth Plain atelier." },
      { property: "og:url", content: "/journal" },
    ],
    links: [{ rel: "canonical", href: "/journal" }],
  }),
  component: Journal,
});

const posts = [
  { t: "The Craft of Restraint", c: "Atelier", img: look,  date: "OCT 2025" },
  { t: "Behind the Medallion N°001", c: "Medallion", img: medal, date: "SEP 2025" },
  { t: "Notes from Grasse", c: "Fragrance", img: frag, date: "AUG 2025" },
];

function Journal() {
  return (
    <>
      <section className="mx-auto max-w-[1600px] px-6 lg:px-12 pt-24 pb-16 text-center border-b border-border">
        <div className="text-[10px] uppercase tracking-[0.4em] text-gold">Editorial</div>
        <h1 className="mt-6 font-editorial text-5xl md:text-7xl text-ivory">The Journal</h1>
      </section>
      <section className="mx-auto max-w-[1600px] px-6 lg:px-12 py-20 grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {posts.map((p, i) => (
          <Reveal key={p.t} delay={i * 120}>
            <article className="group cursor-pointer">
              <div className="aspect-[4/5] overflow-hidden bg-surface">
                <img src={p.img} alt={p.t} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1400ms] group-hover:scale-[1.08]" />
              </div>
              <div className="mt-6 flex items-center gap-4 text-[10px] uppercase tracking-[0.28em] text-gold">
                <span>{p.c}</span><span className="text-muted-foreground">{p.date}</span>
              </div>
              <h2 className="mt-3 font-editorial text-2xl text-ivory group-hover:text-gold transition-colors">{p.t}</h2>
            </article>
          </Reveal>
        ))}
      </section>
    </>
  );
}
