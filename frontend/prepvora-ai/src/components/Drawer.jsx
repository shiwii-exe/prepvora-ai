import React from "react";
import { LuX } from "react-icons/lu";

const Drawer = ({ isOpen, onClose, title, children }) => {
  return (
    <div
      className={`fixed top-16 right-0 z-20 h-[calc(100vh-64px)] w-[40vw] max-w-md transform bg-[#FFFBEA] shadow-xl border-l border-yellow-300 p-4 overflow-y-auto transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
      tabIndex="-1"
      aria-labelledby="drawer-right-label"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h5 id="drawer-right-label" className="text-base font-semibold text-gray-900">
          {title}
        </h5>
        <button
          type="button"
          onClick={onClose}
          className="text-gray-700 hover:bg-yellow-200 hover:text-black rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
        >
          <LuX className="text-lg" />
        </button>
      </div>

      {/* Content */}
      <div className="text-sm mx-1 mb-6 text-gray-800">{children}</div>
    </div>
  );
};

export default Drawer;
