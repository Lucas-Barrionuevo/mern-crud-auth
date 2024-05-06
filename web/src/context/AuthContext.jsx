import { createContext, useContext, useEffect, useState } from "react";
import { loginRequest, registerRequest, verifyTokenRequest } from "../api/auth";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState([]); // Cambiado a array vacío inicialmente
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
      setErrors([]); // Limpiar errores después de cierto tiempo
    }, 5000);

    return () => {
      clearTimeout(clearErrorsTimer);
    };
  }, []);

  const login = async (user) => {
    try {
      const res = await loginRequest(user);
      setUser(res.data);
      setErrors([]); // Limpiar errores al iniciar sesión con éxito
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        console.log(error.response.data.message); // Mostrar solo el mensaje de error en la consola
        setErrors([error.response.data.message]);
      } else {
        console.log("An unexpected error occurred. Please try again later.");
        setErrors(["An unexpected error occurred. Please try again later."]);
      }
      throw error; // Propagate error to caller
    }
  };

  const register = async (user) => {
    try {
      const res = await registerRequest(user);
      setUser(res.data);
      setErrors([]); // Limpiar errores al registrarse con éxito
    } catch (error) {
      if (error.response && error.response.data) {
        const errorMessage = error.response.data;
        console.log(errorMessage); // Mostrar el mensaje de error en la consola
        setErrors(errorMessage); // Establecer el mensaje de error en la variable errors
      } else {
        console.log("An unexpected error occurred. Please try again later.");
        setErrors(["An unexpected error occurred. Please try again later."]);
      }
      throw error; // Propagar error al llamante
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
