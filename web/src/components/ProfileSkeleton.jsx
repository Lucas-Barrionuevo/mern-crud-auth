// profileSkeleton.js
import React from 'react';

function ProfileSkeleton() {
  return (
    <div className="text-gray-700 rounded-lg shadow-md p-6 animate-pulse">
      <h2 className="text-white text-xl font-semibold mb-2">Información del Usuario</h2>
      <div className="flex items-center mb-4">
        <div className="bg-gray-400 h-12 w-12 rounded-full mr-4"></div>
        <div>
          <div className="h-4 w-24 bg-gray-400 mb-2"></div>
          <div className="h-4 w-40 bg-gray-400"></div>
        </div>
      </div>
      <div className="h-4 w-36 bg-gray-400"></div>
    </div>
  );
}

export default ProfileSkeleton;
