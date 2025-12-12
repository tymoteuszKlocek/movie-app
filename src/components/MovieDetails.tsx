"use client";

import Image from "next/image";
import Link from "next/link";
import { MovieDetails as MovieDetailsType } from "@/types/movie";
import FavoriteButton from "./FavoriteButton";

interface MovieDetailsProps {
  movie: MovieDetailsType;
}

export default function MovieDetails({ movie }: MovieDetailsProps) {
  const posterUrl =
    movie.Poster !== "N/A" ? movie.Poster : "/placeholder-movie.png";
  const hasPoster = movie.Poster !== "N/A";

  return (
    <article className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden animate-fade-in">
      <div className="md:flex">
        {/* Poster */}
        <div className="md:w-1/3 relative">
          <div className="relative aspect-[2/3] md:aspect-auto md:h-full bg-gray-200">
            {hasPoster ? (
              <Image
                src={posterUrl}
                alt={`Plakat filmu ${movie.Title}`}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
                priority
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-300 to-gray-400">
                <svg
                  className="w-32 h-32 text-gray-500"
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
          </div>
        </div>

        {/* Details */}
        <div className="md:w-2/3 p-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {movie.Title}
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                <span className="font-semibold">{movie.Year}</span>
                <span>•</span>
                <span>{movie.Runtime}</span>
                <span>•</span>
                <span className="px-2 py-1 bg-gray-200 rounded text-xs font-semibold">
                  {movie.Rated}
                </span>
              </div>
            </div>
            <FavoriteButton imdbID={movie.imdbID} className="flex-shrink-0" />
          </div>

          {/* Ratings */}
          {movie.imdbRating !== "N/A" && (
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center space-x-2">
                <span className="text-yellow-500 text-2xl" aria-hidden="true">
                  ★
                </span>
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {movie.imdbRating}
                  </div>
                  <div className="text-xs text-gray-600">IMDb</div>
                </div>
              </div>
              {movie.Metascore !== "N/A" && (
                <div className="flex items-center space-x-2">
                  <div className="w-12 h-12 bg-green-600 text-white flex items-center justify-center font-bold rounded">
                    {movie.Metascore}
                  </div>
                  <div className="text-xs text-gray-600">Metascore</div>
                </div>
              )}
            </div>
          )}

          {/* Genre */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              {movie.Genre.split(", ").map((genre) => (
                <span
                  key={genre}
                  className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium"
                >
                  {genre}
                </span>
              ))}
            </div>
          </div>

          {/* Plot */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Opis</h2>
            <p className="text-gray-700 leading-relaxed">{movie.Plot}</p>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <InfoItem label="Reżyseria" value={movie.Director} />
            <InfoItem label="Scenariusz" value={movie.Writer} />
            <InfoItem label="Obsada" value={movie.Actors} />
            <InfoItem label="Język" value={movie.Language} />
            <InfoItem label="Kraj" value={movie.Country} />
            <InfoItem label="Nagrody" value={movie.Awards} />
            {movie.BoxOffice !== "N/A" && (
              <InfoItem label="Box Office" value={movie.BoxOffice} />
            )}
            {movie.Production !== "N/A" && (
              <InfoItem label="Produkcja" value={movie.Production} />
            )}
          </div>

          {/* Additional Ratings */}
          {movie.Ratings && movie.Ratings.length > 0 && (
            <div className="border-t pt-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                Oceny
              </h2>
              <div className="space-y-2">
                {movie.Ratings.map((rating) => (
                  <div
                    key={rating.Source}
                    className="flex justify-between items-center"
                  >
                    <span className="text-gray-600">{rating.Source}</span>
                    <span className="font-semibold text-gray-900">
                      {rating.Value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Back Button */}
          <div className="mt-8">
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg transition focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Powrót do wyszukiwania
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  if (value === "N/A") return null;

  return (
    <div>
      <dt className="text-sm font-semibold text-gray-600 mb-1">{label}</dt>
      <dd className="text-gray-900">{value}</dd>
    </div>
  );
}
