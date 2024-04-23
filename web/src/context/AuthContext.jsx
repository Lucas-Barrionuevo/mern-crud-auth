import { createContext, useContext, useEffect, useState } from "react";
import { loginRequest, registerRequest, verifyTokenRequest } from "../api/auth";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const cookies = Cookies.get();
        if (!cookies.token) {
          throw new Error("No token found");
        }

        const res = await verifyTokenRequest(cookies.token);
        if (!res.data) {
          throw new Error("Invalid token");
        }

        setUser(res.data);
      } catch (error) {
        console.log(error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkLogin();
  }, []);

  useEffect(() => {
    const clearErrorsTimer = setTimeout(() => {
      setErrors([]);
    }, 5000);

    return () => {
      clearTimeout(clearErrorsTimer);
    };
  }, [errors]);

  const login = async (user) => {
    try {
      const res = await loginRequest(user);
      setUser(res.data);
      setErrors([]); // Limpiar errores al iniciar sesión con éxito
    } catch (error) {
      console.log(error);
      setErrors([error.response.data.message]);
    }
  };

  const register = async (user) => {
    try {
      const res = await registerRequest(user);
      setUser(res.data);
      setErrors([]); // Limpiar errores al registrarse con éxito
    } catch (error) {
      console.log(error);
      setErrors([error.response.data.message]);
    }
  };

  const logout = () => {
    Cookies.remove("token");
    setUser(null);
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{
        login,
        register,
        logout,
        loading,
        user,
        isAuthenticated,
        errors,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};