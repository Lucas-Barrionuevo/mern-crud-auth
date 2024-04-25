import React from "react";

function FormSkeleton() {
  return (
    <form>
      <div className="w-full bg-gray-700 text-white px-4 py-2 rounded-md my-2 animate-pulse"></div>
      <div className="w-full bg-gray-700 text-white px-4 py-2 rounded-md my-2 animate-pulse"></div>
      <div className="w-full bg-gray-700 text-white px-4 py-2 rounded-md my-2 animate-pulse"></div>
      <button
        disabled
        className="bg-blue-500 text-white px-3 py-2 rounded-md animate-pulse"
      >
        Loading...
      </button>
    </form>
  );
}

export default FormSkeleton;
