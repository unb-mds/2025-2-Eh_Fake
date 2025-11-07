"use client";

import { useState, useRef } from "react";
import Container from "@/components/ui/container";
import { useSuggestions } from "@/hooks/useSuggestions";

interface SearchBarProps {
  onSearch?: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const { query, setQuery, suggestions, loading, clearSuggestions } = useSuggestions();
  const [isFocused, setIsFocused] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedQuery = query.trim();
    if (!trimmedQuery) {
      onSearch?.("");
      return;
    }
    onSearch?.(trimmedQuery);
    setIsFocused(false);
    clearSuggestions();
    setSelectedIndex(-1);
  };

  const handleInputClear = () => {
    setQuery("");
    clearSuggestions();
    setSelectedIndex(-1);
    onSearch?.("");
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    // Delay to allow click on suggestions
    setTimeout(() => {
      setIsFocused(false);
      setSelectedIndex(-1);
    }, 150);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!suggestions.length) return;

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setSelectedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0));
        break;
      case "ArrowUp":
        event.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
        break;
      case "Enter":
        event.preventDefault();
        if (selectedIndex >= 0) {
          setQuery(suggestions[selectedIndex]);
          setIsFocused(false);
          clearSuggestions();
          setSelectedIndex(-1);
          onSearch?.(suggestions[selectedIndex]);
        }
        break;
      case "Escape":
        setIsFocused(false);
        setSelectedIndex(-1);
        clearSuggestions();
        inputRef.current?.blur();
        break;
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    setIsFocused(false);
    clearSuggestions();
    setSelectedIndex(-1);
    onSearch?.(suggestion);
  };

  return (
    <Container>
      <div className="w-full px-4 -mt-12 mb-14 relative">
        {isFocused && (
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40" onClick={() => setIsFocused(false)} />
        )}
        <form
          onSubmit={handleFormSubmit}
          className="mx-auto flex w-full max-w-3xl items-center gap-3 rounded-full bg-light-secondary/60 py-5 px-4 shadow-[0_0_10px_rgba(150,150,150,0.5)] backdrop-blur transition-colors duration-300 supports-[backdrop-filter]:bg-light-secondary/50 dark:bg-dark-secondary/80 dark:supports-[backdrop-filter]:bg-dark-secondary/70 relative z-50"
        >
          <label htmlFor="search" className="sr-only">
            Buscar notícias
          </label>

          <div className="relative flex w-full items-center">
            <span className="pointer-events-none absolute left-2 inline-flex h-6 w-6 items-center justify-center text-gray-600 dark:text-light-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-2.6-2.6" />
              </svg>
            </span>

            <input
              ref={inputRef}
              id="search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              placeholder="Busque por título ou veracidade"
              autoComplete="off"
              className="w-full rounded-full bg-transparent pl-10 pr-12 text-base text-dark-primary placeholder:text-gray-500 focus:outline-none dark:text-light-primary dark:placeholder:text-light-primary/70"
            />

            {query && (
              <button
                type="button"
                onClick={handleInputClear}
                className="absolute right-2 top-1/2 inline-flex h-6 w-6 -translate-y-1/2 items-center hover:cursor-pointer justify-center text-gray-600 transition-transform hover:scale-120 hover:text-gray-500 focus:outline-none"
                aria-label="Limpar busca"
                title="Limpar"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  <path d="M18 6L6 18" />
                  <path d="M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </form>

        {isFocused && suggestions.length > 0 && (
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-full max-w-3xl bg-light-secondary/90 dark:bg-dark-secondary/90 backdrop-blur-md rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
            <ul className="py-2">
              {suggestions.map((suggestion, index) => (
                <li key={index}>
                  <button
                    type="button"
                    onClick={() => handleSuggestionClick(suggestion)}
                    className={`w-full text-left px-4 py-2 hover:bg-light-primary/10 dark:hover:bg-dark-primary/10 transition-colors ${
                      index === selectedIndex ? "bg-light-primary/20 dark:bg-dark-primary/20" : ""
                    }`}
                  >
                    <span className="text-dark-primary dark:text-light-primary">{suggestion}</span>
                  </button>
                </li>
              ))}
            </ul>
            {loading && (
              <div className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">
                Carregando...
              </div>
            )}
          </div>
        )}
      </div>
    </Container>
  );
};

export default SearchBar;
