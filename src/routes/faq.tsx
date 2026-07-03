import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Fifth Plain" },
      { name: "description", content: "Frequently asked questions about orders, shipping, returns, and more." },
      { property: "og:title", content: "FAQ — Fifth Plain" },
      { property: "og:url", content: "/faq" },
    ],
    links: [{ rel: "canonical", href: "/faq" }],
  }),
  component: FAQ,
});

const faqs = [
  {
    q: "How long does shipping take?",
    a: "PAXI Store Collection typically takes 2–5 business days to arrive at your selected PEP or Tekkie Town location. The Courier Guy door-to-door delivery ranges from 2–7 business days depending on your location. Once your order ships, you will receive tracking details via email.",
  },
  {
    q: "Do you offer international shipping?",
    a: "Currently, we only ship within South Africa. International shipping is being considered for future releases. Subscribe to our notifications to be the first to know when we expand.",
  },
  {
    q: "What is your return policy?",
    a: "We accept returns within 14 days of delivery for unworn, unwashed items with original tags attached. Fragrances and custom orders are final sale and cannot be returned. To initiate a return, contact our atelier team via the contact form or email.",
  },
  {
    q: "How do I find my correct size?",
    a: "Each product page includes a Size Guide specific to that piece. Our garments are designed with a relaxed, premium fit. If you are between sizes, we recommend sizing up for a more comfortable drape. For personalized advice, reach out to our atelier team.",
  },
  {
    q: "Are your products sustainable?",
    a: "We partner with ateliers in Florence, Grasse, and Paris that share our commitment to responsible craftsmanship. Each piece is made to order in limited quantities, reducing excess production. We prioritize quality over quantity — pieces designed to last for years, not seasons.",
  },
];

function FAQ() {
  return (
    <section className="mx-auto max-w-[900px] px-6 lg:px-12 py-24">
      <div className="text-center">
        <div className="text-[10px] uppercase tracking-[0.32em] text-gold">Support</div>
        <h1 className="mt-3 font-editorial text-4xl md:text-5xl text-ivory">Frequently Asked Questions</h1>
        <p className="mt-6 text-muted-foreground max-w-xl mx-auto">
          Find answers to common questions about orders, shipping, returns, and our atelier.
        </p>
      </div>

      <div className="mt-16 space-y-4">
        {faqs.map((item, i) => (
          <Reveal key={i} delay={i * 80}>
            <details className="group border border-border bg-surface/50 overflow-hidden">
              <summary className="flex items-center justify-between p-6 cursor-pointer list-none text-ivory hover:text-gold transition-colors">
                <span className="font-editorial text-lg pr-8">{item.q}</span>
                <span className="text-gold text-2xl font-light transition-transform duration-300 group-open:rotate-45">+</span>
              </summary>
              <div className="px-6 pb-6 text-muted-foreground leading-relaxed border-t border-border pt-4">
                {item.a}
              </div>
            </details>
          </Reveal>
        ))}
      </div>

      <div className="mt-16 text-center border-t border-border pt-12">
        <p className="text-muted-foreground">Still have questions?</p>
        <a
          href="/contact"
          className="mt-4 inline-block border border-gold text-gold px-8 py-3 text-[11px] uppercase tracking-[0.28em] hover:bg-gold hover:text-background transition-colors"
        >
          Contact the Atelier
        </a>
      </div>
    </section>
  );
}
