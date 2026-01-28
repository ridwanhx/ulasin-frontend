import React, { useState } from "react";
import api from "./api/axios";

const AuthPage = () => {
  // Inisialisasi State Management
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  // Inisialisasi State untuk form data
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Inisialisasi State untuk error handling
  const [errors, setErrors] = useState({});

  // Handlers
  const HandleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    // Hapus error saat user mulai mengetik lagi
    if (errors[id]) setErrors((prev) => ({ ...prev, [id]: "" }));
  };

  // Form validation
  const validate = () => {
    let newErrors = {};

    // Auth: Login
    // Jika field email tidak diisi
    if (!formData.email) newErrors.email = "Email tidak boleh kosong";
    // Jika input email tidak valid
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Format email tidak valid";

    // Jika field password tidak diisi
    if (!formData.password) newErrors.password = "Password tidak boleh kosong";
    // Jika input password kurang dari 8 digit karakter
    else if (formData.password.length < 8)
      newErrors.password = "Password minimal 8 karakter";

    // Auth: Register
    if (!isLoginMode) {
      // field nama tidak boleh kosong
      if (!formData.nama) newErrors.nama = "Nama tidak boleh kosong";
      // field password dan confirm password harus sama
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Password tidak cocok";
      }
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    setErrors({}); // Reset error lama

    try {
      if (isLoginMode) {
        // Logic Login
        const response = await api.post("/login", {
          email: formData.email,
          password: formData.password,
        });

        // get token
        const { token } = response.data;
        localStorage.setItem("token", token); // Simpan token JWT

        setSuccessMsg("Login Berhasil!");
        // Arahkan ke Dashboard (misal dengan menggunakan react-router)
        // window.location.href = '/dashboard
      } else {
        // Logic Register
        await api.post("/register", {
          nama: formData.nama, // menyesuaikan RegisterRequest di Go
          email: formData.email,
          password: formData.password,
        });

        setSuccessMsg("Registrasi Berhasil! Silahkan Login.");
        setTimeout(() => setIsLoginMode(true), 2000);
      }
    } catch (err) {
      // Tangkap error dari Fiber (misal: "Email sudah terdaftar")
      const message =
        err.response?.data?.message || "Terjadi kesalahan paad server";
      setErrors({ server: message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-full w-full relative flex items-center justify-center p-4 bg-[#0a0a0a] text-white overflow-auto">
      {/* Background Poster Grid */}
      <div className="poster-grid">
        {[
          ...Array(24).map((_, i) => (
            <div key={i} className="poster-item h-40 w-full"></div>
          )),
        ]}
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/80 to-[#1a0a0a]/90"></div>

      {/* Main Card */}
      <div className="glass-card rounded-2xl p-8 sm:p-10 w-full max-w-md relative z-10 fade-in">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-3">
            <svg
              className="w-10 h-10 text-[#E50914]"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
            <h1 className="text-3xl font-bold tracking-tight">Ulasin</h1>
          </div>
          <p className="text-gray-400 text-sm">Ulasan Film Terpercaya</p>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-white/5 rounded-xl p-1 mb-8">
          <button
            onClick={() => setIsLoginMode(true)}
            className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-semibold transition-all duration-300 ${isLoginMode ? "bg-[#E50914] text-white" : "text-gray-400 hover:text-white"}`}
          >
            Masuk
          </button>
          <button
            onClick={() => setIsLoginMode(false)}
            className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-semibold transition-all duration-300 ${!isLoginMode ? "bg-[#E50914] text-white" : "text-gray-400 hover:text-white"}`}
          >
            Daftar
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Field Nama (Register Only) */}
          {!isLoginMode && (
            <div className="fade-in">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Nama
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="nama"
                  value={formData.nama}
                  onChange={HandleInputChange}
                  className={`input-field w-full pl-4 pr-4 py-3.5 rounded-xl text-white outline-none ${errors.nama ? "error-shake border-red-500" : ""}`}
                  placeholder="Nama lengkap"
                />
              </div>
              {errors.nama && (
                <p className="text-red-400 text-xs mt-2">{errors.nama}</p>
              )}
            </div>
          )}

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email
            </label>
            <input
              type="text"
              id="email"
              value={formData.email}
              onChange={HandleInputChange}
              className={`input-field w-full px-4 py-3.5 rounded-xl text-white outline-none ${errors.email ? "error-shake border-red-500" : ""}`}
              placeholder="nama@email.com"
            />
            {errors.email && (
              <p className="text-red-400 text-xs mt-2">{errors.email}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={formData.password}
                onChange={HandleInputChange}
                className={`input-field w-full px-4 py-3.5 rounded-xl text-white outline-none ${errors.password ? "error-shake border-red-500" : ""}`}
                placeholder="Minimal 8 karakter"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
            {errors.password && (
              <p className="text-red text-xs mt-2">{errors.password}</p>
            )}
          </div>

          {/* Field Konfirmasi Password */}
          {!isLoginMode && (
            <div className="fade-in">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Konfirmasi Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={HandleInputChange}
                className={`input-field w-full px-4 py-3.5 rounded-xl text-white outline-none ${errors.confirmPassword ? "error-shake border-red-500" : ""}`}
                placeholder="Ulangi password"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-2">
                  {errors.confirmPassword}
                </p>
              )}
            </div>
          )}

          {/* Tampilkan Error dari Server (Backend) jika ada */}
          {errors.server && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/50 text-red-500 text-sm text-center fade-in">
              {errors.server}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary w-full py-4 rounded-xl font-semibold text-white flex items-center justify-center gap-2 mt-6"
          >
            {isLoading ? (
              <div className="spinner"></div>
            ) : isLoginMode ? (
              "Masuk"
            ) : (
              "Daftar"
            )}
          </button>
        </form>

        {/* Success Message */}
        {successMsg && (
          <div className="mt-6 p-4 rounded-xl bg-green-500/10 border border-green-500 text-green-400/30 text-center fade-in">
            {successMsg}
          </div>
        )}

        <p className="text-center text-gray-400 text-sm mt-6">
          {isLoginMode ? "Belum punya akun?" : "Sudah punya akun?"}{" "}
          <button
            onClick={() => setIsLoginMode(!isLoginMode)}
            className="text-[#e50914] font-semibold"
          >
            {isLoginMode ? "Daftar di sini" : "Masuk di sini"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
