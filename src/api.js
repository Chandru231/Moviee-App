// API calls for TMDB
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

//get image URL
export function getImageUrl(path) {
  if (!path) return null;
  return `https://image.tmdb.org/t/p/w500${path}`;
}

// Get popular movies 
export async function getPopularMovies(page = 1) {
  const response = await fetch(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`
  );
  if (!response.ok) throw new Error('Failed to fetch movies');
  return response.json();
}

// Searching movies
export async function searchMovies(query, page = 1) {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`
  );
  if (!response.ok) throw new Error('Failed to search movies');
  return response.json();
}

// Get movie details
export async function getMovieDetails(id) {
  const response = await fetch(
    `${BASE_URL}/movie/${id}?api_key=${API_KEY}`
  );
  if (!response.ok) throw new Error('Failed to fetch movie details');
  return response.json();
}

// Get movies by specific language 
export async function getMoviesByLanguage(language, page = 1) {
  const response = await fetch(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&with_original_language=${language}&page=${page}`
  );
  if (!response.ok) throw new Error('Failed to fetch movies');
  return response.json();
}
