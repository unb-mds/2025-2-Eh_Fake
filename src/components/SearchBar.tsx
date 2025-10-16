"use client";

import Container from "@/components/ui/container";
import { useSearch } from "@/hooks/useSearch";

interface SearchBarProps {
  onSearch?: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const { query, setQuery, handleSubmit, handleClear } = useSearch(onSearch);

  return (
    <Container>
      <div className="w-full px-4 -mt-12 mb-14">
        <form
          onSubmit={handleSubmit}
          className="mx-auto flex w-full max-w-3xl items-center gap-3 rounded-full bg-light-secondary/60 py-5 px-4 shadow-[0_0_10px_rgba(150,150,150,0.5)] backdrop-blur transition-colors duration-300 supports-[backdrop-filter]:bg-light-secondary/50 dark:bg-dark-secondary/80 dark:supports-[backdrop-filter]:bg-dark-secondary/70"
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
              id="search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Busque por título ou veracidade"
              autoComplete="off"
              className="w-full rounded-full bg-transparent pl-10 pr-12 text-base text-dark-primary placeholder:text-gray-500 focus:outline-none dark:text-light-primary dark:placeholder:text-light-primary/70"
            />

            {query && (
              <button
                type="button"
                onClick={handleClear}
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
      </div>
    </Container>
  );
};

export default SearchBar;