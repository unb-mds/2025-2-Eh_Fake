"use client";

import { useEffect, useMemo, useState } from "react";
import Container from "@/components/ui/container";
import NewsCardGrid, { NewsCardData } from "@/components/ui/Cards";
import Pagination from "@/components/NextPage";

const PAGE_SIZE = 6;

const LoadCards: React.FC = () => {
  const [items, setItems] = useState<NewsCardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const controller = new AbortController();

    fetch("/api/noticias", { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Falha ao carregar notícias");
        }
        const data = (await response.json()) as NewsCardData[];
        setItems(data);
        setCurrentPage(1);
      })
      .catch((err: Error) => {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, []);

  const { pagedItems, totalPages } = useMemo(() => {
    const total = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    return {
      pagedItems: items.slice(startIndex, startIndex + PAGE_SIZE),
      totalPages: total,
    };
  }, [items, currentPage]);

  return (
    <Container>
      {loading && <p className="px-4 text-sm text-gray-500">Carregando notícias…</p>}
      {error && <p className="px-4 text-sm text-red-600">{error}</p>}
      {!loading && !error && (
        <div className="space-y-6">
          <NewsCardGrid items={pagedItems} />
          {totalPages > 1 && (
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      )}
    </Container>
  );
};

export default LoadCards;