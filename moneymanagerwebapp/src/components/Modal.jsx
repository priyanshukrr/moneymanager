import { X } from "lucide-react";

const Modal = ({ isOpen, onClose, children, title }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex justify-center items-center w-full h-full p-4 overflow-y-auto bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="relative w-full max-w-xl max-h-[90vh] my-auto">
                <div className="relative bg-white rounded-2xl shadow-2xl border border-slate-100/80 overflow-hidden animate-in zoom-in-95 duration-200">
                    {/* Modal Header */}
                    <div className="flex items-center justify-between p-5 md:px-6 border-b border-slate-100">
                        <h3 className="text-lg font-bold text-slate-900">
                            {title}
                        </h3>

                        <button
                            onClick={onClose}
                            type="button"
                            className="text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl p-2 transition-colors duration-200 cursor-pointer focus:outline-none"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Modal Body */}
                    <div className="p-5 md:p-6 text-slate-700 max-h-[calc(90vh-80px)] overflow-y-auto">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;