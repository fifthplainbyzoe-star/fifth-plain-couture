import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Clock } from "lucide-react";
import runwayImg from "@/assets/contact-runway.jpg";
import runwayVideo from "@/assets/contact-runway.mp4.asset.json";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Fifth Plain" },
      { name: "description", content: "Get in touch with our atelier for inquiries, custom orders, or client services." },
      { property: "og:title", content: "Contact — Fifth Plain" },
      { property: "og:description", content: "Reach the Fifth Plain atelier for orders, sizing, and client services." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

function Contact() {
  return (
    <section className="mx-auto max-w-[1200px] px-6 lg:px-12 py-24">
      {/* Runway visual */}
      <div className="relative overflow-hidden border border-border bg-surface">
        <div className="relative aspect-[16/10] sm:aspect-[16/9] overflow-hidden">
          <video
            src={runwayVideo.url}
            poster={runwayImg}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            aria-label="African model walking the runway in a Fifth Plain heavyweight hoodie as camera flashes fire"
            className="h-full w-full object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/70 via-background/10 to-transparent" />
        </div>

        <div className="relative overflow-hidden border-t border-border py-4">
          <div className="marquee flex w-max whitespace-nowrap text-[10px] uppercase tracking-[0.32em] text-muted-foreground">
            {Array.from({ length: 2 }).map((_, i) => (
              <span key={i} className="flex">
                {["By appointment only", "Johannesburg, South Africa", "Response within 24–48 hours", "Crafted in South Africa"].map((t) => (
                  <span key={t} className="px-8">✦&nbsp;&nbsp;{t}</span>
                ))}
              </span>
            ))}
          </div>
        </div>

      </div>

      {/* Details */}
      <div className="mt-20 grid gap-12 sm:grid-cols-2 lg:grid-cols-4 border-t border-border pt-14">
        <div>
          <MapPin className="w-4 h-4 text-gold" />
          <h3 className="mt-4 font-display text-sm tracking-[0.28em] text-ivory">ATELIER</h3>
          <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
            Fifth Plain is headquartered in Johannesburg, South Africa. Our atelier operates by appointment only,
            ensuring each piece receives the attention it deserves.
          </p>
        </div>

        <div>
          <Mail className="w-4 h-4 text-gold" />
          <h3 className="mt-4 font-display text-sm tracking-[0.28em] text-ivory">EMAIL</h3>
          <a href="mailto:fifthplainbyzoe@gmail.com" className="mt-4 block text-sm text-gold hover:text-ivory transition-colors break-all">
            fifthplainbyzoe@gmail.com
          </a>
        </div>

        <div>
          <Clock className="w-4 h-4 text-gold" />
          <h3 className="mt-4 font-display text-sm tracking-[0.28em] text-ivory">RESPONSE TIME</h3>
          <p className="mt-4 text-sm text-muted-foreground">
            Monday – Friday<br />
            Within 24–48 hours
          </p>
        </div>

        <div>
          <h4 className="text-[11px] uppercase tracking-[0.22em] text-gold">STAY UPDATED</h4>
          <p className="mt-4 text-sm text-muted-foreground">
            Follow the maison for new arrivals, restocks, and exclusive updates.
          </p>
        </div>
      </div>
    </section>
  );
}
