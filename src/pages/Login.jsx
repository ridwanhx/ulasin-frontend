import React, { useState } from "react";
import api from "../api/axios";
import AuthCard from "../components/AuthCard";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

const Login = () => {
    // Inisialisasi State Management
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({ nama: "", email: "", pasword: "", confirmPassword: "" });

    // inisialisasi handler input
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
        if (errors[id]) setErrors(prev => ({ ...prev, [id]: "" }));
    };

    // inisialisasi validation rules
    const validate = () => {
        let newErrors = {};
        if (!formData.email) newErrors.email = "Email wajib diisi";
        if (!formData.password) newErrors.password = "Password wajib diisi";
        if (!isLoginMode) {
            if (!formData.nama) newErrors.nama = "Nama wajib diisi";
            if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Password tidak cocok"
        }
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const valErrors = validate();
        if (Object.keys(valErrors).length > 0) return setErrors(valErrors);

        setIsLoading(true);
        setErrors({});
        try {
            const endpoint = isLoginMode ? '/login' : '/register';
            const response = await api.post(endpoint, formData);

            if (isLoginMode) {
                localStorage.setItem('token', response.data.token);
                setSuccessMsg('Berhasil masuk! Mengalihkan...');
            } else {
                setSuccessMsg("Registrasi berhasil! Silahkan masuk.");
                setTimeout(() => setIsLoginMode(true), 2000)
            }
        } catch (err) {
            setErrors({ server: err.response?.data?.message || "Terjadi kesalahan server" })
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full relative flex items-center justify-center p-4 bg-[#0a0a0a] overflow-hidden">
            {/* Background Poster Grid */}
            <div className="poster-grid opacity-20">
                {[...Array(24)].map((_, i) => <div key={i} className="poster-item h-40 w-full bg-white/5 rounded-lg"></div>)}
            </div>

            <AuthCard isLoginMode={isLoginMode} setIsLoginMode={setIsLoginMode} successMsg={successMsg}>
                {isLoginMode ? (
                    <LoginForm
                        FormData={formData} errors={errors} isLoading={isLoading} onChange={handleInputChange} onSubmit={handleSubmit}
                        showPassword={showPassword} togglePassword={() => setShowPassword(!showPassword)}
                    />
                ) : (
                    <RegisterForm
                        formData={formData} errors={errors} isLoading={isLoading} onChange={handleInputChange} onSubmit={handleSubmit} showPassword={showPassword} togglePassword={() => setShowPassword(!showPassword)}
                    />
                )}
            </AuthCard>
        </div>
    );
};

export default Login;