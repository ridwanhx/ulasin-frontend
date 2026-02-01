import React, { useCallback, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from '../../api/axios';
import ReviewModal from "../../components/review/ReviewModal";

const MovieDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const token = localStorage.getItem('token');

    // State untuk Modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmittingReview, setIsSubmittingReview] = useState(false);
    const [reviewError, setReviewError] = useState('');

    // Gunakan useCallback agar fungsi fetch tidak dibuat ulang setiap render
    const fetchMovieDetail = useCallback(async () => {
        try {
            const response = await api.get(`/movies/${id}`);
            setMovie(response.data.data);
        } catch (err) {
            console.error("Error fetching movie detail: ", err);
        } finally {
            setIsLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchMovieDetail();
    }, [fetchMovieDetail]);

    // Fungsi Handle Submit Review ke Backend
    const handleSubmitReview = async (reviewData) => {
        setIsSubmittingReview(true);
        setReviewError('');

        try {
            // Ambil token terbaru dari localStorage
            const currentToken = localStorage.getItem('token');

            if (!currentToken) {
                setReviewError("Sesi Anda habis, silahkan login kembali.")
                navigate('/login');
                return;
            }

            // Payload sesuai struktur database: movie_id, skor, komentar
            // user_id akan diambil otomatis oleh backend dari token JWT
            const payload = {
                movie_id: parseInt(id), // pastikan ID film berupa integer
                skor: reviewData.skor,
                komentar: reviewData.komentar,
            };

            // Kirim POST request (token otomatis disertakan oleh axios interceptor jika ada)
            await api.post(`/movies/${id}/reviews`, payload, {
                headers: { Authorization: `Bearer ${currentToken}` }   // Explicitly add header just in case
            });

            // Jika sukses:
            setIsModalOpen(false);  // Tutup modal
            setIsLoading(true); // Set loading utama true untuk fetch ulang
            fetchMovieDetail(); // Fetch ulang data filmagar ulasan baru muncul
        } catch (err) {
            console.error("Detail Error: ", err.response?.data);
            // Tangkap error dari backend
            const msg = err.response?.data?.message || 'Gagal mengirim ulasan. Coba lagi.';
            setReviewError(msg);
        } finally {
            setIsSubmittingReview(false);
        }
    };

    if (isLoading) return (
        <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-[#e50914] border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    if (!movie) return <div className="text-white text-center pt-20">
        Film tidak ditemukan.
    </div>

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white pb-20">
            {/* Hero Section - Background Blur */}
            <div className="relative w-full h-[400px] overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center scale-110 blur-xl opacity-30" style={{ backgroundImage: `url(${movie.poster})` }}></div>

                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent"></div>
            </div>

            {/* Content Container */}
            <div className="max-w-6xl mx-auto px-6 -mt-64 relative z-10">
                <div className="flex flex-col md:flex-row gap-10">
                    {/* Poster Kiri */}
                    <div className="w-full md:w-80 flex-shrink-0">
                        <img src={movie.poster} alt={movie.judul} className="w-full rounded-2xl shadow-2xl border border-white/10" />
                    </div>

                    {/* Info Kanan */}
                    <div className="flex-1 pt-10">
                        <h1 className="text-5xl font-black mb-4 tracking-tight">
                            {movie.judul}
                        </h1>

                        <div className="flex flex-wrap items-center gap-4 text-sm mb-8">
                            {/* Genre */}
                            <span className="bg-[#e50914] px-3 py-1 rounded-md font-bold uppercase tracking-wider text-xs">
                                {movie.genre}
                            </span>

                            {/* Tahun Rilis */}
                            <span className="text-gray-400 font-medium">
                                {movie.tahun_rilis}
                            </span>
                            <span className="text-gray-400">•</span>

                            {/* Average Rating */}
                            <div className="flex items-center gap-1">
                                <span className="text-yellow-500 text-lg">
                                    ★
                                </span>
                                <span className="font-bold text-white text-lg">
                                    {movie.average_rating ? movie.average_rating.toFixed(1) : "0"}
                                </span>
                                <span className="text-gray-500 text-sm">
                                    ({movie.total_reviews} Ulasan)
                                </span>
                            </div>
                        </div>

                        {/* Sutradara */}
                        <div className="mb-8">
                            <h3 className="text-gray-400 uppercase text-xs font-bold tracking-[0.2em] mb-3">
                                Sutradara
                            </h3>
                            <p className="text-xl text-white font-medium">
                                {movie.sutradara}
                            </p>
                        </div>

                        {/* Sinopsis */}
                        <div className="mb-10">
                            <h3 className="text-gray-400 uppercase text-xs font-bold tracking-[0.2em] mb-3">
                                Sinopsis
                            </h3>
                            <p className="text-xl text-white font-medium">
                                {movie.sinopsis}
                            </p>
                        </div>

                        {/* Tombol Aksi */}
                        <div className="flex gap-4">
                            {token ? (
                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    className="bg-[#E50914] hover:bg-[#b90710] text-white px-8 py-4 rounded-xl font-bold transition-all flex items-center gap-2 shadow-lg shadow-[#e50914]/20">
                                    <span className="text-xl">
                                        +
                                    </span>
                                    Tulis Ulasan Kamu
                                </button>
                            ) : (
                                <button onClick={() => navigate('/login')} className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-8 py-4 rounded-xl font-bold transition-all">
                                    Masuk untuk Review
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Section Review */}
                <div className="mt-24">
                    <div className="flex items-center justify-between mb-10 border-b border-white/5 pb-6">
                        <h2 className="text-3xl font-bold">Ulasan Pengguna</h2>
                        <span className="text-gray-500">
                            {movie.Reviews ? movie.Reviews.length : 0} Komentar
                        </span>
                    </div>

                    <div className="grid gap-6">
                        {movie.Reviews && movie.Reviews.length > 0 ? (
                            movie.Reviews.map((review) => (
                                <div key={review.id} className="glass-card p-8 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex items-center gap-4">
                                            {/* Avatar Placeholder */}
                                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#e50914] to-red-800 flex items-center justify-center font-bold text-lg">
                                                {review.User?.nama?.charAt(0)}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-white text-lg">
                                                    {review.User?.nama}
                                                </h4>
                                                <p className="text-gray-500 text-xs">
                                                    {new Date(review.CreatedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="bg-white/5 px-3 py-1 rounded-lg flex items-center gap-1 border border-white/5">
                                            <span className="text-yellow-500">
                                                ★
                                            </span>
                                            <span className="font-bold">
                                                {review.Skor}
                                            </span>
                                        </div>
                                    </div>
                                    <p className="text-gray-300 leading-relaxed italic">
                                        "{review.Komentar}"
                                    </p>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-20 glass-card rounded-2xl border border-dashed border-white/10">
                                <p className="text-gray-500">
                                    Belum ada ulasan untuk film ini. Jadi yang pertama mengulas!
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Render komponen modal */}
            <ReviewModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setReviewError(''); // Reset error saat ditutup
                }}
                onSubmit={handleSubmitReview}
                movieTitle={movie.judul}
                isSubmitting={isSubmittingReview}
                errorMsg={reviewError}
            >
            </ReviewModal>
        </div>
    );
};

export default MovieDetail;