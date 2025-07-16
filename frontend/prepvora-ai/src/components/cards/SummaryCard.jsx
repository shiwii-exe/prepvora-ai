import React from "react";
import { LuTrash2 } from "react-icons/lu";
import { getInitials } from "../../Utils/helper";

const SummaryCard = ({
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
      className="relative bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 rounded-2xl shadow-md hover:shadow-violet-500/30 transition-all duration-300 p-[1px] group cursor-pointer"
      onClick={onSelect}
    >
      {/* Gradient Border Wrapper */}
      <div className="bg-slate-900 rounded-2xl p-4 space-y-3 relative">

        {/* Header Section with Trash Icon (no overlap) */}
        <div className="flex items-start justify-between">
          {/* Left side: Initials + Info */}
          <div className="flex gap-4 items-start">
            {/* Initials */}
            <div
              className="w-12 h-12 bg-white rounded-md flex items-center justify-center text-lg font-semibold text-black shadow shrink-0"
              style={{ boxShadow: "0 0 12px rgba(255,255,255,0.1)" }}
            >
              {getInitials(role)}
            </div>

            {/* Role + Topics */}
            <div className="flex flex-col">
              <h2 className="text-base font-semibold text-white leading-5">
                {role}
              </h2>
              <p className="text-xs text-violet-300 break-words max-w-[180px]">
                {topicsToFocus}
              </p>
            </div>
          </div>

          {/* Delete Button */}
          <button
            className="opacity-0 group-hover:opacity-100 transition-all p-2 rounded-full bg-rose-600/10 hover:bg-rose-600/20 text-rose-400 hover:text-rose-300 backdrop-blur-md shadow-md hover:shadow-rose-500/30 z-10"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
          >
            <LuTrash2 className="w-4 h-4 transition-transform group-hover:scale-110 drop-shadow-[0_0_6px_rgba(244,63,94,0.5)]" />
          </button>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 text-[11px] font-medium">
          <span className="px-3 py-1 rounded-full border border-violet-600 text-violet-300 bg-violet-600/10">
            {experience} {experience === 1 ? "Year" : "Years"} Exp
          </span>
          <span className="px-3 py-1 rounded-full border border-fuchsia-600 text-fuchsia-300 bg-fuchsia-600/10">
            {questions}
          </span>
          <span className="px-3 py-1 rounded-full border border-indigo-600 text-indigo-300 bg-indigo-600/10">
            Last Updated: {lastUpdated}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-slate-300 line-clamp-2">
          {description}
        </p>
      </div>
    </div>
  );
};

export default SummaryCard;
