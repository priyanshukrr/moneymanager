import { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../context/AppContext.jsx";
import { useNavigate } from "react-router-dom";
import { LogOut, Menu, User, X, WalletCards } from "lucide-react";
import { assests } from "../assets/assets.js";
import Sidebar from "./Sidebar.jsx";

const Menubar = ({ activeMenu }) => {
    const [openSideMenu, setOpenSideMenu] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);
    const { user, clearUser } = useContext(AppContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        clearUser();
        setShowDropdown(false);
        navigate("/login");
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };
        if (showDropdown) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showDropdown]);

    return (
        <div className="flex items-center justify-between gap-5 bg-white/90 backdrop-blur-md border-b border-slate-200/80 py-3.5 px-4 sm:px-8 sticky top-0 z-30 shadow-xs">
            {/* Left Side - Mobile Menu Toggle & Brand Logo */}
            <div className="flex items-center gap-4">
                <button
                    onClick={() => setOpenSideMenu(!openSideMenu)}
                    className="block lg:hidden text-slate-700 hover:bg-slate-100 p-2 rounded-xl transition-colors cursor-pointer"
                >
                    {openSideMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>

                <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/dashboard")}>
                    {assests.logo ? (
                        <img src={assests.logo} alt="logo" className="h-9 w-9 object-contain" />
                    ) : (
                        <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-md shadow-indigo-200">
                            <WalletCards className="w-6 h-6" />
                        </div>
                    )}
                    <span className="text-xl font-bold bg-gradient-to-r from-slate-900 via-indigo-950 to-indigo-700 bg-clip-text text-transparent tracking-tight">
                        MoneyManager
                    </span>
                </div>
            </div>

            {/* Right Side - Avatar & Profile Dropdown */}
            <div className="relative" ref={dropdownRef}>
                <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="flex items-center gap-3 p-1.5 rounded-full hover:bg-slate-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 cursor-pointer"
                >
                    {user?.profileImageUrl ? (
                        <img
                            src={user.profileImageUrl}
                            alt="avatar"
                            className="w-9 h-9 rounded-full object-cover ring-2 ring-indigo-500/30"
                        />
                    ) : (
                        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white ring-2 ring-indigo-500/30 shadow-sm">
                            <User className="w-5 h-5" />
                        </div>
                    )}
                    <span className="hidden sm:block text-sm font-semibold text-slate-800 pr-1">
                        {user?.fullName?.split(" ")[0] || "Account"}
                    </span>
                </button>

                {/* Dropdown Menu */}
                {showDropdown && (
                    <div className="absolute right-0 mt-2 w-60 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                        {/* User Header */}
                        <div className="px-4 py-3 border-b border-slate-100">
                            <p className="text-sm font-bold text-slate-900 truncate">
                                {user?.fullName || "User Account"}
                            </p>
                            <p className="text-xs text-slate-500 truncate mt-0.5">{user?.email}</p>
                        </div>

                        {/* Actions */}
                        <div className="pt-1.5 px-1.5">
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-3 w-full px-3 py-2.5 text-sm font-medium text-rose-600 hover:bg-rose-50 rounded-xl transition-colors duration-150 cursor-pointer"
                            >
                                <LogOut className="w-4 h-4 text-rose-500" />
                                <span>Sign Out</span>
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Mobile Side Drawer Overlay */}
            {openSideMenu && (
                <div className="fixed left-0 right-0 bg-white/95 backdrop-blur-lg border-b border-slate-200 lg:hidden z-20 top-[65px] shadow-2xl animate-in slide-in-from-top duration-200">
                    <Sidebar activeMenu={activeMenu} />
                </div>
            )}
        </div>
    );
};

export default Menubar;