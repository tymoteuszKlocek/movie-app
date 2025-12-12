import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import MovieDetails from '@/components/MovieDetails';
import { getMovieDetails } from '@/services/omdb';

interface MoviePageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: MoviePageProps): Promise<Metadata> {
  try {
    const movie = await getMovieDetails(params.id);

    return {
      title: `${movie.Title} (${movie.Year}) - OMDb Movie App`,
      description: movie.Plot !== 'N/A' ? movie.Plot : `Szczegóły filmu ${movie.Title}`,
      openGraph: {
        title: `${movie.Title} (${movie.Year})`,
        description: movie.Plot !== 'N/A' ? movie.Plot : `Szczegóły filmu ${movie.Title}`,
        images: movie.Poster !== 'N/A' ? [movie.Poster] : [],
        type: 'video.movie',
      },
      keywords: [
        movie.Title,
        movie.Year,
        movie.Genre,
        movie.Director,
        'film',
        'movie',
      ].filter(Boolean),
    };
  } catch (error) {
    return {
      title: 'Film nie znaleziony - OMDb Movie App',
      description: 'Nie udało się załadować szczegółów filmu',
    };
  }
}

export default async function MoviePage({ params }: MoviePageProps) {
  try {
    const movie = await getMovieDetails(params.id);

    return (
      <div className="py-8">
        <MovieDetails movie={movie} />
      </div>
    );
  } catch (error) {
    notFound();
  }
}