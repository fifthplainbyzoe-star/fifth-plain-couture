import assert from "node:assert/strict";
import { describe, test } from "node:test";
import { CATALOG, priceCart } from "./pricing.server";

describe("current FifthPlain catalog rules", () => {
  test("Aurelia uses its new name and Tracksuit Centre is removed", () => {
    assert.equal(CATALOG["aurelia-skirt"]?.name, "Aurelia");
    assert.equal(CATALOG["ivory-tracksuit"], undefined);
  });

  test("2XL adds R90 to an apparel item", () => {
    const priced = priceCart(
      [{ id: "elara-dress", qty: 1, size: "2XL" }],
      "paxi-economy-small",
    );

    assert.equal(priced.lines[0]?.price, 1089);
    assert.equal(priced.subtotal, 1089);
  });
});