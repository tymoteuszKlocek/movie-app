"use client";

import Link from "next/link";
import Image from "next/image";
import { Movie } from "@/types/movie";
import FavoriteButton from "./FavoriteButton";

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const posterUrl =
    movie.Poster !== "N/A" ? movie.Poster : "/placeholder-movie.png";
  const hasPoster = movie.Poster !== "N/A";

  return (
    <article className="group relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 animate-fade-in">
      <Link
        href={`/movie/${movie.imdbID}`}
        className="block focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-lg"
        aria-label={`Zobacz szczegóły filmu ${movie.Title}`}
      >
        {/* Poster */}
        <div className="relative aspect-[2/3] bg-gray-200 overflow-hidden">
          {hasPoster ? (
            <Image
              src={posterUrl}
              alt={`Plakat filmu ${movie.Title}`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-300 to-gray-400">
              <svg
                className="w-20 h-20 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
                />
              </svg>
            </div>
          )}

          {/* Favorite Button Overlay */}
          <div className="absolute top-2 right-2 z-10">
            <FavoriteButton imdbID={movie.imdbID} />
          </div>

          {/* Type Badge */}
          <div className="absolute bottom-2 left-2 z-10">
            <span className="inline-block px-2 py-1 text-xs font-semibold text-white bg-black bg-opacity-70 rounded">
              {movie.Type === "movie"
                ? "Film"
                : movie.Type === "series"
                ? "Serial"
                : "Odcinek"}
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="p-4">
          <h3 className="font-semibold text-lg text-gray-900 line-clamp-2 mb-1 group-hover:text-primary-600 transition-colors">
            {movie.Title}
          </h3>
          <p className="text-sm text-gray-600">{movie.Year}</p>
        </div>
      </Link>
    </article>
  );
}
