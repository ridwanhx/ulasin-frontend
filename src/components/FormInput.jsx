import React from "react";

const FormInput = ({ label, id, type, value, onChange, placeholder, error, showPassword, togglePassword }) => {
    const isPassword = type === 'password' || (type === 'text' && id.toLowerCase().includes('password'));

    return (
        <div className="fade-in">
            <label className="block text-sm font-medium text-gray-300 mb-2">
                {label}
            </label>
            <div className="relative">
                <input
                    type={isPassword && showPassword ? 'text' : type}
                    id={id}
                    value={value}
                    onChange={onChange}
                    className={`input-field w-full px-4 py-3.5 rounded-xl text-white outline-none transition-all ${error ? 'error-shake border-red-500' : 'focus:border-[#e50914]/50'}`}
                    placeholder={placeholder}
                />
                {isPassword && (
                    <button type="button" onClick={togglePassword} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors">
                        {showPassword ? "🙈" : "👁️"}
                    </button>
                )}
            </div>
            {error && <p className="text-red-500 text-xs mt-2">{ error }</p> }
        </div>
    );
}

export default FormInput;