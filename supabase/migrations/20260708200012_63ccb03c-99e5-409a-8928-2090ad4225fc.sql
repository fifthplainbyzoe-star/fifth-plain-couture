
CREATE TABLE public.orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  reference TEXT NOT NULL UNIQUE,
  cart JSONB NOT NULL,
  subtotal NUMERIC(12,2) NOT NULL,
  shipping_cost NUMERIC(12,2) NOT NULL,
  total NUMERIC(12,2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'ZAR',
  shipping_carrier TEXT,
  shipping_option TEXT,
  shipping_details JSONB,
  phone TEXT,
  bank TEXT,
  checkout_id TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  payment_result JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT ALL ON public.orders TO service_role;

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- No anon/authenticated policies: all access flows through server functions using the service role.

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER orders_set_updated_at
BEFORE UPDATE ON public.orders
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE INDEX orders_reference_idx ON public.orders(reference);
CREATE INDEX orders_checkout_id_idx ON public.orders(checkout_id);
