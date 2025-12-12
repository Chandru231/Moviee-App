// ThemeContext.jsx - Manages dark/light theme
import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

// Custom hook to use theme
export function useTheme() {
  return useContext(ThemeContext);
}

// Provider component
export function ThemeProvider({ children }) {
  // Get theme from localStorage (default: dark)
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : true; // Default to dark
  });

  // Update localStorage and document class when theme changes
  useEffect(() => {
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
    
    // Add or remove 'dark' class on document
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Toggle theme function
  function toggleTheme() {
    setDarkMode(prev => !prev);
  }

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
