// MovieList.jsx - Displays a grid of movies
import MovieCard from './MovieCard';

function MovieList({ movies }) {
  // Show message if no movies
  if (movies.length === 0) {
    return (
      <div className="text-center py-16 md:py-20 text-gray-500 dark:text-gray-400">
        <span className="text-5xl md:text-6xl block mb-4">🎬</span>
        <p className="text-sm md:text-base">No movies found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
      {movies.map(movie => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}

export default MovieList;
