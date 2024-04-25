import React from "react";

function TaskCardSkeleton() {
  return (
    <div className="bg-gray-800 max-w-md w-full p-10 rounded-md">
      <div className="w-full h-20 bg-gray-700 rounded-md my-2 animate-pulse"></div>
      <div className="w-full h-8 bg-gray-700 rounded-md my-2 animate-pulse"></div>
      <div className="w-full h-8 bg-gray-700 rounded-md my-2 animate-pulse"></div>
    </div>
  );
}

export default TaskCardSkeleton;
