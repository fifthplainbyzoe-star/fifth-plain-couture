import { Link } from "@tanstack/react-router";

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  badge?: string;
}

export function ProductCard({ p }: { p: Product }) {
  return (
    <Link
      to="/shop/$id"
      params={{ id: p.id }}
      className="group block"
    >
      <div className="relative overflow-hidden bg-surface aspect-[4/5]">
        <img
          src={p.image}
          alt={p.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-[1.06]"
        />
        {p.badge && (
          <span className="absolute top-4 left-4 text-[10px] uppercase tracking-[0.28em] bg-background/70 backdrop-blur px-3 py-1.5 text-gold border border-gold/40">
            {p.badge}
          </span>
        )}
        <div className="absolute inset-x-4 bottom-4 translate-y-3 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
          <button className="w-full bg-ivory text-background text-[11px] uppercase tracking-[0.28em] py-3 hover:bg-gold transition-colors">
            Quick Add
          </button>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-[1fr_auto] gap-3 items-baseline">
        <div className="min-w-0">
          <div className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">{p.category}</div>
          <div className="mt-1 font-editorial text-lg text-ivory truncate">{p.name}</div>
        </div>
        <div className="text-sm text-ivory shrink-0">${p.price.toLocaleString()}</div>
      </div>
    </Link>
  );
}
