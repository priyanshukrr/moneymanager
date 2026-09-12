import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const Input = ({ label, value, onChange, placeholder, type, isSelect, options }) => {
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="mb-4">
            {label && (
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    {label}
                </label>
            )}
            <div className="relative">
                {isSelect ? (
                    <select
                        value={value}
                        onChange={(e) => onChange(e)}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200/90 rounded-xl text-slate-800 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 cursor-pointer appearance-none"
                    >
                        {options?.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                ) : (
                    <input
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200/90 rounded-xl text-slate-800 text-sm font-medium placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200"
                        type={type === "password" ? (showPassword ? "text" : "password") : type}
                        placeholder={placeholder}
                        value={value}
                        onChange={(e) => onChange(e)}
                    />
                )}
                {type === "password" && (
                    <button
                        type="button"
                        onClick={toggleShowPassword}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600 cursor-pointer transition-colors p-1"
                    >
                        {showPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                    </button>
                )}
            </div>
        </div>
    );
};

export default Input;