// Peach Payments PayShap helpers. Server-only — never import from client code.

export interface PeachEnv {
  baseUrl: string;
  accessToken: string;
  entityId: string;
  webhookDecryptionKey: string;
}

export function getPeachEnv(): PeachEnv {
  const baseUrl = process.env.PEACH_BASE_URL;
  const accessToken = process.env.PEACH_ACCESS_TOKEN;
  const entityId = process.env.PEACH_ENTITY_ID;
  const webhookDecryptionKey = process.env.PEACH_WEBHOOK_DECRYPTION_KEY;

  if (!baseUrl || !accessToken || !entityId) {
    throw new Error(
      "Missing Peach Payments env vars. Required: PEACH_BASE_URL, PEACH_ACCESS_TOKEN, PEACH_ENTITY_ID.",
    );
  }
  return {
    baseUrl: baseUrl.replace(/\/$/, ""),
    accessToken,
    entityId,
    webhookDecryptionKey: webhookDecryptionKey ?? "",
  };
}

export interface PrepareCheckoutParams {
  amount: number;
  currency: string;
  reference: string;
  shopperResultUrl: string;
  notificationUrl: string;
  phone?: string;
}

export async function prepareCheckout(params: PrepareCheckoutParams): Promise<{
  id: string;
  raw: Record<string, unknown>;
}> {
  const env = getPeachEnv();

  const body = new URLSearchParams({
    entityId: env.entityId,
    amount: params.amount.toFixed(2),
    currency: params.currency,
    paymentType: "DB",
    merchantTransactionId: params.reference,
    shopperResultUrl: params.shopperResultUrl,
    notificationUrl: params.notificationUrl,
  });
  if (params.phone) body.set("customer.mobile", params.phone);

  const res = await fetch(`${env.baseUrl}/v1/checkouts`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.accessToken}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body.toString(),
  });

  const json = (await res.json()) as Record<string, unknown>;
  if (!res.ok || typeof json.id !== "string") {
    throw new Error(
      `Peach prepare checkout failed: ${res.status} ${JSON.stringify(json)}`,
    );
  }
  return { id: json.id, raw: json };
}

export async function getCheckoutStatus(checkoutId: string): Promise<Record<string, unknown>> {
  const env = getPeachEnv();
  const res = await fetch(
    `${env.baseUrl}/v1/checkouts/${encodeURIComponent(checkoutId)}/payment?entityId=${encodeURIComponent(env.entityId)}`,
    {
      headers: { Authorization: `Bearer ${env.accessToken}` },
    },
  );
  return (await res.json()) as Record<string, unknown>;
}

// Peach considers a payment successful when result.code matches one of these regexes.
export function isSuccessCode(code: string | undefined | null): boolean {
  if (!code) return false;
  return (
    /^(000\.000\.|000\.100\.1|000\.[36])/.test(code) ||
    /^(000\.400\.0[^3]|000\.400\.100)/.test(code)
  );
}

// Peach webhook payloads are AES-256-GCM encrypted. The dashboard provides
// a hex-encoded key. Headers deliver the iv and auth tag.
export async function decryptPeachWebhook(
  ivHex: string,
  authTagHex: string,
  cipherHex: string,
): Promise<Record<string, unknown>> {
  const { createDecipheriv } = await import("crypto");
  const env = getPeachEnv();
  if (!env.webhookDecryptionKey) {
    throw new Error("PEACH_WEBHOOK_DECRYPTION_KEY is not configured");
  }
  const key = Buffer.from(env.webhookDecryptionKey, "hex");
  const iv = Buffer.from(ivHex, "hex");
  const authTag = Buffer.from(authTagHex, "hex");
  const cipher = Buffer.from(cipherHex, "hex");

  const decipher = createDecipheriv("aes-256-gcm", key, iv);
  decipher.setAuthTag(authTag);
  const decrypted = Buffer.concat([decipher.update(cipher), decipher.final()]);
  return JSON.parse(decrypted.toString("utf8")) as Record<string, unknown>;
}
