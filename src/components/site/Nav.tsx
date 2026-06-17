import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ShoppingBag, Search, User, Menu, X } from "lucide-react";

const links = [
  { to: "/shop", label: "Shop" },
  { to: "/medallion", label: "The Medallion" },
  { to: "/fragrance", label: "Fragrance Lab" },
  { to: "/circle", label: "THE PLOT" },
  { to: "/journal", label: "Journal" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-xl bg-background/85 border-b border-border"
          : "bg-background/60 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto max-w-[1600px] px-6 lg:px-12 h-16 lg:h-20 grid grid-cols-[1fr_auto_1fr] items-center gap-6">
        <div className="flex items-center gap-8 min-w-0">
          <button
            aria-label="Menu"
            onClick={() => setOpen(true)}
            className="lg:hidden text-foreground"
          >
            <Menu className="h-5 w-5" />
          </button>
          <nav className="hidden lg:flex items-center gap-7 text-[10px] uppercase tracking-[0.28em] text-foreground/70">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="hover:text-foreground transition-colors duration-300"
                activeProps={{ className: "text-foreground" }}
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        <Link
          to="/"
          className="font-display text-lg lg:text-xl tracking-[0.32em] text-foreground justify-self-center"
        >
          FIFTH&nbsp;PLAIN
        </Link>

        <div className="flex items-center gap-5 text-foreground justify-self-end">
          <button aria-label="Search" className="hover:text-accent transition-colors">
            <Search className="h-4 w-4" />
          </button>
          <Link to="/account" aria-label="Account" className="hover:text-accent transition-colors hidden sm:inline">
            <User className="h-4 w-4" />
          </Link>
          <Link to="/cart" aria-label="Cart" className="relative hover:text-accent transition-colors">
            <ShoppingBag className="h-4 w-4" />
            <span className="absolute -top-1.5 -right-2 text-[9px] font-medium text-accent">2</span>
          </Link>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 bg-background lg:hidden reveal">
          <div className="h-16 px-6 flex items-center justify-between border-b border-border">
            <span className="font-display tracking-[0.32em] text-ivory">FIFTH&nbsp;PLAIN</span>
            <button onClick={() => setOpen(false)} aria-label="Close"><X className="h-5 w-5" /></button>
          </div>
          <nav className="p-8 flex flex-col gap-6 font-editorial text-3xl">
            {links.map((l) => (
              <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="hover:text-gold">
                {l.label}
              </Link>
            ))}
            <Link to="/account" onClick={() => setOpen(false)} className="hover:text-gold">Account</Link>
          </nav>
        </div>
      )}
    </header>
  );
}
