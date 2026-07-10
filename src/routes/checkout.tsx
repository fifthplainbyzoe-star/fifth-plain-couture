import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { MapPin, Truck, Package, Zap, MessageCircle } from "lucide-react";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — Fifth Plain" }, { name: "robots", content: "noindex" }] }),
  component: Checkout,
});

const WHATSAPP_NUMBER = "27634595961";

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
  const { items, subtotal } = useCart();
  const [shippingOption, setShippingOption] = useState<ShippingOption>("paxi-standard");
  const [customerName, setCustomerName] = useState("");
  const [paxiCode, setPaxiCode] = useState("");
  const [shippingAddress, setShippingAddress] = useState({
    street: "",
    suburb: "",
    city: "",
    province: "",
    postalCode: "",
  });
  const [error, setError] = useState("");

  const shippingMethods: ShippingMethod[] = [
    { id: "paxi-standard", carrier: "paxi", label: "PAXI Standard Bag", sub: "PEP Counter-to-Counter · 7-9 Days · Max 5kg", price: 60, icon: Package },
    { id: "paxi-large", carrier: "paxi", label: "PAXI Large Bag", sub: "PEP Counter-to-Counter · 7-9 Days · Max 10kg", price: 100, icon: Package },
    { id: "courier-standard", carrier: "courier", label: "The Courier Guy Standard", sub: "Door-to-Door · 2-3 Days", price: 120, icon: Truck },
    { id: "courier-express", carrier: "courier", label: "The Courier Guy Express", sub: "Heavy / Regional Door Delivery · Price varies with distance", price: 250, icon: Zap },
  ];

  const selectedShipping = shippingMethods.find((s) => s.id === shippingOption)!;
  const currentCarrier = selectedShipping.carrier;
  const shippingCost = selectedShipping.price;
  const total = subtotal + shippingCost;

  if (items.length === 0) {
    return (
      <section className="mx-auto max-w-[700px] px-6 py-24 text-center">
        <h1 className="font-editorial text-3xl text-ivory">Nothing to check out</h1>
        <Link to="/shop" className="mt-8 inline-block border border-gold text-gold px-8 py-3 text-[11px] uppercase tracking-[0.28em] hover:bg-gold hover:text-background transition-colors">Enter The Shop</Link>
      </section>
    );
  }

  const handleWhatsAppCheckout = () => {
    setError("");
    if (!customerName.trim()) { setError("Please enter your name."); return; }
    if (currentCarrier === "paxi" && !paxiCode.trim()) { setError("Enter your PAXI point code."); return; }
    if (currentCarrier === "courier" && (!shippingAddress.street || !shippingAddress.city)) {
      setError("Enter your shipping address."); return;
    }

    const itemList = items
      .map((i) => {
        const detail = [i.size, i.color].filter(Boolean).join(" / ");
        const suffix = detail ? ` (${detail})` : "";
        return `• ${i.qty} x ${i.name}${suffix} — R${(i.price * i.qty).toLocaleString()}`;
      })
      .join("\n");

    const shippingLine =
      currentCarrier === "paxi"
        ? `PAXI Point Code: ${paxiCode.trim()}`
        : `Address: ${[shippingAddress.street, shippingAddress.suburb, shippingAddress.city, shippingAddress.province, shippingAddress.postalCode].filter(Boolean).join(", ")}`;

    const message =
      `Hi! I'm ${customerName.trim()}. I'd like to complete my order for:\n${itemList}\n\n` +
      `Shipping: ${selectedShipping.label} (R${shippingCost})\n${shippingLine}\n\n` +
      `Total amount: R${total.toLocaleString()}.`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="mx-auto max-w-[1400px] px-6 lg:px-12 py-16 grid lg:grid-cols-[1.4fr_1fr] gap-16">
      <div>
        <div className="text-[10px] uppercase tracking-[0.32em] text-gold">Checkout</div>
        <h1 className="mt-3 font-editorial text-4xl md:text-5xl text-ivory">Complete your order</h1>

        <div className="mt-6 border border-gold/40 bg-gold/5 px-5 py-4">
          <div className="text-[10px] uppercase tracking-[0.32em] text-gold">Order via WhatsApp</div>
          <p className="mt-2 text-xs text-ivory/80 leading-relaxed">
            Finalise your order directly with us on WhatsApp. Clicking checkout opens a chat with your
            cart, delivery details and total pre-filled — we'll confirm and share payment details there.
          </p>
        </div>

        {/* Customer name */}
        <div className="mt-10">
          <h2 className="font-display text-sm tracking-[0.28em] text-ivory">YOUR DETAILS</h2>
          <p className="mt-2 text-xs text-muted-foreground">So we can address you properly on WhatsApp.</p>
          <div className="mt-4 border border-border focus-within:border-gold bg-background">
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Full Name"
              className="w-full bg-transparent px-4 py-3 text-ivory outline-none text-sm"
            />
          </div>
        </div>

        {/* Shipping Method Selector */}
        <div className="mt-10">
          <h2 className="font-display text-sm tracking-[0.28em] text-ivory">SHIPPING METHOD</h2>
          <p className="mt-2 text-xs text-muted-foreground">Select your preferred delivery option.</p>

          <div className="mt-6 space-y-1">
            <div className="border border-border">
              <div className="px-6 py-4 bg-surface/50 border-b border-border">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <Package className="w-4 h-4 text-gold" />
                    <span className="text-[11px] uppercase tracking-[0.28em] text-ivory font-medium">PAXI — PEP Counter-to-Counter</span>
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.24em] text-muted-foreground">from R60</span>
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
                        isActive ? "bg-ivory/[0.08] border-l-2 border-l-gold" : "hover:bg-ivory/[0.02]"
                      } ${isActive ? "sm:border-r border-r-border" : "sm:border-r border-r-border sm:border-l-2 sm:border-l-transparent"}`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className={`font-editorial text-base ${isActive ? "text-gold" : "text-ivory"}`}>{opt.label}</div>
                          <div className="mt-1 text-[10px] uppercase tracking-[0.22em] text-muted-foreground leading-relaxed">{opt.sub}</div>
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

            <div className="border border-border">
              <div className="px-6 py-4 bg-surface/50 border-b border-border">
                <div className="flex items-center gap-3">
                  <Truck className="w-4 h-4 text-gold" />
                  <span className="text-[11px] uppercase tracking-[0.28em] text-ivory font-medium">The Courier Guy — Door-to-Door</span>
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
                        isActive ? "bg-ivory/[0.08] border-l-2 border-l-gold" : "hover:bg-ivory/[0.02]"
                      } ${isActive ? "" : "sm:border-l-2 sm:border-l-transparent"}`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className={`font-editorial text-base ${isActive ? "text-gold" : "text-ivory"}`}>{opt.label}</div>
                          <div className="mt-1 text-[10px] uppercase tracking-[0.22em] text-muted-foreground leading-relaxed">{opt.sub}</div>
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
          </div>

          <div className="mt-6 border border-border p-6 bg-surface/30">
            {currentCarrier === "paxi" ? (
              <div>
                <label className="text-[10px] uppercase tracking-[0.28em] text-ivory">PEP Store / PAXI Point Code</label>
                <p className="mt-1 text-xs text-muted-foreground mb-4">Enter the code of your nearest PEP Store or PAXI collection point.</p>
                <div className="flex items-center border border-border focus-within:border-gold bg-background">
                  <span className="px-4 text-muted-foreground text-sm"><MapPin className="w-4 h-4" /></span>
                  <input
                    type="text"
                    value={paxiCode}
                    onChange={(e) => setPaxiCode(e.target.value)}
                    placeholder="e.g. PEP00123"
                    className="flex-1 bg-transparent px-3 py-3 text-ivory outline-none text-sm uppercase tracking-widest"
                  />
                </div>
                <a href="https://www.paxi.co.za" target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-[10px] uppercase tracking-[0.24em] text-gold hover:underline">
                  Find your nearest PAXI Point
                </a>
              </div>
            ) : (
              <div>
                <label className="text-[10px] uppercase tracking-[0.28em] text-ivory">Shipping Address</label>
                <p className="mt-1 text-xs text-muted-foreground mb-4">Enter your delivery address for door-to-door shipping.</p>
                <div className="space-y-3">
                  <input type="text" value={shippingAddress.street} onChange={(e) => setShippingAddress({ ...shippingAddress, street: e.target.value })} placeholder="Street Address" className="w-full border border-border focus:border-gold bg-background px-4 py-3 text-ivory outline-none text-sm" />
                  <div className="grid sm:grid-cols-2 gap-3">
                    <input type="text" value={shippingAddress.suburb} onChange={(e) => setShippingAddress({ ...shippingAddress, suburb: e.target.value })} placeholder="Suburb" className="w-full border border-border focus:border-gold bg-background px-4 py-3 text-ivory outline-none text-sm" />
                    <input type="text" value={shippingAddress.city} onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })} placeholder="City" className="w-full border border-border focus:border-gold bg-background px-4 py-3 text-ivory outline-none text-sm" />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <select value={shippingAddress.province} onChange={(e) => setShippingAddress({ ...shippingAddress, province: e.target.value })} className="w-full border border-border focus:border-gold bg-background px-4 py-3 text-ivory outline-none text-sm appearance-none cursor-pointer">
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
                    <input type="text" value={shippingAddress.postalCode} onChange={(e) => setShippingAddress({ ...shippingAddress, postalCode: e.target.value })} placeholder="Postal Code" className="w-full border border-border focus:border-gold bg-background px-4 py-3 text-ivory outline-none text-sm" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {error && <p className="mt-6 text-xs text-red-400">{error}</p>}
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
          <div className="flex justify-between"><dt className="text-muted-foreground">Subtotal</dt><dd className="text-ivory">R{subtotal.toLocaleString()}</dd></div>
          <div className="flex justify-between"><dt className="text-muted-foreground">Shipping</dt><dd className="text-ivory">R{shippingCost.toLocaleString()}</dd></div>
          <div className="flex justify-between"><dt className="text-muted-foreground">Taxes</dt><dd className="text-ivory">R0</dd></div>
        </dl>
        <div className="mt-4 pt-4 border-t border-border flex justify-between items-baseline">
          <span className="text-[10px] uppercase tracking-[0.32em] text-gold">Total (ZAR)</span>
          <span className="font-editorial text-2xl text-ivory">R{total.toLocaleString()}</span>
        </div>

        <button
          onClick={handleWhatsAppCheckout}
          className="mt-6 w-full bg-[#25D366] text-background py-4 text-[11px] uppercase tracking-[0.3em] hover:bg-ivory transition-colors flex items-center justify-center gap-2"
        >
          <MessageCircle className="w-4 h-4" />
          Checkout via WhatsApp
        </button>
        <Link to="/cart" className="mt-3 block text-center text-[11px] uppercase tracking-[0.28em] text-muted-foreground hover:text-ivory">Back to Atelier</Link>

        <p className="mt-6 text-[10px] uppercase tracking-[0.24em] text-gold/80 text-center">
          Order confirmation & payment details shared on WhatsApp
        </p>
      </aside>
    </section>
  );
}
