import { Layers2, Pencil, Folder } from "lucide-react";

const CategoryList = ({ categories, onEditCategory }) => {
    return (
        <div className="card bg-white p-6 rounded-2xl border border-slate-100/80 shadow-sm">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h4 className="text-base font-bold text-slate-900">All Categories</h4>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">Manage income and expense categories</p>
                </div>
            </div>

            {(!categories || categories.length === 0) ? (
                <div className="py-12 text-center text-slate-400 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
                    <Folder className="w-10 h-10 mx-auto mb-2 opacity-40 text-slate-400" />
                    <p className="text-sm font-semibold text-slate-600">No categories added yet</p>
                    <p className="text-xs text-slate-400 mt-1">Create categories to classify your transactions.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {categories.map((category) => {
                        const isIncome = category.type === "income";
                        return (
                            <div
                                key={category.id}
                                className="group relative flex items-center justify-between gap-4 p-4 rounded-xl border border-slate-100/90 bg-white hover:bg-slate-50/80 hover:border-slate-200 transition-all duration-200 shadow-2xs"
                            >
                                <div className="flex items-center gap-3 min-w-0">
                                    <div
                                        className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0 ${
                                            isIncome ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
                                        }`}
                                    >
                                        {category.icon ? (
                                            typeof category.icon === "string" &&
                                            (category.icon.startsWith("http") || category.icon.startsWith("data:")) ? (
                                                <img src={category.icon} alt={category.name} className="w-6 h-6 object-contain" />
                                            ) : (
                                                <span>{category.icon}</span>
                                            )
                                        ) : (
                                            <Layers2 className="w-5 h-5" />
                                        )}
                                    </div>

                                    <div className="min-w-0">
                                        <p className="text-sm font-bold text-slate-800 truncate">{category.name}</p>
                                        <span
                                            className={`inline-block text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md mt-0.5 ${
                                                isIncome
                                                    ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                                                    : "bg-rose-50 text-rose-700 border border-rose-100"
                                            }`}
                                        >
                                            {category.type}
                                        </span>
                                    </div>
                                </div>

                                <button
                                    onClick={() => onEditCategory(category)}
                                    title="Edit Category"
                                    className="text-slate-400 hover:text-indigo-600 p-2 rounded-lg hover:bg-indigo-50 opacity-0 group-hover:opacity-100 transition-all duration-200 cursor-pointer shrink-0"
                                >
                                    <Pencil className="w-4 h-4" />
                                </button>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default CategoryList;

// 10:10:15