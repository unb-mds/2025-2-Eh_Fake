"use client";

import { useEffect, useMemo, useState } from "react";
import Container from "@/components/ui/container";
import NewsCardGrid, { NewsCardData } from "@/components/ui/Cards";
import Pagination from "@/components/NextPage";
import { useSearchFilter } from "@/hooks/useSearchFilter";

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

  const fetchNews = (page: number, search: string) => {
    const controller = new AbortController();
    const url = new URL("/api/noticias", window.location.origin);
    url.searchParams.set("page", page.toString());
    url.searchParams.set("limit", PAGE_SIZE.toString());
    if (search) {
      url.searchParams.set("q", search);
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
    const cleanup = fetchNews(1, searchTerm);
    return cleanup;
  }, [searchTerm]);

  const filteredItems = useSearchFilter(items, searchTerm);
  const normalizedSearchTerm = searchTerm.trim();

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setLoading(true);
    setError(null);
    fetchNews(page, searchTerm);
  };

  const pagedItems = items;

  return (
    <Container>
      {loading && <p className="px-4 text-sm text-gray-500">Carregando notícias…</p>}
      {error && <p className="px-4 text-sm text-red-600">{error}</p>}
      {!loading && !error && (
        <div className="space-y-6">
          {filteredItems.length === 0 ? (
            <div className="flex items-center justify-center">
              <p className="text-lg font-semibold text-gray-700 text-center">
                Nenhuma notícia encontrada
                {normalizedSearchTerm ? ` para “${normalizedSearchTerm}”.` : "."}
              </p>
            </div>
          ) : (
            <>
              <NewsCardGrid items={pagedItems} />
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