import tee from "@/assets/product-tee.jpg";
import hoodie from "@/assets/product-hoodie.jpg";
import tracksuit from "@/assets/product-tracksuit.jpg";
import fragrance from "@/assets/fragrance.jpg";
import type { Product } from "@/components/site/ProductCard";

export const products: Product[] = [
  { id: "obsidian-tee",       name: "Premium Heavyweight Tee", category: "T-Shirts",   price: 450, image: tee,        badge: "New" },
  { id: "noir-hoodie",        name: "Heavy-Weight Premium Hoodie", category: "Hoodies",    price: 620, image: hoodie },
  { id: "ivory-tracksuit",    name: "\u00a0Tracksuit Centre",   category: "Tracksuits", price: 1500, image: tracksuit,  badge: "Limited" },
  { id: "no-v-fragrance",     name: "The Fragrance Lab",    category: "Fragrance",  price: 250, image: fragrance },
];

export function findProduct(id: string) {
  return products.find((p) => p.id === id);
}
