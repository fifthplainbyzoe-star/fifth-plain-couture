import { createServerFn } from "@tanstack/react-start";
import { getRequestHost } from "@tanstack/react-start/server";
import { z } from "zod";

const CartItemSchema = z.object({
  id: z.string().min(1),
  qty: z.number().int().positive().max(50),
  size: z.string().max(40).optional(),
  color: z.string().max(40).optional(),
});

const InitiateSchema = z.object({
  items: z.array(CartItemSchema).min(1).max(50),
  shippingOption: z.enum(["paxi-standard", "paxi-large", "courier-standard", "courier-express"]),
  shippingDetails: z.record(z.string(), z.any()),
  phone: z.string().min(6).max(20),
  bank: z.enum(["tymebank", "capitec"]),
});

export const initiatePayShapCheckout = createServerFn({ method: "POST" })
  .inputValidator((input) => InitiateSchema.parse(input))
  .handler(async ({ data }) => {
    const { prepareCheckout } = await import("./payshap.server");
    const { priceCart } = await import("./pricing.server");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    // Recompute every monetary value from the trusted server-side catalog.
    const priced = priceCart(data.items, data.shippingOption);

    // Origin: prefer explicit env override, otherwise derive from the request.
    const configuredOrigin = process.env.PUBLIC_APP_URL?.replace(/\/$/, "");
    const host = getRequestHost();
    const origin = configuredOrigin ?? (host ? `https://${host}` : "");
    if (!origin) throw new Error("Unable to determine app origin");

    // Generate a unique reference.
    const rand =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID().replace(/-/g, "").slice(0, 10).toUpperCase()
        : Date.now().toString(36).toUpperCase();
    const reference = `FP-${rand}`;

    // Persist a pending order.
    const { error: insertErr } = await supabaseAdmin.from("orders").insert({
      reference,
      cart: priced.lines,
      subtotal: priced.subtotal,
      shipping_cost: priced.shippingCost,
      total: priced.total,
      currency: "ZAR",
      shipping_carrier: priced.carrier,
      shipping_option: data.shippingOption,
      shipping_details: data.shippingDetails,
      phone: data.phone,
      bank: data.bank,
      status: "pending",
    });
    if (insertErr) throw new Error(`Failed to create order: ${insertErr.message}`);

    // Prepare the Peach checkout.
    const checkout = await prepareCheckout({
      amount: priced.total,
      currency: "ZAR",
      reference,
      shopperResultUrl: `${origin}/order-confirmed/${reference}`,
      notificationUrl: `${origin}/api/public/payshap-webhook`,
      phone: data.phone,
    });

    await supabaseAdmin
      .from("orders")
      .update({ checkout_id: checkout.id })
      .eq("reference", reference);

    return { reference, checkoutId: checkout.id };
  });

const RefSchema = z.object({ reference: z.string().min(1) });

export const getOrderByReference = createServerFn({ method: "GET" })
  .inputValidator((input) => RefSchema.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: row, error } = await supabaseAdmin
      .from("orders")
      .select(
        "reference,total,currency,status,shipping_carrier,shipping_option,created_at,cart",
      )
      .eq("reference", data.reference)
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (!row) return null;
    return row;
  });

export const syncOrderStatusFromPeach = createServerFn({ method: "POST" })
  .inputValidator((input) => RefSchema.parse(input))
  .handler(async ({ data }) => {
    const { getCheckoutStatus, isSuccessCode } = await import("./payshap.server");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: order, error } = await supabaseAdmin
      .from("orders")
      .select("checkout_id,status")
      .eq("reference", data.reference)
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (!order?.checkout_id) return { status: order?.status ?? "unknown" };
    if (order.status === "paid" || order.status === "failed") {
      return { status: order.status };
    }

    const result = await getCheckoutStatus(order.checkout_id);
    const code =
      typeof result.result === "object" && result.result !== null
        ? ((result.result as Record<string, unknown>).code as string | undefined)
        : undefined;
    const nextStatus = isSuccessCode(code) ? "paid" : code ? "failed" : "pending";

    await supabaseAdmin
      .from("orders")
      .update({ status: nextStatus, payment_result: result as unknown as never })
      .eq("reference", data.reference);

    return { status: nextStatus };
  });
