"use client";

import { useCallback } from "react";
import SearchForm from "@/components/SearchForm";
import MovieList from "@/components/MovieList";
import { useMovieSearch } from "@/hooks/useMovieSearch";
import { MovieType } from "@/types/movie";

export default function HomePage() {
  const { movies, loading, error, hasMore, totalResults, search, loadMore } =
    useMovieSearch();

  const handleSearch = useCallback(
    (query: string, year: string, type: MovieType) => {
      search({
        query,
        year,
        type,
        page: 1,
      });
    },
    [search]
  );

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="text-center py-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Wyszukiwarka Filmów
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Odkryj tysiące filmów i seriali. Wyszukuj, filtruj i dodawaj do
          ulubionych.
        </p>
      </section>

      {/* Search Form */}
      <SearchForm onSearch={handleSearch} loading={loading} />

      {/* Error Message */}
      {error && (
        <div
          className="max-w-4xl mx-auto bg-red-50 border border-red-200 text-red-800 px-6 py-4 rounded-lg animate-slide-up"
          role="alert"
          aria-live="polite"
        >
          <div className="flex items-start">
            <svg
              className="w-6 h-6 mr-3 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            <div>
              <h3 className="font-semibold mb-1">Wystąpił błąd</h3>
              <p>{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && movies.length === 0 && (
        <div className="text-center py-16">
          <svg
            className="w-24 h-24 mx-auto text-gray-400 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            Zacznij wyszukiwanie
          </h2>
          <p className="text-gray-500">
            Wpisz tytuł filmu lub serialu, aby zobaczyć wyniki
          </p>
        </div>
      )}

      {/* Movie List */}
      {movies.length > 0 && (
        <MovieList
          movies={movies}
          loading={loading}
          hasMore={hasMore}
          onLoadMore={loadMore}
          totalResults={totalResults}
        />
      )}
    </div>
  );
}
