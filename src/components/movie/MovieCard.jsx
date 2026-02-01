import React from "react";

const MovieCard = ({ movie }) => {
  return (
    <div className="group relative glass-card rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.03] hover:shadow-2xl hover hover:shadow-[#e50914]/20 cursor-pointer">
      {/* Container Poster */}
      <div className="w-full overflow-hidden aspect-[2/3]">
        <img
          src={
            movie.poster || "https://via.placeholder.com/300x450?text=No+Poster"
          }
          alt={movie.judul}
          className="w-full h-full object cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Overlay saat Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <button className="w-full py-2 bg-[#e50914] text-shite rounded-lg font-semibold text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            Lihat Detail
          </button>
        </div>
      </div>

      {/* Konten Teks */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-1">
          <h3 className="text-white font-bold text-lg leading-tight line-clamp-1 group-hover:text-[#e50914] transition-colors">
            {movie.judul}
          </h3>
          <span className="text-[#e50914] text-xs bg-[#e50914]/10 font-bold px-2 py-1 rounded">
            {movie.tahun_rilis}
          </span>
        </div>
        <p className="text-gray-400 text-sm">{movie.genre}</p>

        {/* Rating */}
        <div className="mt-3 flex items-center gap-1">
          <span className="text-yellow-500 text-sm">⭐</span>
          <span className="text-gray-300 text-xs font-medium">
            {movie.average_rating ? movie.average_rating.toFixed(1) : "N/A"}
          </span>
          <span className="text-gray-500 text-[10px] ml-1">
            ({movie.total_reviews || 0} ulasan)
          </span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
