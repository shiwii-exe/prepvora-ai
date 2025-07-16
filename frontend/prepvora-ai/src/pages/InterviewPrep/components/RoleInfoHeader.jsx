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
    <div className="w-full px-4 md:px-8 lg:px-1 py-6 md:py-8">
      <div className="relative bg-white backdrop-blur-md border border-white/20 shadow-md rounded-xl p-6 md:p-10 transition-all max-w-full lg:max-w-[65%]">
        {/* Soft blur layer */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-100 to-white opacity-20 blur-xl rounded-xl pointer-events-none" />

        {/* Top Info */}
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
              {role}
            </h1>
            {topicsToFocus && (
              <p className="text-sm text-gray-600 mt-1">{topicsToFocus}</p>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-medium bg-gradient-to-r from-indigo-600 to-violet-500 text-white px-4 py-1.5 rounded-full shadow-sm">
              🧠 {experience} {experience === 1 ? "Year" : "Years"}
            </span>
            <span className="text-xs font-medium bg-gradient-to-r from-fuchsia-600 to-pink-500 text-white px-4 py-1.5 rounded-full shadow-sm">
              ❓ {questions} Questions
            </span>
            <span className="text-xs font-medium bg-gradient-to-r from-amber-500 to-orange-400 text-white px-4 py-1.5 rounded-full shadow-sm">
              📅 {lastUpdated}
            </span>
          </div>
        </div>

        {/* Description */}
        {description && (
          <p className="relative z-10 mt-5 text-sm text-gray-700 leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default RoleInfoHeader;
