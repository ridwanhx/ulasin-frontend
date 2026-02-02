import { NavLink, useNavigate } from "react-router-dom";

export default function AdminNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/", {
      state: { message: "Berhasil logout" },
    });
  };

  const linkClass = ({ isActive }) =>
    `text-sm font-semibold transition-colors ${
      isActive ? "text-[#E50914]" : "text-gray-300 hover:text-[#E50914]"
    }`;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <svg
            className="w-8 h-8 text-[#E50914]"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
          </svg>
          <span className="text-xl font-bold tracking-wide">
            Ulasin <span className="text-[#E50914]">Admin</span>
          </span>
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-8">
          <div className="hidden md:flex md:gap-8">
            <NavLink to="/admin/dashboard" className={linkClass}>
              Dashboard
            </NavLink>

            <NavLink to="/admin/movies" className={linkClass}>
              Kelola Movie
            </NavLink>
          </div>

          <button
            onClick={handleLogout}
            className="text-sm font-semibold text-gray-300 hover:text-red-500 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
