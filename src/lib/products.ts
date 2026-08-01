import tee1 from "@/assets/tee-gallery-1.jpg";
import tee2 from "@/assets/tee-gallery-2.jpg";
import tee3 from "@/assets/tee-gallery-3.jpg";
import tee4 from "@/assets/tee-gallery-4.jpg";
import hoodie1 from "@/assets/hoodie-gallery-1.jpg";
import hoodie2 from "@/assets/hoodie-gallery-2.jpg";
import hoodie3 from "@/assets/hoodie-gallery-3.jpg";
import hoodie4 from "@/assets/hoodie-gallery-4.jpg";
import tracksuit1 from "@/assets/tracksuit-gallery-1.jpg";
import tracksuit2 from "@/assets/tracksuit-gallery-2.jpg";
import tracksuit3 from "@/assets/tracksuit-gallery-3.jpg";
import tracksuit4 from "@/assets/tracksuit-gallery-4.jpg";
import skirt1 from "@/assets/skirt-gallery-1.jpg";
import skirt2 from "@/assets/skirt-gallery-2.jpg";
import skirt3 from "@/assets/skirt-gallery-3.jpg";
import skirt4 from "@/assets/skirt-gallery-4.jpg";
import fragrance from "@/assets/fragrance.jpg";
import type { Product } from "@/components/site/ProductCard";

export const products: Product[] = [
  {
    id: "obsidian-tee",
    name: "Premium Heavyweight Tee",
    category: "T-Shirts",
    price: 250,
    image: tee1,
    gallery: [tee1, tee2, tee3, tee4],
    badge: "New",
  },
  {
    id: "noir-hoodie",
    name: "Heavy-Weight Premium Hoodie",
    category: "Hoodies",
    price: 320,
    image: hoodie1,
    gallery: [hoodie1, hoodie2, hoodie3, hoodie4],
  },
  {
    id: "ivory-tracksuit",
    name: "\u00a0Tracksuit Centre",
    category: "Tracksuits",
    price: 320,
    image: tracksuit1,
    gallery: [tracksuit1, tracksuit2, tracksuit3, tracksuit4],
    badge: "Limited",
  },
  {
    id: "aurelia-skirt",
    name: "The Aurelia Skirt",
    category: "Skirts",
    price: 520,
    image: skirt1,
    gallery: [skirt1, skirt2, skirt3, skirt4],
  },
  {
    id: "no-v-fragrance",
    name: "The Fragrance Lab",
    category: "Fragrance",
    price: 250,
    image: fragrance,
  },
];

export function findProduct(id: string) {
  return products.find((p) => p.id === id);
}
