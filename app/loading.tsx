import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="mx-auto max-w-5xl px-6 pt-32 pb-20">
      <div className="space-y-3 mb-12">
        <Skeleton className="h-14 w-3/4" />
        <Skeleton className="h-14 w-2/3" />
        <Skeleton className="h-14 w-1/2" />
      </div>
      <Skeleton className="h-5 w-96 mb-8" />
      <div className="flex gap-3 mb-10">
        <Skeleton className="h-8 w-36 rounded-full" />
        <Skeleton className="h-8 w-36 rounded-full" />
        <Skeleton className="h-8 w-36 rounded-full" />
      </div>
      <div className="flex gap-4">
        <Skeleton className="h-11 w-40 rounded-xl" />
        <Skeleton className="h-11 w-28 rounded-xl" />
      </div>
    </div>
  );
}
