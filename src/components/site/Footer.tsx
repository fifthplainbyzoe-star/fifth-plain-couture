import { Link } from "@tanstack/react-router";
import { Instagram } from "lucide-react";

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.88-2.89 2.89 2.89 0 0 1 2.88-2.88c.31 0 .61.05.89.14v-3.5a6.37 6.37 0 0 0-.89-.06A6.34 6.34 0 0 0 2.6 15.57a6.34 6.34 0 0 0 6.33 6.33 6.34 6.34 0 0 0 6.33-6.33V8.73a8.18 8.18 0 0 0 4.77 1.53V6.82a4.85 4.85 0 0 1-1.44-.13z" />
    </svg>
  );
}

const cols = [
  {
    title: "ABOUT",
    links: [
      { label: "Our Story", to: "/about" },
    ],
  },
  {
    title: "Shop",
    links: [
      { label: "The Medallion", to: "/medallion" },
      { label: "Fragrance Lab", to: "/shop" },
    ],
  },
  {
    title: "Client Services",
    links: [
      { label: "Shipping", to: "/shipping" },
      { label: "FAQ", to: "/faq" },
      { label: "Contact", to: "/contact" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-12 py-20 grid gap-12 lg:grid-cols-[1.4fr_2fr_1fr]">
        <div>
          <div className="font-display text-xl tracking-[0.32em] text-ivory">FIFTH PLAIN</div>
          <p className="mt-6 text-sm text-muted-foreground max-w-sm leading-relaxed">
            A ship of timeless design, elevated essentials, and premium craftsmanship.
            Headquartered in Johannesburg, South Africa.
          </p>
          <div className="mt-8 flex gap-4 text-muted-foreground">
            <a href="https://www.instagram.com/_fifthplaindigitals_/" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="https://www.tiktok.com/@fifthplainbyzoe?is_from_webapp=1&sender_device=pc" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">
              <TikTokIcon className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {cols.map((c) => (
            <div key={c.title}>
              <h4 className="text-[11px] uppercase tracking-[0.22em] text-gold">{c.title}</h4>
              <ul className="mt-6 space-y-3 text-sm text-ivory/80">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className="hover:text-gold transition-colors">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div>
          <h4 className="text-[11px] uppercase tracking-[0.22em] text-gold">THE PLOT</h4>
          <p className="mt-6 text-sm text-muted-foreground">
            Receive notifications about new updates
          </p>
          <form className="mt-6 flex border-b border-border focus-within:border-gold transition-colors">
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground"
            />
            <button className="text-[11px] uppercase tracking-[0.22em] text-gold">Join</button>
          </form>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-[1600px] px-6 lg:px-12 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          <span>© {new Date().getFullYear()} FIFTH PLAIN. ALL RIGHTS RESERVED.</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gold">Privacy</a>
            <a href="#" className="hover:text-gold">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
