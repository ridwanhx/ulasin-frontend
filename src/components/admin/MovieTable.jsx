export default function MovieTable({ movies, onEdit, onDelete }) {
    return (
        <div className="overflow-x-auto">
            <table className="w-full border-collapse">
                <thead>
                    <tr className="bg-gray-100 border-b-2 border-gray-300">
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">ID</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Poster</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Judul</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Sutradara</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Genre</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Tahun</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Sinopsis</th>
                        <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {movies.length === 0 ? (
                        <tr>
                            <td colSpan="8" className="px-4 py-8 text-center text-gray-500">
                                Belum ada data movie
                            </td>
                        </tr>
                    ) : (
                        movies.map((movie) => (
                            <tr key={movie.id} className="border-b border-gray-200 hover:bg-gray-50">
                                <td className="px-4 py-3 text-sm text-gray-700">{movie.id}</td>
                                <td className="px-4 py-3">
                                    {movie.poster ? (
                                        <img
                                            src={movie.poster}
                                            alt={movie.judul}
                                            className="w-12 h-16 object-cover rounded"
                                        />
                                    ) : (
                                        <div className="w-12 h-16 bg-gray-200 rounded flex items-center justify-center text-gray-400 text-xs">
                                            No Image
                                        </div>
                                    )}
                                </td>
                                <td className="px-4 py-3 text-sm font-medium text-gray-900">{movie.judul}</td>
                                <td className="px-4 py-3 text-sm text-gray-700">{movie.sutradara}</td>
                                <td className="px-4 py-3 text-sm text-gray-700">{movie.genre}</td>
                                <td className="px-4 py-3 text-sm text-gray-700">{movie.tahun_rilis}</td>
                                <td className="px-4 py-3 text-sm text-gray-600 max-w-xs truncate">
                                    {movie.sinopsis}
                                </td>
                                <td className="px-4 py-3 text-center">
                                    <div className="flex justify-center gap-2">
                                        <button
                                            onClick={() => onEdit(movie)}
                                            className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => onDelete(movie.id)}
                                            className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition"
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