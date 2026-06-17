import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import medallion from "@/assets/medallion.jpg";

export const Route = createFileRoute("/circle")({
  head: () => ({
    meta: [
      { title: "The Medallion Circle — Fifth Plain" },
      { name: "description", content: "An invitation-only membership for early access, exclusive drops, and private events." },
      { property: "og:title", content: "The Medallion Circle — Fifth Plain" },
      { property: "og:url", content: "/circle" },
    ],
    links: [{ rel: "canonical", href: "/circle" }],
  }),
  component: Circle,
});

const benefits = [
  { t: "Early Access", d: "First viewing of every collection, 72 hours before public release." },
  { t: "Exclusive Drops", d: "Members-only colorways and Medallion editions." },
  { t: "Private Fragrances", d: "Annual member-only flacon, blended in Grasse." },
  { t: "Loyalty Rewards", d: "Quietly compounding — never expiring." },
  { t: "VIP Events", d: "Atelier visits, dinners, and private viewings worldwide." },
  { t: "Concierge", d: "A direct line to your personal client advisor." },
];

function Circle() {
  return (
    <>
      <section className="relative min-h-[80svh] -mt-16 lg:-mt-20 overflow-hidden bg-background">
        <img src={medallion} alt="" className="absolute inset-0 h-full w-full object-cover opacity-30 slow-zoom" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 to-background" />
        <div className="relative z-10 mx-auto max-w-[1200px] px-6 min-h-[80svh] flex flex-col items-center justify-center text-center pt-32 pb-20">
          <div className="reveal">
            <div className="text-[10px] uppercase tracking-[0.4em] text-gold">By Invitation</div>
            <h1 className="mt-8 font-display text-5xl md:text-7xl lg:text-8xl text-ivory leading-[0.95]">
              The <span className="gold-text">Medallion</span><br />Circle
            </h1>
            <p className="mt-8 font-editorial italic text-xl md:text-2xl text-ivory/80 max-w-xl mx-auto">
              A quiet membership for those who recognize the work behind the object.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 lg:px-12 py-32">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
          {benefits.map((b, i) => (
            <Reveal key={b.t} delay={(i % 3) * 100}>
              <div className="bg-background p-12 h-full hover:bg-surface transition-colors duration-500">
                <div className="font-display gold-text text-2xl">{String(i + 1).padStart(2, "0")}</div>
                <h3 className="mt-8 font-editorial text-2xl text-ivory">{b.t}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{b.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-t border-gold/30">
        <div className="mx-auto max-w-xl px-6 py-32 text-center">
          <Reveal>
            <h2 className="font-display text-3xl md:text-4xl text-ivory">Request an invitation</h2>
            <p className="mt-4 text-muted-foreground">Applications reviewed quarterly.</p>
            <form className="mt-10 space-y-4 text-left">
              <input className="w-full bg-transparent border-b border-border focus:border-gold py-3 outline-none text-sm" placeholder="Full name" />
              <input className="w-full bg-transparent border-b border-border focus:border-gold py-3 outline-none text-sm" placeholder="Email" type="email" />
              <textarea rows={4} className="w-full bg-transparent border-b border-border focus:border-gold py-3 outline-none text-sm resize-none" placeholder="A few words on why you'd like to join" />
              <button className="w-full mt-6 border border-gold text-gold py-4 text-[11px] uppercase tracking-[0.3em] hover:bg-gold hover:text-background transition-colors">Submit Application</button>
            </form>
          </Reveal>
        </div>
      </section>
    </>
  );
}
