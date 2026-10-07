import { describe, expect, test } from "bun:test";
import { CATALOG, priceCart } from "./pricing.server";

describe("current FifthPlain catalog rules", () => {
  test("Aurelia uses its new name and Tracksuit Centre is removed", () => {
    expect(CATALOG["aurelia-skirt"]?.name).toBe("Aurelia");
    expect(CATALOG["ivory-tracksuit"]).toBeUndefined();
  });

  test("2XL adds R90 to an apparel item", () => {
    const priced = priceCart(
      [{ id: "elara-dress", qty: 1, size: "2XL" }],
      "paxi-economy-small",
    );

    expect(priced.lines[0]?.price).toBe(1089);
    expect(priced.subtotal).toBe(1089);
  });
});