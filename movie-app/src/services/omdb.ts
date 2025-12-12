import { SearchResponse, MovieDetails, SearchParams } from '@/types/movie';

const API_KEY = process.env.NEXT_PUBLIC_OMDB_API_KEY;
const BASE_URL = 'https://www.omdbapi.com/';

if (!API_KEY) {
  console.warn('OMDB API key is not set. Please add NEXT_PUBLIC_OMDB_API_KEY to your .env.local file');
}

export class OMDbError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'OMDbError';
  }
}

async function fetchFromOMDb(params: Record<string, string>): Promise<any> {
  const url = new URL(BASE_URL);
  url.searchParams.append('apikey', API_KEY || '');
  
  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      url.searchParams.append(key, value);
    }
  });

  try {
    const response = await fetch(url.toString());
    
    if (!response.ok) {
      throw new OMDbError(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.Response === 'False') {
      throw new OMDbError(data.Error || 'Unknown error occurred');
    }
    
    return data;
  } catch (error) {
    if (error instanceof OMDbError) {
      throw error;
    }
    throw new OMDbError('Failed to fetch data from OMDb API. Please check your internet connection.');
  }
}

export async function searchMovies(params: SearchParams): Promise<SearchResponse> {
  const searchParams: Record<string, string> = {
    s: params.query,
    page: params.page?.toString() || '1',
  };

  if (params.year) {
    searchParams.y = params.year;
  }

  if (params.type) {
    searchParams.type = params.type;
  }

  return fetchFromOMDb(searchParams);
}

export async function getMovieDetails(imdbID: string): Promise<MovieDetails> {
  return fetchFromOMDb({
    i: imdbID,
    plot: 'full',
  });
}

export async function getMoviesByIds(ids: string[]): Promise<MovieDetails[]> {
  const promises = ids.map(id => getMovieDetails(id));
  return Promise.all(promises);
}