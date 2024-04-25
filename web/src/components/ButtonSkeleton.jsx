import React from "react";

function ButtonSkeleton() {
  return (
    <button
      disabled
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded animate-pulse"
    >
      Loading...
    </button>
  );
}

export default ButtonSkeleton;
