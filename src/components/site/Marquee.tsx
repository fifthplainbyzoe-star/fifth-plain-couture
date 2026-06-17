export function Marquee({ items }: { items: string[] }) {
  const loop = [...items, ...items, ...items, ...items];
  return (
    <div className="overflow-hidden border-y border-border bg-surface py-5">
      <div className="flex marquee gap-16 whitespace-nowrap">
        {loop.map((t, i) => (
          <span
            key={i}
            className="font-display text-[11px] tracking-[0.4em] text-ivory/70"
          >
            ✦&nbsp;&nbsp;{t}
          </span>
        ))}
      </div>
    </div>
  );
}
