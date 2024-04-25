import React from "react";

function AuthFormSkeleton() {
  return (
    <div className="max-w-md w-full p-10 rounded-md bg-gray-800">
      <div className="bg-red-500 p-2 text-white my-2 animate-pulse"></div>
      <h1 className="text-3xl font-bold my-2 text-white animate-pulse">
        Loading...
      </h1>
      <form>
        <div className="w-full bg-gray-700 text-white px-4 py-2 rounded-md my-2 animate-pulse"></div>
        <div className="w-full bg-gray-700 text-white px-4 py-2 rounded-md my-2 animate-pulse"></div>
        <div className="w-full bg-gray-700 text-white px-4 py-2 rounded-md my-2 animate-pulse"></div>
        <button
          disabled
          className="bg-blue-500 text-white px-4 py-2 rounded-md my-2 animate-pulse"
        >
          Loading...
        </button>
      </form>
      <div className="flex justify-between text-white">
        <div>
          <span>Don't have an account? </span>
        </div>
        <div>
          <span>
            <span className="text-blue-500 underline">Register</span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default AuthFormSkeleton;
