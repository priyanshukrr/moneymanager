import { useEffect, useState } from "react";
import EmojiPickerPopup from "./EmojiPickerPopup.jsx";
import Input from "./input.jsx";
import { LoaderCircle } from "lucide-react";

const AddExpenseForm = ({ onAddExpense, categories }) => {
    const todayDate = new Date().toISOString().split("T")[0];
    const [expense, setExpense] = useState({
        name: "",
        amount: "",
        date: todayDate,
        icon: "",
        categoryId: "",
    });
    const [loading, setLoading] = useState(false);

    const categoryOptions = categories?.map((cat) => ({ value: cat.id, label: cat.name })) || [];

    const handleChange = (key, value) => setExpense({ ...expense, [key]: value });

    const handleSubmit = async () => {
        setLoading(true);
        try {
            await onAddExpense(expense);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (categories && categories.length > 0 && !expense.categoryId) {
            setExpense((prev) => ({ ...prev, categoryId: categories[0].id }));
        }
    }, [categories]);

    return (
        <div className="space-y-4">
            <EmojiPickerPopup
                icon={expense.icon}
                onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
            />
            <Input
                value={expense.name}
                onChange={({ target }) => handleChange("name", target.value)}
                label="Expense Title"
                placeholder="e.g., House Rent, Groceries, Utility Bill"
                type="text"
            />
            <Input
                label="Category"
                value={expense.categoryId}
                onChange={({ target }) => handleChange("categoryId", target.value)}
                isSelect={true}
                options={categoryOptions}
            />
            <Input
                value={expense.amount}
                onChange={({ target }) => handleChange("amount", target.value)}
                label="Amount (₹)"
                placeholder="0.00"
                type="number"
            />
            <Input
                value={expense.date}
                onChange={({ target }) => handleChange("date", target.value)}
                label="Transaction Date"
                type="date"
            />

            <div className="flex justify-end pt-4 border-t border-slate-100">
                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl active:scale-95 transition-all duration-200 cursor-pointer flex items-center gap-2 shadow-md shadow-rose-200 disabled:opacity-50"
                >
                    {loading ? (
                        <>
                            <LoaderCircle className="w-4 h-4 animate-spin" />
                            <span>Adding Expense...</span>
                        </>
                    ) : (
                        <span>Add Expense</span>
                    )}
                </button>
            </div>
        </div>
    );
};

export default AddExpenseForm;