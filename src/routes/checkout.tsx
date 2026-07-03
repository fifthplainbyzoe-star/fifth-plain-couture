import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { Check, Shield, Smartphone, Building2, CreditCard, Landmark } from "lucide-react";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — Fifth Plain" }, { name: "robots", content: "noindex" }] }),
  component: Checkout,
});

type Method = "payshap" | "eft" | "ozow" | "card";

function Checkout() {
  const { items, subtotal, clear } = useCart();
  const navigate = useNavigate();
  const [method, setMethod] = useState<Method>("payshap");
  const [identifier, setIdentifier] = useState("");
  const [idType, setIdType] = useState<"phone" | "shapid">("phone");
  const [processing, setProcessing] = useState(false);
  const [done, setDone] = useState<string | null>(null);
  const [error, setError] = useState("");

  if (items.length === 0 && !done) {
    return (
      <section className="mx-auto max-w-[700px] px-6 py-24 text-center">
        <h1 className="font-editorial text-3xl text-ivory">Nothing to check out</h1>
        <Link to="/shop" className="mt-8 inline-block border border-gold text-gold px-8 py-3 text-[11px] uppercase tracking-[0.28em] hover:bg-gold hover:text-background transition-colors">Enter The Shop</Link>
      </section>
    );
  }

  const total = subtotal;

  const validatePayShap = () => {
    const v = identifier.trim();
    if (idType === "phone") {
      const digits = v.replace(/[\s-]/g, "");
      if (!/^(\+?27|0)[6-8][0-9]{8}$/.test(digits)) return "Enter a valid South African cell number.";
    } else {
      if (!/^[a-zA-Z0-9._-]{3,30}$/.test(v)) return "Enter a valid ShapID (3–30 characters).";
    }
    return "";
  };

  const handlePay = () => {
    setError("");
    if (method === "payshap") {
      const err = validatePayShap();
      if (err) { setError(err); return; }
    }
    setProcessing(true);
    setTimeout(() => {
      const ref = "FP-" + Math.random().toString(36).slice(2, 8).toUpperCase();
      setDone(ref);
      clear();
      setProcessing(false);
    }, 1400);
  };

  if (done) {
    return (
      <section className="mx-auto max-w-[640px] px-6 py-24 text-center">
        <div className="mx-auto w-16 h-16 rounded-full border border-gold flex items-center justify-center">
          <Check className="w-7 h-7 text-gold" />
        </div>
        <div className="mt-8 text-[10px] uppercase tracking-[0.32em] text-gold">Payment Confirmed</div>
        <h1 className="mt-3 font-editorial text-4xl text-ivory">Thank you</h1>
        <p className="mt-6 text-muted-foreground">Your order has been received and is being prepared in our Florence atelier.</p>
        <div className="mt-8 inline-block border border-border px-6 py-4 text-left">
          <div className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">Reference</div>
          <div className="mt-1 font-editorial text-xl text-gold">{done}</div>
        </div>
        <div className="mt-10 flex gap-3 justify-center">
          <Link to="/shop" className="border border-gold text-gold px-8 py-3 text-[11px] uppercase tracking-[0.28em] hover:bg-gold hover:text-background transition-colors">Continue</Link>
          <button onClick={() => navigate({ to: "/" })} className="border border-border text-ivory px-8 py-3 text-[11px] uppercase tracking-[0.28em] hover:border-ivory">Home</button>
        </div>
      </section>
    );
  }

  const methods: { id: Method; label: string; sub: string; icon: typeof Smartphone; badge?: string }[] = [
    { id: "payshap", label: "PayShap", sub: "Instant Bank Pay · SA", icon: Smartphone, badge: "Recommended" },
    { id: "eft", label: "Instant EFT", sub: "Capitec · FNB · Standard · Nedbank · Absa", icon: Landmark },
    { id: "ozow", label: "Ozow", sub: "Secure open banking", icon: Building2 },
    { id: "card", label: "Card", sub: "Visa · Mastercard (ZAR)", icon: CreditCard },
  ];

  return (
    <section className="mx-auto max-w-[1400px] px-6 lg:px-12 py-16 grid lg:grid-cols-[1.4fr_1fr] gap-16">
      <div>
        <div className="text-[10px] uppercase tracking-[0.32em] text-gold">Checkout</div>
        <h1 className="mt-3 font-editorial text-4xl md:text-5xl text-ivory">Complete your order</h1>

        <div className="mt-10">
          <h2 className="font-display text-sm tracking-[0.28em] text-ivory">SOUTH AFRICAN PAYMENT OPTIONS</h2>
          <p className="mt-2 text-xs text-muted-foreground">Pay in Rand from any local bank. All transactions are secured end-to-end.</p>

          <div className="mt-6 grid sm:grid-cols-2 gap-3">
            {methods.map((m) => {
              const Icon = m.icon;
              const active = method === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => setMethod(m.id)}
                  className={`text-left p-5 border transition-all ${
                    active ? "border-gold bg-gold/5" : "border-border hover:border-ivory/50"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 flex items-center justify-center border ${active ? "border-gold text-gold" : "border-border text-ivory"}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className={`font-editorial text-lg ${active ? "text-gold" : "text-ivory"}`}>{m.label}</div>
                        <div className="text-[10px] uppercase tracking-[0.24em] text-muted-foreground mt-0.5">{m.sub}</div>
                      </div>
                    </div>
                    {m.badge && (
                      <span className="text-[9px] uppercase tracking-[0.24em] text-gold border border-gold/50 px-2 py-1">{m.badge}</span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* PayShap panel */}
        {method === "payshap" && (
          <div className="mt-10 border border-gold/40 bg-gradient-to-br from-gold/5 to-transparent p-8">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[10px] uppercase tracking-[0.32em] text-gold">PayShap</div>
                <div className="mt-2 font-editorial text-2xl text-ivory">Instant Bank Pay</div>
              </div>
              <div className="text-right">
                <div className="text-[10px] uppercase tracking-[0.24em] text-muted-foreground">Powered by</div>
                <div className="font-display text-sm tracking-[0.28em] text-gold">BANKSERV · SA</div>
              </div>
            </div>

            <p className="mt-5 text-sm text-muted-foreground leading-relaxed">
              Pay instantly from any South African bank account using your registered cell number or ShapID.
              No card details required. Funds clear in seconds.
            </p>

            <div className="mt-8">
              <div className="inline-flex border border-border p-1">
                <button
                  onClick={() => { setIdType("phone"); setIdentifier(""); setError(""); }}
                  className={`px-4 py-2 text-[10px] uppercase tracking-[0.28em] transition-colors ${idType === "phone" ? "bg-gold text-background" : "text-ivory hover:text-gold"}`}
                >
                  Cell Number
                </button>
                <button
                  onClick={() => { setIdType("shapid"); setIdentifier(""); setError(""); }}
                  className={`px-4 py-2 text-[10px] uppercase tracking-[0.28em] transition-colors ${idType === "shapid" ? "bg-gold text-background" : "text-ivory hover:text-gold"}`}
                >
                  ShapID
                </button>
              </div>

              <div className="mt-4">
                <label className="text-[10px] uppercase tracking-[0.28em] text-ivory">
                  {idType === "phone" ? "Registered Cell Number" : "Your ShapID"}
                </label>
                <div className="mt-2 flex items-center border border-border focus-within:border-gold bg-background">
                  <span className="px-4 text-muted-foreground text-sm border-r border-border">
                    {idType === "phone" ? "+27" : "@"}
                  </span>
                  <input
                    inputMode={idType === "phone" ? "tel" : "text"}
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder={idType === "phone" ? "82 123 4567" : "yourname"}
                    className="flex-1 bg-transparent px-4 py-3 text-ivory outline-none text-sm"
                  />
                </div>
                {error && <p className="mt-2 text-xs text-red-400">{error}</p>}
              </div>
            </div>

            <div className="mt-6 flex items-center gap-2 text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
              <Shield className="w-3 h-3 text-gold" />
              Secured by BankservAfrica · 3D-Secure · POPIA compliant
            </div>
          </div>
        )}

        {method !== "payshap" && (
          <div className="mt-10 border border-border p-8 text-center">
            <p className="text-sm text-muted-foreground">
              You will be redirected to a secure {methods.find((m) => m.id === method)?.label} portal to complete payment in Rand.
            </p>
          </div>
        )}
      </div>

      <aside className="lg:sticky lg:top-28 self-start border border-border p-8 bg-surface">
        <h2 className="font-display text-lg tracking-[0.28em] text-ivory">ORDER</h2>
        <ul className="mt-6 space-y-4 max-h-[280px] overflow-y-auto pr-2">
          {items.map((i, idx) => (
            <li key={idx} className="flex gap-3 text-sm">
              <div className="w-14 h-14 bg-background overflow-hidden shrink-0">
                <img src={i.image} alt={i.name} className="h-full w-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-editorial text-ivory truncate">{i.name}</div>
                <div className="text-[10px] uppercase tracking-[0.24em] text-muted-foreground">Qty {i.qty}{i.size ? ` · ${i.size}` : ""}</div>
              </div>
              <div className="text-ivory text-sm">R{(i.price * i.qty).toLocaleString()}</div>
            </li>
          ))}
        </ul>

        <dl className="mt-6 pt-6 border-t border-border space-y-2 text-sm">
          <div className="flex justify-between"><dt className="text-muted-foreground">Subtotal</dt><dd className="text-ivory">R{subtotal.toLocaleString()}</dd></div>
          <div className="flex justify-between"><dt className="text-muted-foreground">Shipping</dt><dd className="text-gold">Complimentary</dd></div>
        </dl>
        <div className="mt-4 pt-4 border-t border-border flex justify-between items-baseline">
          <span className="text-[10px] uppercase tracking-[0.32em] text-gold">Total (ZAR)</span>
          <span className="font-editorial text-2xl text-ivory">R{total.toLocaleString()}</span>
        </div>

        <button
          onClick={handlePay}
          disabled={processing}
          className="mt-6 w-full bg-gold text-background py-4 text-[11px] uppercase tracking-[0.3em] hover:bg-ivory transition-colors disabled:opacity-60 disabled:cursor-wait"
        >
          {processing ? "Processing…" : method === "payshap" ? `Pay R${total.toLocaleString()} with PayShap` : `Pay R${total.toLocaleString()}`}
        </button>
        <Link to="/cart" className="mt-3 block text-center text-[11px] uppercase tracking-[0.28em] text-muted-foreground hover:text-ivory">Back to Atelier</Link>

        <p className="mt-6 text-[10px] uppercase tracking-[0.24em] text-muted-foreground text-center">
          Prices in ZAR · VAT included
        </p>
      </aside>
    </section>
  );
}
