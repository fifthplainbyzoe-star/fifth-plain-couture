import { createFileRoute, useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/pay/$reference")({
  head: () => ({
    meta: [
      { title: "Complete Payment — Fifth Plain" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: PayPage,
});

function PayPage() {
  const { reference } = useParams({ from: "/pay/$reference" });
  const search = typeof window !== "undefined" ? window.location.search : "";
  const checkoutId = new URLSearchParams(search).get("id") ?? "";
  const widgetBase =
    typeof window !== "undefined"
      ? (window as unknown as { __PEACH_BASE__?: string }).__PEACH_BASE__ ??
        "https://eu-test.oppwa.com"
      : "https://eu-test.oppwa.com";

  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!checkoutId) return;
    const s = document.createElement("script");
    s.src = `${widgetBase}/v1/paymentWidgets.js?checkoutId=${encodeURIComponent(checkoutId)}`;
    s.async = true;
    s.onload = () => setReady(true);
    document.body.appendChild(s);
    return () => {
      s.remove();
    };
  }, [checkoutId, widgetBase]);

  if (!checkoutId) {
    return (
      <section className="mx-auto max-w-[640px] px-6 py-24 text-center">
        <h1 className="font-editorial text-3xl text-ivory">Missing checkout</h1>
        <p className="mt-4 text-muted-foreground">
          No checkout id was provided. Return to the cart and try again.
        </p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-[720px] px-6 py-16">
      <div className="text-[10px] uppercase tracking-[0.32em] text-gold">Reference</div>
      <h1 className="mt-3 font-editorial text-4xl text-ivory">{reference}</h1>
      <p className="mt-4 text-sm text-muted-foreground">
        Complete your PayShap payment below. Your bank will confirm the request on your
        phone.
      </p>

      <div className="mt-10 border border-border p-6 bg-surface/30">
        {!ready && (
          <div className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
            Loading secure PayShap widget…
          </div>
        )}
        <form
          action={`/order-confirmed/${reference}`}
          className="paymentWidgets"
          data-brands="PAYSHAP"
        />
      </div>

      <p className="mt-6 text-[10px] uppercase tracking-[0.24em] text-muted-foreground text-center">
        Secured by Peach Payments · BankservAfrica · POPIA compliant
      </p>
    </section>
  );
}
