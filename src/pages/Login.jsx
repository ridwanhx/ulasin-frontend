import React, { useState } from "react";
import api from "../api/axios";
import AuthCard from "../components/auth/AuthCard";
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";
import { useNavigate } from "react-router-dom";

const Login = ({ isAdmin = false }) => {
  const navigate = useNavigate();

  const [isLoginMode, setIsLoginMode] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    try {
      const endpoint = isLoginMode ? "/login" : "/register";
      const res = await api.post(endpoint, {
        ...formData,
        role: isAdmin ? "admin" : "user", // ⬅️ PENTING
      });

      if (isLoginMode) {
        localStorage.setItem("token", res.data.token);

        // OPTIONAL: validasi role dari backend
        if (isAdmin && res.data.user.role !== "admin") {
          throw new Error("Bukan akun admin");
        }

        setSuccessMsg("Login berhasil!");

        setTimeout(() => {
          navigate(isAdmin ? "/admin/dashboard" : "/");
          window.location.reload();
        }, 1200);
      } else {
        setSuccessMsg("Registrasi berhasil!");
        setIsLoginMode(true);
      }
    } catch (err) {
      setErrors({
        server:
          err.response?.data?.message ||
          err.message ||
          "Gagal login",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
      <AuthCard
        isLoginMode={isLoginMode}
        setIsLoginMode={setIsLoginMode}
        successMsg={successMsg}
        hideRegister={isAdmin}   // ⬅️ KEY POINT
      >
        {isLoginMode && (
          <LoginForm
            FormData={formData}
            errors={errors}
            onChange={handleInputChange}
            onSubmit={handleSubmit}
            isLoading={isLoading}
            showPassword={showPassword}
            togglePassword={() => setShowPassword(!showPassword)}
          />
        )}

        {!isAdmin && !isLoginMode && (
          <RegisterForm
            formData={formData}
            errors={errors}
            onChange={handleInputChange}
            onSubmit={handleSubmit}
            isLoading={isLoading}
            showPassword={showPassword}
            togglePassword={() => setShowPassword(!showPassword)}
          />
        )}
      </AuthCard>
    </div>
  );
};

export default Login;
