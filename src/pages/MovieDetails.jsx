import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovieDetails, getImageUrl } from '../api';
import { useFavorites } from '../FavoritesContext';
import Loader from '../components/Loader';

function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toggleFavorite, isFavorite } = useFavorites();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMovie() {
      try {
        setLoading(true);
        const data = await getMovieDetails(id);
        setMovie(data);
      } catch (err) {
        setError('Could not load movie details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchMovie();
  }, [id]);

  function goBack() {
    navigate(-1);
  }

  function handleFavorite() {
    if (movie) {
      toggleFavorite({
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        release_date: movie.release_date,
        vote_average: movie.vote_average,
        genre_ids: movie.genres.map(g => g.id)
      });
    }
  }

  if (loading) return <div className="min-h-screen bg-gray-100 dark:bg-gray-900"><Loader /></div>;

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-red-500 mb-4">⚠️ {error}</p>
          <button onClick={goBack} className="bg-red-500 text-white px-6 py-2 rounded-lg">
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!movie) return null;

  const releaseDate = movie.release_date 
    ? new Date(movie.release_date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : 'Unknown';

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white transition-colors">
      <div className="max-w-5xl mx-auto px-3 sm:px-4 md:px-6 py-4 md:py-8">
        {/* Back Button */}
        <button 
          onClick={goBack}
          className="mb-4 md:mb-6 px-3 md:px-4 py-2 bg-white dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors shadow-sm text-sm md:text-base"
        >
          ← Back to list
        </button>

        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
          {/* Poster */}
          <div className="w-full md:w-1/3 flex justify-center md:block">
            {movie.poster_path ? (
              <img 
                src={getImageUrl(movie.poster_path)} 
                alt={movie.title}
                className="w-48 sm:w-56 md:w-full rounded-lg shadow-lg"
              />
            ) : (
              <div className="w-48 sm:w-56 md:w-full h-72 sm:h-80 md:h-96 bg-gray-200 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                <span className="text-5xl md:text-6xl">🎬</span>
              </div>
            )}
          </div>

          {/* Movie Info */}
          <div className="md:w-2/3">
            <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-center md:text-left">{movie.title}</h1>
            
            {movie.tagline && (
              <p className="text-gray-500 dark:text-gray-400 italic mb-4 text-center md:text-left text-sm md:text-base">"{movie.tagline}"</p>
            )}

            {/* Meta Info */}
            <div className="flex flex-wrap justify-center md:justify-start gap-3 md:gap-4 mb-4 md:mb-6 text-gray-600 dark:text-gray-300 text-sm md:text-base">
              <span>📅 {releaseDate}</span>
              <span>⭐ {movie.vote_average?.toFixed(1)} / 10</span>
              {movie.runtime && <span>⏱️ {movie.runtime} min</span>}
            </div>

            {/* Genres */}
            <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4 md:mb-6">
              {movie.genres.map(genre => (
                <span 
                  key={genre.id}
                  className="px-2 md:px-3 py-1 bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 rounded-full text-xs md:text-sm"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            {/* Overview */}
            <h2 className="text-lg md:text-xl font-semibold mb-2 text-center md:text-left">Overview</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4 md:mb-6 text-sm md:text-base text-center md:text-left">
              {movie.overview || 'No overview available.'}
            </p>

            {/* Favorite Button */}
            <div className="text-center md:text-left">
              <button
                onClick={handleFavorite}
                className={`px-5 md:px-6 py-2 md:py-3 rounded-full font-semibold transition-colors text-sm md:text-base ${
                  isFavorite(movie.id) 
                    ? 'bg-red-500 text-white' 
                    : 'bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                {isFavorite(movie.id) ? '❤️ Remove from Favorites' : '🤍 Add to Favorites'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
