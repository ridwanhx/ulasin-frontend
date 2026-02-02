import React, { useCallback, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axios";

import MovieHero from "../../components/movie/MovieHero";
import ReviewList from "../../components/review/ReviewList";
import ReviewModal from "../../components/review/ReviewModal";

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Success Message
  const [successMsg, setSuccessMsg] = useState("");

  const token = localStorage.getItem("token");

  const fetchMovie = useCallback(async () => {
    try {
      const res = await api.get(`/movies/${id}`);
      setMovie(res.data.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchMovie();
  }, [fetchMovie]);

  const handleSubmitReview = async (data) => {
    setIsSubmitting(true);
    setErrorMsg("");

    const currentToken = localStorage.getItem("token");
    if (!currentToken) {
      navigate("/login");
      return;
    }

    try {
      await api.post(
        `/movies/${id}/reviews`,
        {
          movie_id: Number(id),
          skor: data.skor,
          komentar: data.komentar,
        },
        { headers: { Authorization: `Bearer ${currentToken}` } },
      );

      setIsModalOpen(false);
      setSuccessMsg("Ulasan berhasil dikirim. Semoga harimu menyenangkan! 🥰");
      setLoading(true);
      fetchMovie();

      // Auto hide success message
      setTimeout(() => setSuccessMsg(""), 4000);
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "Gagal mengirim ulasan");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!movie) return <NotFound />;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pb-20">
      {/* Success Alert */}
      {successMsg && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 w-full max-w-lg px-4 animate-fade-in">
          <div className="glass-card bg-green-500/10 border border-green-500/40 rounded-2xl p-4 flex items-center gap-3 shadow-xl">
            <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
              ✓
            </div>
            <p className="text-green-400 font-medium text-sm">{successMsg}</p>
            <button
              onClick={() => setSuccessMsg("")}
              className="ml-auto text-gray-400 hover:text-white"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <MovieHero
        movie={movie}
        isLoggedIn={!!token}
        onReviewClick={() => setIsModalOpen(true)}
        onLoginClick={() => navigate("/login")}
      />

      <ReviewList reviews={movie.Reviews} />

      <ReviewModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setErrorMsg("");
        }}
        onSubmit={handleSubmitReview}
        movieTitle={movie.judul}
        isSubmitting={isSubmitting}
        errorMsg={errorMsg}
      />
    </div>
  );
};

export default MovieDetail;

/* ---------- Small UI helpers ---------- */

const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
    <div className="w-12 h-12 border-4 border-[#e50914] border-t-transparent rounded-full animate-spin" />
  </div>
);

const NotFound = () => (
  <div className="text-white text-center pt-20">Film tidak ditemukan.</div>
);
