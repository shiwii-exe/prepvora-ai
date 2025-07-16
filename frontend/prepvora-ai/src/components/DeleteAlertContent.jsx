import React from "react";

const DeleteAlertContent = ({ content, onDelete }) => {
  return (
    <div className="space-y-4 p-4">
      <p className="text-sm text-gray-400">
        {typeof content === "string" ? content : "Invalid content"}
      </p>
      <div className="flex justify-end gap-3">
        <button
          className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteAlertContent;