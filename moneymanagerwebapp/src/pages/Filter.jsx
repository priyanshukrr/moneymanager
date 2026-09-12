import { Search, Filter as FilterIcon, LoaderCircle } from "lucide-react";
import Dashboard from "../components/Dashboard";
import { useUser } from "../hooks/useUse";
import { useState } from "react";
import { API_ENDPOINTS } from "../Util/apiEndpoints.js";
import axiosConfig from "../Util/axiosConfig.jsx";
import { toast } from "react-hot-toast";
import TransactionInfoCard from "../components/TransactionInfoCard.jsx";
import moment from "moment";

const Filter = () => {
    useUser();
    const [type, setType] = useState("income");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [keyword, setKeyword] = useState("");
    const [sortField, setSortField] = useState("date");
    const [sortOrder, setSortOrder] = useState("asc");
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async (e) => {
        if (e) e.preventDefault();
        setLoading(true);
        try {
            const response = await axiosConfig.post(API_ENDPOINTS.APPLY_FILTERS, {
                type,
                startDate,
                endDate,
                keyword,
                sortField,
                sortOrder,
            });
            setTransactions(response.data);
        } catch (error) {
            console.error("Failed to fetch transactions:", error);
            toast.error(error?.response?.data?.message || "Failed to fetch transactions");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dashboard activeMenu="Filters">
            <div className="my-5 mx-auto space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                            Filter Transactions
                        </h2>
                        <p className="text-xs text-slate-500 font-medium mt-0.5">
                            Search, sort, and query your income and expense entries
                        </p>
                    </div>
                </div>

                {/* Filter Control Box */}
                <div className="card bg-white p-6 rounded-2xl border border-slate-100/80 shadow-sm">
                    <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
                        <FilterIcon className="w-5 h-5 text-indigo-600" />
                        <h5 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
                            Search Criteria
                        </h5>
                    </div>

                    <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5" htmlFor="type">
                                Type
                            </label>
                            <select
                                value={type}
                                id="type"
                                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all cursor-pointer"
                                onChange={(e) => setType(e.target.value)}
                            >
                                <option value="income">Income</option>
                                <option value="expense">Expense</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="startdate" className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                                Start Date
                            </label>
                            <input
                                value={startDate}
                                id="startdate"
                                type="date"
                                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all cursor-pointer"
                                onChange={(e) => setStartDate(e.target.value)}
                            />
                        </div>

                        <div>
                            <label htmlFor="enddate" className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                                End Date
                            </label>
                            <input
                                value={endDate}
                                id="enddate"
                                type="date"
                                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all cursor-pointer"
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                        </div>

                        <div>
                            <label htmlFor="sortField" className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                                Sort By
                            </label>
                            <select
                                value={sortField}
                                id="sortField"
                                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all cursor-pointer"
                                onChange={(e) => setSortField(e.target.value)}
                            >
                                <option value="date">Date</option>
                                <option value="amount">Amount</option>
                                <option value="category">Category</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="sortOrder" className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                                Order
                            </label>
                            <select
                                value={sortOrder}
                                id="sortOrder"
                                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all cursor-pointer"
                                onChange={(e) => setSortOrder(e.target.value)}
                            >
                                <option value="asc">Ascending</option>
                                <option value="desc">Descending</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="keyword" className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                                Search Text
                            </label>
                            <div className="flex gap-2">
                                <input
                                    value={keyword}
                                    id="keyword"
                                    type="text"
                                    placeholder="Keywords..."
                                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                                    onChange={(e) => setKeyword(e.target.value)}
                                />
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold flex items-center justify-center transition-all cursor-pointer shadow-md shadow-indigo-200 disabled:opacity-50 shrink-0"
                                >
                                    {loading ? <LoaderCircle className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>

                {/* Filter Results */}
                <div className="card bg-white p-6 rounded-2xl border border-slate-100/80 shadow-sm">
                    <h5 className="text-base font-bold text-slate-900 mb-4">
                        Matching Results ({transactions.length})
                    </h5>

                    {transactions.length === 0 && !loading && (
                        <div className="py-12 text-center text-slate-400 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
                            <Search className="w-10 h-10 mx-auto mb-2 opacity-40 text-slate-400" />
                            <p className="text-sm font-semibold text-slate-600">No matching transactions found</p>
                            <p className="text-xs text-slate-400 mt-1">Select filters above and click search to view entries.</p>
                        </div>
                    )}

                    {loading && (
                        <div className="py-12 text-center text-indigo-600">
                            <LoaderCircle className="w-8 h-8 animate-spin mx-auto mb-2" />
                            <p className="text-sm font-semibold">Filtering transactions...</p>
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {transactions.map((transaction) => (
                            <TransactionInfoCard
                                key={transaction.id}
                                title={transaction.name}
                                icon={transaction.icon}
                                date={moment(transaction.date).format("Do MMM YYYY")}
                                amount={transaction.amount}
                                type={type}
                                hideDeleteBtn
                            />
                        ))}
                    </div>
                </div>
            </div>
        </Dashboard>
    );
};

export default Filter;

// 14:25:34