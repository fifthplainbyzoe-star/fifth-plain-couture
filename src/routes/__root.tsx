import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Nav } from "../components/site/Nav";
import { Footer } from "../components/site/Footer";
import { CartProvider } from "../lib/cart";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display gold-text text-7xl">404</h1>
        <h2 className="mt-4 font-editorial text-2xl text-ivory">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for has been moved, or never existed.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center justify-center border border-gold px-8 py-3 text-[11px] uppercase tracking-[0.28em] text-gold hover:bg-gold hover:text-background transition-colors"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 text-center">
      <div className="max-w-md">
        <h1 className="font-editorial text-2xl text-ivory">Something interrupted the experience</h1>
        <p className="mt-2 text-sm text-muted-foreground">Try refreshing or returning home.</p>
        <div className="mt-6 flex justify-center gap-3">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="border border-gold px-6 py-3 text-[11px] uppercase tracking-[0.28em] text-gold hover:bg-gold hover:text-background transition-colors"
          >
            Try again
          </button>
          <a href="/" className="border border-border px-6 py-3 text-[11px] uppercase tracking-[0.28em] hover:border-ivory">Home</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "FIFTH PLAIN — Luxury Beyond Limits" },
      { name: "description", content: "Fifth Plain is a luxury ship of timeless design, elevated essentials, premium craftsmanship, and rare fragrance." },
      { property: "og:title", content: "FIFTH PLAIN — Luxury Beyond Limits" },
      { property: "og:description", content: "A ship of timeless design, elevated essentials, and premium craftsmanship." },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Fifth Plain" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Karla:wght@200;300;400;500;600&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <Nav />
        <main className="min-h-screen pt-16 lg:pt-20">
          <Outlet />
        </main>
        <Footer />
      </CartProvider>
    </QueryClientProvider>
  );
}
