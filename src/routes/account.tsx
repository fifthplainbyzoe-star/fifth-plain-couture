import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/account")({
  head: () => ({ meta: [{ title: "Account — Fifth Plain" }, { name: "robots", content: "noindex" }] }),
  component: Account,
});

const tabs = ["Profile", "Orders", "Wishlist", "Addresses", "Rewards"];

function Account() {
  return (
    <section className="mx-auto max-w-[1400px] px-6 lg:px-12 py-16">
      <div className="text-[10px] uppercase tracking-[0.32em] text-gold">Welcome back</div>
      <h1 className="mt-3 font-editorial text-4xl md:text-5xl text-ivory">Maison · A. Laurent</h1>

      <div className="mt-12 grid lg:grid-cols-[240px_1fr] gap-12">
        <aside className="border-r-0 lg:border-r border-border lg:pr-8">
          <ul className="flex lg:flex-col gap-2 overflow-x-auto">
            {tabs.map((t, i) => (
              <li key={t}>
                <button className={`w-full text-left text-[11px] uppercase tracking-[0.28em] px-4 py-3 transition-colors ${i === 0 ? "text-gold border-l border-gold" : "text-ivory/70 hover:text-ivory"}`}>{t}</button>
              </li>
            ))}
            <li className="lg:mt-8">
              <Link to="/" className="block text-[11px] uppercase tracking-[0.28em] px-4 py-3 text-muted-foreground hover:text-gold">Sign Out</Link>
            </li>
          </ul>
        </aside>
        <div>
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              ["Member Since", "2024"],
              ["Tier", "Medallion Circle"],
              ["Reward Points", "2,480"],
              ["Lifetime Atelier", "$12,940"],
            ].map(([k, v]) => (
              <div key={k} className="border border-border p-8 bg-surface">
                <div className="text-[10px] uppercase tracking-[0.28em] text-gold">{k}</div>
                <div className="mt-3 font-editorial text-2xl text-ivory">{v}</div>
              </div>
            ))}
          </div>
          <h2 className="mt-12 font-editorial text-2xl text-ivory">Recent orders</h2>
          <ul className="mt-6 divide-y divide-border border-y border-border">
            {[
              ["#FP-2401", "Noir Atelier Hoodie", "$420", "Delivered"],
              ["#FP-2398", "Medallion Pendant N°017", "$2,400", "In Transit"],
              ["#FP-2390", "Or Ambré 100ml", "$240", "Delivered"],
            ].map(([n, name, price, status]) => (
              <li key={n} className="py-5 grid grid-cols-[auto_1fr_auto_auto] items-center gap-6 text-sm">
                <span className="font-display text-[11px] tracking-[0.28em] text-gold">{n}</span>
                <span className="text-ivory truncate">{name}</span>
                <span className="text-ivory">{price}</span>
                <span className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">{status}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
