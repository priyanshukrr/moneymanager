import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { User, Sparkles } from "lucide-react";
import { SIDE_BAR_DATA } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ activeMenu }) => {
    const { user } = useContext(AppContext);
    const navigate = useNavigate();

    return (
        <div className="w-64 min-w-64 h-[calc(100vh-73px)] bg-white border-r border-slate-200/80 p-4 sticky top-[73px] z-20 flex flex-col justify-between">
            <div>
                {/* User Profile Card */}
                <div className="flex flex-col items-center justify-center p-4 mb-6 bg-slate-50/80 rounded-2xl border border-slate-100">
                    <div className="relative mb-2">
                        {user?.profileImageUrl ? (
                            <img
                                src={user?.profileImageUrl}
                                alt="profile"
                                className="w-16 h-16 rounded-full object-cover ring-4 ring-indigo-50 shadow-md"
                            />
                        ) : (
                            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white ring-4 ring-indigo-50 shadow-md">
                                <User className="w-8 h-8" />
                            </div>
                        )}
                        <span className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"></span>
                    </div>
                    <h5 className="text-slate-900 font-bold text-base leading-tight truncate max-w-full">
                        {user?.fullName || "User"}
                    </h5>
                    <p className="text-xs text-slate-500 font-medium truncate max-w-full mt-0.5">
                        {user?.email || "Account Active"}
                    </p>
                </div>

                {/* Navigation Items */}
                <div className="space-y-1">
                    {SIDE_BAR_DATA.map((item, index) => {
                        const isActive = activeMenu === item.label;
                        return (
                            <button
                                onClick={() => navigate(item.path)}
                                key={`menu_${index}`}
                                className={`cursor-pointer w-full flex items-center gap-3.5 text-sm font-semibold py-3 px-4 rounded-xl transition-all duration-200 ${
                                    isActive
                                        ? "text-indigo-600 bg-indigo-50/80 shadow-sm border border-indigo-100/80"
                                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                                }`}
                            >
                                <item.icon
                                    className={`w-5 h-5 transition-transform duration-200 ${
                                        isActive ? "text-indigo-600 scale-110" : "text-slate-400 group-hover:text-slate-600"
                                    }`}
                                />
                                <span className="flex-1 text-left">{item.label}</span>
                                {isActive && (
                                    <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Bottom Premium Card Accent */}
            <div className="p-4 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl text-white shadow-lg shadow-indigo-500/20">
                <div className="flex items-center gap-2 mb-1.5">
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-200">Pro Features</span>
                </div>
                <p className="text-xs text-indigo-100 font-normal leading-relaxed">
                    Track income, expenses & categories with real-time visual insights.
                </p>
            </div>
        </div>
    );
};

export default Sidebar;