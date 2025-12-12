"use client";

import { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { Movie } from "@/types/movie";
import MovieCard from "./MovieCard";

interface MovieListProps {
  movies: Movie[];
  loading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
  totalResults?: number;
}

export default function MovieList({
  movies,
  loading,
  hasMore,
  onLoadMore,
  totalResults = 0,
}: MovieListProps) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  const previousInView = useRef(false);

  useEffect(() => {
    if (inView && !previousInView.current && hasMore && !loading) {
      onLoadMore();
    }
    previousInView.current = inView;
  }, [inView, hasMore, loading, onLoadMore]);

  if (movies.length === 0 && !loading) {
    return null;
  }

  return (
    <section className="w-full" aria-label="Wyniki wyszukiwania">
      {/* Results Count */}
      {totalResults > 0 && (
        <div className="mb-6 text-center">
          <p className="text-gray-600">
            Znaleziono{" "}
            <span className="font-semibold text-gray-900">{totalResults}</span>{" "}
            wyników
          </p>
        </div>
      )}

      {/* Movies Grid */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        role="list"
      >
        {movies.map((movie) => (
          <div key={movie.imdbID} role="listitem">
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>

      {/* Infinite Scroll Trigger */}
      {hasMore && (
        <div ref={ref} className="mt-8 flex justify-center">
          <div className="text-gray-500">
            {loading ? (
              <div className="flex flex-col items-center space-y-3">
                <svg
                  className="animate-spin h-10 w-10 text-primary-600"
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
                <p className="text-sm">Ładowanie kolejnych filmów...</p>
              </div>
            ) : (
              <p className="text-sm">Przewiń w dół, aby załadować więcej</p>
            )}
          </div>
        </div>
      )}

      {/* End of Results */}
      {!hasMore && movies.length > 0 && (
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">To wszystkie wyniki</p>
        </div>
      )}
    </section>
  );
}
