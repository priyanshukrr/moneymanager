const InfoCard = ({ icon, label, value, color }) => {
    // Map existing plain color classes to rich gradient backgrounds
    const getGradientStyle = (colorClass) => {
        if (colorClass?.includes("purple")) {
            return "bg-gradient-to-tr from-indigo-600 to-violet-600 text-white shadow-indigo-200";
        }
        if (colorClass?.includes("green")) {
            return "bg-gradient-to-tr from-emerald-500 to-teal-600 text-white shadow-emerald-200";
        }
        if (colorClass?.includes("red")) {
            return "bg-gradient-to-tr from-rose-500 to-pink-600 text-white shadow-rose-200";
        }
        return "bg-gradient-to-tr from-slate-700 to-slate-900 text-white shadow-slate-200";
    };

    return (
        <div className="flex items-center gap-5 bg-white p-6 rounded-2xl shadow-sm border border-slate-100/80 hover:shadow-md transition-all duration-300 group">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg transition-transform duration-300 group-hover:scale-105 ${getGradientStyle(color)}`}>
                {icon}
            </div>
            <div className="flex flex-col">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    {label}
                </span>
                <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-sm font-semibold text-slate-500">₹</span>
                    <span className="text-2xl font-bold text-slate-900 tracking-tight">
                        {value}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default InfoCard;