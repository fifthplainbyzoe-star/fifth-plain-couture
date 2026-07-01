import { Link } from "@tanstack/react-router";
import { useState } from "react";

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  badge?: string;
}

export function ProductCard({ p }: { p: Product }) {
  const isAurelia = p.id === "aurelia-skirt";
  const [notifyMsg, setNotifyMsg] = useState("");

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
          className={`h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-[1.06] ${isAurelia ? "blur-md grayscale opacity-60" : ""}`}
        />
        {p.badge && !isAurelia && (
          <span className="absolute top-4 left-4 text-[10px] uppercase tracking-[0.28em] bg-background/70 backdrop-blur px-3 py-1.5 text-gold border border-gold/40">
            {p.badge}
          </span>
        )}
        {isAurelia ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/50 backdrop-blur-sm">
            <p className="font-display text-2xl md:text-3xl gold-text">Coming Soon</p>
            <p className="mt-2 text-muted-foreground text-sm tracking-widest">( TBA )</p>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setNotifyMsg("We will let you know when The Aurelia is available.");
              }}
              className="mt-6 border border-gold text-gold px-6 py-2 text-[10px] uppercase tracking-[0.3em] hover:bg-gold hover:text-background transition-colors"
            >
              Notify Me
            </button>
            {notifyMsg && (
              <p className="mt-3 text-xs text-gold">{notifyMsg}</p>
            )}
          </div>
        ) : (
          <div className="absolute inset-x-4 bottom-4 translate-y-3 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
            <button className="w-full bg-ivory text-background text-[11px] uppercase tracking-[0.28em] py-3 hover:bg-gold transition-colors">
              Quick Add
            </button>
          </div>
        )}
      </div>
      <div className="mt-4 grid grid-cols-[1fr_auto] gap-3 items-baseline">
        <div className="min-w-0">
          <div className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">{p.category}</div>
          <div className="mt-1 font-editorial text-lg text-ivory truncate">{p.name}</div>
        </div>
        <div className="text-sm text-ivory shrink-0">
          {p.category === "Fragrance" ? "From " : ""}R{p.price.toLocaleString()}
        </div>
      </div>
    </Link>
  );
}
