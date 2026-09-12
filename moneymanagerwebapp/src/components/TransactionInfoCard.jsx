import { Trash2, TrendingDown, TrendingUp, Receipt } from "lucide-react";
import { addThousandSeparator } from "../Util/util";

const TransactionInfoCard = ({ icon, title, date, amount, type, hideDeleteBtn, onDelete }) => {
    const isIncome = type === "income";

    return (
        <div className="group relative flex items-center gap-4 py-3 px-4 rounded-xl hover:bg-slate-50 border border-slate-100/80 bg-white transition-all duration-200 mb-2 shadow-2xs">
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-lg font-semibold shrink-0 ${
                isIncome ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
            }`}>
                {icon ? (
                    typeof icon === "string" && (icon.startsWith("http") || icon.startsWith("data:")) ? (
                        <img src={icon} alt={title} className="w-6 h-6 object-contain" />
                    ) : (
                        <span>{icon}</span>
                    )
                ) : (
                    <Receipt className="w-5 h-5" />
                )}
            </div>

            <div className="flex-1 flex items-center justify-between min-w-0">
                <div className="truncate pr-2">
                    <p className="text-sm font-bold text-slate-800 truncate">{title}</p>
                    <p className="text-xs text-slate-400 font-medium mt-0.5">{date}</p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                    {!hideDeleteBtn && (
                        <button
                            onClick={onDelete}
                            title="Delete transaction"
                            className="text-slate-300 hover:text-rose-600 opacity-0 group-hover:opacity-100 transition-all duration-200 p-1 rounded-lg hover:bg-rose-50 cursor-pointer"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    )}

                    <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs ${
                        isIncome
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200/50"
                            : "bg-rose-50 text-rose-700 border border-rose-200/50"
                    }`}>
                        <span>
                            {isIncome ? "+" : "-"}₹{addThousandSeparator(amount)}
                        </span>
                        {isIncome ? (
                            <TrendingUp className="w-3.5 h-3.5" />
                        ) : (
                            <TrendingDown className="w-3.5 h-3.5" />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TransactionInfoCard;

// 11:46:53