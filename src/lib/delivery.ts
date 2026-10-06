// Delivery options shown on FifthPlain Select product pages (mirrors checkout prices).
export const DELIVERY_OPTIONS = [
  { id: "paxi-economy-small", label: "PAXI Economy Small Standard (7-9 Days)", price: 60 },
  { id: "paxi-speed-standard", label: "PAXI Speed Standard (3-5 Days)", price: 110 },
  { id: "paxi-store-home-standard", label: "PAXI Store to Home Standard", price: 120 },
  { id: "paxi-economy-large", label: "PAXI Economy Large (7-9 Days)", price: 120 },
  { id: "paxi-speed-large", label: "PAXI Speed Large (3-5 Days)", price: 140 },
  { id: "paxi-store-home-large", label: "PAXI Store to Home Large", price: 150 },
  { id: "courier-standard", label: "The Courier Guy Standard (2-3 Days)", price: 120 },
  { id: "courier-express", label: "The Courier Guy Express", price: 250 },
] as const;

export function orderTotal(unitPrice: number, deliveryId: string) {
  const d = DELIVERY_OPTIONS.find((o) => o.id === deliveryId) ?? DELIVERY_OPTIONS[0];
  return { delivery: d, total: unitPrice + d.price };
}
