import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function RegisterPage() {
  const { register: formRegister, handleSubmit } = useForm();
  const { register: signup, isAuthenticated, errors: registerErrors } = useAuth();
  const navigate = useNavigate();
  const [errorMessages, setErrorMessages] = useState([]);

  const onSubmit = async (data) => {
    try {
      await signup(data);
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessages([error.response.data.message]);
      } else {
        setErrorMessages(["An unexpected error occurred."]);
      }
    }
  };

  const clearErrorMessages = () => {
    setErrorMessages([]);
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="bg-gray-800 max-w-md w-full p-10 rounded-md">
        {errorMessages.map((error, index) => (
          <div key={index} className="bg-red-500 p-2 text-white my-2">
            {error}
          </div>
        ))}
        <h1 className="text-3xl font-bold my-2 text-white">Register</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            {...formRegister("username", { required: true })}
            className="w-full bg-gray-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Username"
            onFocus={clearErrorMessages}
          />
          <input
            type="email"
            {...formRegister("email", { required: true })}
            className="w-full bg-gray-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Email"
            onFocus={clearErrorMessages}
          />
          <input
            type="password"
            {...formRegister("password", { required: true })}
            className="w-full bg-gray-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Password"
            onFocus={clearErrorMessages}
          />
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
