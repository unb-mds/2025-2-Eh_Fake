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
    <nav className="flex items-center justify-center gap-2 text-sm mb-6">
      {/* Botão de voltar */}
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 rounded text-gray-700 transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-40"
        aria-label="Página anterior"
      >
        Voltar
      </button>

      {/* Botões de páginas (numéricos) */}
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
            className={`px-4 py-2 rounded border transition ${
              currentPage === token
                ? "border-white bg-gray-900 text-white"
                : "border-white text-gray-700 hover:bg-gray-100"
            }`}
            aria-current={currentPage === token ? "page" : undefined}
          >
            {token}
          </button>
        ),
      )}

      {/* Botão de próxima página */}
      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 rounded text-gray-700 transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-40"
        aria-label="Próxima página"
      >
        Próxima
      </button>
    </nav>
  );
};

export default Pagination;