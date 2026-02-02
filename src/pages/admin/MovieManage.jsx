import { useEffect, useState } from "react";
import AdminNavbar from "../../components/admin/util/AdminNavbar";
import MovieTable from "../../components/admin/MovieTable";
import MovieModal from "../../components/admin/MovieModal";
import {
  getMovies,
  createMovie,
  updateMovie,
  deleteMovie,
} from "../../services/MovieService";

export default function MovieManage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const res = await getMovies();
      setMovies(res.data || []);
      setError(null);
    } catch (err) {
      setError("Gagal memuat data movie");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddMovie = () => {
    setSelectedMovie(null);
    setShowModal(true);
  };

  const handleEditMovie = (movie) => {
    setSelectedMovie(movie);
    setShowModal(true);
  };

  const handleDeleteMovie = async (id) => {
    if (!confirm("Apakah Anda yakin ingin menghapus movie ini?")) return;

    try {
      await deleteMovie(id);
      fetchMovies();
    } catch (err) {
      alert("Gagal menghapus movie");
      console.error(err);
    }
  };

  const handleSaveMovie = async (formData) => {
    try {
      if (selectedMovie) {
        await updateMovie(selectedMovie.id, formData);
      } else {
        await createMovie(formData);
      }
      setShowModal(false);
      fetchMovies();
    } catch (err) {
      alert(`Gagal ${selectedMovie ? "mengupdate" : "menambahkan"} movie`);
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <AdminNavbar />

      {/* Content */}
      <main className="pt-28 px-6">
        <section className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold">
                Kelola <span className="text-[#E50914]">Movie</span>
              </h1>
              <p className="text-gray-400 mt-1">
                Tambah, edit, dan hapus data movie
              </p>
            </div>

            <button
              onClick={handleAddMovie}
              className="px-5 py-2.5 bg-[#E50914] hover:bg-red-700 transition rounded-lg font-semibold text-sm"
            >
              + Tambah Movie
            </button>
          </div>

          {/* Table Card */}
          <div className="glass-card border border-white/10 shadow-2xl rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
              <h2 className="text-lg font-semibold text-white">Daftar Movie</h2>
              <span className="text-sm text-gray-400">
                Total: {movies.length}
              </span>
            </div>
            <div className="p-6">
              {loading ? (
                <div className="text-center py-12 text-gray-400 animate-pulse">
                  Loading data movie...
                </div>
              ) : error ? (
                <div className="text-center py-12 text-red-500 font-medium">
                  {error}
                </div>
              ) : (
                <MovieTable
                  movies={movies}
                  onEdit={handleEditMovie}
                  onDelete={handleDeleteMovie}
                />
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Modal */}
      {showModal && (
        <MovieModal
          isOpen={showModal}
          movie={selectedMovie}
          onClose={() => setShowModal(false)}
          onSubmit={handleSaveMovie}
        />
      )}
    </div>
  );
}
