import { useEffect, useState } from "react";
import api from "../../api/axios";
import StatCard from "../../components/admin/cards/StatCard";
import LoadingState from "../../components/admin/util/LoadingState";
import AdminNavbar from "../../components/admin/util/AdminNavbar";

export default function Dashboard() {
  const [stats, setStats] = useState({
    movies: 0,
    reviews: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await api.get("/movies");
        const movies = res.data.data || [];

        const totalMovies = movies.length;
        const totalReviews = movies.reduce(
          (sum, m) => sum + (m.reviews?.length || 0),
          0,
        );

        setStats({
          movies: totalMovies,
          reviews: totalReviews,
        });
      } catch (err) {
        console.error("Dashboard error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-auto">
      <AdminNavbar />
      

      {/* ===== Hero / Header ===== */}
      <section className="relative overflow-hidden mt-20">
        {/* Background glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#E50914]/20 via-transparent to-transparent" />

        <div className="relative max-w-7xl mx-auto px-6 py-12">
          <div className="glass-card rounded-3xl p-8 border border-white/10">
            <h1 className="text-3xl md:text-4xl font-black tracking-tight">
              Selamat Datang, <span className="text-[#E50914]">Admin</span>
            </h1>
            <p className="mt-3 text-gray-400 max-w-xl">
              Kelola data film, ulasan, dan aktivitas pengguna di platform
              <span className="text-white font-semibold"> Ulasin</span>.
            </p>
          </div>
        </div>
      </section>

      {/* ===== Main Content Placeholder ===== */}
      <main className="max-w-7xl mx-auto px-6 pb-20">
        {isLoading ? (
          <LoadingState />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
            {/* Card */}
            <StatCard
              title="Total Movies"
              value={stats.movies}
              desc="Jumlah film terdaftar"
            />
            <StatCard
              title="Total Reviews"
              value={stats.reviews}
              desc="Ulasan dari pengguna"
            />
          </div>
        )}
      </main>
    </div>
  );
}
