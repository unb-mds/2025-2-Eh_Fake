"use client";

import { useEffect, useState } from "react";
import Container from "@/components/ui/container";
import NewsCardGrid, { NewsCardData } from "@/components/ui/Cards";

const LoadCards: React.FC = () => {
  const [items, setItems] = useState<NewsCardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    fetch("/api/noticias", { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Falha ao carregar notícias");
        }
        const data = (await response.json()) as NewsCardData[];
        setItems(data);
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, []);

  if (loading) {
    return (
      <Container>
        <p className="px-4 text-sm text-gray-500">Carregando notícias…</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <p className="px-4 text-sm text-red-600">{error}</p>
      </Container>
    );
  }

  return (
    <Container>
      <NewsCardGrid items={items} />
    </Container>
  );
};

export default LoadCards;