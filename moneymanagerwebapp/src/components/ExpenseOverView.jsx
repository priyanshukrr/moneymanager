import { useEffect, useState } from "react";
import { prepareIncomeLineChartData } from "../Util/util.js";
import CustomLineChart from "../Util/CustomLineChart.jsx";
import { Plus } from "lucide-react";

const ExpenseOverView = ({ transactions, onAddExpense }) => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const result = prepareIncomeLineChartData(transactions);
        setChartData(result);
    }, [transactions]);

    return (
        <div className="card bg-white p-6 rounded-2xl border border-slate-100/80 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h5 className="text-lg font-bold text-slate-900">Expense Analytics</h5>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                        Visualize your spending patterns and category distribution
                    </p>
                </div>
                <button
                    className="flex items-center justify-center gap-2 px-4 py-2.5 bg-rose-50 text-rose-700 border border-rose-200/60 rounded-xl font-semibold hover:bg-rose-100 hover:border-rose-300 transition-all duration-200 cursor-pointer active:scale-95 shadow-sm shrink-0"
                    onClick={onAddExpense}
                >
                    <Plus className="w-4 h-4" />
                    <span>Add Expense</span>
                </button>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100">
                <CustomLineChart chartData={chartData} />
            </div>
        </div>
    );
};

export default ExpenseOverView;