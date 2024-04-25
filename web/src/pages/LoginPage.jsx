import AuthForm from "../components/AuthForm";
import AuthFormSkeleton from "../components/AuthFormSkeleton";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/tasks');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="h-screen flex items-center justify-center">
      {isLoading ? <AuthFormSkeleton /> : <AuthForm type="login" />}
    </div>
  );
};

export default LoginPage;
