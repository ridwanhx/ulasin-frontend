import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-auto">
      {/* ===== Top Bar (Glass Navbar) ===== */}
      <nav className="sticky top-0 z-40 backdrop-blur-xl bg-white/5 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#E50914] flex items-center justify-center font-bold shadow-lg shadow-red-600/30">
              🎬
            </div>
            <span className="text-xl font-bold tracking-wide">
              Ulasin <span className="text-[#E50914]">Admin</span>
            </span>
          </div>

          <button
            onClick={handleLogout}
            className="text-sm font-semibold text-gray-300 hover:text-[#E50914] transition-colors"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* ===== Hero / Header ===== */}
      <section className="relative overflow-hidden">
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          {/* Card */}
          <DashboardCard
            title="Total Movies"
            value="—"
            desc="Jumlah film terdaftar"
          />
          <DashboardCard
            title="Total Reviews"
            value="—"
            desc="Ulasan dari pengguna"
          />
          <DashboardCard
            title="Active Users"
            value="—"
            desc="Pengguna aktif"
          />
        </div>
      </main>
    </div>
  );
}

/* ===== Reusable Card ===== */

const DashboardCard = ({ title, value, desc }) => (
  <div className="glass-card rounded-2xl p-6 border border-white/10 hover:border-[#E50914]/40 transition-all">
    <h3 className="text-sm uppercase tracking-widest text-gray-400 mb-2">
      {title}
    </h3>
    <p className="text-3xl font-bold mb-1">{value}</p>
    <p className="text-gray-500 text-sm">{desc}</p>
  </div>
);
