// Footer.jsx - Simple footer with credits
function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-6 mt-auto">
      <div className="max-w-6xl mx-auto px-4 text-center">
        {/* Logo and Name */}
        <div className="flex items-center justify-center gap-2 mb-3">
          <img src="/hero section.png" alt="CineSearch" className="w-6 h-6" />
          <span className="text-lg font-bold text-blue-500">CineSearch</span>
        </div>

        {/* Tagline */}
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">
          Your ultimate movie discovery platform 
        </p>

        {/* Credits */}
        <p className="text-gray-400 dark:text-gray-500 text-xs">
          © {currentYear} CineSearch. Built with 💙 love 
        </p> 
      </div>
    </footer>
  );
}

export default Footer;
