import { createFileRoute } from "@tanstack/react-router";

// Peach Payments notification webhook.
// Peach sends AES-256-GCM encrypted payloads with iv + auth tag in headers.
// We decrypt with the key set in PEACH_WEBHOOK_DECRYPTION_KEY, then update the order.
export const Route = createFileRoute("/api/public/payshap-webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const [{ decryptPeachWebhook, isSuccessCode }, { supabaseAdmin }] = await Promise.all([
          import("@/lib/payshap.server"),
          import("@/integrations/supabase/client.server"),
        ]);

        const ivHex = request.headers.get("x-initialization-vector") ?? "";
        const authTagHex = request.headers.get("x-authentication-tag") ?? "";
        if (!ivHex || !authTagHex) {
          return new Response("Missing required headers", { status: 400 });
        }

        const cipherHex = (await request.text()).trim();
        if (!cipherHex) return new Response("Empty body", { status: 400 });

        let payload: Record<string, unknown>;
        try {
          payload = await decryptPeachWebhook(ivHex, authTagHex, cipherHex);
        } catch (err) {
          console.error("[payshap-webhook] decryption failed", err);
          return new Response("Invalid payload", { status: 401 });
        }

        const inner =
          (payload.payload as Record<string, unknown> | undefined) ?? payload;
        const reference = inner.merchantTransactionId as string | undefined;
        const code =
          typeof inner.result === "object" && inner.result !== null
            ? ((inner.result as Record<string, unknown>).code as string | undefined)
            : undefined;

        if (!reference) return new Response("Missing reference", { status: 400 });

        const status = isSuccessCode(code) ? "paid" : "failed";
        const { error } = await supabaseAdmin
          .from("orders")
          .update({ status, payment_result: payload })
          .eq("reference", reference);
        if (error) {
          console.error("[payshap-webhook] db update failed", error);
          return new Response("DB error", { status: 500 });
        }

        return new Response("ok");
      },
    },
  },
});
