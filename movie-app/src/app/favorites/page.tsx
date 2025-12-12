'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useFavorites } from '@/hooks/useFavorites';
import { getMoviesByIds } from '@/services/omdb';
import { MovieDetails } from '@/types/movie';
import MovieCard from '@/components/MovieCard';

export default function FavoritesPage() {
  const { favorites, isLoaded } = useFavorites();
  const [movies, setMovies] = useState<MovieDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadFavorites() {
      if (!isLoaded) return;

      if (favorites.length === 0) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const moviesData = await getMoviesByIds(favorites);
        setMovies(moviesData);
      } catch (err) {
        setError('Nie udało się załadować ulubionych filmów');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadFavorites();
  }, [favorites, isLoaded]);

  if (!isLoaded || loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <svg
          className="animate-spin h-12 w-12 text-primary-600 mb-4"
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
        <p className="text-gray-600">Ładowanie ulubionych...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto">
        <div 
          className="bg-red-50 border border-red-200 text-red-800 px-6 py-4 rounded-lg"
          role="alert"
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
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <svg
          className="w-32 h-32 text-gray-400 mb-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Brak ulubionych filmów</h1>
        <p className="text-gray-600 mb-8 text-center max-w-md">
          Nie masz jeszcze żadnych ulubionych filmów. Zacznij dodawać filmy do ulubionych podczas przeglądania!
        </p>
        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        >
          Przejdź do wyszukiwarki
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Ulubione filmy</h1>
        <p className="text-gray-600">
          Masz <span className="font-semibold text-gray-900">{favorites.length}</span>{' '}
          {favorites.length === 1 ? 'ulubiony film' : 'ulubionych filmów'}
        </p>
      </div>

      {/* Movies Grid */}
      <div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        role="list"
        aria-label="Lista ulubionych filmów"
      >
        {movies.map((movie) => (
          <div key={movie.imdbID} role="listitem">
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    </div>
  );
}