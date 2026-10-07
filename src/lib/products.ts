import tee1 from "@/assets/tee-gallery-1.jpg";
import tee2 from "@/assets/tee-gallery-2.jpg";
import tee3 from "@/assets/tee-gallery-3.jpg";
import tee4 from "@/assets/tee-gallery-4.jpg";
import hoodie1 from "@/assets/hoodie-gallery-1.jpg";
import hoodie2 from "@/assets/hoodie-gallery-2.jpg";
import hoodie3 from "@/assets/hoodie-gallery-3.jpg";
import hoodie4 from "@/assets/hoodie-gallery-4.jpg";
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
import modelSkirt1 from "@/assets/model-skirt-1.jpg";
import modelSkirt2 from "@/assets/model-skirt-2.jpg";
import modelSkirt3 from "@/assets/model-skirt-3.jpg";
import modelFragrance1 from "@/assets/model-fragrance-1.jpg";
import modelFragrance2 from "@/assets/model-fragrance-2.jpg";
import modelFragrance3 from "@/assets/model-fragrance-3.jpg";
import elara1 from "@/assets/elara-dress-1.png";
import elara2 from "@/assets/elara-dress-2.png";
import elara3 from "@/assets/elara-dress-3.png";
import harper1 from "@/assets/harper-denim-1.jpg";
import harper2 from "@/assets/harper-denim-2.png";
import harper3 from "@/assets/harper-denim-3.webp";
import harper4 from "@/assets/harper-denim-4.png";
import harper5 from "@/assets/harper-denim-5.png";
import solene1 from "@/assets/solene-skirt-1.png";
import solene2 from "@/assets/solene-skirt-2.png";
import solene3 from "@/assets/solene-skirt-3.png";
import teeMudBrown from "@/assets/tee-color-mud-brown.jpg";
import teeCream from "@/assets/tee-color-cream.jpg";
import teePink from "@/assets/tee-color-pink.jpg";
import teeSilverGrey from "@/assets/tee-color-silver-grey.jpg";
import hoodieDarkBrown from "@/assets/hoodie-color-dark-brown.jpg";
import hoodieBeigeCream from "@/assets/hoodie-color-beige-cream.jpg";
import hoodieLilac from "@/assets/hoodie-color-lilac.jpg";
import hoodieOrange from "@/assets/hoodie-color-orange.jpg";
import elaraBlack from "@/assets/elara-color-black.png";
import elaraWhite from "@/assets/elara-color-white.png";
import elaraSkyBlue from "@/assets/elara-color-sky-blue.png";
import harperBeigeCream from "@/assets/harper-color-beige-cream.jpg";
import harperWhite from "@/assets/harper-color-white.jpg";
import harperSkyBlue from "@/assets/harper-color-sky-blue.jpg";
import soleneBlack from "@/assets/solene-color-black.png";
import soleneWhite from "@/assets/solene-color-white.png";
import soleneSkyBlue from "@/assets/solene-color-sky-blue.png";
import type { Product } from "@/components/site/ProductCard";

export const products: Product[] = [
  {
    id: "obsidian-tee",
    name: "Premium Heavyweight Tee",
    category: "T-Shirts",
    price: 250,
    image: tee1,
    gallery: [tee1, tee2, tee3, tee4, modelTee1, modelTee2, modelTee3],
    colorImages: { Black: tee1, "Mud Brown": teeMudBrown, Cream: teeCream, Pink: teePink, "Silver Grey": teeSilverGrey },
    badge: "New",
  },
  {
    id: "noir-hoodie",
    name: "Heavy-Weight Premium Hoodie",
    category: "Hoodies",
    price: 320,
    image: hoodie1,
    gallery: [hoodie1, hoodie2, hoodie3, hoodie4, modelHoodie1, modelHoodie2, modelHoodie3],
    colorImages: { Black: hoodie1, "Dark Brown": hoodieDarkBrown, "Beige Cream": hoodieBeigeCream, Lilac: hoodieLilac, Orange: hoodieOrange },
  },
  {
    id: "aurelia-skirt",
    name: "Aurelia",
    category: "Gala & Event Dresses",
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
    price: 999,
    image: elara1,
    gallery: [elara1, elara2, elara3],
    colorImages: { Black: elaraBlack, "Beige Cream": elara1, White: elaraWhite, "Sky Blue": elaraSkyBlue },
    colors: ["Black", "Beige Cream", "White", "Sky Blue"],
    sizes: ["S", "M", "L", "XL", "2XL"],
    description: "A graceful full-length wrap dress with a high neckline, softly gathered sleeves, and a flowing tiered silhouette.",
    badge: "Select",
  },
  {
    id: "harper-denim",
    name: "Harper Denim",
    category: "FifthPlain Select",
    collection: "select",
    price: 749,
    image: harper1,
    gallery: [harper1, harper2, harper3, harper4, harper5],
    colorImages: { Black: harper1, "Beige Cream": harperBeigeCream, White: harperWhite, "Sky Blue": harperSkyBlue },
    colors: ["Black", "Beige Cream", "White", "Sky Blue"],
    sizes: ["S", "M", "L", "XL", "2XL"],
    description: "A full-length washed denim skirt defined by an asymmetric layered construction and softly frayed edges.",
    badge: "Select",
  },
  {
    id: "solene-skirt",
    name: "Solene Skirt",
    category: "FifthPlain Select",
    collection: "select",
    price: 699,
    image: solene1,
    gallery: [solene1, solene2, solene3],
    colorImages: { Black: soleneBlack, "Beige Cream": solene1, White: soleneWhite, "Sky Blue": soleneSkyBlue },
    colors: ["Black", "Beige Cream", "White", "Sky Blue"],
    sizes: ["S", "M", "L", "XL", "2XL"],
    description: "A fluid satin maxi skirt with an asymmetric tiered ruffle hem — quiet movement, elevated ease.",
    badge: "New",
  },
];

export const mainProducts = products.filter((product) => product.collection !== "select");
export const selectProducts = products.filter((product) => product.collection === "select");

export function findProduct(id: string) {
  return products.find((p) => p.id === id);
}
