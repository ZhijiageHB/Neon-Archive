export function PostCardSkeleton() {
  return (
    <div className="glass rounded-xl p-5 animate-pulse">
      <div className="h-3 w-24 bg-black/[0.06] rounded mb-3" />
      <div className="h-5 w-3/4 bg-black/[0.06] rounded mb-2" />
      <div className="h-3 w-full bg-black/[0.06] rounded mb-1" />
      <div className="h-3 w-2/3 bg-black/[0.06] rounded" />
    </div>
  );
}

export function MessageSkeleton() {
  return (
    <div className="py-4 border-b border-border-subtle animate-pulse">
      <div className="h-3 w-20 bg-black/[0.06] rounded mb-2" />
      <div className="h-3 w-full bg-black/[0.06] rounded mb-1" />
      <div className="h-3 w-1/2 bg-black/[0.06] rounded" />
    </div>
  );
}
