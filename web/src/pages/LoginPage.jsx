import AuthForm from "../components/AuthForm";
import AuthFormSkeleton from "../components/AuthFormSkeleton";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const { isAuthenticated, isLoading, login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/tasks');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (formData, event) => {
    event.preventDefault();

    try {
      await login(formData);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      {isLoading ? <AuthFormSkeleton /> : <AuthForm type="login" onSubmit={handleSubmit} />}
      {error && <div className="bg-red-500 p-2 text-white my-2">{error}</div>}
    </div>
  );
};

export default LoginPage;
