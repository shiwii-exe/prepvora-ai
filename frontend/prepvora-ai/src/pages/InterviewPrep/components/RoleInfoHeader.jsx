import React from "react";

const RoleInfoHeader = ({
  role,
  topicsToFocus,
  experience,
  questions,
  description,
  lastUpdated,
}) => {
  return (
    <div className="w-full px-4 py-8 bg-yellow-90">
      <div className="relative bg-white/60 backdrop-blur-md rounded-xl border border-white/30 shadow-xl p-6 md:p-10 overflow-hidden w-full md:w-[65%] ml-2 md:ml-8 lg:ml-16">
        
        {/* Softer Inner Glow — neutral & frosted look */}
        <div className="absolute inset-0 z-0 rounded-xl bg-gradient-to-r from-white via-neutral-200 to-white blur-xl opacity-20" />

        {/* Top Content */}
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{role}</h1>
            {topicsToFocus && (
              <p className="text-sm text-gray-600">{topicsToFocus}</p>
            )}
          </div>

          <div className="flex flex-wrap gap-3 mt-2 md:mt-0">
            <span className="text-xs font-semibold bg-black text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-sm">
              🧠 Experience: {experience} {experience === 1 ? "Year" : "Years"}
            </span>
            <span className="text-xs font-semibold bg-black text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-sm">
              ❓ {questions} Questions
            </span>
            <span className="text-xs font-semibold bg-black text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-sm">
              📅 Last Updated: {lastUpdated}
            </span>
          </div>
        </div>

        {/* Optional Description */}
        {description && (
          <p className="relative z-10 mt-6 text-sm text-gray-700 leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default RoleInfoHeader;
