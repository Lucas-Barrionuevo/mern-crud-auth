import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const InputField = ({ type, name, value, onChange, placeholder }) => {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full bg-gray-700 text-white px-4 py-2 rounded-md my-2"
      placeholder={placeholder}
    />
  );
};

const AuthForm = ({ type }) => {
  const { login, register, errors } = useAuth(); // Acceso a la variable errors desde el contexto
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (type === "login") {
        await login(formData);
      } else if (type === "register") {
        await register(formData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-md w-full p-10 rounded-md bg-gray-800">
      {errors && errors.length > 0 && ( // Verificar si errors está definido y tiene longitud mayor que cero
        <div className="bg-red-500 p-2 text-white my-2">
          {errors.map((error, index) => (
            <div key={index}>{error}</div>
          ))}
        </div>
      )}
      <h1 className="text-3xl font-bold my-2 text-white">
        {type === "login" ? "Login" : "Register"}
      </h1>
      <form onSubmit={handleSubmit}>
        {type === "register" && (
          <InputField
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
          />
        )}
        <InputField
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <InputField
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md my-2"
        >
          {type === "login" ? "Login" : "Register"}
        </button>
      </form>
      <div className="flex justify-between text-white">
        <div>
          {type === "login" ? (
            <span>Don't have an account? </span>
          ) : (
            <span>Already have an account? </span>
          )}
        </div>
        <div>
          {type === "login" ? (
            <span>
              <Link to="/register" className="text-blue-500 underline">
                Register
              </Link>
            </span>
          ) : (
            <span>
              <Link to="/login" className="text-blue-500 underline">
                Login
              </Link>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
