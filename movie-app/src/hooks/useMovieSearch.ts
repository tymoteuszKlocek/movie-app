"use client";

import { useState, useCallback, useEffect } from "react";
import { Movie, SearchParams } from "@/types/movie";
import { searchMovies, OMDbError } from "@/services/omdb";

export function useMovieSearch() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] = useState<SearchParams | null>(null);

  const search = useCallback(
    async (params: SearchParams, append = false) => {
      if (!params.query.trim()) {
        setMovies([]);
        setError(null);
        setHasMore(false);
        setTotalResults(0);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await searchMovies(params);
        const newMovies = response.Search || [];
        const total = parseInt(response.totalResults) || 0;

        setMovies((prev) => (append ? [...prev, ...newMovies] : newMovies));
        setTotalResults(total);
        setHasMore(newMovies.length > 0 && (params.page || 1) * 10 < total);
        setCurrentPage(params.page || 1);
        setSearchParams(params);
      } catch (err) {
        const errorMessage =
          err instanceof OMDbError
            ? err.message
            : "An unexpected error occurred";
        setError(errorMessage);
        setMovies(append ? movies : []);
        setHasMore(false);
      } finally {
        setLoading(false);
      }
    },
    [movies]
  );

  const loadMore = useCallback(() => {
    if (searchParams && hasMore && !loading) {
      search({ ...searchParams, page: currentPage + 1 }, true);
    }
  }, [searchParams, hasMore, loading, currentPage, search]);

  const reset = useCallback(() => {
    setMovies([]);
    setError(null);
    setHasMore(false);
    setTotalResults(0);
    setCurrentPage(1);
    setSearchParams(null);
  }, []);

  return {
    movies,
    loading,
    error,
    hasMore,
    totalResults,
    search,
    loadMore,
    reset,
  };
}
