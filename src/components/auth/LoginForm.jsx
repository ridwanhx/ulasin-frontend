import React from "react";
import FormInput from "./FormInput";

const LoginForm = ({
  FormData,
  errors,
  onChange,
  onSubmit,
  isLoading,
  showPassword,
  togglePassword,
}) => (
  <form onSubmit={onSubmit} className="space-y-5">
    <FormInput
      label="Email"
      id="email"
      type="email"
      value={FormData.email}
      onChange={onChange}
      placeholder="nama@email.com"
      errors={errors.email}
    />
    <FormInput
      label="Password"
      id="password"
      type="password"
      value={FormData.password}
      onChange={onChange}
      placeholder="Masukkan password"
      errors={errors.password}
      showPassword={showPassword}
      togglePassword={togglePassword}
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
      {isLoading ? <div className="spinn"></div> : "Masuk"}
    </button>
  </form>
);

export default LoginForm;
