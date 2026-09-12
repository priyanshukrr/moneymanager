import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assests } from "../assets/assets";
import Input from "../components/input";
import { validateEmail } from "../Util/validation";
import axiosConfig from "../Util/axiosConfig";
import { API_ENDPOINTS } from "../Util/apiEndpoints";
import { AppContext } from "../context/AppContext";
import { LoaderCircle, WalletCards, ShieldCheck } from "lucide-react";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { setUser } = useContext(AppContext);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        if (!validateEmail(email)) {
            setError("Please enter a valid email address");
            setIsLoading(false);
            return;
        }
        if (!password.trim()) {
            setError("Please enter your password");
            setIsLoading(false);
            return;
        }

        setError("");

        try {
            const response = await axiosConfig.post(API_ENDPOINTS.LOGIN, {
                email,
                password,
            });
            const { token, user } = response.data;
            if (token) {
                localStorage.setItem("token", token);
                setUser(user);
                navigate("/dashboard");
            }
        } catch (err) {
            if (err.response && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                console.error("Login failed", err);
                setError("Unable to connecting to server. Please check your network.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="h-screen w-full relative flex items-center justify-center overflow-hidden bg-slate-950">
            {/* Background image & gradient overlay */}
            {assests.login_bg && (
                <img
                    src={assests.login_bg}
                    alt="Background"
                    className="absolute inset-0 w-full h-full object-cover blur-md opacity-30 scale-105"
                />
            )}
            <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-900/90 to-indigo-950/80"></div>

            {/* Login Glass Card */}
            <div className="relative z-10 w-full max-w-md px-6 my-auto">
                <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/40 p-8">
                    {/* Brand Header */}
                    <div className="flex flex-col items-center mb-6">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-xl shadow-indigo-500/20 mb-3">
                            <WalletCards className="w-8 h-8" />
                        </div>
                        <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                            Welcome Back
                        </h3>
                        <p className="text-xs font-semibold text-slate-500 mt-1">
                            Sign in to manage your money & track spendings
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            label="Email Address"
                            placeholder="name@example.com"
                            type="text"
                        />

                        <Input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            label="Password"
                            placeholder="••••••••"
                            type="password"
                        />

                        {error && (
                            <div className="bg-rose-50 border border-rose-200/80 p-3 rounded-xl text-rose-700 text-xs font-semibold text-center animate-in fade-in">
                                {error}
                            </div>
                        )}

                        <button
                            disabled={isLoading}
                            className="btn-primary py-3.5 text-base font-bold uppercase tracking-wider cursor-pointer shadow-lg shadow-indigo-500/25 disabled:opacity-50 mt-2"
                            type="submit"
                        >
                            {isLoading ? (
                                <>
                                    <LoaderCircle className="animate-spin w-5 h-5" />
                                    <span>Signing in...</span>
                                </>
                            ) : (
                                <span>Sign In</span>
                            )}
                        </button>

                        <div className="pt-4 border-t border-slate-100 text-center">
                            <p className="text-xs font-medium text-slate-600">
                                Don't have an account?{" "}
                                <Link
                                    to="/signup"
                                    className="font-bold text-indigo-600 hover:text-indigo-700 underline transition-colors"
                                >
                                    Create Account
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>

                {/* Footer security note */}
                <div className="flex items-center justify-center gap-1.5 text-slate-400 text-xs font-medium mt-6">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>256-bit SSL Encrypted Finance Portal</span>
                </div>
            </div>
        </div>
    );
};

export default Login;


// 7:40:20