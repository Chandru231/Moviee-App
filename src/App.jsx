// App.jsx - Main app component with routing
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FavoritesProvider } from './FavoritesContext';
import { ThemeProvider } from './ThemeContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';
import Favorites from './pages/Favorites';

function App() {
  return (
    <ThemeProvider>
      <FavoritesProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors overflow-x-hidden max-w-full">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/movie/:id" element={<MovieDetails />} />
              <Route path="/favorites" element={<Favorites />} />
            </Routes>
          </div>
        </BrowserRouter>
      </FavoritesProvider>
    </ThemeProvider>
  );
}

export default App;
