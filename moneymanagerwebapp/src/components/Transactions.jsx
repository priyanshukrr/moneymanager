import { ArrowRight, Inbox } from "lucide-react";
import TransactionInfoCard from "./TransactionInfoCard";
import moment from "moment";

const Transactions = ({ transactions, onMore, type, title }) => {
    return (
        <div className="card bg-white p-6 rounded-2xl border border-slate-100/80 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h5 className="text-base font-bold text-slate-900">
                        {title}
                    </h5>
                    <p className="text-xs text-slate-500 font-medium">Recent {type} entries</p>
                </div>
                <button className="card-btn" onClick={onMore}>
                    <span>More</span>
                    <ArrowRight className="w-4 h-4" />
                </button>
            </div>

            <div className="mt-2 space-y-1">
                {(!transactions || transactions.length === 0) ? (
                    <div className="py-8 text-center text-slate-400">
                        <Inbox className="w-8 h-8 mx-auto mb-2 opacity-50" />
                        <p className="text-sm font-medium">No {type} records available</p>
                    </div>
                ) : (
                    transactions.slice(0, 5).map((item) => (
                        <TransactionInfoCard
                            key={item.id}
                            title={item.name}
                            icon={item.icon}
                            date={moment(item.date).format("Do MMM YYYY")}
                            amount={item.amount}
                            type={type}
                            hideDeleteBtn
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default Transactions;