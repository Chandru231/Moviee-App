 import { useNavigate } from 'react-router-dom';
 import { useFavorites } from '../FavoritesContext';
 import { getImageUrl } from '../api';

function MovieCard({ movie }) {
  const navigate = useNavigate();
  const { toggleFavorite, isFavorite } = useFavorites();

  // Get the year from release date
  const year = movie.release_date ? movie.release_date.split('-')[0] : 'N/A';

  // Handle clicking the card
  function handleClick() {
    navigate(`/movie/${movie.id}`);
  }

  // Handle favorite button click
  function handleFavorite(e) {
    e.stopPropagation();
    toggleFavorite(movie);
  }

  return (
    <div 
      onClick={handleClick}
      className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden cursor-pointer shadow-md dark:shadow-none
                 transform transition-all duration-300 ease-in-out
                 hover:scale-105 hover:shadow-xl hover:-translate-y-1"
    >
      {/* Movie Poster */}
      <div className="relative overflow-hidden">
        {movie.poster_path ? (
          <img 
            src={getImageUrl(movie.poster_path)} 
            alt={movie.title}
            loading="lazy"
            className="w-full h-48 sm:h-56 md:h-64 lg:h-72 object-cover transition-transform duration-300 hover:scale-110"
          />
        ) : (
          <div className="w-full h-48 sm:h-56 md:h-64 lg:h-72 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            <span className="text-3xl md:text-4xl">🎬</span>
          </div>
        )}

        {/* Rating Badge */}
        <span className="absolute top-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs sm:text-sm">
          ⭐ {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
        </span>

        {/* Favorite Button with animation */}
        <button 
          onClick={handleFavorite}
          className="absolute top-2 right-2 text-xl md:text-2xl transition-transform duration-200 hover:scale-125 active:scale-95"
        >
          {isFavorite(movie.id) ? '❤️' : '🤍'}
        </button>
      </div>

      {/* Movie Info */}
      <div className="p-3 md:p-4">
        <h3 className="font-semibold text-gray-800 dark:text-white truncate text-sm md:text-base">{movie.title}</h3>
        <p className="text-gray-500 dark:text-gray-400 text-xs md:text-sm">{year}</p>
      </div>
    </div>
  );
}

export default MovieCard;
