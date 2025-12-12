// SearchBar.jsx - Search input with debounce
import { useState, useEffect } from 'react';

function SearchBar({ onSearch }) {
  const [searchText, setSearchText] = useState('');

  // Debounce - wait 500ms after user stops typing
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(searchText);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchText, onSearch]);

  return (
    <div className="relative max-w-xl mx-auto px-2 sm:px-0">
      <input
        type="text"
        placeholder="Search movies..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="w-full px-4 py-2.5 md:py-3 pl-10 md:pl-12 rounded-full bg-white dark:bg-gray-800 text-gray-800 dark:text-white border border-gray-300 dark:border-gray-700 focus:border-blue-500 focus:outline-none transition-colors text-sm md:text-base"
      />
      <span className="absolute left-4 sm:left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm md:text-base">
        🔍
      </span>
      {searchText && (
        <button 
          onClick={() => setSearchText('')}
          className="absolute right-4 sm:right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-white text-sm md:text-base"
        >
          ✕
        </button>
      )}
    </div>
  );
}

export default SearchBar;
