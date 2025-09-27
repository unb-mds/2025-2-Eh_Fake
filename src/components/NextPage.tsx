"use client";

import { usePagination } from "@/hooks/usePagination";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
}) => {
  const pages = usePagination(totalPages, currentPage);

  return (
    <nav className="flex items-center justify-center gap-2 text-sm">
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="grid h-9 w-9 place-items-center rounded-full border border-gray-300 text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
        aria-label="Página anterior"
      >
        {"<"}
      </button>

      {pages.map((token, index) =>
        token === "ellipsis" ? (
          <span key={`ellipsis-${index}`} className="px-2 text-gray-400">
            …
          </span>
        ) : (
          <button
            key={token}
            type="button"
            onClick={() => onPageChange(token)}
            className={`grid h-9 min-w-[2.25rem] place-items-center rounded-full border transition ${
              currentPage === token
                ? "border-gray-900 bg-gray-900 text-white"
                : "border-gray-300 text-gray-700 hover:bg-gray-100"
            }`}
            aria-current={currentPage === token ? "page" : undefined}
          >
            {token}
          </button>
        ),
      )}

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="grid h-9 w-9 place-items-center rounded-full border border-gray-300 text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
        aria-label="Próxima página"
      >
        {">"}
      </button>
    </nav>
  );
};

export default Pagination;