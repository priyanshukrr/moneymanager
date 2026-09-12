import { addThousandSeparator } from "../Util/util";
import CustomPieChart from "./CustomPieChart";

const FinanceOverView = ({ totalBalance, totalIncome, totalExpense }) => {
    const COLORS = ['#6366F1', '#F43F5E', '#10B981'];
    const balanceData = [
        { name: "Total Balance", amount: Math.max(0, totalBalance) },
        { name: "Total Expenses", amount: Math.max(0, totalExpense) },
        { name: "Total Income", amount: Math.max(0, totalIncome) },
    ];

    return (
        <div className="card bg-white p-6 rounded-2xl border border-slate-100/80 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
                <div>
                    <h5 className="text-base font-bold text-slate-900">Financial Overview</h5>
                    <p className="text-xs text-slate-500 font-medium">Income vs Expense distribution</p>
                </div>
            </div>

            <CustomPieChart
                data={balanceData}
                label="Balance"
                totalAmount={`₹${addThousandSeparator(totalBalance)}`}
                colors={COLORS}
                showTextAnchor={false}
            />
        </div>
    );
};

export default FinanceOverView;