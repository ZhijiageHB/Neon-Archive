import { Eye, Heart } from "lucide-react";
import { formatNumber } from "@/lib/utils";

interface PostMetricsProps {
  views: number;
  likes: number;
}

export function PostMetrics({ views, likes }: PostMetricsProps) {
  return (
    <div className="flex items-center gap-4 text-sm text-text-muted">
      <span className="flex items-center gap-1.5">
        <Eye size={14} />
        {formatNumber(views)}
      </span>
      <span className="flex items-center gap-1.5">
        <Heart size={14} />
        {formatNumber(likes)}
      </span>
    </div>
  );
}
