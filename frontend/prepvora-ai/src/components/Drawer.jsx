import React from "react";
import { LuX } from "react-icons/lu";

const Drawer = ({ isOpen, onClose, title, children }) => {
  return (
    <div
      className={`fixed top-16 right-0 z-40 h-[calc(100vh-64px)] w-full sm:w-[40vw] max-w-md transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="relative h-full w-full bg-[#1c1c1e]/80 backdrop-blur-md border-l border-violet-600/30 shadow-xl rounded-l-xl px-5 py-6 overflow-y-auto">

        {/* Gradient Glow Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600/30 via-indigo-500/20 to-fuchsia-500/30 opacity-50 blur-2xl rounded-l-xl pointer-events-none" />

        {/* Header */}
        <div className="relative z-10 flex justify-between items-start mb-4">
          <h5 className="text-lg font-bold text-white">{title}</h5>
          <button
            onClick={onClose}
            className="p-2 rounded-md text-gray-300 hover:bg-violet-700/40 hover:text-white transition"
          >
            <LuX className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="relative z-10 text-sm text-gray-200 space-y-4 prose prose-invert max-w-none">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Drawer;
