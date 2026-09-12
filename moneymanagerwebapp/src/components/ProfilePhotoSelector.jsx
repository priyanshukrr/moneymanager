import { Trash, Upload, User } from "lucide-react";
import { useRef, useState } from "react";

const ProfilePhotoSelector = ({ image, setImage }) => {
    const inputRef = useRef(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            const preview = URL.createObjectURL(file);
            setPreviewUrl(preview);
        }
    };

    const handleRemoveImage = (e) => {
        e.preventDefault();
        setImage(null);
        setPreviewUrl(null);
    };

    const onChooseFile = (e) => {
        e.preventDefault();
        inputRef.current?.click();
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <input type="file" accept="image/*" ref={inputRef} onChange={handleImageChange} className="hidden" />
            
            {!image ? (
                <div className="relative group cursor-pointer" onClick={onChooseFile}>
                    <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-indigo-50 to-purple-50 border-2 border-dashed border-indigo-300 flex items-center justify-center text-indigo-500 shadow-sm transition-transform duration-200 group-hover:scale-105">
                        <User className="w-10 h-10 text-indigo-400" />
                    </div>
                    <button
                        onClick={onChooseFile}
                        type="button"
                        className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center absolute bottom-0 right-0 shadow-md hover:bg-indigo-700 transition-colors"
                    >
                        <Upload className="w-4 h-4" />
                    </button>
                </div>
            ) : (
                <div className="relative group">
                    <img
                        src={previewUrl}
                        alt="profile photo"
                        className="w-24 h-24 rounded-full object-cover ring-4 ring-indigo-100 shadow-md"
                    />
                    <button
                        onClick={handleRemoveImage}
                        type="button"
                        className="w-8 h-8 rounded-full bg-rose-600 text-white flex items-center justify-center absolute bottom-0 right-0 shadow-md hover:bg-rose-700 transition-colors cursor-pointer"
                    >
                        <Trash className="w-4 h-4" />
                    </button>
                </div>
            )}
            <span className="text-xs font-semibold text-slate-500 mt-2">
                {image ? "Click trash icon to remove" : "Upload Profile Avatar"}
            </span>
        </div>
    );
};

export default ProfilePhotoSelector;

// 8:06:21