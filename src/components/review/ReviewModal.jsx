import React, { useState } from "react";

const ReviewModal = ({
  isOpen,
  onClose,
  onSubmit,
  movieTitle,
  isSubmitting,
  errorMsg,
}) => {
  // inisialisasi states
  const [skor, setSkor] = useState(0);
  const [komentar, setKomentar] = useState("");
  const [localError, setLocalError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocalError("");

    // Validasi sederhana di sisi klien
    if (skor === 0) {
      setLocalError("Silahkan pilih rating bintang terlebih dahulu.");
      return;
    }

    // jika field komentar tidak diisi
    if (!komentar.trim()) {
      setLocalError("Komentar tidak boleh kosong.");
      return;
    }

    // Kirim data ke parent component
    onSubmit({ skor, komentar });
  };

  // Helper untuk merender bintang interaktif
  const renderStars = () => {
    return [...Array(5)].map((_, index) => {
      const ratingValue = index + 1;

      return (
        <button
          key={index}
          type="button"
          onClick={() => setSkor(ratingValue)}
          className={`text-3xl transition-colors duration-200 focus:outline-none ${
            ratingValue <= skor
              ? "text-yellow-500"
              : "text-gray-600 hover:text-yellow-500/50"
          }`}
        >
          ★
        </button>
      );
    });
  };

  return (
    // Backdrop Overlay (Fixed & Full Screen)
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm fade-in">
      {/* Modal Container */}
      <div className="relative w-full max-w-md glass-card rounded-2xl border border-white/10 shadow-2xl animate-slide-up">
        {/* Header & Tombol Close */}
        <div className="flex items-center justify-between p-6 border-b border-white/5">
          <h3 className="text-xl font-bold text-white truncate pr-4">
            Ulas Film: <span className="text-[#e50914]">{movieTitle}</span>
          </h3>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
              </div>
              
              {/* Form Body */}
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                  
                  {/* Rating Input */}
                  <div>
                      <label className="block text-sm font-medium text-gray-300 mb-3">
                          Rating Anda
                      </label>
                      <div className="flex gap-2">
                          { renderStars() }
                      </div>
                      <p className="text-sm text-gray-500 mt-2">
                          Klik bintang untuk memberi skor (1 - 5).
                      </p>
                  </div>

                  {/* Komentar Textarea */}
                  <div>
                      <label
                          htmlFor="komentar"
                          className="block text-sm font-medium text-gray-300 mb-3"
                      >
                          Komentar
                      </label>
                      <textarea
                          id="komentar"
                          rows="4"
                          value={komentar}
                          onChange={(e) => setKomentar(e.target.value)}
                          className="w-full input-field rounded-xl px-4 py-3 text-white outline-none resize-none focus:border-[#e50914]/50"
                          placeholder="Bagaimana pendapat Anda tentang film ini?"
                      ></textarea>
                  </div>

                  {/* Pesan Error */}
                  {(localError || errorMsg) && (
                      <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/50 text-red-500 text-sm text-center animate-pulse">
                          {localError || errorMsg}
                      </div>
                  )}

                  {/* Footer Actions */}
                  <div className="flex gap-3 pt-2">
                      <button
                          type="button"
                          onClick={onClose}
                          disabled={isSubmitting}
                          className="flex-1 px-4 py-3 rounded-xl border border-white/10 text-gray-300 hover:bg-white/5 transition-all font-medium">
                          Batal
                      </button>
                      <button
                          type="submit"
                          disabled={isSubmitting || skor === 0 || !komentar.trim()}
                          className="flex-1 btn-primary rounded-xl py-3 text-white font-bold flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">
                          {isSubmitting ? <div className="spinner w-5 h-5 border-2"></div> : 'Kirim Ulasan'}
                      </button>
                  </div>
              </form>
      </div>
    </div>
  );
};


export default ReviewModal;