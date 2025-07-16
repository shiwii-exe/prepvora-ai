import React, { useEffect, useRef, useState } from "react";
import {
  LuChevronDown,
  LuPin,
  LuPinOff,
  LuSparkles,
} from "react-icons/lu";
import AIResponsePreview from "../../pages/InterviewPrep/components/AIResponsePreview";

const QuestionCard = ({
  question,
  answer,
  onLearnMore,
  isPinned,
  onTogglePin,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [height, setHeight] = useState(0);
  const contentRef = useRef(null);

  useEffect(() => {
    if (isExpanded && contentRef.current) {
      setTimeout(() => {
        setHeight(contentRef.current.scrollHeight + 20);
      }, 0);
    } else {
      setHeight(0);
    }
  }, [isExpanded]);

  const toggleExpand = () => setIsExpanded((prev) => !prev);

  return (
     <div className="bg-white rounded-lg mb-4 overflow-hidden py-4 px-5 shadow-m border border-gray-200 group">
      {/* Top Section */}
      <div className="flex items-start justify-between">
        {/* Question Label + Text */}
        <div className="flex items-start gap-3.5">
          <span className="text-xs md:text-[15px] font-semibold text-gray-400 leading-[18px]">
            Q
          </span>
          <h3
            onClick={toggleExpand}
            className="text-xs md:text-[14px] font-medium text-gray-800 mr-0 md:mr-20 cursor-pointer"
          >
            {question}
          </h3>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center ml-4">
          <div className="flex gap-2">
            <button
              onClick={onTogglePin}
              className="flex items-center gap-1 text-xs text-indigo-800 font-medium bg-indigo-50 px-3 py-1 rounded border border-indigo-50 hover:border-indigo-200 transition"
            >
              {isPinned ? <LuPinOff size={14} /> : <LuPin size={14} />}
              <span className="hidden md:inline">{isPinned ? "Unpin" : "Pin"}</span>
            </button>

            <button
              onClick={() => {
                setIsExpanded(true);
                onLearnMore?.();
              }}
              className="flex items-center gap-1 text-xs text-cyan-800 font-medium bg-cyan-50 px-3 py-1 rounded border border-cyan-50 hover:border-cyan-200 transition"
            >
              <LuSparkles size={14} />
              <span className="hidden md:inline">Learn More</span>
            </button>
          </div>

          {/* Expand/Collapse Arrow */}
          <button
            onClick={toggleExpand}
            className="ml-2 text-gray-500 hover:text-gray-700 transition"
          >
            <LuChevronDown
              size={20}
              className={`transform transition-transform duration-300 ${
                isExpanded ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Expandable Answer Section */}
      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: `${height}px` }}
      >
        <div
          ref={contentRef}
          className="mt-4 text-gray-700 bg-gray-50 px-5 py-3 rounded-lg max-h-[400px] overflow-auto"
        >
          <AIResponsePreview content={answer} />
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
