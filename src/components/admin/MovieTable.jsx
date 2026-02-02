export default function MovieTable({ movies, onEdit, onDelete }) {
    return (
        <div className="overflow-x-auto">
            <table className="w-full border-collapse">
                <thead>
                    <tr className="border-b border-white/10 text-gray-400">
                        <th className="px-4 py-3 text-left">No.</th>
                        <th className="px-4 py-3 text-left">Poster</th>
                        <th className="px-4 py-3 text-left">Judul</th>
                        <th className="px-4 py-3 text-left">Sutradara</th>
                        <th className="px-4 py-3 text-left">Genre</th>
                        <th className="px-4 py-3 text-left">Tahun</th>
                        <th className="px-4 py-3 text-left">Sinopsis</th>
                        <th className="px-4 py-3 text-center">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {movies.length === 0 ? (
                        <tr>
                            <td colSpan="8" className="py-10 text-center text-gray-500">
                                Belum ada data movie
                            </td>
                        </tr>
                    ) : (
                        movies.map((movie, index) => (
                            <tr key={movie.id} className="border-b border-white/5 hover:bg-white/5 transition">
                                <td className="px-4 py-4 text-gray-400">{index + 1}</td>
                                <td className="px-4 py-4">
                                    {movie.poster ? (
                                        <img
                                            src={movie.poster}
                                            alt={movie.judul}
                                            className="w-12 h-16 object-cover rounded"
                                        />
                                    ) : (
                                        <div className="w-12 h-16 bg-white/10 rounded-lg flex items-center justify-center text-xs text-gray-500">
                                            No Image
                                        </div>
                                    )}
                                </td>
                                <td className="px-4 py-4 font-medium text-white">{movie.judul}</td>
                                <td className="px-4 py-4 text-gray-300">{movie.sutradara}</td>
                                <td className="px-4 py-4 text-gray-300">{movie.genre}</td>
                                <td className="px-4 py-4 text-gray-300">{movie.tahun_rilis}</td>
                                <td className="px-4 py-4 text-gray-400 max-w-xs truncate">
                                    {movie.sinopsis}
                                </td>
                                <td className="px-4 py-4 text-center">
                                    <div className="flex justify-center gap-2">
                                        <button
                                            onClick={() => onEdit(movie)}
                                            className="px-3 py-1.5 text-xs rounded-lg bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 transition"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => onDelete(movie.id)}
                                            className="px-3 py-1.5 text-xs rounded-lg bg-red-600/20 text-red-400 hover:bg-red-600/30 transition"
                                        >
                                            Hapus
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}