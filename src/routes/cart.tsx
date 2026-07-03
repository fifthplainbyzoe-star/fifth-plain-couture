import { createFileRoute, Link } from "@tanstack/react-router";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Atelier — Fifth Plain" }, { name: "robots", content: "noindex" }] }),
  component: Cart,
});

function Cart() {
  const { items, subtotal, remove, setQty, keyOf } = useCart();

  if (items.length === 0) {
    return (
      <section className="mx-auto max-w-[900px] px-6 lg:px-12 py-24 text-center">
        <div className="text-[10px] uppercase tracking-[0.32em] text-gold">Your Atelier</div>
        <h1 className="mt-3 font-editorial text-4xl md:text-5xl text-ivory">Your selection is empty</h1>
        <p className="mt-6 text-muted-foreground">Begin composing your edit from the collection.</p>
        <Link to="/shop" className="mt-10 inline-block border border-gold text-gold px-10 py-4 text-[11px] uppercase tracking-[0.3em] hover:bg-gold hover:text-background transition-colors">Enter The Shop</Link>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-[1400px] px-6 lg:px-12 py-16 grid lg:grid-cols-[1.5fr_1fr] gap-16">
      <div>
        <div className="text-[10px] uppercase tracking-[0.32em] text-gold">Your Atelier</div>
        <h1 className="mt-3 font-editorial text-4xl md:text-5xl text-ivory">Selected pieces</h1>

        <ul className="mt-12 divide-y divide-border border-y border-border">
          {items.map((i) => {
            const k = keyOf(i);
            return (
              <li key={k} className="py-6 grid grid-cols-[100px_1fr_auto] gap-6 items-center">
                <div className="aspect-square bg-surface overflow-hidden">
                  <img src={i.image} alt={i.name} className="h-full w-full object-cover" />
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] uppercase tracking-[0.28em] text-gold">{i.category}</div>
                  <div className="mt-1 font-editorial text-xl text-ivory truncate">{i.name}</div>
                  <div className="mt-2 text-xs text-muted-foreground">
                    {i.size && <span>{i.size}</span>}
                    {i.color && <span> · {i.color}</span>}
                  </div>
                  <div className="mt-3 inline-flex items-center border border-border">
                    <button onClick={() => setQty(k, i.qty - 1)} className="w-8 h-8 text-ivory hover:text-gold">−</button>
                    <span className="w-8 text-center text-sm text-ivory">{i.qty}</span>
                    <button onClick={() => setQty(k, i.qty + 1)} className="w-8 h-8 text-ivory hover:text-gold">+</button>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-editorial text-lg text-ivory">R{(i.price * i.qty).toLocaleString()}</div>
                  <button onClick={() => remove(k)} className="mt-2 text-[10px] uppercase tracking-[0.28em] text-muted-foreground hover:text-gold">Remove</button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <aside className="lg:sticky lg:top-28 self-start border border-border p-8 bg-surface">
        <h2 className="font-display text-lg tracking-[0.28em] text-ivory">SUMMARY</h2>
        <dl className="mt-8 space-y-3 text-sm">
          <div className="flex justify-between"><dt className="text-muted-foreground">Subtotal</dt><dd className="text-ivory">R{subtotal.toLocaleString()}</dd></div>
          <div className="flex justify-between"><dt className="text-muted-foreground">Shipping</dt><dd className="text-gold">Calculated at checkout</dd></div>
          <div className="flex justify-between"><dt className="text-muted-foreground">Taxes</dt><dd className="text-ivory">R0</dd></div>
        </dl>
        <div className="mt-6 pt-6 border-t border-border flex justify-between items-baseline">
          <span className="text-[10px] uppercase tracking-[0.32em] text-gold">Total</span>
          <span className="font-editorial text-2xl text-ivory">R{subtotal.toLocaleString()}</span>
        </div>
        <Link to="/checkout" className="mt-6 block text-center bg-ivory text-background py-4 text-[11px] uppercase tracking-[0.3em] hover:bg-gold transition-colors">Proceed to Checkout</Link>
        <Link to="/shop" className="mt-3 block text-center text-[11px] uppercase tracking-[0.28em] text-muted-foreground hover:text-ivory">Continue Browsing</Link>
      </aside>
    </section>
  );
}
