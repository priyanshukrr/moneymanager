import { ArrowRight, History } from "lucide-react";
import TransactionInfoCard from "./TransactionInfoCard.jsx";
import moment from "moment";

const RecentTransactions = ({ transactions, onMore }) => {
    return (
        <div className="card bg-white p-6 rounded-2xl border border-slate-100/80 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h4 className="text-base font-bold text-slate-900">
                        Recent Activity
                    </h4>
                    <p className="text-xs text-slate-500 font-medium">Latest account transactions</p>
                </div>
                <button className="card-btn" onClick={onMore}>
                    <span>View All</span>
                    <ArrowRight className="w-4 h-4" />
                </button>
            </div>

            <div className="mt-2 space-y-1">
                {(!transactions || transactions.length === 0) ? (
                    <div className="py-8 text-center text-slate-400">
                        <History className="w-8 h-8 mx-auto mb-2 opacity-50" />
                        <p className="text-sm font-medium">No recent transactions recorded</p>
                    </div>
                ) : (
                    transactions.slice(0, 5).map((item) => (
                        <TransactionInfoCard
                            key={item.id}
                            title={item.name}
                            icon={item.icon}
                            date={moment(item.date).format("Do MMM YYYY")}
                            amount={item.amount}
                            type={item.type}
                            hideDeleteBtn
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default RecentTransactions;