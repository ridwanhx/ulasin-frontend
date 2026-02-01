// Wrapper utama yang berisi logo dan tab switcher
import React from "react";

const AuthCard = ({ children, isLoginMode, setIsLoginMode, successMsg }) => {
    return (
        <div className="glass-card rounded-2xl p-8 sm:p-10 w-full max-w-md relative z-10 fade-in">
            {/* Logo */}
            <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 mb-3">
                <svg className="w-10 h-10 text-[#E50914]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
                <h1 className="text-3xl font-bold tracking-tight text-white">Ulasin</h1>
                </div>
                <p className="text-gray-400 text-sm">Ulasan Film Terpercaya</p>
            </div>

            {/* Tab Switcher */}
            <div className="flex bg-white/5 rounded-xl p-1 mb-8">
                <button onClick={() => setIsLoginMode(true)} className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-semibold transition-all duration-300 ${isLoginMode ? 'bg-[#e50914] text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}>
                    Masuk
                </button>
                <button onClick={() => setIsLoginMode(false)} className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-semibold transition-all duration-300 ${!isLoginMode ? 'bg-[#e50914] text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}>
                    Daftar
                </button>
            </div>

            {children}

            {/* Success Message */}
            {successMsg && (
                <div className="mt-6 p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 text-sm text-center animate-pulse">
                    {successMsg}
                </div>
            )}
        </div>
    );
}

export default AuthCard;