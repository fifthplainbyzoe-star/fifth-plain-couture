import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export interface CartItem {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  size?: string;
  color?: string;
  qty: number;
}

interface CartCtx {
  items: CartItem[];
  count: number;
  subtotal: number;
  add: (item: Omit<CartItem, "qty">, qty?: number) => void;
  remove: (key: string) => void;
  setQty: (key: string, qty: number) => void;
  clear: () => void;
  keyOf: (item: Pick<CartItem, "id" | "size" | "color">) => string;
}

const Ctx = createContext<CartCtx | null>(null);
const STORAGE = "fp_cart_v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? window.localStorage.getItem(STORAGE) : null;
      if (raw) setItems(JSON.parse(raw));
    } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    try { window.localStorage.setItem(STORAGE, JSON.stringify(items)); } catch { /* ignore */ }
  }, [items]);

  const keyOf = (i: Pick<CartItem, "id" | "size" | "color">) => `${i.id}::${i.size ?? ""}::${i.color ?? ""}`;

  const add: CartCtx["add"] = (item, qty = 1) => {
    setItems((prev) => {
      const k = keyOf(item);
      const existing = prev.find((p) => keyOf(p) === k);
      if (existing) return prev.map((p) => (keyOf(p) === k ? { ...p, qty: p.qty + qty } : p));
      return [...prev, { ...item, qty }];
    });
  };
  const remove: CartCtx["remove"] = (key) => setItems((prev) => prev.filter((p) => keyOf(p) !== key));
  const setQty: CartCtx["setQty"] = (key, qty) =>
    setItems((prev) => prev.flatMap((p) => (keyOf(p) === key ? (qty <= 0 ? [] : [{ ...p, qty }]) : [p])));
  const clear = () => setItems([]);

  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const count = items.reduce((s, i) => s + i.qty, 0);

  return <Ctx.Provider value={{ items, count, subtotal, add, remove, setQty, clear, keyOf }}>{children}</Ctx.Provider>;
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart must be used within CartProvider");
  return c;
}
