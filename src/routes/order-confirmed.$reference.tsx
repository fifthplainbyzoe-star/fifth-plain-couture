import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Check, Clock, XCircle } from "lucide-react";
import {
  getOrderByReference,
  syncOrderStatusFromPeach,
} from "@/lib/payshap.functions";

export const Route = createFileRoute("/order-confirmed/$reference")({
  head: ({ params }) => ({
    meta: [
      { title: `Order ${params.reference} — Fifth Plain` },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: OrderConfirmed,
});

interface OrderRow {
  reference: string;
  total: number;
  currency: string;
  status: string;
  shipping_carrier: string | null;
  shipping_option: string | null;
  created_at: string;
}

function OrderConfirmed() {
  const { reference } = useParams({ from: "/order-confirmed/$reference" });
  const [order, setOrder] = useState<OrderRow | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        // Ask the server to refresh the status from Peach, then read the row.
        await syncOrderStatusFromPeach({ data: { reference } });
        const row = (await getOrderByReference({
          data: { reference },
        })) as OrderRow | null;
        if (mounted) setOrder(row);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [reference]);

  if (loading) {
    return (
      <section className="mx-auto max-w-[640px] px-6 py-24 text-center">
        <div className="text-[10px] uppercase tracking-[0.32em] text-gold">
          Confirming
        </div>
        <h1 className="mt-3 font-editorial text-4xl text-ivory">
          Checking payment…
        </h1>
      </section>
    );
  }

  if (!order) {
    return (
      <section className="mx-auto max-w-[640px] px-6 py-24 text-center">
        <h1 className="font-editorial text-3xl text-ivory">Order not found</h1>
        <p className="mt-4 text-muted-foreground">
          Reference {reference} is not recognised.
        </p>
        <Link
          to="/shop"
          className="mt-8 inline-block border border-gold text-gold px-8 py-3 text-[11px] uppercase tracking-[0.28em] hover:bg-gold hover:text-background"
        >
          Back to shop
        </Link>
      </section>
    );
  }

  const paid = order.status === "paid";
  const failed = order.status === "failed" || order.status === "cancelled";
  const Icon = paid ? Check : failed ? XCircle : Clock;
  const title = paid
    ? "Order Confirmed"
    : failed
      ? "Payment Failed"
      : "Payment Pending";
  const message = paid
    ? "Your PayShap payment cleared. A receipt has been sent to your bank app."
    : failed
      ? "We could not confirm your payment. You have not been charged. Please try again."
      : "We are still waiting for your bank to confirm this PayShap request.";

  return (
    <section className="mx-auto max-w-[640px] px-6 py-24 text-center">
      <div
        className={`mx-auto w-16 h-16 rounded-full border flex items-center justify-center ${
          paid ? "border-gold" : failed ? "border-red-400" : "border-muted-foreground"
        }`}
      >
        <Icon className={`w-7 h-7 ${paid ? "text-gold" : failed ? "text-red-400" : "text-muted-foreground"}`} />
      </div>
      <div className="mt-8 text-[10px] uppercase tracking-[0.32em] text-gold">
        {order.status.toUpperCase()}
      </div>
      <h1 className="mt-3 font-editorial text-4xl text-ivory">{title}</h1>
      <p className="mt-6 text-muted-foreground">{message}</p>

      <div className="mt-8 inline-block border border-border px-6 py-4 text-left">
        <div className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
          Reference
        </div>
        <div className="mt-1 font-editorial text-xl text-gold">{order.reference}</div>
        <div className="mt-3 text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
          Total
        </div>
        <div className="mt-1 font-editorial text-lg text-ivory">
          {order.currency} {Number(order.total).toLocaleString()}
        </div>
      </div>

      <div className="mt-10 flex gap-3 justify-center">
        <Link
          to="/shop"
          className="border border-gold text-gold px-8 py-3 text-[11px] uppercase tracking-[0.28em] hover:bg-gold hover:text-background transition-colors"
        >
          Continue
        </Link>
        <Link
          to="/"
          className="border border-border text-ivory px-8 py-3 text-[11px] uppercase tracking-[0.28em] hover:border-ivory"
        >
          Home
        </Link>
      </div>
    </section>
  );
}
