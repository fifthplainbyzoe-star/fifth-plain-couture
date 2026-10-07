// Color-specific gallery photos, named `<product>-<color-slug>-<index>.jpg`.
const files = import.meta.glob("/src/assets/gallery-color/*.jpg", { eager: true, import: "default" }) as Record<string, string>;

const productKey: Record<string, string> = {
  "obsidian-tee": "tee",
  "noir-hoodie": "hoodie",
  "elara-dress": "elara",
  "harper-denim": "harper",
  "solene-skirt": "solene",
};

const slug = (s: string) => s.toLowerCase().replace(/\s+/g, "-");

/** Returns the gallery for the chosen color, or the original gallery when none exists. */
export function galleryForColor(productId: string, color: string, fallback: string[]): string[] {
  const key = productKey[productId];
  if (!key || !color) return fallback;
  const prefix = `/src/assets/gallery-color/${key}-${slug(color)}-`;
  const imgs = fallback.map((_, i) => files[`${prefix}${i + 1}.jpg`]);
  return imgs.every(Boolean) ? (imgs as string[]) : fallback;
}
