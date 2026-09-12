import { AlertTriangle, LoaderCircle } from "lucide-react";
import { useState } from "react";

const DeleteAlert = ({ content, onDelete }) => {
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        setLoading(true);
        try {
            await onDelete();
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex items-start gap-3.5 p-4 bg-rose-50 border border-rose-100 rounded-xl text-rose-800">
                <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                <p className="text-sm font-medium leading-relaxed">
                    {content}
                </p>
            </div>

            <div className="flex justify-end gap-3 pt-2">
                <button
                    onClick={handleDelete}
                    disabled={loading}
                    type="button"
                    className="px-5 py-2.5 bg-rose-600 text-white rounded-xl font-semibold hover:bg-rose-700 active:scale-95 transition-all duration-200 cursor-pointer flex items-center gap-2 shadow-sm shadow-rose-200 disabled:opacity-50"
                >
                    {loading ? (
                        <>
                            <LoaderCircle className="h-4 w-4 animate-spin" />
                            <span>Deleting...</span>
                        </>
                    ) : (
                        <span>Confirm Delete</span>
                    )}
                </button>
            </div>
        </div>
    );
};

export default DeleteAlert;