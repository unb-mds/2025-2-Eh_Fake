"use client";

import { FormEvent, useState } from "react";
import Container from "@/components/ui/container";

interface SearchBarProps {
    onSearch?: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [query, setQuery] = useState("");

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
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

    return (
        <Container>
            <div className="w-full px-4">
                <form
                    onSubmit={handleSubmit}
                    className="mx-auto flex w-full max-w-3xl items-center gap-3 rounded-full bg-white py-5 px-2 shadow-[0_0_10px_rgba(0,0,0,0.5)] backdrop-blur supports-[backdrop-filter]:bg-white/40"
                >
                    <label htmlFor="search" className="sr-only">
                        Buscar notícias
                    </label>

                    {/* Ícone de busca, sem função de clique */}
                    <div className="relative flex w-full items-center">
                        <span className="absolute left-3 inline-flex h-6 w-6 items-center justify-center text-gray-700">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-6 w-6"
                                aria-hidden="true"
                            >
                                <circle cx="11" cy="11" r="7" />
                                <path d="m20 20-2.6-2.6" />
                            </svg>
                        </span>

                        {/* Campo de busca */}
                        <input
                            id="search"
                            type="search"
                            value={query}
                            onChange={(event) => setQuery(event.target.value)}
                            placeholder="Busque por termos ou títulos"
                            autoComplete="off"
                            className="w-full rounded-full border border-transparent bg-transparent pl-12 pr-10 text-base text-gray-900 placeholder:text-gray-500 focus:outline-none"
                        />

                        {/* Ícone de limpar busca com tooltip no hover */}
                        {query && (
                            <button
                                type="button"
                                onClick={handleClear}
                                className="absolute right-3 inline-flex h-6 w-6 items-center justify-center text-gray-700 hover:text-black hover:scale-110 transition-transform focus:outline-none"
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
                                    className="h-6 w-6"
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