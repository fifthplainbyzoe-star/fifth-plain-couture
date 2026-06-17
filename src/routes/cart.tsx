import { createFileRoute, Link } from "@tanstack/react-router";
import { products } from "@/lib/products";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Atelier — Fifth Plain" }, { name: "robots", content: "noindex" }] }),
  component: Cart,
});

function Cart() {
  const items = products.slice(0, 2).map((p) => ({ ...p, qty: 1 }));
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <section className="mx-auto max-w-[1400px] px-6 lg:px-12 py-16 grid lg:grid-cols-[1.5fr_1fr] gap-16">
      <div>
        <div className="text-[10px] uppercase tracking-[0.32em] text-gold">Your Atelier</div>
        <h1 className="mt-3 font-editorial text-4xl md:text-5xl text-ivory">Selected pieces</h1>

        <ul className="mt-12 divide-y divide-border border-y border-border">
          {items.map((i) => (
            <li key={i.id} className="py-6 grid grid-cols-[100px_1fr_auto] gap-6 items-center">
              <div className="aspect-square bg-surface overflow-hidden">
                <img src={i.image} alt={i.name} className="h-full w-full object-cover" />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] uppercase tracking-[0.28em] text-gold">{i.category}</div>
                <div className="mt-1 font-editorial text-xl text-ivory truncate">{i.name}</div>
                <div className="mt-2 text-xs text-muted-foreground">Size M · Qty {i.qty}</div>
              </div>
              <div className="text-right">
                <div className="font-editorial text-lg text-ivory">${i.price.toLocaleString()}</div>
                <button className="mt-2 text-[10px] uppercase tracking-[0.28em] text-muted-foreground hover:text-gold">Remove</button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <aside className="lg:sticky lg:top-28 self-start border border-border p-8 bg-surface">
        <h2 className="font-display text-lg tracking-[0.28em] text-ivory">SUMMARY</h2>
        <dl className="mt-8 space-y-3 text-sm">
          <div className="flex justify-between"><dt className="text-muted-foreground">Subtotal</dt><dd className="text-ivory">${subtotal.toLocaleString()}</dd></div>
          <div className="flex justify-between"><dt className="text-muted-foreground">Shipping</dt><dd className="text-gold">Complimentary</dd></div>
          <div className="flex justify-between"><dt className="text-muted-foreground">Taxes</dt><dd className="text-ivory">Calculated at checkout</dd></div>
        </dl>
        <div className="mt-6 pt-6 border-t border-border flex justify-between items-baseline">
          <span className="text-[10px] uppercase tracking-[0.32em] text-gold">Total</span>
          <span className="font-editorial text-2xl text-ivory">${subtotal.toLocaleString()}</span>
        </div>
        <input placeholder="Promo code" className="mt-6 w-full bg-transparent border border-border focus:border-gold px-4 py-3 text-sm outline-none" />
        <button className="mt-4 w-full bg-ivory text-background py-4 text-[11px] uppercase tracking-[0.3em] hover:bg-gold transition-colors">Proceed to Checkout</button>
        <Link to="/shop" className="mt-3 block text-center text-[11px] uppercase tracking-[0.28em] text-muted-foreground hover:text-ivory">Continue Browsing</Link>
      </aside>
    </section>
  );
}
