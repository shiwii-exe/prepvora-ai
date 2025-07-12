import React from "react";
import { LuTrash2 } from "react-icons/lu";
import { getInitials } from "../../Utils/helper";

const SummaryCard = ({
  colors,
  role,
  topicsToFocus,
  experience,
  questions,
  description,
  lastUpdated,
  onSelect,
  onDelete,
}) => {
  return (
    <div
      className="relative bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 cursor-pointer group"
      onClick={onSelect}
    >
      {/* Header Section */}
      <div
        className="rounded-t-xl p-4 flex gap-4 items-start"
        style={{ background: colors.bgcolor }}
      >
        {/* Icon or Initials */}
        <div className="w-12 h-12 bg-white rounded-md flex items-center justify-center text-lg font-semibold text-black shadow">
          {getInitials(role)}
        </div>

        {/* Title & Tags */}
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h2 className="text-[17px] font-medium text-gray-900">{role}</h2>
            <p className="text-xs text-gray-700 whitespace-nowrap">
              {topicsToFocus}
            </p>
          </div>
        </div>

        {/* Delete Button */}
        <button
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 bg-rose-100 text-rose-600 rounded-full p-2 shadow-sm hover:bg-rose-200 transition"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          <LuTrash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Footer Section */}
      <div className="px-4 py-3 space-y-3">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 text-[10px] font-medium text-black">
          <span className="px-3 py-1 border border-gray-900 rounded-full">
            Experience: {experience} {experience === 1 ? "Year" : "Years"}
          </span>
          <span className="px-3 py-1 border border-gray-900 rounded-full">
            {questions} Q&A
          </span>
          <span className="px-3 py-1 border border-gray-900 rounded-full">
            Last Updated: {lastUpdated}
          </span>
        </div>

        {/* Description */}
        <p className="text-[12px] text-gray-600 font-medium line-clamp-2">
          {description}
        </p>
      </div>
    </div>
  );
};

export default SummaryCard;
