const AuthCard = ({
  children,
  isLoginMode,
  setIsLoginMode,
  successMsg,
  hideRegister = false,
}) => {
  return (
    <div className="glass-card rounded-2xl p-8 sm:p-10 w-full max-w-md">
      {/* Logo */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white">
          {hideRegister ? "Admin Panel" : "Ulasin"}
        </h1>
        <p className="text-gray-400 text-sm">
          {hideRegister
            ? "Login Administrator"
            : "Ulasan Film Terpercaya"}
        </p>
      </div>

      {/* Tab Switcher */}
      {!hideRegister && (
        <div className="flex bg-white/5 rounded-xl p-1 mb-8">
          <button
            onClick={() => setIsLoginMode(true)}
            className={`flex-1 py-2.5 rounded-lg ${
              isLoginMode
                ? "bg-[#e50914] text-white"
                : "text-gray-400"
            }`}
          >
            Masuk
          </button>
          <button
            onClick={() => setIsLoginMode(false)}
            className={`flex-1 py-2.5 rounded-lg ${
              !isLoginMode
                ? "bg-[#e50914] text-white"
                : "text-gray-400"
            }`}
          >
            Daftar
          </button>
        </div>
      )}

      {children}

      {successMsg && (
        <div className="mt-6 p-4 bg-green-500/10 text-green-400 text-center">
          {successMsg}
        </div>
      )}
    </div>
  );
};

export default AuthCard;
