import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assests } from "../assets/assets";
import Input from "../components/input";
import { validateEmail } from "../Util/validation";
import axiosConfig from "../Util/axiosConfig";
import { API_ENDPOINTS } from "../Util/apiEndpoints";
import toast from "react-hot-toast";
import { LoaderCircle, WalletCards, ShieldCheck } from "lucide-react";
import ProfilePhotoSelector from "../components/ProfilePhotoSelector";
import { uploadProfileImage } from "../Util/uploadProfileImage";

const Signup = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [profilePhoto, setProfilePhoto] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        let profileImageUrl = "";
        setError("");

        if (!fullName.trim()) {
            setError("Please enter your full name");
            setIsLoading(false);
            return;
        }
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
            if (profilePhoto) {
                const imageUrl = await uploadProfileImage(profilePhoto);
                profileImageUrl = imageUrl || "";
            }
            const response = await axiosConfig.post(API_ENDPOINTS.REGISTER, {
                fullName,
                email,
                password,
                profileImageUrl,
            });
            if (response.status === 201) {
                toast.success("Account created successfully! Please log in.");
                navigate("/login");
            }
        } catch (err) {
            console.error("Signup error:", err);
            setError(err.response?.data?.message || err.message || "Failed to create account");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full relative flex items-center justify-center py-10 px-4 overflow-x-hidden bg-slate-950">
            {/* Background Image & Overlay */}
            {assests.login_bg && (
                <img
                    src={assests.login_bg}
                    alt="Background"
                    className="absolute inset-0 w-full h-full object-cover blur-md opacity-30 scale-105"
                />
            )}
            <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-900/90 to-indigo-950/80"></div>

            {/* Glass Card */}
            <div className="relative z-10 w-full max-w-lg my-auto">
                <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/40 p-8">
                    {/* Header */}
                    <div className="flex flex-col items-center mb-6">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-xl shadow-indigo-500/20 mb-3">
                            <WalletCards className="w-8 h-8" />
                        </div>
                        <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                            Create Account
                        </h3>
                        <p className="text-xs font-semibold text-slate-500 mt-1">
                            Start tracking spendings & budget goals today
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <ProfilePhotoSelector image={profilePhoto} setImage={setProfilePhoto} />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                label="Full Name"
                                placeholder="John Doe"
                                type="text"
                            />

                            <Input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                label="Email Address"
                                placeholder="name@example.com"
                                type="text"
                            />
                        </div>

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
                                    <span>Creating Account...</span>
                                </>
                            ) : (
                                <span>Sign Up Free</span>
                            )}
                        </button>

                        <div className="pt-4 border-t border-slate-100 text-center">
                            <p className="text-xs font-medium text-slate-600">
                                Already have an Account?{" "}
                                <Link
                                    to="/login"
                                    className="font-bold text-indigo-600 hover:text-indigo-700 underline transition-colors"
                                >
                                    Log In
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>

                <div className="flex items-center justify-center gap-1.5 text-slate-400 text-xs font-medium mt-6">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Your privacy and data are completely protected</span>
                </div>
            </div>
        </div>
    );
};

export default Signup;

// 7:29:59