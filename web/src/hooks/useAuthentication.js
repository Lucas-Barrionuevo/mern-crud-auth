import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useAuthentication = () => {
  const {
    login,
    register,
    logout,
    loading,
    user,
    isAuthenticated,
    errors,
  } = useContext(AuthContext);

  return {
    login,
    register,
    logout,
    loading,
    user,
    isAuthenticated,
    errors,
  };
};