import React from "react";

const Modal = ({ children, isOpen, onClose, hideHeader, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black/60 backdrop-blur-sm px-4">
      {/* Modal Content */}
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-700 rounded-xl shadow-xl p-7 text-slate-200">
        {/* Close Icon */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white"
        >
          <svg
            className="w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
        </button>

        {/* Optional Title */}
        {!hideHeader && title && (
          <h3 className="text-lg font-semibold text-white mb-5">{title}</h3>
        )}

        {/* Modal Body */}
        <div className="overflow-y-auto max-h-[80vh] custom-scrollbar">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
