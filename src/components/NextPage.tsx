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

  const baseButtonClass =
    "px-4 py-2 rounded-lg border text-sm font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";

  const defaultButtonClass =
    "bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-700 dark:hover:border-slate-600";

  const activeButtonClass =
    "bg-slate-900 border-slate-900 text-white shadow-md dark:bg-slate-100 dark:border-slate-100 dark:text-slate-900";

  return (
    <nav className="mb-8 flex items-center justify-center gap-2" aria-label="Navegação de páginas">
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`${baseButtonClass} ${defaultButtonClass}`}
        aria-label="Página anterior"
      >
        Voltar
      </button>

      <div className="flex items-center gap-1">
        {pages.map((token, index) =>
          token === "ellipsis" ? (
            <span
              key={`ellipsis-${index}`}
              className="px-2 text-slate-400 dark:text-slate-500 select-none"
            >
              …
            </span>
          ) : (
            <button
              key={token}
              type="button"
              onClick={() => onPageChange(token)}
              className={`${baseButtonClass} ${currentPage === token ? activeButtonClass : defaultButtonClass
                }`}
              aria-current={currentPage === token ? "page" : undefined}
            >
              {token}
            </button>
          ),
        )}
      </div>

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`${baseButtonClass} ${defaultButtonClass}`}
        aria-label="Próxima página"
      >
        Próxima
      </button>
    </nav>
  );
};

export default Pagination;