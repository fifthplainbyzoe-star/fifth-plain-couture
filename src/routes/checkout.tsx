import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { Check, Shield, Smartphone, Building2, CreditCard, Landmark, MapPin, Truck, Package, Zap } from "lucide-react";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — Fifth Plain" }, { name: "robots", content: "noindex" }] }),
  component: Checkout,
});

type Method = "payshap" | "eft" | "ozow" | "card";
type ShippingCarrier = "paxi" | "courier";
type ShippingOption = "paxi-standard" | "paxi-large" | "courier-standard" | "courier-express";

interface ShippingMethod {
  id: ShippingOption;
  carrier: ShippingCarrier;
  label: string;
  sub: string;
  price: number;
  icon: typeof MapPin;
}

function Checkout() {
  const { items, subtotal, clear } = useCart();
  const navigate = useNavigate();
  const [method, setMethod] = useState<Method>("payshap");
  const [shippingOption, setShippingOption] = useState<ShippingOption>("paxi-standard");
  const [identifier, setIdentifier] = useState("");
  const [idType, setIdType] = useState<"phone" | "shapid">("phone");
  const [processing, setProcessing] = useState(false);
  const [done, setDone] = useState<string | null>(null);
  const [error, setError] = useState("");

  const [paxiCode, setPaxiCode] = useState("");
  const [shippingAddress, setShippingAddress] = useState({
    street: "",
    suburb: "",
    city: "",
    province: "",
    postalCode: "",
  });

  const shippingMethods: ShippingMethod[] = [
    { id: "paxi-standard", carrier: "paxi", label: "PAXI Standard Bag", sub: "PEP Counter-to-Counter · 7-9 Days · Max 5kg", price: 60, icon: Package },
    { id: "paxi-large", carrier: "paxi", label: "PAXI Large Bag", sub: "PEP Counter-to-Counter · 7-9 Days · Max 10kg", price: 100, icon: Package },
    { id: "courier-standard", carrier: "courier", label: "The Courier Guy Standard", sub: "Door-to-Door · 2-3 Days", price: 120, icon: Truck },
    { id: "courier-express", carrier: "courier", label: "The Courier Guy Express", sub: "Heavy / Regional Door Delivery · Express", price: 200, icon: Zap },
  ];

  const selectedShipping = shippingMethods.find((s) => s.id === shippingOption)!;
  const currentCarrier = selectedShipping.carrier;
  const isCourierFreeShipping = subtotal >= 200 && currentCarrier === "courier";
  const shippingCost = isCourierFreeShipping ? 0 : selectedShipping.price;
  const total = subtotal + shippingCost;

  if (items.length === 0 && !done) {
    return (
      <section className="mx-auto max-w-[700px] px-6 py-24 text-center">
        <h1 className="font-editorial text-3xl text-ivory">Nothing to check out</h1>
        <Link to="/shop" className="mt-8 inline-block border border-gold text-gold px-8 py-3 text-[11px] uppercase tracking-[0.28em] hover:bg-gold hover:text-background transition-colors">Enter The Shop</Link>
      </section>
    );
  }

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
      const rand = typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID().replace(/-/g, "").slice(0, 6).toUpperCase()
        : Date.now().toString(36).slice(-6).toUpperCase();
      const ref = "DEMO-" + rand;
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
        <div className="mt-8 text-[10px] uppercase tracking-[0.32em] text-gold">Demo Order Simulated</div>
        <h1 className="mt-3 font-editorial text-4xl text-ivory">Preview only</h1>
        <p className="mt-6 text-muted-foreground">
          No payment was processed and no order was placed. This checkout is a design preview —
          your details were not stored or transmitted. A live payment gateway has not been connected yet.
        </p>
        <div className="mt-8 inline-block border border-border px-6 py-4 text-left">
          <div className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">Demo reference</div>
          <div className="mt-1 font-editorial text-xl text-gold">{done}</div>
        </div>
        <div className="mt-10 flex gap-3 justify-center">
          <Link to="/shop" className="border border-gold text-gold px-8 py-3 text-[11px] uppercase tracking-[0.28em] hover:bg-gold hover:text-background transition-colors">Continue</Link>
          <button onClick={() => navigate({ to: "/" })} className="border border-border text-ivory px-8 py-3 text-[11px] uppercase tracking-[0.28em] hover:border-ivory">Home</button>
        </div>
      </section>
    );
  }

  const paymentMethods: { id: Method; label: string; sub: string; icon: typeof Smartphone; badge?: string }[] = [
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

        {/* Demo notice — no live payment gateway is connected */}
        <div className="mt-6 border border-gold/40 bg-gold/5 px-5 py-4">
          <div className="text-[10px] uppercase tracking-[0.32em] text-gold">Preview Checkout</div>
          <p className="mt-2 text-xs text-ivory/80 leading-relaxed">
            This is a design preview. No payment gateway is connected yet — submitting this form
            will <span className="text-gold">not</span> charge you, place an order, or store the
            details you enter. Please do not provide real payment information.
          </p>
        </div>

        {/* Shipping Method Selector */}
        <div className="mt-10">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-sm tracking-[0.28em] text-ivory">SHIPPING METHOD</h2>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            Select your preferred delivery option.
          </p>

          <div className="mt-6 space-y-1">
            {/* PAXI Section */}
            <div className="border border-border">
              <div className="px-6 py-4 bg-surface/50 border-b border-border">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <Package className="w-4 h-4 text-gold" />
                    <span className="text-[11px] uppercase tracking-[0.28em] text-ivory font-medium">PAXI — PEP Counter-to-Counter</span>
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
                    from R60
                  </span>
                </div>
              </div>
              <div className="grid sm:grid-cols-2">
                {shippingMethods.filter((s) => s.carrier === "paxi").map((opt) => {
                  const isActive = shippingOption === opt.id;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => setShippingOption(opt.id)}
                      className={`text-left px-6 py-5 border transition-all ${
                        isActive
                          ? "bg-ivory/[0.08] border-l-2 border-l-gold"
                          : "hover:bg-ivory/[0.02]"
                      } ${isActive ? "sm:border-r border-r-border" : "sm:border-r border-r-border sm:border-l-2 sm:border-l-transparent"}`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className={`font-editorial text-base ${isActive ? "text-gold" : "text-ivory"}`}>
                            {opt.label}
                          </div>
                          <div className="mt-1 text-[10px] uppercase tracking-[0.22em] text-muted-foreground leading-relaxed">
                            {opt.sub}
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="text-ivory font-editorial text-base">R{opt.price}</span>
                        </div>
                      </div>
                      <div className={`mt-3 h-px transition-all ${isActive ? "bg-gold w-8" : "bg-transparent w-0"}`} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Courier Guy Section */}
            <div className="border border-border">
              <div className="px-6 py-4 bg-surface/50 border-b border-border">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <Truck className="w-4 h-4 text-gold" />
                    <span className="text-[11px] uppercase tracking-[0.28em] text-ivory font-medium">The Courier Guy — Door-to-Door</span>
                  </div>
                  {subtotal >= 200 && (
                    <span className="text-[10px] uppercase tracking-[0.24em] text-gold bg-gold/10 px-3 py-1">
                      Free on orders R200+
                    </span>
                  )}
                </div>
              </div>
              <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-border">
                {shippingMethods.filter((s) => s.carrier === "courier").map((opt) => {
                  const isActive = shippingOption === opt.id;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => setShippingOption(opt.id)}
                      className={`text-left px-6 py-5 transition-all ${
                        isActive
                          ? "bg-ivory/[0.08] border-l-2 border-l-gold"
                          : "hover:bg-ivory/[0.02]"
                      } ${isActive ? "" : "sm:border-l-2 sm:border-l-transparent"}`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className={`font-editorial text-base ${isActive ? "text-gold" : "text-ivory"}`}>
                            {opt.label}
                          </div>
                          <div className="mt-1 text-[10px] uppercase tracking-[0.22em] text-muted-foreground leading-relaxed">
                            {opt.sub}
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="text-ivory font-editorial text-base">
                            {opt.id === "courier-express" ? "R200+" : `R${opt.price}`}
                          </span>
                        </div>
                      </div>
                      <div className={`mt-3 h-px transition-all ${isActive ? "bg-gold w-8" : "bg-transparent w-0"}`} />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Conditional Input Fields */}
          <div className="mt-6 border border-border p-6 bg-surface/30">
            {currentCarrier === "paxi" ? (
              <div>
                <label className="text-[10px] uppercase tracking-[0.28em] text-ivory">
                  PEP Store / PAXI Point Code
                </label>
                <p className="mt-1 text-xs text-muted-foreground mb-4">
                  Enter the code of your nearest PEP Store or PAXI collection point.
                </p>
                <div className="flex items-center border border-border focus-within:border-gold bg-background">
                  <span className="px-4 text-muted-foreground text-sm">
                    <MapPin className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    value={paxiCode}
                    onChange={(e) => setPaxiCode(e.target.value)}
                    placeholder="e.g. PEP00123"
                    className="flex-1 bg-transparent px-3 py-3 text-ivory outline-none text-sm uppercase tracking-widest"
                  />
                </div>
                <a
                  href="https://www.paxi.co.za"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block text-[10px] uppercase tracking-[0.24em] text-gold hover:underline"
                >
                  Find your nearest PAXI Point
                </a>
              </div>
            ) : (
              <div>
                <label className="text-[10px] uppercase tracking-[0.28em] text-ivory">
                  Shipping Address
                </label>
                <p className="mt-1 text-xs text-muted-foreground mb-4">
                  Enter your delivery address for door-to-door shipping.
                </p>
                <div className="space-y-3">
                  <div>
                    <input
                      type="text"
                      value={shippingAddress.street}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, street: e.target.value })}
                      placeholder="Street Address"
                      className="w-full border border-border focus:border-gold bg-background px-4 py-3 text-ivory outline-none text-sm"
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={shippingAddress.suburb}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, suburb: e.target.value })}
                      placeholder="Suburb"
                      className="w-full border border-border focus:border-gold bg-background px-4 py-3 text-ivory outline-none text-sm"
                    />
                    <input
                      type="text"
                      value={shippingAddress.city}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                      placeholder="City"
                      className="w-full border border-border focus:border-gold bg-background px-4 py-3 text-ivory outline-none text-sm"
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <select
                      value={shippingAddress.province}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, province: e.target.value })}
                      className="w-full border border-border focus:border-gold bg-background px-4 py-3 text-ivory outline-none text-sm appearance-none cursor-pointer"
                    >
                      <option value="" disabled>Select Province</option>
                      <option value="GP">Gauteng</option>
                      <option value="WC">Western Cape</option>
                      <option value="KZN">KwaZulu-Natal</option>
                      <option value="EC">Eastern Cape</option>
                      <option value="FS">Free State</option>
                      <option value="LP">Limpopo</option>
                      <option value="MP">Mpumalanga</option>
                      <option value="NC">Northern Cape</option>
                      <option value="NW">North West</option>
                    </select>
                    <input
                      type="text"
                      value={shippingAddress.postalCode}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, postalCode: e.target.value })}
                      placeholder="Postal Code"
                      className="w-full border border-border focus:border-gold bg-background px-4 py-3 text-ivory outline-none text-sm"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Payment Options */}
        <div className="mt-12">
          <h2 className="font-display text-sm tracking-[0.28em] text-ivory">SOUTH AFRICAN PAYMENT OPTIONS</h2>
          <p className="mt-2 text-xs text-muted-foreground">Pay in Rand from any local bank. All transactions are secured end-to-end.</p>

          <div className="mt-6 grid sm:grid-cols-2 gap-3">
            {paymentMethods.map((m) => {
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
              You will be redirected to a secure {paymentMethods.find((m) => m.id === method)?.label} portal to complete payment in Rand.
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

        <dl className="mt-6 pt-6 border-t border-border space-y-3 text-sm">
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Subtotal</dt>
            <dd className="text-ivory">R{subtotal.toLocaleString()}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Shipping</dt>
            <dd className={isCourierFreeShipping ? "text-gold" : "text-ivory"}>
              {isCourierFreeShipping ? "FREE" : `R${shippingCost}`}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Taxes</dt>
            <dd className="text-ivory">R0</dd>
          </div>
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
          Prices in ZAR · Taxes included
        </p>
      </aside>
    </section>
  );
}
