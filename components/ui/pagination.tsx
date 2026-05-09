import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  basePath = "/blog",
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="flex items-center justify-center gap-1.5 mt-12" aria-label="Pagination">
      {/* Previous */}
      <Link
        href={currentPage > 1 ? `${basePath}?page=${currentPage - 1}` : "#"}
        className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm transition-colors ${
          currentPage <= 1
            ? "text-text-muted cursor-not-allowed pointer-events-none"
            : "text-text-secondary hover:text-text-primary hover:bg-black/[0.04]"
        }`}
        aria-disabled={currentPage <= 1}
        tabIndex={currentPage <= 1 ? -1 : 0}
      >
        <ChevronLeft size={16} />
        <span className="hidden sm:inline">Prev</span>
      </Link>

      {/* Page numbers */}
      {pages.map((page) => (
        <Link
          key={page}
          href={`${basePath}?page=${page}`}
          className={`min-w-[36px] h-9 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
            page === currentPage
              ? "bg-brand-purple text-white"
              : "text-text-secondary hover:text-text-primary hover:bg-black/[0.04]"
          }`}
          aria-current={page === currentPage ? "page" : undefined}
        >
          {page}
        </Link>
      ))}

      {/* Next */}
      <Link
        href={currentPage < totalPages ? `${basePath}?page=${currentPage + 1}` : "#"}
        className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm transition-colors ${
          currentPage >= totalPages
            ? "text-text-muted cursor-not-allowed pointer-events-none"
            : "text-text-secondary hover:text-text-primary hover:bg-black/[0.04]"
        }`}
        aria-disabled={currentPage >= totalPages}
        tabIndex={currentPage >= totalPages ? -1 : 0}
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight size={16} />
      </Link>
    </nav>
  );
}
