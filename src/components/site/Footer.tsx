import { Link } from "@tanstack/react-router";

const cols = [
  {
    title: "ABOUT\u00a0",
    links: [
      { label: "Our Story", to: "/about" },
      { label: "", to: "/about" },
      { label: "", to: "/about" },
      { label: "", to: "/about" },
    ],
  },
  {
    title: "Shop",
    links: [
      { label: "The Medallion", to: "/medallion" },
      { label: "Fragrance Lab", to: "/fragrance" },
      { label: "", to: "/shop" },
    ],
  },
  {
    title: "Client Services",
    links: [
      { label: "Shipping", to: "/about" },
      { label: "Returns", to: "/about" },
      { label: "", to: "/about" },
      { label: "Contact", to: "/about" },
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
          <div className="mt-8 flex gap-4 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            <a href="#" className="hover:text-gold">Instagram</a>
            <span>·</span>
            <a href="#" className="hover:text-gold">TikTok</a>
            <span>·</span>
            <a href="#" className="hover:text-gold">Pinterest</a>
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
            Receive first access to drops, private events, and members-only fragrance editions.
          </p>
          <form className="mt-6 flex border-b border-border focus-within:border-gold transition-colors">
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground"
            />
            <button className="text-[11px] uppercase tracking-[0.22em] text-gold">Join →</button>
          </form>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-[1600px] px-6 lg:px-12 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          <span>© {new Date().getFullYear()} FIFTH PLAIN. ALL RIGHTS RESERVED.</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gold">Privacy</a>
            <a href="#" className="hover:text-gold">Terms</a>
            <a href="#" className="hover:text-gold">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
