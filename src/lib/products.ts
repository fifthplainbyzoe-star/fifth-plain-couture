import tee from "@/assets/product-tee.jpg";
import hoodie from "@/assets/product-hoodie.jpg";
import tracksuit from "@/assets/product-tracksuit.jpg";
import medallion from "@/assets/product-medallion.jpg";
import fragrance from "@/assets/fragrance.jpg";
import essentials from "@/assets/essentials.jpg";
import type { Product } from "@/components/site/ProductCard";

export const products: Product[] = [
  { id: "obsidian-tee",       name: "Premium Heavyweight Tee", category: "T-Shirts",   price: 1200, image: tee,        badge: "New" },
  { id: "noir-hoodie",        name: "Heavy-Weight Premium Hoodie", category: "Hoodies",    price: 2000, image: hoodie },
  { id: "ivory-tracksuit",    name: "\u00a0Tracksuit Centre",   category: "Tracksuits", price: 1500, image: tracksuit,  badge: "Limited" },
  { id: "medallion-pendant",  name: "Medallion Gold Pendants( TBH)",   category: "The Medallion", price: 2400, image: medallion, badge: "Medallion" },
  { id: "no-v-fragrance",     name: "No. V — Eau de Parfum",    category: "Fragrance",  price: 240, image: fragrance },
  { id: "essential-set",      name: "The Essential Set",        category: "Essentials", price: 540, image: essentials },
  { id: "midnight-tee",       name: "Midnight Cotton Tee",      category: "T-Shirts",   price: 160, image: tee },
  { id: "atelier-hoodie-bw",  name: "Atelier Hoodie — Bone",    category: "Hoodies",    price: 440, image: hoodie,    badge: "New" },
];

export function findProduct(id: string) {
  return products.find((p) => p.id === id);
}
