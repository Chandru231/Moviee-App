  function Loader() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="w-12 h-12 border-4 border-gray-300 dark:border-gray-600 border-t-red-500 rounded-full animate-spin"></div>
      <p className="mt-4 text-gray-500 dark:text-gray-400">Loading...</p>
    </div>
  );
}

export default Loader;
