import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath?: string;
}

function getPageNumbers(currentPage: number, totalPages: number) {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (currentPage <= 4) {
    return [1, 2, 3, 4, 5, "...", totalPages];
  }

  if (currentPage >= totalPages - 3) {
    return [
      1,
      "...",
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }

  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
}

export function Pagination({
  currentPage,
  totalPages,
  basePath = "/project",
}: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const pages = getPageNumbers(currentPage, totalPages);

  return (
    <nav className="flex items-center gap-2" aria-label="Pagination">
      {/* Previous */}
      {currentPage > 1 ? (
        <Link
          href={`${basePath}?page=${currentPage - 1}`}
          className="flex h-10 w-10 items-center justify-center rounded-md border border-border-divider bg-card-background hover:bg-gray-50"
        >
          <ChevronLeft size={16} />
        </Link>
      ) : (
        <button
          disabled
          className="flex h-10 w-10 cursor-not-allowed items-center justify-center rounded-md border border-border-divider bg-card-background opacity-50"
        >
          <ChevronLeft size={16} />
        </button>
      )}

      {/* Pages */}
      {pages.map((page, index) => {
        if (page === "...") {
          return (
            <span
              key={`ellipsis-${index}`}
              className="flex h-10 w-10 items-center justify-center text-sm text-text-muted"
            >
              ...
            </span>
          );
        }

        const isActive = page === currentPage;

        return (
          <Link
            key={page}
            href={`${basePath}?page=${page}`}
            className={`flex h-10 w-10 items-center justify-center rounded-md border text-sm font-medium ${
              isActive
                ? "border-primary bg-primary text-white"
                : "border-border-divider bg-card-background hover:bg-gray-50"
            }`}
          >
            {page}
          </Link>
        );
      })}

      {/* Next */}
      {currentPage < totalPages ? (
        <Link
          href={`${basePath}?page=${currentPage + 1}`}
          className="flex h-10 w-10 items-center justify-center rounded-md border border-border-divider bg-card-background hover:bg-gray-50"
        >
          <ChevronRight size={16} />
        </Link>
      ) : (
        <button
          disabled
          className="flex h-10 w-10 cursor-not-allowed items-center justify-center rounded-md border border-border-divider bg-card-background opacity-50"
        >
          <ChevronRight size={16} />
        </button>
      )}
    </nav>
  );
}
