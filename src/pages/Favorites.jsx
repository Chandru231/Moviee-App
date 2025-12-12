 import { useFavorites } from '../FavoritesContext';
 import MovieList from '../components/MovieList';

function Favorites() {
  const { favorites } = useFavorites();

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white transition-colors">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 md:px-6 py-4 md:py-8">
        {/* Header */}
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-2">
          ❤️ My Favorites
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-center text-sm sm:text-base mb-6 md:mb-8">
          {favorites.length > 0 
            ? `You have ${favorites.length} favorite movie${favorites.length > 1 ? 's' : ''}`
            : 'Start adding movies to your favorites!'}
        </p>

        {/* Favorites List */}
        {favorites.length > 0 ? (
          <MovieList movies={favorites} />
        ) : (
          <div className="text-center py-16 md:py-20">
            <span className="text-5xl md:text-6xl block mb-4">🎬</span>
            <h2 className="text-lg md:text-xl font-semibold mb-2">No favorites yet</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base">
              Browse movies and click the heart icon to add them here!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Favorites;
