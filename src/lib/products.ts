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
import modelTee1 from "@/assets/model-tee-1.jpg";
import modelTee2 from "@/assets/model-tee-2.jpg";
import modelTee3 from "@/assets/model-tee-3.jpg";
import modelHoodie1 from "@/assets/model-hoodie-1.jpg";
import modelHoodie2 from "@/assets/model-hoodie-2.jpg";
import modelHoodie3 from "@/assets/model-hoodie-3.jpg";
import modelTracksuit1 from "@/assets/model-tracksuit-1.jpg";
import modelTracksuit2 from "@/assets/model-tracksuit-2.jpg";
import modelTracksuit3 from "@/assets/model-tracksuit-3.jpg";
import modelSkirt1 from "@/assets/model-skirt-1.jpg";
import modelSkirt2 from "@/assets/model-skirt-2.jpg";
import modelSkirt3 from "@/assets/model-skirt-3.jpg";
import modelFragrance1 from "@/assets/model-fragrance-1.jpg";
import modelFragrance2 from "@/assets/model-fragrance-2.jpg";
import modelFragrance3 from "@/assets/model-fragrance-3.jpg";
import elara1Asset from "@/assets/elara-dress-1.jpg.png.asset.json";
import elara2Asset from "@/assets/elara-dress-2.jpg.png.asset.json";
import elara3Asset from "@/assets/elara-dress-3.jpg.png.asset.json";
import harper1Asset from "@/assets/harper-denim-1.jpg.jpeg.asset.json";
import harper2Asset from "@/assets/harper-denim-2.jpg.png.asset.json";
import harper3Asset from "@/assets/harper-denim-3.jpg.png.asset.json";
import harper4Asset from "@/assets/harper-denim-4.jpg.png.asset.json";
import harper5Asset from "@/assets/harper-denim-5.jpg.png.asset.json";
import solenePlaceholder from "@/assets/solene-placeholder.svg";
import type { Product } from "@/components/site/ProductCard";

export const products: Product[] = [
  {
    id: "obsidian-tee",
    name: "Premium Heavyweight Tee",
    category: "T-Shirts",
    price: 250,
    image: tee1,
    gallery: [tee1, tee2, tee3, tee4, modelTee1, modelTee2, modelTee3],
    badge: "New",
  },
  {
    id: "noir-hoodie",
    name: "Heavy-Weight Premium Hoodie",
    category: "Hoodies",
    price: 320,
    image: hoodie1,
    gallery: [hoodie1, hoodie2, hoodie3, hoodie4, modelHoodie1, modelHoodie2, modelHoodie3],
  },
  {
    id: "ivory-tracksuit",
    name: "\u00a0Tracksuit Centre",
    category: "Tracksuits",
    price: 320,
    image: tracksuit1,
    gallery: [tracksuit1, tracksuit2, tracksuit3, tracksuit4, modelTracksuit1, modelTracksuit2, modelTracksuit3],
    badge: "Limited",
  },
  {
    id: "aurelia-skirt",
    name: "The Aurelia Skirt",
    category: "Skirts",
    price: 520,
    image: skirt1,
    gallery: [skirt1, skirt2, skirt3, skirt4, modelSkirt1, modelSkirt2, modelSkirt3],
  },
  {
    id: "no-v-fragrance",
    name: "The Fragrance Lab",
    category: "Fragrance",
    price: 250,
    image: fragrance,
    gallery: [fragrance, modelFragrance1, modelFragrance2, modelFragrance3],
  },
  {
    id: "elara-dress",
    name: "Elara Dress",
    category: "FifthPlain Select",
    collection: "select",
    price: 1050,
    image: elara1Asset.url,
    gallery: [elara1Asset.url, elara2Asset.url, elara3Asset.url],
    colors: ["Black", "Beige Cream", "White", "Sky Blue"],
    sizes: ["S", "M", "L", "XL"],
    description: "A graceful full-length wrap dress with a high neckline, softly gathered sleeves, and a flowing tiered silhouette.",
    badge: "Select",
  },
  {
    id: "harper-denim",
    name: "Harper Denim",
    category: "FifthPlain Select",
    collection: "select",
    price: 800,
    image: harper1Asset.url,
    gallery: [harper1Asset.url, harper2Asset.url, harper3Asset.url, harper4Asset.url, harper5Asset.url],
    colors: ["Black", "Beige Cream", "White", "Sky Blue"],
    sizes: ["S", "M", "L", "XL"],
    description: "A full-length washed denim skirt defined by an asymmetric layered construction and softly frayed edges.",
    badge: "Select",
  },
  {
    id: "solene-skirt",
    name: "Solene Skirt",
    category: "FifthPlain Select",
    collection: "select",
    price: 750,
    image: solenePlaceholder,
    gallery: [solenePlaceholder],
    colors: ["Black", "Beige Cream", "White", "Sky Blue"],
    sizes: ["S", "M", "L", "XL"],
    description: "The Solene Skirt joins the FifthPlain Select collection. Product photography will be added soon.",
    badge: "New",
  },
];

export const mainProducts = products.filter((product) => product.collection !== "select");
export const selectProducts = products.filter((product) => product.collection === "select");

export function findProduct(id: string) {
  return products.find((p) => p.id === id);
}
