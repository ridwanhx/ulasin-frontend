const MovieHero = ({ movie, isLoggedIn, onReviewClick, onLoginClick }) => {
  return (
    <>
      {/* Background */}
      <div className="relative w-full h-[400px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center scale-110 blur-xl opacity-30"
          style={{ backgroundImage: `url(${movie.poster})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
      </div>

      <div className="max-w-6xl mx-auto px-6 -mt-64 relative z-10">
        <div className="flex flex-col md:flex-row gap-10">
          <img
            src={movie.poster}
            alt={movie.judul}
            className="w-full md:w-80 rounded-2xl shadow-2xl border border-white/10"
          />

          <div className="flex-1 pt-10">
            <h1 className="text-5xl font-black mb-4">{movie.judul}</h1>

            <MovieMeta movie={movie} />

            <Section title="Sutradara">{movie.sutradara}</Section>
            <Section title="Sinopsis">{movie.sinopsis}</Section>

            {isLoggedIn ? (
              <ActionButton onClick={onReviewClick} primary>
                + Tulis Ulasan Kamu
              </ActionButton>
            ) : (
              <ActionButton onClick={onLoginClick}>
                Masuk untuk Review
              </ActionButton>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieHero;

/* ---------- Sub Components ---------- */

const MovieMeta = ({ movie }) => (
  <div className="flex flex-wrap items-center gap-4 text-sm mb-8">
    <span className="bg-[#e50914] px-3 py-1 rounded-md font-bold text-xs">
      {movie.genre}
    </span>
    <span className="text-gray-400">{movie.tahun_rilis}</span>
    <span className="text-yellow-500">
      ★ {movie.average_rating?.toFixed(1) || 0}
    </span>
    <span className="text-gray-500">
      ({movie.total_reviews} Ulasan)
    </span>
  </div>
);

const Section = ({ title, children }) => (
  <div className="mb-8">
    <h3 className="text-gray-400 uppercase text-xs font-bold mb-3">
      {title}
    </h3>
    <p className="text-xl">{children}</p>
  </div>
);

const ActionButton = ({ children, onClick, primary }) => (
  <button
    onClick={onClick}
    className={`px-8 py-4 rounded-xl font-bold transition ${
      primary
        ? "bg-[#e50914] hover:bg-[#b90710]"
        : "bg-white/5 hover:bg-white/10 border border-white/10"
    }`}
  >
    {children}
  </button>
);
