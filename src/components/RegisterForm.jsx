import React from "react";
import FormInput from "./FormInput";

const RegisterForm = ({
  formData,
  errors,
  onChange,
  onSubmit,
  isLoading,
  showPassword,
  togglePassword,
}) => (
  <form onSubmit={onSubmit} className="space-y-5">
    <FormInput
      label="Nama Lengkap"
      id="nama"
      type="text"
      value={formData.nama}
      onChange={onChange}
      placeholder="Masukkan Nama"
      errors={errors.nama}
    />
    <FormInput
      label="Email"
      id="email"
      type="email"
      value={formData.email}
      onChange={onChange}
      placeholder="nama@email.com"
      error={errors.email}
    />
    <FormInput
      label="Password"
      id="password"
      type="password"
      value={formData.password}
      onChange={onChange}
      togglePassword={togglePassword}
      showPassword={showPassword}
      placeholder="Minimal 8 karakter"
      error={errors.password}
    />
    <FormInput
      label="Konfirmasi Password"
      id="confirmPassword"
      type="password"
      value={formData.confirmPassword}
      onChange={onChange}
      togglePassword={togglePassword}
      showPassword={showPassword}
      placeholder="Ulangi password"
      error={errors.confirmPassword}
    />

    {errors.server && (
      <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/50 text-red-500 text-sm text-center">
        {errors.server}
      </div>
    )}

    <button
      type="submit"
      disabled={isLoading}
      className="btn-primary w-full py-4 rounded-xl font-semibold text-white mt-4 flex justify-center"
    >
      {isLoading ? <div className="spinner"></div> : "Daftar Sekarang"}
    </button>
  </form>
);

export default RegisterForm;
