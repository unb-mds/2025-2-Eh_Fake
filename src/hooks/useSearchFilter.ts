import { useMemo } from "react";
import type { NewsCardData } from "@/components/ui/Cards";

export const useSearchFilter = (items: NewsCardData[], term: string) =>
  useMemo(() => {
    const normalized = term.trim().toLowerCase();
    if (!normalized) {
      return items;
    }

    return items.filter((item) => {
      const title = item.title.toLowerCase();
      const status = (item.status ?? "").toLowerCase();
      return title.includes(normalized) || status.includes(normalized);
    });
  }, [items, term]);