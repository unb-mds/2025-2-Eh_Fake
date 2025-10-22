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
    <nav className="mb-6 flex items-center justify-center gap-2 text-sm text-dark-primary dark:text-light-primary">
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 rounded bg-light-secondary/60 text-dark-primary hover:bg-gray-200 hover:cursor-pointer transition-colors duration-300 hover:bg-light-secondary/80 disabled:cursor-not-allowed disabled:bg-light-secondary/40 disabled:text-gray-400 disabled:hover:bg-light-secondary/40 dark:bg-dark-secondary/80 dark:text-light-primary dark:hover:bg-dark-secondary/60 dark:disabled:bg-dark-secondary/40 dark:disabled:text-gray-500"
        aria-label="Página anterior"
      >
        Voltar
      </button>

      {pages.map((token, index) =>
        token === "ellipsis" ? (
          <span key={`ellipsis-${index}`} className="px-2 text-gray-400 dark:text-gray-500">
            …
          </span>
        ) : (
          <button
            key={token}
            type="button"
            onClick={() => onPageChange(token)}
            className={`px-4 py-2 rounded border transition-colors duration-300 ${
              currentPage === token
                ? "border-light-200 bg-light-secondary/80 text-dark-primary bg-gray-500 hover:cursor-not-allowed shadow-sm dark:border-dark-200 dark:bg-dark-secondary/80 dark:text-light-primary"
                : "border-light-200/70 bg-transparent text-dark-primary hover:cursor-pointer hover:bg-light-secondary/60 hover:bg-gray-200 dark:border-dark-200/70 dark:text-light-primary dark:hover:bg-dark-secondary/60"
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
        className="px-4 py-2 rounded bg-light-secondary/60 text-dark-primary transition-colors hover:bg-gray-200 hover:cursor-pointer duration-300 hover:bg-light-secondary/80 disabled:cursor-not-allowed disabled:bg-light-secondary/40 disabled:text-gray-400 disabled:hover:bg-light-secondary/40 dark:bg-dark-secondary/80 dark:text-light-primary dark:hover:bg-dark-secondary/60 dark:disabled:bg-dark-secondary/40 dark:disabled:text-gray-500"
        aria-label="Próxima página"
      >
        Próxima
      </button>
    </nav>
  );
};

export default Pagination;