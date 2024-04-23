import AuthForm from "../components/AuthForm";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/tasks');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="h-screen flex items-center justify-center">
      <AuthForm type="login" />
    </div>
  );
};

export default LoginPage;
