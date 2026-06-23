import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ShoppingBag, Search, Menu } from "lucide-react";

const links = [
  { to: "/shop", label: "Shop" },
  { to: "/medallion", label: "The Medallion" },
  { to: "/shop", label: "Fragrance Lab", search: { category: "Fragrance" } },
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
          <nav className="hidden lg:flex items-center gap-8 text-[10px] uppercase tracking-[0.28em] text-foreground/70 whitespace-nowrap">
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
          <Link to="/cart" aria-label="Cart" className="relative hover:text-accent transition-colors">
            <ShoppingBag className="h-4 w-4" />
            <span className="absolute -top-1.5 -right-2 text-[9px] font-medium text-accent">2</span>
          </Link>
        </div>
      </div>

      {/* Mobile dropdown panel */}
      {open && (
        <div
          className="absolute top-full left-0 right-0 z-40 bg-background border-b border-border shadow-lg lg:hidden reveal overflow-y-auto max-h-[calc(100vh-4rem)]"
          role="menu"
          aria-label="Mobile navigation"
        >
          <nav className="px-6 py-8 flex flex-col gap-5">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="font-display text-xl leading-relaxed tracking-wide text-foreground hover:text-accent transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
