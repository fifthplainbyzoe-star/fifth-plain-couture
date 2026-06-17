export function Marquee({ items }: { items: string[] }) {
  const loop = [...items, ...items, ...items, ...items];
  return (
    <div className="overflow-hidden border-y border-border bg-surface py-6">
      <div className="flex marquee gap-20 whitespace-nowrap">
        {loop.map((t, i) => (
          <span
            key={i}
            className="font-editorial text-2xl text-gold/80"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
