// Server-side source of truth for prices. Never trust client-supplied amounts.

export const CATALOG: Record<string, { name: string; price: number }> = {
  "obsidian-tee": { name: "Premium Heavyweight Tee", price: 250 },
  "noir-hoodie": { name: "Heavy-Weight Premium Hoodie", price: 320 },
  "ivory-tracksuit": { name: "Tracksuit Centre", price: 320 },
  "aurelia-skirt": { name: "The Aurelia Skirt", price: 520 },
  "no-v-fragrance": { name: "The Fragrance Lab", price: 250 },
};

export const SHIPPING: Record<string, { carrier: "paxi" | "courier"; price: number }> = {
  "paxi-standard": { carrier: "paxi", price: 60 },
  "paxi-large": { carrier: "paxi", price: 100 },
  "courier-standard": { carrier: "courier", price: 120 },
  "courier-express": { carrier: "courier", price: 250 },
};

export interface RequestedItem {
  id: string;
  qty: number;
  size?: string | undefined;
  color?: string | undefined;
}

export function priceCart(items: RequestedItem[], shippingOption: string) {
  const lines = items.map((i) => {
    const product = CATALOG[i.id];
    if (!product) throw new Error("Unknown product in cart");
    return {
      id: i.id,
      name: product.name,
      price: product.price,
      qty: i.qty,
      ...(i.size ? { size: i.size } : {}),
      ...(i.color ? { color: i.color } : {}),
    };
  });

  const shipping = SHIPPING[shippingOption];
  if (!shipping) throw new Error("Unknown shipping option");

  const subtotal = lines.reduce((s, l) => s + l.price * l.qty, 0);
  const total = subtotal + shipping.price;

  return { lines, subtotal, shippingCost: shipping.price, carrier: shipping.carrier, total };
}
