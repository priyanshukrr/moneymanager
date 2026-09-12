import { Download, LoaderCircle, Mail, Wallet } from "lucide-react";
import TransactionInfoCard from "./TransactionInfoCard";
import moment from "moment";
import { useState } from "react";

const IncomeList = ({ transactions, onDelete, onDownload, onEmail }) => {
    const [loadingAction, setLoadingAction] = useState(null);

    const handleAction = async (type, action) => {
        setLoadingAction(type);
        try {
            await action();
        } finally {
            setLoadingAction(null);
        }
    };

    return (
        <div className="card bg-white p-6 rounded-2xl border border-slate-100/80 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                    <h5 className="text-base font-bold text-slate-900">Income Sources</h5>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">Manage and export your income history</p>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        disabled={!!loadingAction}
                        className="card-btn hover:bg-slate-200 cursor-pointer disabled:opacity-50"
                        onClick={() => handleAction("email", onEmail)}
                    >
                        {loadingAction === "email" ? (
                            <LoaderCircle className="w-4 h-4 animate-spin text-indigo-600" />
                        ) : (
                            <Mail className="w-4 h-4 text-emerald-600" />
                        )}
                        <span>Email Report</span>
                    </button>

                    <button
                        disabled={!!loadingAction}
                        className="card-btn hover:bg-slate-200 cursor-pointer disabled:opacity-50"
                        onClick={() => handleAction("download", onDownload)}
                    >
                        {loadingAction === "download" ? (
                            <LoaderCircle className="w-4 h-4 animate-spin text-indigo-600" />
                        ) : (
                            <Download className="w-4 h-4 text-slate-600" />
                        )}
                        <span>Export Excel</span>
                    </button>
                </div>
            </div>

            {(!transactions || transactions.length === 0) ? (
                <div className="py-12 text-center text-slate-400 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
                    <Wallet className="w-10 h-10 mx-auto mb-2 opacity-40 text-slate-400" />
                    <p className="text-sm font-semibold text-slate-600">No income records available yet</p>
                    <p className="text-xs text-slate-400 mt-1">Click "Add Income" above to add your first income source.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {transactions.map((income) => (
                        <TransactionInfoCard
                            key={income.id}
                            title={income.name}
                            icon={income.icon}
                            date={moment(income.date).format("Do MMM YYYY")}
                            amount={income.amount}
                            type="income"
                            onDelete={() => onDelete(income.id)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default IncomeList;