import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import look from "@/assets/lookbook.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "The Story — Fifth Plain" },
      { name: "description", content: "The story, philosophy and craftsmanship of Fifth Plain." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

function About() {
  return (
    <>
      <section className="relative h-[70svh] overflow-hidden -mt-16 lg:-mt-20">
        <img src={look} alt="" className="absolute inset-0 h-full w-full object-cover opacity-70 slow-zoom" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 to-background" />
        <div className="relative h-full mx-auto max-w-[1600px] px-6 lg:px-12 flex items-end pb-20">
          <Reveal>
            <div className="text-[10px] uppercase tracking-[0.4em] text-gold">The Story</div>
            <h1 className="mt-6 font-display text-5xl md:text-8xl text-ivory leading-[0.95]">Fifth Plain</h1>
          </Reveal>
        </div>
      </section>
      <section className="mx-auto max-w-3xl px-6 py-32">
        <Reveal>
          <p className="font-editorial text-2xl md:text-3xl text-ivory leading-[1.5] text-balance">
            Fifth Plain was founded in 2024 on a single belief — that luxury, at its highest expression, is the discipline of subtraction.
            We design and manufacture only what we cannot stop ourselves from making, in collaboration with ateliers in Florence,
            Grasse, and Paris.
          </p>
          <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-10">
            {[["12", "Atelier hands"], ["3", "Cities of craft"], ["250", "Medallion editions"], ["∞", "Standards"]].map(([n, t]) => (
              <div key={t}>
                <div className="font-display text-4xl gold-text">{n}</div>
                <div className="mt-2 text-[10px] uppercase tracking-[0.28em] text-muted-foreground">{t}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>
    </>
  );
}
