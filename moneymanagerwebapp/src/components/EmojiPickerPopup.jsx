import EmojiPicker from "emoji-picker-react";
import { Image, X, Smile } from "lucide-react";
import { useState } from "react";

const EmojiPickerPopup = ({ icon, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleEmojiClick = (emoji) => {
        onSelect(emoji?.imageUrl || emoji?.emoji || "");
        setIsOpen(false);
    };

    return (
        <div className="mb-6">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                Category Icon / Emoji
            </label>
            <div className="flex items-center gap-4">
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center gap-3 px-4 py-2.5 bg-slate-50 border border-slate-200/90 rounded-xl hover:bg-slate-100 transition-all duration-200 cursor-pointer text-slate-700"
                >
                    <div className="w-9 h-9 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-lg text-indigo-600">
                        {icon ? (
                            typeof icon === "string" && (icon.startsWith("http") || icon.startsWith("data:")) ? (
                                <img src={icon} alt="icon" className="w-6 h-6 object-contain" />
                            ) : (
                                <span>{icon}</span>
                            )
                        ) : (
                            <Smile className="w-5 h-5" />
                        )}
                    </div>
                    <span className="text-sm font-semibold">{icon ? "Change Icon" : "Select Icon"}</span>
                </button>
            </div>

            {isOpen && (
                <div className="relative mt-3 z-30 inline-block">
                    <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        className="w-8 h-8 flex items-center justify-center bg-slate-900 text-white rounded-full absolute -top-3 -right-3 z-40 shadow-lg cursor-pointer hover:bg-slate-800 transition-colors"
                    >
                        <X className="w-4 h-4" />
                    </button>
                    <div className="shadow-2xl rounded-2xl overflow-hidden border border-slate-200">
                        <EmojiPicker open={isOpen} onEmojiClick={handleEmojiClick} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default EmojiPickerPopup;