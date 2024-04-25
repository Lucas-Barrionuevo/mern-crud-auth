import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AuthFormSkeleton from "../components/AuthFormSkeleton";

function HomePage() {
    const { isAuthenticated } = useAuth();

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            {isAuthenticated ? (
                <>
                    <h1 className="text-4xl font-bold text-center mb-4">Bienvenido de nuevo a Task Manager</h1>
                    <p className="text-xl mb-8">Gestiona tus tareas eficientemente.</p>
                    <div className="space-x-4">
                        <Link to="/tasks" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Ver Tareas
                        </Link>
                        <Link to="/add-task" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                            Añadir Tarea
                        </Link>
                        <Link to="/profile" className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
                            Mi Perfil
                        </Link>
                    </div>
                </>
            ) : (
                <>
                    <h1 className="text-4xl font-bold text-center mb-4">Bienvenido a Task Manager</h1>
                    <p className="text-xl mb-8">Tu nueva herramienta de gestión de tareas. Regístrate o inicia sesión para empezar.</p>
                    <div className="space-x-4">
                        <Link to="/login" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Iniciar Sesión
                        </Link>
                        <Link to="/register" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                            Registrarse
                        </Link>
                    </div>
                </>
            )}
        </div>
    );
}

export default HomePage;
