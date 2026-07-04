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
      <section className="mx-auto max-w-3xl px-6 py-32 space-y-16">
        <Reveal>
          <div className="space-y-10">
            <h2 className="font-editorial text-3xl md:text-4xl text-ivory leading-[1.2]">Our Story</h2>
            <div className="space-y-6 text-ivory/80 leading-[1.7]">
              <p className="font-editorial text-xl md:text-2xl text-ivory leading-[1.5]">
                Welcome to Fifth Plain.
              </p>
              <p>
                Established in 2026, Fifth Plain was born out of a simple, powerful realization: great design shouldn’t just look good, it should serve a purpose. We are a multi-disciplinary creative studio and lifestyle brand built to bridge the gap between high-end aesthetic vision and functional execution.
              </p>
              <p>
                At our core, we are problem solvers for creators, businesses, and individuals who value intentionality. Whether you are looking to build a commanding brand identity, source premium streetwear, step up your corporate apparel game, or curate high-end, thoughtful gifts, Fifth Plain is where your ideas find their perfect form. We don’t just deliver products; we design the solutions that help you stand out.
              </p>
            </div>
          </div>
        </Reveal>
        <Reveal>
          <div className="space-y-10">
            <h2 className="font-editorial text-3xl md:text-4xl text-ivory leading-[1.2]">The Ecosystem & The Medallion</h2>
            <p className="text-ivory/80 leading-[1.7]">
              Because we believe in pushing boundaries, our ecosystem expanded to meet the demand for ultimate exclusivity. That passion led to the birth of our sub-brand, The Medallion. Conceived as an ultra-minimalist, heavyweight apparel line, The Medallion represents exactly what its name implies: victory, milestone wins, and the celebration of the journey. It was created for those who appreciate premium, functional luxury and want their style to reflect their standard of success.
            </p>
          </div>
        </Reveal>
        <Reveal>
          <div className="space-y-10">
            <h2 className="font-editorial text-3xl md:text-4xl text-ivory leading-[1.2]">How We Solve Your Problems</h2>
            <div className="space-y-6 text-ivory/80 leading-[1.7]">
              <p>
                <strong className="text-ivory">For Brands & Businesses:</strong> We cut through the noise. From web design to complete brand strategy, we give your business a sharp, cohesive digital and visual footprint that converts.
              </p>
              <p>
                <strong className="text-ivory">For Communities & Corporates:</strong> We eliminate the guesswork of apparel sourcing. We provide expertly curated, heavyweight, and premium quality street and corporate wear that people actually want to wear.
              </p>
              <p>
                <strong className="text-ivory">For Gifting:</strong> We elevate the art of appreciation. Our premium curation services take the stress out of gifting, leaving a lasting impression on your clients or loved ones.
              </p>
            </div>
          </div>
        </Reveal>
        <Reveal>
          <p className="font-editorial text-xl md:text-2xl text-ivory leading-[1.5]">
            Fifth Plain is more than a brand, it’s a collaborative space designed to elevate your lifestyle and your business. Let’s build your next victory together.
          </p>
        </Reveal>
      </section>
    </>
  );
}
