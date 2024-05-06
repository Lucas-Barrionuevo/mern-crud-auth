import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AuthForm from "../components/AuthForm";
import AuthFormSkeleton from "../components/AuthFormSkeleton";

const RegisterPage = () => {
  const { isAuthenticated, isLoading, register, errors } = useAuth();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/tasks");
    }
  }, [isAuthenticated, navigate]);

  const handleRegister = async (formData) => {
    try {
      await register(formData);
      navigate("/tasks");
    } catch (error) {
      let errorMessageToShow = "An unexpected error occurred. Please try again later.";
      if (error.response && error.response.data && error.response.data.message) {
        errorMessageToShow = error.response.data.message;
      }
      setErrorMessage(errorMessageToShow);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      {isLoading ? (
        <AuthFormSkeleton />
      ) : (
        <div>
          {errorMessage && (
            <div className="bg-red-500 p-2 text-white my-2">{errorMessage}</div>
          )}
          <AuthForm type="register" errors={errors} onSubmit={handleRegister} />
        </div>
      )}
    </div>
  );
};

export default RegisterPage;
