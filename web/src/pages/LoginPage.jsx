import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

export function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  
  const { login, errors: loginErrors, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [loginErrorMessages, setLoginErrorMessages] = useState([]);

  const onSubmit = handleSubmit((data) => {
    login(data);
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/tasks");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (loginErrors && loginErrors.length > 0) {
      setLoginErrorMessages(loginErrors);
    } else {
      setLoginErrorMessages([]);
    }
  }, [loginErrors]);

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="bg-gray-800 max-w-md w-full p-10 rounded-md">
        {loginErrorMessages.map((error, i) => (
          <div className="bg-red-500 p-2 text-white my-2" key={i}>
            {error}
          </div>
        ))}
        <h1 className="text-3xl font-bold my-2 text-white">Login</h1>
        <form onSubmit={onSubmit}>
          <input
            type="email"
            {...register("email", { required: true })}
            className="w-full bg-gray-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Email"
          />
          {errors.email && <p className="text-red-500">Email is required</p>}
          <input
            type="password"
            {...register("password", { required: true })}
            className="w-full bg-gray-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Password"
          />
          {errors.password && <p className="text-red-500">Password is required</p>}
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md my-2"
          >
            Login
          </button>
        </form>
        <p className="flex gap-x-2 justify-between text-white">
          Don't have an account?{" "}
          <Link className="text-blue-500" to="/register">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
