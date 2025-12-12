// Home.jsx - Home page showing popular movies
import { useState, useEffect, useCallback } from 'react';
import SearchBar from '../components/SearchBar';
import MovieList from '../components/MovieList';
import Loader from '../components/Loader';
import { getPopularMovies, searchMovies, getMoviesByLanguage } from '../api';

// Only popular genres
const GENRES = [
  { id: 28, name: 'Action' },
  { id: 35, name: 'Comedy' },
  { id: 18, name: 'Drama' },
  { id: 27, name: 'Horror' },
  { id: 10749, name: 'Romance' },
  { id: 878, name: 'Sci-Fi' },
  { id: 53, name: 'Thriller' },
  { id: 16, name: 'Animation' },
];

// Languages
const LANGUAGES = [
  { code: '', name: 'All Languages' },
  { code: 'ta', name: 'Tamil' },
  { code: 'te', name: 'Telugu' },
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'Hindi' },
  { code: 'ml', name: 'Malayalam' },
  { code: 'kn', name: 'Kannada' },
  { code: 'ko', name: 'Korean' },
  { code: 'ja', name: 'Japanese' },
];

function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');

  // Fetch movies
  const fetchMovies = useCallback(async (pageNum, isNewSearch = false) => {
    try {
      setLoading(true);
      setError(null);

      let data;
      if (searchQuery) {
        data = await searchMovies(searchQuery, pageNum);
      } else if (selectedLanguage) {
        data = await getMoviesByLanguage(selectedLanguage, pageNum);
      } else {
        data = await getPopularMovies(pageNum);
      }

      let results = data.results;
      
      if (selectedGenre) {
        results = results.filter(movie => 
          movie.genre_ids.includes(Number(selectedGenre))
        );
      }

      if (isNewSearch) {
        setMovies(results);
      } else {
        setMovies(prev => [...prev, ...results]);
      }
      
      setHasMore(pageNum < data.total_pages);
    } catch (err) {
      setError('Something went wrong. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [searchQuery, selectedGenre, selectedLanguage]);

  useEffect(() => {
    setPage(1);
    fetchMovies(1, true);
  }, [searchQuery, selectedGenre, selectedLanguage, fetchMovies]);

  const handleSearch = useCallback((query) => {
    setSearchQuery(query);
    setSelectedGenre('');
    setSelectedLanguage('');
  }, []);

  function handleLoadMore() {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchMovies(nextPage, false);
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white">
      <div className="max-w-6xl mx-auto px-4 py-4 md:py-8">
        {/* Header with hero image */}
        <div className="text-center mb-2">
          <img src="/hero section.png" alt="MovieApp Hero" className="w-16 h-16 mx-auto mb-2" />
          <h1 className="text-2xl sm:text-3xl font-bold">
            {searchQuery ? `Results for "${searchQuery}"` : 'Popular Movies'}
          </h1>
        </div>
        <p className="text-gray-500 dark:text-gray-400 text-center text-sm sm:text-base mb-6">
          Experience world-class movies without boundaries.
        </p>

        {/* Search Bar */}
        <div className="mb-4">
          <SearchBar onSearch={handleSearch} />
        </div>

        {/* Filters - Modern styled dropdown selects */}
        {!searchQuery && (
          <div className="mb-8 mx-auto w-full px-2 sm:px-0" style={{ maxWidth: '600px' }}>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              {/* Genre Filter */}
              <div className="relative w-full sm:flex-1">
                <span className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-base sm:text-lg pointer-events-none">🎬</span>
                <select
                  value={selectedGenre}
                  onChange={(e) => setSelectedGenre(e.target.value)}
                  className="w-full appearance-none bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-750 text-gray-800 dark:text-white pl-10 sm:pl-12 pr-8 sm:pr-10 py-3 sm:py-3.5 rounded-xl border-2 border-gray-200 dark:border-gray-600 text-sm font-medium shadow-lg hover:shadow-xl hover:border-blue-400 dark:hover:border-blue-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all duration-300 cursor-pointer"
                  style={{ backgroundImage: 'none' }}
                >
                  <option value="">All Genres</option>
                  {GENRES.map(genre => (
                    <option key={genre.id} value={genre.id}>{genre.name}</option>
                  ))}
                </select>
                <span className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none text-sm">▼</span>
              </div>

              {/* Language Filter */}
              <div className="relative w-full sm:flex-1">
                <span className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-base sm:text-lg pointer-events-none">🌍</span>
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="w-full appearance-none bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-750 text-gray-800 dark:text-white pl-10 sm:pl-12 pr-8 sm:pr-10 py-3 sm:py-3.5 rounded-xl border-2 border-gray-200 dark:border-gray-600 text-sm font-medium shadow-lg hover:shadow-xl hover:border-blue-400 dark:hover:border-blue-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all duration-300 cursor-pointer"
                  style={{ backgroundImage: 'none' }}
                >
                  {LANGUAGES.map(lang => (
                    <option key={lang.code} value={lang.code}>{lang.code === '' ? 'All Languages' : lang.name}</option>
                  ))}
                </select>
                <span className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none text-sm">▼</span>
              </div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="text-center py-10">
            <p className="text-red-500 mb-4">⚠️ {error}</p>
            <button 
              onClick={() => fetchMovies(1, true)}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Loading */}
        {loading && movies.length === 0 && <Loader />}

        {/* Movies Grid */}
        {!error && <MovieList movies={movies} />}

        {/* Load More Button */}
        {!loading && hasMore && movies.length > 0 && (
          <div className="text-center mt-6 md:mt-8">
            <button
              onClick={handleLoadMore}
              className="bg-blue-500 text-white px-6 md:px-8 py-2 md:py-3 rounded-full font-semibold hover:bg-blue-600 transition-colors text-sm md:text-base"
            >
              Load More Movies
            </button>
          </div>
        )}

        {/* Loading more indicator */}
        {loading && movies.length > 0 && (
          <div className="text-center mt-6 md:mt-8">
            <div className="inline-block w-8 h-8 border-4 border-gray-300 dark:border-gray-600 border-t-blue-500 rounded-full animate-spin"></div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
