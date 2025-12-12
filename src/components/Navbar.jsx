// Navbar.jsx - Navigation bar component
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../ThemeContext';

function Navbar() {
  const location = useLocation();
  const { darkMode, toggleTheme } = useTheme();

  // Check which page is active
  const isHome = location.pathname === '/';
  const isFavorites = location.pathname === '/favorites';

  return (
    <nav className="bg-white dark:bg-gray-900 text-gray-800 dark:text-white py-3 px-4 md:py-4 md:px-6 sticky top-0 z-50 shadow-md dark:shadow-none border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo with custom image */}
        <Link to="/" className="flex items-center gap-2 transition-transform duration-200 hover:scale-105">
          <img src="/hero section.png" alt="MovieApp" className="w-8 h-8 md:w-10 md:h-10" />
          <span className="text-lg sm:text-xl md:text-2xl font-bold text-blue-500">CineSearch</span>
        </Link>

        {/* Nav Links */}
        <div className="flex items-center gap-2 md:gap-4">
          <Link 
            to="/" 
            className={`px-3 py-2 md:px-4 text-sm md:text-base rounded-lg transition-all duration-200 ${
              isHome 
                ? 'bg-blue-500 text-white scale-105' 
                : 'hover:bg-gray-200 dark:hover:bg-gray-800 hover:scale-105'
            }`}
          >
            <span className="hidden sm:inline">Home</span>
            <span className="sm:hidden">🏠</span>
          </Link>
          <Link 
            to="/favorites" 
            className={`px-3 py-2 md:px-4 text-sm md:text-base rounded-lg transition-all duration-200 ${
              isFavorites 
                ? 'bg-blue-500 text-white scale-105' 
                : 'hover:bg-gray-200 dark:hover:bg-gray-800 hover:scale-105'
            }`}
          >
            <span className="hidden sm:inline">❤️ Favorites</span>
            <span className="sm:hidden">❤️</span>
          </Link>

          {/* Theme Toggle Button with rotation animation */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-all duration-300 hover:rotate-180 text-lg md:text-xl"
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
