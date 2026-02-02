import { useEffect, useState } from "react";
import AdminNavbar from "../../components/admin/util/AdminNavbar";
import MovieTable from "../../components/admin/MovieTable";
import MovieModal from "../../components/admin/MovieModal";
import { AdminAlert } from "../../components/admin/util/AdminAlert";
import { Pagination } from "../../components/admin/util/Pagination";
import {
  getMovies,
  createMovie,
  updateMovie,
  deleteMovie,
} from "../../services/MovieService";
import MovieDetailModal from "../../components/admin/MovieDetailModal";

export default function MovieManage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  // Detail Movie
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [detailMovie, setDetailMovie] = useState(null);

  // Alert
  const [alert, setAlert] = useState({
    type: "",
    message: "",
  });
  // Helper
  const showAlert = (type, message) => {
    setAlert({ type, message });

    setTimeout(() => {
      setAlert({ type: "", message: "" });
    }, 4000);
  };

  // Search
  const [searchQuery, setSearchQuery] = useState("");
  // Search
  const filteredMovies = movies.filter((movie) => {
    const keyword = searchQuery.toLowerCase();

    return (
      movie.judul?.toLowerCase().includes(keyword) ||
      movie.sutradara?.toLowerCase().includes(keyword) ||
      movie.genre?.toLowerCase().includes(keyword) ||
      movie.tahun_rilis?.toString().includes(keyword)
    );
  });

  // reset halaman saat search berubah
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // pagination
  const ITEMS_PER_PAGE = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(filteredMovies.length / ITEMS_PER_PAGE);
  const paginatedMovies = filteredMovies.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

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

  const handleViewMovie = (movie) => {
    setDetailMovie(movie);
    setShowDetailModal(true);
  };

  const handleEditMovie = (movie) => {
    setSelectedMovie(movie);
    setShowModal(true);
  };

  const handleDeleteMovie = async (id) => {
    if (!confirm("Apakah Anda yakin ingin menghapus movie ini?")) return;

    try {
      await deleteMovie(id);
      showAlert("success", "Movie berhasil dihapus 🗑️");
      setCurrentPage(1);
      fetchMovies();
    } catch (err) {
      showAlert("danger", "Gagal menghapus movie");
      console.error(err);
    }
  };

  const handleSaveMovie = async (formData) => {
    try {
      if (selectedMovie) {
        await updateMovie(selectedMovie.id, formData);
        setCurrentPage(1);
        showAlert("success", "Movie berhasil diperbarui 🎬");
      } else {
        await createMovie(formData);
        setCurrentPage(1);
        showAlert("success", "Movie berhasil ditambahkan 🎉");
      }
      setShowModal(false);
      fetchMovies();
    } catch (err) {
      showAlert(
        "danger",
        `Gagal ${selectedMovie ? "mengupdate" : "menambahkan"} movie`,
      );
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <AdminNavbar />

      {/* Alert */}
      <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 w-full max-w-xl px-6">
        <AdminAlert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert({ type: "", message: "" })}
        />
      </div>
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
              <div className="block">
                <h2 className="text-lg font-semibold text-white">
                  Daftar Movie
                </h2>
                <span className="text-sm text-gray-400">
                  Total: {movies.length}
                </span>
              </div>
              {/* Search */}
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari berdasarkan keyword..."
                className="w-full md:w-80 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white outline-none focus:border-[#e50914]/60"
              />
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
                <>
                  <MovieTable
                    movies={paginatedMovies}
                    onEdit={handleEditMovie}
                    onDelete={handleDeleteMovie}
                    onView={handleViewMovie}
                  />

                  {/* Pagination */}
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                </>
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

      {/* Detail Movie Modal */}
      {showDetailModal && (
        <MovieDetailModal
          movie={detailMovie}
          onClose={() => setShowDetailModal(false)}
        />
      )}
    </div>
  );
}
