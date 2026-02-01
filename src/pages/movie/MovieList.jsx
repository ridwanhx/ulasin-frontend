import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import MovieCard from "../../components/movie/MovieCard";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetching movies from api
    const fetchMovies = async () => {
      try {
        const response = await api.get("/movies");
        setMovies(response.data.data);
      } catch (err) {
          console.error("Gagal mengambil data film: ", err);
          setMovies([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovies();
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header Halaman */}
      <header className="pt-24 pb-12 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md-:items-end justify-between gap-4">
          <div>
            <h2 className="text-4xl font-extrabold mb-2">
              Ulas
              <span className="text-[#e50914]">in</span>
            </h2>
            <p className="text-gray-400">
              Temukan ulasan jujur dari komunitas pecinta film.
            </p>
          </div>
          <div className="flex gap-3">
            {/* Filter (Opsional) */}
            <select className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm outline-none focus:border-[#e50914]">
              <option value="">Semua Genre</option>
              <option value="Action">Action</option>
              <option value="Horror">Horror</option>
            </select>
          </div>
        </div>
      </header>

      {/* List Film */}
      <main className="max-w-7xl mx-auto px-6 pb-20">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="spinner"></div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 animate-fade-in">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}

        {/* Jika data movie kosong */}
        {!isLoading && movies.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500">Belum ada film yang tersedia</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default MovieList;
