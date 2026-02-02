import { useEffect, useState } from "react";

export default function MovieModal({
  isOpen,
  onClose,
  onSubmit,
  movie,
  isSubmitting = false,
  errorMsg = "",
}) {
  const [formData, setFormData] = useState({
    judul: "",
    poster: "",
    sutradara: "",
    genre: "",
    tahun_rilis: "",
    sinopsis: "",
  });

  const [localError, setLocalError] = useState("");

  if (!isOpen) return null;

  useEffect(() => {
    if (movie) {
      setFormData({
        judul: movie.judul ?? "",
        poster: movie.poster ?? "",
        sutradara: movie.sutradara ?? "",
        genre: movie.genre ?? "",
        tahun_rilis: movie.tahun_rilis ?? "",
        sinopsis: movie.sinopsis ?? "",
      });
    } else {
      setFormData({
        judul: "",
        poster: "",
        sutradara: "",
        genre: "",
        tahun_rilis: "",
        sinopsis: "",
      });
    }
  }, [movie?.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocalError("");

    if (!formData.judul.trim()) {
      setLocalError("Judul wajib diisi.");
      return;
    }

    if (!formData.tahun_rilis) {
      setLocalError("Tahun rilis wajib diisi.");
      return;
    }

    onSubmit({
      ...formData,
      tahun_rilis: Number(formData.tahun_rilis),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm fade-in">
      <div className="relative w-full max-w-md glass-card rounded-2xl border border-white/10 shadow-2xl animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <h2 className="text-xl font-bold text-white">
            {movie ? "Edit Movie" : "Tambah Movie"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl"
          >
            ×
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <input
            name="judul"
            value={formData.judul}
            onChange={handleChange}
            placeholder="Judul film"
            className="w-full input-field rounded-xl px-4 py-3 outline-none resize-none focus:border-[#e50914]/50"
          />

          <textarea
            name="poster"
            value={formData.poster}
            onChange={handleChange}
            placeholder="URL Poster (https://...)"
            rows={2}
            className="w-full input-field rounded-xl px-4 py-3 outline-none resize-none focus:border-[#e50914]/50 resize-none"
          />

          <input
            name="sutradara"
            value={formData.sutradara}
            onChange={handleChange}
            placeholder="Sutradara"
            className="w-full input-field rounded-xl px-4 py-3 outline-none resize-none focus:border-[#e50914]/50"
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              placeholder="Genre"
              className="w-full input-field rounded-xl px-4 py-3 outline-none resize-none focus:border-[#e50914]/50"
            />

            <input
              type="number"
              name="tahun_rilis"
              value={formData.tahun_rilis}
              onChange={handleChange}
              placeholder="Tahun rilis"
              className="w-full input-field rounded-xl px-4 py-3 outline-none resize-none focus:border-[#e50914]/50"
            />
          </div>

          <textarea
            name="sinopsis"
            value={formData.sinopsis}
            onChange={handleChange}
            rows={4}
            placeholder="Sinopsis"
            className="w-full input-field rounded-xl px-4 py-3 outline-none resize-none focus:border-[#e50914]/50 resize-none"
          />

          {(localError || errorMsg) && (
            <div className="p-3 text-sm text-red-500 bg-red-500/10 border border-red-500/30 rounded-lg">
              {localError || errorMsg}
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-white/10 text-gray-300 py-2 rounded-lg"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-[#E50914] hover:bg-red-700 py-2 rounded-lg font-semibold"
            >
              {movie ? "Update" : "Simpan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
