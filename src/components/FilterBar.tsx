"use client";

import { StatusToken } from "./ui/Cards";

interface FilterBarProps {
    currentStatus: StatusToken | "All";
    onFilterChange: (status: StatusToken | "All") => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ currentStatus, onFilterChange }) => {
    const filters: { label: string; value: StatusToken | "All" }[] = [
        { label: "Todas", value: "All" },
        { label: "Verdadeiras", value: "Real" },
        { label: "Falsas", value: "Fake" },
    ];

    // Determina a posição do fundo deslizante
    const getTranslateValue = () => {
        switch (currentStatus) {
            case "All": return "translate-x-0";
            case "Real": return "translate-x-[100%]";
            case "Fake": return "translate-x-[200%]";
            default: return "translate-x-0";
        }
    };

    // Determina a cor do fundo deslizante
    const getBgColor = () => {
        switch (currentStatus) {
            case "Real": return "bg-emerald-500 shadow-emerald-500/30";
            case "Fake": return "bg-red-500 shadow-red-500/30";
            default: return "bg-white dark:bg-slate-600 shadow-slate-900/10";
        }
    };

    return (
        <div className="flex justify-center mb-8 px-4">
            {/* Container Principal Responsive */}
            <div className="relative grid grid-cols-3 p-1 rounded-full bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 shadow-inner w-full max-w-sm sm:max-w-md">

                {/* Fundo Deslizante (The Sliding Pill) */}
                {/* width calculation: (100% - 8px padding) / 3 */}
                <div
                    className={`
            absolute top-1 bottom-1 left-1 rounded-full shadow-md transition-all duration-300 ease-[cubic-bezier(0.25,0.8,0.25,1)]
            ${getTranslateValue()}
            ${getBgColor()}
          `}
                    style={{ width: "calc((100% - 8px) / 3)" }}
                />

                {/* Botões (Texto) */}
                {filters.map((filter) => {
                    const isActive = currentStatus === filter.value;
                    return (
                        <button
                            key={filter.value}
                            onClick={() => onFilterChange(filter.value)}
                            className={`
                relative z-10 w-full py-2.5 text-xs sm:text-sm font-bold transition-colors duration-200 flex items-center justify-center
                ${isActive
                                    ? filter.value === "All"
                                        ? "text-slate-900 dark:text-white"
                                        : "text-white"
                                    : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
                                }
              `}
                        >
                            {filter.label}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default FilterBar;
