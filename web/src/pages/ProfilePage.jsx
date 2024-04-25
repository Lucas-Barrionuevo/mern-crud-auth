import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext'; 
import ProfileSkeleton from '../components/ProfileSkeleton';

function ProfilePage() {
  const { user} = useAuth(); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Perfil</h1>
      {loading ? (
        <ProfileSkeleton />
      ) : (
        <div className="text-gray-700 rounded-lg shadow-md p-6">
          <h2 className="text-white text-xl font-semibold mb-2">Información del Usuario</h2>
          <p className="text-white">
            <span className="font-semibold">Nombre:</span> {user?.username || 'Cargando...'}
          </p>
          <p className="text-white">
            <span className="font-semibold">Correo electrónico:</span> {user?.email || 'Cargando...'}
          </p>
          {user && ( 
            <p className="text-white">
              <span className="font-semibold">Fecha de unión:</span>{' '}
              {user?.createdAt && new Date(user.createdAt).toLocaleDateString()}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
