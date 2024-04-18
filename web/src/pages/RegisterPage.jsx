import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function RegisterPage() {
  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Asegúrate de que esta función sea `register` o la función correcta que maneje registros en tu contexto
  const { register, isAuthenticated, errors: registerErrors } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/tasks");
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = handleSubmit((data) => {
    register(data);
  });

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="bg-gray-800 max-w-md w-full p-10 rounded-md">
        {registerErrors && registerErrors.map((error, i) => (
          <div className="bg-red-500 p-2 text-white my-2" key={i}>
            {error}
          </div>
        ))}
        <h1 className="text-3xl font-bold my-2 text-white">Register</h1>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            {...formRegister("username", { required: true })}
            className="w-full bg-gray-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Username"
          />
          {errors.username && (
            <p className="text-red-500">Username is required</p>
          )}
          <input
            type="email"
            {...formRegister("email", { required: true })}
            className="w-full bg-gray-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Email"
          />
          {errors.email && <p className="text-red-500">Email is required</p>}
          <input
            type="password"
            {...formRegister("password", { required: true })}
            className="w-full bg-gray-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Password"
          />
          {errors.password && (
            <p className="text-red-500">Password is required</p>
          )}
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md my-2"
          >
            Register
          </button>
        </form>
        <p className="flex gap-x-2 justify-between text-white">
          Already have an account?{" "}
          <Link className="text-blue-500" to="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
