import { useState } from "react";

export const useSearch = (onSearch?: (term: string) => void) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      return;
    }

    onSearch?.(trimmedQuery);
  };

  const handleClear = () => {
    setQuery("");
    onSearch?.("");
  };

  return {
    query,
    setQuery,
    handleSubmit,
    handleClear,
  };
};