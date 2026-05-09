import { Skeleton } from "@/components/ui/skeleton";

export default function GuestbookLoading() {
  return (
    <div className="mx-auto max-w-3xl px-6 pt-32 pb-20">
      <Skeleton className="h-8 w-72 mb-3" />
      <Skeleton className="h-4 w-96 mb-8" />
      <div className="rounded-xl border border-border-subtle bg-surface p-6">
        <Skeleton className="h-4 w-16 mb-3" />
        <Skeleton className="h-10 w-full rounded-lg mb-4" />
        <Skeleton className="h-4 w-20 mb-3" />
        <Skeleton className="h-20 w-full rounded-lg mb-4" />
        <Skeleton className="h-10 w-24 rounded-xl" />
      </div>
    </div>
  );
}
