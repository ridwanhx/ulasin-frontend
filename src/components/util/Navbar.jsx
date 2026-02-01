import React from "react";
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <svg className="w-8 h-8 text-[#E50914] group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
          </svg>
          <span className="text-2xl font-black tracking-tighter text-white">ULASIN</span>
        </Link>

        {/* Menu */}
        <div className="flex items-center gap-8">
          {/* <Link to="/" className="text-gray-300 hover:text-[#E50914] font-medium transition-colors">Film</Link> */}
          
          {token ? (
            <button 
              onClick={handleLogout}
              className="px-5 py-2 bg-white/5 hover:bg-red-500/10 border border-white/10 hover:border-red-500/50 text-white rounded-full text-sm font-semibold transition-all"
            >
              Keluar
            </button>
          ) : (
            <Link 
              to="/login" 
              className="px-6 py-2.5 bg-[#E50914] hover:bg-[#b90710] text-white rounded-full text-sm font-bold shadow-lg shadow-[#E50914]/20 transition-all"
            >
              Masuk
            </Link>
          )}
        </div>
      </div>
    </nav>
    );
}

export default Navbar;