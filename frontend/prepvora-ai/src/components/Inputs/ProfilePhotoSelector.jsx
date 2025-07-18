import React, { useRef, useState } from 'react';
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";

const ProfilePhotoSelector = ({ image, setImage, preview, setPreview }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      const preview = URL.createObjectURL(file);
      setPreview?.(preview);
      setPreviewUrl(preview);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl(null);
    setPreview?.(null);
  };

  const onChooseFile = () => inputRef.current.click();

  return (
    <div className="flex justify-center mb-6 relative">
      {/* Hidden File Input */}
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />

      {/* Profile Icon or Preview */}
      {!image ? (
        <div
          onClick={onChooseFile}
          className="w-20 h-20 flex items-center justify-center bg-slate-800 rounded-full relative cursor-pointer hover:ring-2 hover:ring-violet-500 transition-all"
        >
          <LuUser className="text-4xl text-slate-400" />
          <button
            type="button"
            className="w-8 h-8 flex items-center justify-center bg-violet-600 hover:bg-violet-700 text-white rounded-full absolute -bottom-1 -right-1 shadow-md"
          >
            <LuUpload size={16} />
          </button>
        </div>
      ) : (
        <div className="relative">
          <img
            src={preview || previewUrl}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover border border-violet-500"
          />
          <button
            type="button"
            onClick={handleRemoveImage}
            className="w-8 h-8 flex items-center justify-center bg-rose-600 hover:bg-rose-700 text-white rounded-full absolute -bottom-1 -right-1 shadow-md"
          >
            <LuTrash size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePhotoSelector;
