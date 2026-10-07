import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { findProduct, products } from "@/lib/products";
import { ProductCard } from "@/components/site/ProductCard";
import { Reveal } from "@/components/site/Reveal";
import { SelectProductDisclaimer } from "@/components/site/SelectProductDisclaimer";
import { useCart } from "@/lib/cart";
import { galleryForColor } from "@/lib/colorGalleries";
import { DELIVERY_OPTIONS, orderTotal } from "@/lib/delivery";

export const Route = createFileRoute("/shop/$id")({
  loader: ({ params }) => {
    const p = findProduct(params.id);
    if (!p) throw notFound();
    return p;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.name ?? "Piece"} — Fifth Plain` },
      { name: "description", content: `${loaderData?.name} from Fifth Plain ${loaderData?.category}.` },
      { property: "og:title", content: `${loaderData?.name} — Fifth Plain` },
      { property: "og:description", content: `${loaderData?.name} from Fifth Plain ${loaderData?.category}.` },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ProductPage,
});

function ProductPage() {
  const p = Route.useLoaderData();
  const isFragrance = p.category === "Fragrance";
  const isHoodie = p.category === "Hoodies";
  const isTee = p.category === "T-Shirts";
  const isTracksuit = p.category === "Tracksuits";
  const isSelect = p.collection === "select";
  const isAurelia = p.id === "aurelia-skirt";
  const gallery: string[] = p.gallery && p.gallery.length > 0 ? p.gallery : [p.image];
  const sizeOptions = p.sizes ?? (isFragrance
    ? ["Velvet Fire", "Glass Wealth", "Black Authority"]
    : isTracksuit
      ? ["S", "M", "L", "XL", "2XL"]
      : ["XS", "S", "M", "L", "XL", "2XL"]);
  const showFinish = isTee || isHoodie || isTracksuit;
  const finishOptions = ["Embroidery", "Print", "Blank Canvas"];
  const quantityOptions = isFragrance ? ["30ml", "50ml"] : [];
  const colorOptions = p.colors ?? (isFragrance
    ? []
    : isHoodie
      ? ["Black", "Dark Brown", "Beige Cream", "Lilac", "Orange"]
      : isTracksuit
        ? ["Black", "Brown", "Cream"]
        : ["Black", "Mud Brown", "Cream", "Pink", "Silver Grey"]);
  const [selectedSize, setSelectedSize] = useState(sizeOptions[0]);
  const [selectedQty, setSelectedQty] = useState(quantityOptions[0] ?? "");
  const [selectedColor, setSelectedColor] = useState(colorOptions[0] ?? "");
  const [selectedFinish, setSelectedFinish] = useState(showFinish ? finishOptions[0] : "");
  const [notifyMsg, setNotifyMsg] = useState("");
  const [addedMsg, setAddedMsg] = useState("");
  const selectedImage = p.colorImages?.[selectedColor] ?? p.image;
  const colorGallery = galleryForColor(p.id, selectedColor, gallery);
  const [deliveryId, setDeliveryId] = useState<string>(DELIVERY_OPTIONS[0].id);
  const [customerName, setCustomerName] = useState("");
  const [paxiCode, setPaxiCode] = useState("");
  const [address, setAddress] = useState("");
  const [orderError, setOrderError] = useState("");
  const needsAddress = deliveryId.includes("store-home") || deliveryId.startsWith("courier");
  const { add } = useCart();
  const navigate = useNavigate();
  const related = products
    .filter((x) => x.id !== p.id && (isSelect ? x.collection === "select" : x.collection !== "select"))
    .slice(0, 4);

  const sizeSurcharge = !isFragrance && (selectedSize === "XL" || selectedSize === "2XL") ? 90 : 0;
  const unitPrice = p.price + sizeSurcharge;

  const handleAdd = () => {
    add({
      id: p.id,
      name: p.name,
      category: p.category,
      price: unitPrice,
      image: selectedImage,
      size: isFragrance
        ? `${selectedSize} · ${selectedQty}`
        : showFinish && selectedFinish
          ? `${selectedSize} · ${selectedFinish}`
          : selectedSize,
      color: selectedColor || undefined,
    });
    setAddedMsg("Added to your atelier.");
    setTimeout(() => setAddedMsg(""), 2000);
  };
  const handleBuyNow = () => {
    handleAdd();
    navigate({ to: "/checkout" });
  };
  const handleWhatsAppOrder = () => {
    const name = customerName.trim().slice(0, 100);
    const paxi = paxiCode.trim().slice(0, 50);
    const addr = address.trim().slice(0, 300);
    if (name.length < 2) return setOrderError("Please enter your full name.");
    if (needsAddress ? addr.length < 5 : paxi.length < 2)
      return setOrderError(needsAddress ? "Please enter your delivery address." : "Please enter your PAXI point code.");
    setOrderError("");
    const options = [
      selectedSize ? `Size: ${selectedSize}` : "",
      selectedQty ? `Quantity option: ${selectedQty}` : "",
      selectedColor ? `Colour: ${selectedColor}` : "",
      selectedFinish ? `Finish: ${selectedFinish}` : "",
    ].filter(Boolean).join("\n");
    const { delivery, total } = orderTotal(unitPrice, deliveryId);
    const message =
      `Hi! I'm ${name}. I'd like to order from FifthPlain Select:\n` +
      `• 1 x ${p.name} — R${unitPrice.toLocaleString()}\n` +
      (options ? `${options}\n` : "") +
      `Delivery: ${delivery.label} — R${delivery.price}\n` +
      `\nCustomer details:\nFull name: ${name}\n` +
      (needsAddress ? `Delivery address: ${addr}\n` : `PAXI point code: ${paxi}\n`) +
      `\nTotal (incl. delivery): R${total.toLocaleString()}.`;
    window.open(
      `https://wa.me/27634595961?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <>
      {isAurelia ? (
        <section className="relative min-h-[80svh] overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 bg-surface">
            <img src={gallery[0]} alt="" className="h-full w-full object-cover blur-xl opacity-40 scale-110" />
          </div>
          <div className="absolute inset-0 bg-background/60" />
          <div className="relative z-10 text-center px-6">
            <div className="text-[10px] uppercase tracking-[0.4em] text-gold">{p.category}</div>
            <h1 className="mt-6 font-editorial text-5xl md:text-7xl text-ivory">{p.name}</h1>
            <p className="mt-8 font-display text-3xl md:text-5xl gold-text">Coming Soon</p>
            <p className="mt-3 text-muted-foreground text-sm tracking-widest">( TBA )</p>
            <button
              onClick={() => setNotifyMsg("We will let you know when Aurelia is available.")}
              className="mt-10 bg-gold text-background px-10 py-4 text-[11px] uppercase tracking-[0.3em] hover:bg-ivory transition-colors"
            >
              Notify Me
            </button>
            {notifyMsg && (
              <p className="mt-6 text-sm text-gold">{notifyMsg}</p>
            )}
          </div>
        </section>
      ) : (
        <section className="mx-auto max-w-[1600px] px-6 lg:px-12 pt-12 pb-24 grid lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-20">
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2 aspect-[4/5] bg-surface overflow-hidden">
              <img src={selectedImage} alt={`${p.name} in ${selectedColor}`} className="h-full w-full object-cover slow-zoom" />
            </div>
            {colorGallery.map((img, i) => (
              <div key={i} className="aspect-square bg-surface overflow-hidden">
                <img src={img} alt="" loading="lazy" className="h-full w-full object-cover opacity-90 hover:opacity-100 transition" />
              </div>
            ))}
          </div>

          <div className="lg:sticky lg:top-28 self-start">
            <div className="text-[10px] uppercase tracking-[0.32em] text-gold">{p.category}</div>
            <h1 className="mt-4 font-editorial text-4xl md:text-5xl text-ivory">{p.name}</h1>
            <div className="mt-6 font-editorial text-2xl text-ivory">
              {isFragrance ? "From R280" : `R${unitPrice.toLocaleString()}`}
              {sizeSurcharge > 0 && (
                <span className="ml-3 align-middle text-[10px] uppercase tracking-[0.24em] text-gold">incl. +R90 {selectedSize}</span>
              )}
            </div>

            {isSelect && <SelectProductDisclaimer />}

            <p className="mt-8 text-muted-foreground leading-relaxed">
               {p.description ?? (isFragrance
                ? "A considered selection of different perfume brands, brought together under one FifthPlain foundation."
                : isHoodie
                  ? "Crafted from ultra-heavyweight fabric with a flawless minimalist drape, engineered to hold its structure today and for years to come."
                  : isTee
                    ? "An armor of pure comfort, sculpted from premium heavyweight cotton to bring bold structure and timeless form to your everyday style."
                     : "Substantial weight, uncompromised structure, and a premium finish designed for the modern uniform.")}
            </p>

            <div className="mt-10">
              <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.28em]">
                <label htmlFor="product-size" className="text-ivory">{isFragrance ? "Scent" : "Size"}</label>
                {!isFragrance && <button className="text-gold">Size Guide</button>}
              </div>
              <select
                id="product-size"
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="mt-3 w-full bg-background border border-border text-ivory text-sm py-3 px-3 focus:border-gold outline-none cursor-pointer"
              >
                {sizeOptions.map((s) => (
                  <option key={s} value={s} className="bg-background text-ivory">{s}{!isFragrance && (s === "XL" || s === "2XL") ? " (+R90)" : ""}</option>
                ))}
              </select>
              {!isFragrance && (
                <p className="mt-3 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">XL & 2XL + R90</p>
              )}
            </div>

            {showFinish && (
              <div className="mt-6">
                <label htmlFor="finish" className="text-[11px] uppercase tracking-[0.28em] text-ivory">Finish</label>
                <select
                  id="finish"
                  value={selectedFinish}
                  onChange={(e) => setSelectedFinish(e.target.value)}
                  className="mt-3 w-full bg-background border border-border text-ivory text-sm py-3 px-3 focus:border-gold outline-none cursor-pointer"
                >
                  {finishOptions.map((f) => (
                    <option key={f} value={f} className="bg-background text-ivory">{f}</option>
                  ))}
                </select>
                <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
                  Embroidery and print options — including sizes and designs — will be confirmed during purchase of the items.
                </p>
              </div>
            )}

            {!isFragrance && colorOptions.length > 0 && (
              <div className="mt-6">
                <label htmlFor="product-color" className="text-[11px] uppercase tracking-[0.28em] text-ivory">Colors</label>
                <select
                  id="product-color"
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                  className="mt-3 w-full bg-background border border-border text-ivory text-sm py-3 px-3 focus:border-gold outline-none cursor-pointer"
                >
                  {colorOptions.map((c) => (
                    <option key={c} value={c} className="bg-background text-ivory">{c}</option>
                  ))}
                </select>
              </div>
            )}

            {isFragrance && quantityOptions.length > 0 && (
              <div className="mt-6">
                <label htmlFor="product-quantity" className="text-[11px] uppercase tracking-[0.28em] text-ivory">Quantity</label>
                <select
                  id="product-quantity"
                  value={selectedQty}
                  onChange={(e) => setSelectedQty(e.target.value)}
                  className="mt-3 w-full bg-background border border-border text-ivory text-sm py-3 px-3 focus:border-gold outline-none cursor-pointer"
                >
                  {quantityOptions.map((q) => (
                    <option key={q} value={q} className="bg-background text-ivory">{q}</option>
                  ))}
                </select>
              </div>
            )}


            {selectedSize === "Velvet Fire" ? (
              <div className="mt-8 flex flex-col items-center gap-3">
                <p className="font-display text-2xl md:text-3xl gold-text">Coming Soon</p>
                <p className="text-muted-foreground text-sm tracking-widest">( TBA )</p>
                <button
                  onClick={() => setNotifyMsg(`We will let you know when ${selectedSize} is available.`)}
                  className="mt-4 bg-gold text-background px-10 py-4 text-[11px] uppercase tracking-[0.3em] hover:bg-ivory transition-colors"
                >
                  Notify Me
                </button>
                {notifyMsg && <p className="text-sm text-gold">{notifyMsg}</p>}
              </div>
            ) : (
              <div className="mt-8 flex flex-col gap-3">
                {isSelect ? (
                  <>
                    <label htmlFor="product-delivery" className="text-[11px] uppercase tracking-[0.28em] text-ivory">Delivery</label>
                    <select
                      id="product-delivery"
                      value={deliveryId}
                      onChange={(e) => setDeliveryId(e.target.value)}
                      className="w-full bg-background border border-border text-ivory text-sm py-3 px-3 focus:border-gold outline-none cursor-pointer"
                    >
                      {DELIVERY_OPTIONS.map((d) => (
                        <option key={d.id} value={d.id} className="bg-background text-ivory">{d.label} — R{d.price}</option>
                      ))}
                    </select>
                    <div className="flex items-center justify-between py-2 text-[11px] uppercase tracking-[0.28em]">
                      <span className="text-muted-foreground">Total incl. delivery</span>
                      <span className="font-editorial text-xl normal-case tracking-normal text-ivory">R{orderTotal(unitPrice, deliveryId).total.toLocaleString()}</span>
                    </div>
                    <button onClick={handleWhatsAppOrder} className="bg-gold text-background py-4 text-[11px] uppercase tracking-[0.3em] hover:bg-ivory transition-colors">Order via WhatsApp</button>
                  </>
                ) : (
                  <>
                    <button onClick={handleAdd} className="bg-ivory text-background py-4 text-[11px] uppercase tracking-[0.3em] hover:bg-gold transition-colors">Add to Atelier</button>
                    <button onClick={handleBuyNow} className="border border-gold text-gold py-4 text-[11px] uppercase tracking-[0.3em] hover:bg-gold hover:text-background transition-colors">Buy Now</button>
                  </>
                )}
                {addedMsg && <p className="text-xs text-gold text-center">{addedMsg}</p>}
              </div>
            )}

          </div>
        </section>
      )}

      <section className="border-t border-border">
        <div className="mx-auto max-w-[1600px] px-6 lg:px-12 py-24">
          <Reveal>
            <div className="text-[10px] uppercase tracking-[0.4em] text-gold">Continue The Edit</div>
            <h2 className="mt-4 font-editorial text-3xl md:text-5xl text-ivory">Pieces to consider</h2>
          </Reveal>
          <div className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((r, i) => (
              <Reveal key={r.id} delay={i * 80}><ProductCard p={r} /></Reveal>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link to={isSelect ? "/select" : "/shop"} className="text-[11px] uppercase tracking-[0.28em] text-gold border-b border-gold pb-1">Back to Collection</Link>
          </div>
        </div>
      </section>
    </>
  );
}
