export default function MovieDetailModal({ movie, onClose }) {
  if (!movie) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-3xl glass-card rounded-2xl border border-white/10 shadow-2xl animate-slide-up overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/5">
          <h3 className="text-xl font-bold text-white">
            Detail Movie
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Poster */}
          <div className="md:col-span-1">
            {movie.poster ? (
              <img
                src={movie.poster}
                alt={movie.judul}
                className="w-full rounded-xl object-cover shadow"
              />
            ) : (
              <div className="w-full aspect-[2/3] bg-gray-800 rounded-xl flex items-center justify-center text-gray-400">
                No Image
              </div>
            )}
          </div>

          {/* Info */}
          <div className="md:col-span-2 space-y-4">
            <h2 className="text-2xl font-bold text-white">
              {movie.judul}
            </h2>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-400">Sutradara</p>
                <p className="text-white font-medium">{movie.sutradara}</p>
              </div>
              <div>
                <p className="text-gray-400">Genre</p>
                <p className="text-white font-medium">{movie.genre}</p>
              </div>
              <div>
                <p className="text-gray-400">Tahun Rilis</p>
                <p className="text-white font-medium">{movie.tahun_rilis}</p>
              </div>
            </div>

            <div>
              <p className="text-gray-400 mb-1">Sinopsis</p>
              <p className="text-gray-200 leading-relaxed">
                {movie.sinopsis || "-"}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/5 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-200 transition"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
