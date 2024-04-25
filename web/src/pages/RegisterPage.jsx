import AuthForm from "../components/AuthForm";
import AuthFormSkeleton from "../components/AuthFormSkeleton";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RegisterPage = () => {
  const { isAuthenticated, isLoading, register } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/tasks');
    }
  }, [isAuthenticated, navigate]);

  const handleRegister = async (formData) => {
    try {
      await register(formData);
      navigate('/tasks');
    } catch (error) {
      console.error("An error occurred while registering:", error);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      {isLoading ? (
        <AuthFormSkeleton />
      ) : (
        <AuthForm type="register" onSubmit={handleRegister} />
      )}
    </div>
  );
};

export default RegisterPage;
