import { useEffect, useState } from "react";
import Input from "./input.jsx";
import EmojiPickerPopup from "./EmojiPickerPopup.jsx";
import { LoaderCircle } from "lucide-react";

const AddCategoryForm = ({ onAddCategory, initialCategoryData, isEditing }) => {
    const [category, setCategory] = useState({
        name: "",
        type: "income",
        icon: "",
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isEditing && initialCategoryData) {
            setCategory(initialCategoryData);
        } else {
            setCategory({ name: "", type: "income", icon: "" });
        }
    }, [isEditing, initialCategoryData]);

    const categoryTypesOptions = [
        { value: "income", label: "Income" },
        { value: "expense", label: "Expense" },
    ];

    const handleChange = (key, value) => {
        setCategory({ ...category, [key]: value });
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            await onAddCategory(category);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-4">
            <EmojiPickerPopup
                icon={category.icon}
                onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
            />
            <Input
                value={category.name}
                onChange={({ target }) => handleChange("name", target.value)}
                label="Category Name"
                placeholder="e.g., Salary, Freelance, Groceries"
                type="text"
            />
            <Input
                label="Category Type"
                value={category.type}
                onChange={({ target }) => handleChange("type", target.value)}
                isSelect={true}
                options={categoryTypesOptions}
            />

            <div className="flex justify-end pt-4 border-t border-slate-100">
                <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={loading}
                    className="btn-primary w-auto px-6 cursor-pointer disabled:opacity-50"
                >
                    {loading ? (
                        <>
                            <LoaderCircle className="w-4 h-4 animate-spin" />
                            <span>{isEditing ? "Saving Changes..." : "Creating Category..."}</span>
                        </>
                    ) : (
                        <span>{isEditing ? "Update Category" : "Save Category"}</span>
                    )}
                </button>
            </div>
        </div>
    );
};

export default AddCategoryForm;