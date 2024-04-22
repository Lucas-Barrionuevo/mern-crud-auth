import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

function ProtectedRoute() {
    const { loading, isAuthenticated } = useAuth();

    if (loading) return <h1>Loading...</h1>;  // Muestra loading mientras verifica la autenticación
    if (!isAuthenticated) return <Navigate to="/login" replace />;  // Redirige a login si no está autenticado

    return <Outlet />;  // Renderiza las rutas hijas si está autenticado
}

export default ProtectedRoute;
