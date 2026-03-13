export default function PropertyCardSkeleton() {
  return (
    <div className="rounded-xl overflow-hidden border border-gold-400/5 bg-obsidian-900">
      <div className="aspect-[4/3] skeleton" />
      <div className="p-5 space-y-3">
        <div className="skeleton h-3 w-32 rounded" />
        <div className="skeleton h-5 w-full rounded" />
        <div className="skeleton h-4 w-3/4 rounded" />
        <div className="skeleton h-6 w-28 rounded" />
        <div className="h-px skeleton rounded" />
        <div className="flex gap-4">
          <div className="skeleton h-3 w-16 rounded" />
          <div className="skeleton h-3 w-16 rounded" />
          <div className="skeleton h-3 w-16 rounded" />
        </div>
      </div>
    </div>
  );
}
