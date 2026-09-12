import { useEffect, useState } from "react";
import EmojiPickerPopup from "./EmojiPickerPopup.jsx";
import Input from "./input.jsx";
import { LoaderCircle } from "lucide-react";

const AddIncomeForm = ({ onAddIncome, categories }) => {
    const todayDate = new Date().toISOString().split("T")[0];
    const [income, setIncome] = useState({
        name: "",
        amount: "",
        date: todayDate,
        icon: "",
        categoryId: "",
    });

    const [loading, setLoading] = useState(false);

    const categoryOptions = categories?.map((category) => ({
        value: category.id,
        label: category.name,
    })) || [];

    const handleChange = (key, value) => {
        setIncome({ ...income, [key]: value });
    };

    const handleAddIncome = async () => {
        setLoading(true);
        try {
            await onAddIncome(income);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (categories && categories.length > 0 && !income.categoryId) {
            setIncome((prev) => ({ ...prev, categoryId: categories[0].id }));
        }
    }, [categories, income.categoryId]);

    return (
        <div className="space-y-4">
            <EmojiPickerPopup
                icon={income.icon}
                onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
            />
            <Input
                value={income.name}
                onChange={({ target }) => handleChange("name", target.value)}
                label="Income Source"
                placeholder="e.g., Monthly Salary, Freelance Project, Dividend"
                type="text"
            />

            <Input
                label="Category"
                value={income.categoryId}
                onChange={({ target }) => handleChange("categoryId", target.value)}
                isSelect={true}
                options={categoryOptions}
            />

            <Input
                value={income.amount}
                onChange={({ target }) => handleChange("amount", target.value)}
                label="Amount (₹)"
                placeholder="e.g., 5000.00"
                type="number"
            />

            <Input
                value={income.date}
                onChange={({ target }) => handleChange("date", target.value)}
                label="Transaction Date"
                type="date"
            />

            <div className="flex justify-end pt-4 border-t border-slate-100">
                <button
                    onClick={handleAddIncome}
                    disabled={loading}
                    className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl active:scale-95 transition-all duration-200 cursor-pointer flex items-center gap-2 shadow-md shadow-emerald-200 disabled:opacity-50"
                >
                    {loading ? (
                        <>
                            <LoaderCircle className="w-4 h-4 animate-spin" />
                            <span>Adding Income...</span>
                        </>
                    ) : (
                        <span>Add Income</span>
                    )}
                </button>
            </div>
        </div>
    );
};

export default AddIncomeForm;