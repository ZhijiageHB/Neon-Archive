import { Skeleton } from "@/components/ui/skeleton";

export default function PostLoading() {
  return (
    <div className="mx-auto max-w-3xl px-6 pt-32 pb-20">
      <Skeleton className="h-4 w-28 mb-8" />
      <div className="flex items-center gap-3 mb-4">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-5 w-16 rounded-full" />
      </div>
      <Skeleton className="h-10 w-3/4 mb-3" />
      <Skeleton className="h-5 w-full mb-2" />
      <Skeleton className="h-5 w-2/3 mb-6" />
      <div className="flex gap-4 mb-10">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-3 w-16" />
      </div>
      <div className="h-px bg-border-subtle mb-10" />
      <div className="space-y-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/5" />
        <Skeleton className="h-24 w-full rounded-xl" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  );
}
