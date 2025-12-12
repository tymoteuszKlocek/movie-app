"use client";

import { useState, FormEvent } from "react";
import { MovieType } from "@/types/movie";

interface SearchFormProps {
  onSearch: (query: string, year: string, type: MovieType) => void;
  loading?: boolean;
}

export default function SearchForm({ onSearch, loading }: SearchFormProps) {
  const [query, setQuery] = useState("");
  const [year, setYear] = useState("");
  const [type, setType] = useState<MovieType>("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim(), year, type);
    }
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6 space-y-4"
      role="search"
      aria-label="Wyszukiwanie filmów"
    >
      <div className="space-y-4">
        <div>
          <label
            htmlFor="search-query"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Tytuł filmu
          </label>
          <input
            id="search-query"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Wpisz tytuł filmu..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
            disabled={loading}
            required
            aria-required="true"
          />
        </div>

        {/* Filters Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Year Filter */}
          <div>
            <label
              htmlFor="year-filter"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Rok premiery
            </label>
            <select
              id="year-filter"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition bg-white"
              disabled={loading}
              aria-label="Filtruj po roku premiery"
            >
              <option value="">Wszystkie lata</option>
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>

          {/* Type Filter */}
          <div>
            <label
              htmlFor="type-filter"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Typ
            </label>
            <select
              id="type-filter"
              value={type}
              onChange={(e) => setType(e.target.value as MovieType)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition bg-white"
              disabled={loading}
              aria-label="Filtruj po typie"
            >
              <option value="">Wszystkie typy</option>
              <option value="movie">Film</option>
              <option value="series">Serial</option>
              <option value="episode">Odcinek</option>
            </select>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading || !query.trim()}
        className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        aria-label="Szukaj filmów"
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Wyszukiwanie...
          </span>
        ) : (
          "Szukaj"
        )}
      </button>
    </form>
  );
}
