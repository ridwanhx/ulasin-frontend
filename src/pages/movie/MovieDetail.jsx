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
        { headers: { Authorization: `Bearer ${currentToken}` } }
      );

      setIsModalOpen(false);
      setLoading(true);
      fetchMovie();
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
  <div className="text-white text-center pt-20">
    Film tidak ditemukan.
  </div>
);
