import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { ArrowLeft, Truck, Package, MapPin, RotateCcw } from "lucide-react";

export const Route = createFileRoute("/shipping")({
  head: () => ({
    meta: [
      { title: "Shipping & Returns — Fifth Plain" },
      { name: "description", content: "Shipping rates, delivery timelines, order tracking, and returns policy for Fifth Plain." },
      { property: "og:title", content: "Shipping & Returns — Fifth Plain" },
      { property: "og:description", content: "Shipping rates, delivery timelines, order tracking, and returns policy for Fifth Plain." },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "canonical", href: "/shipping" },
      { rel: "og:url", href: "/shipping" },
    ],
  }),
  component: Shipping,
});

const sections = [
  {
    icon: Truck,
    title: "Shipping Rates & Timelines",
    items: [
      { label: "PAXI Store Collection", detail: "R60: 5–10 business days to your selected PEP or Tekkie Town location." },
      { label: "Courier Guy Standard", detail: "R120: 7–14 business days." },
      { label: "Courier Guy Express", detail: "R250: Door-to-door delivery, 7–14 business days." },
      { label: "Heavy Regional Door Delivery Express", detail: "Price varies depending on distance, the further the destination, the higher the rate." },
    ],
  },
  {
    icon: Package,
    title: "Order Processing",
    items: [
      { label: "Dispatch Window", detail: "All orders are processed and dispatched within 24–48 hours of payment confirmation." },
      { label: "Cut-off Time", detail: "Orders placed before 12:00 PM are prioritised for same-day processing where possible." },
      { label: "Weekends & Holidays", detail: "Orders placed over weekends or public holidays are processed on the next business day." },
    ],
  },
  {
    icon: MapPin,
    title: "Order Tracking",
    items: [
      { label: "Tracking Link", detail: "A tracking link is emailed to you automatically as soon as your parcel is dispatched." },
      { label: "Updates", detail: "You will receive status updates at key milestones: dispatched, in transit, and out for delivery." },
      { label: "Support", detail: "If you do not receive your tracking information within 48 hours, please contact our atelier team." },
    ],
  },
  {
    icon: RotateCcw,
    title: "Returns & Exchanges Policy",
    items: [
      { label: "All Sales Final", detail: "We do not accept returns or exchanges. Every piece is made to order in limited quantities, ensuring the highest level of craftsmanship and exclusivity." },
      { label: "Damaged Goods", detail: "In the rare event that your order arrives damaged, please contact us within 48 hours of delivery with photographic evidence." },
      { label: "Sizing Concerns", detail: "We encourage you to review our size guides carefully before placing your order. For personalised guidance, reach out to our team prior to purchase." },
    ],
  },
];

function Shipping() {
  return (
    <section className="mx-auto max-w-[900px] px-6 lg:px-12 py-24">
      <Reveal>
        <div className="flex items-center gap-4 mb-12">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-gold hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Shop
          </Link>
        </div>
      </Reveal>

      <div className="text-center">
        <div className="text-[10px] uppercase tracking-[0.32em] text-gold">Client Services</div>
        <h1 className="mt-3 font-editorial text-4xl md:text-5xl text-ivory">Shipping & Returns</h1>
        <p className="mt-6 text-muted-foreground max-w-xl mx-auto">
          Transparent timelines, straightforward rates, and policies designed with care.
        </p>
      </div>

      <div className="mt-20 space-y-16">
        {sections.map((section, i) => (
          <Reveal key={section.title} delay={i * 100}>
            <div className="border border-border bg-surface/40">
              <div className="flex items-center gap-4 px-6 pt-6">
                <section.icon className="w-5 h-5 text-gold" strokeWidth={1.5} />
                <h2 className="font-editorial text-2xl text-ivory">{section.title}</h2>
              </div>
              <div className="mt-6 divide-y divide-border/60">
                {section.items.map((item) => (
                  <div key={item.label} className="px-6 py-5 flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-8">
                    <span className="text-sm text-ivory font-medium sm:w-56 shrink-0">{item.label}</span>
                    <span className="text-sm text-muted-foreground leading-relaxed">{item.detail}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-20 text-center border-t border-border pt-12">
        <p className="text-muted-foreground">Need further assistance?</p>
        <Link
          to="/contact"
          className="mt-4 inline-block border border-gold text-gold px-8 py-3 text-[11px] uppercase tracking-[0.28em] hover:bg-gold hover:text-background transition-colors"
        >
          Contact the Atelier
        </Link>
      </div>
    </section>
  );
}
