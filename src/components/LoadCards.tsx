"use client";

import { useEffect, useState } from "react";
import Container from "@/components/ui/container";
import NewsCardGrid, { NewsCardData, StatusToken } from "@/components/ui/Cards";
import Pagination from "@/components/NextPage";
import { useSearchFilter } from "@/hooks/useSearchFilter";
import FilterBar from "@/components/FilterBar";

const PAGE_SIZE = 6;

interface LoadCardsProps {
  searchTerm: string;
}

interface ApiResponse {
  news: NewsCardData[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
}

const LoadCards: React.FC<LoadCardsProps> = ({ searchTerm }) => {
  const [items, setItems] = useState<NewsCardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState<StatusToken | "All">("All");

  const fetchNews = (page: number, search: string, status: StatusToken | "All") => {
    const controller = new AbortController();
    const url = new URL("/api/noticias", window.location.origin);
    url.searchParams.set("page", page.toString());
    url.searchParams.set("limit", PAGE_SIZE.toString());

    if (search) {
      url.searchParams.set("q", search);
    }

    if (status !== "All") {
      url.searchParams.set("status", status);
    }

    fetch(url.toString(), { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Falha ao carregar notícias");
        }
        const data = (await response.json()) as ApiResponse;
        setItems(data.news);
        setTotalPages(data.totalPages);
        setCurrentPage(data.currentPage);
      })
      .catch((err: Error) => {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  };

  useEffect(() => {
    setLoading(true);
    setError(null);
    setCurrentPage(1); // Reset page on filter change
    const cleanup = fetchNews(1, searchTerm, selectedStatus);
    return cleanup;
  }, [searchTerm, selectedStatus]);

  // Client-side filtering is no longer primary, but we keep it for immediate feedback if needed
  // However, since we are fetching from API with filter, we might not need useSearchFilter anymore
  // But the original code used it. Let's keep it but be aware it might filter what's already filtered.
  // Actually, if API filters, client filter is redundant or might conflict if logic differs.
  // The original useSearchFilter filters by text.
  // Since we passed text to API, the items returned are already filtered by text.
  // So useSearchFilter might be redundant if API handles text search fully.
  // Let's check useSearchFilter implementation.
  // For now, I'll assume API handles it and just use items directly or keep useSearchFilter if it does client-side refinement.
  // Given the previous code used it, I'll keep it but typically API search replaces client search.
  // Wait, the previous code fetched with search term AND filtered client side?
  // "const filteredItems = useSearchFilter(items, searchTerm);"
  // If API returns filtered items, useSearchFilter might filter again.
  // Let's stick to using `items` directly if API handles search, or keep it if it does something extra.
  // The API update I made handles 'q' and 'status'.
  // So `items` should be correct.

  const normalizedSearchTerm = searchTerm.trim();

  const handleFilterChange = (status: StatusToken | "All") => {
    setSelectedStatus(status);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setLoading(true);
    setError(null);
    fetchNews(page, searchTerm, selectedStatus);
  };

  return (
    <Container>
      <FilterBar currentStatus={selectedStatus} onFilterChange={handleFilterChange} />

      {loading && <p className="px-4 text-sm text-gray-500">Carregando notícias…</p>}
      {error && <p className="px-4 text-sm text-red-600">{error}</p>}
      {!loading && !error && (
        <div className="space-y-6">
          {items.length === 0 ? (
            <div className="flex items-center justify-center">
              <p className="text-lg font-semibold text-gray-700 text-center">
                Nenhuma notícia encontrada
                {normalizedSearchTerm ? ` para “${normalizedSearchTerm}”.` : "."}
                {selectedStatus !== "All" ? ` com status ${selectedStatus}.` : ""}
              </p>
            </div>
          ) : (
            <>
              <NewsCardGrid items={items} />
              {totalPages > 1 && (
                <Pagination
                  totalPages={totalPages}
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
                />
              )}
            </>
          )}
        </div>
      )}
    </Container>
  );
};

export default LoadCards;