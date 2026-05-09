import { Skeleton } from "@/components/ui/skeleton";

export default function BlogLoading() {
  return (
    <div className="mx-auto max-w-5xl px-6 pt-32 pb-20">
      <Skeleton className="h-8 w-24 mb-2" />
      <Skeleton className="h-4 w-64 mb-10" />
      {[...Array(5)].map((_, i) => (
        <div key={i} className="py-6 border-b border-border-subtle">
          <div className="flex items-center gap-3 mb-3">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-3 w-16" />
          </div>
          <Skeleton className="h-5 w-2/3 mb-2" />
          <Skeleton className="h-4 w-1/2 mb-3" />
          <div className="flex gap-4">
            <Skeleton className="h-3 w-12" />
            <Skeleton className="h-3 w-12" />
          </div>
        </div>
      ))}
    </div>
  );
}
