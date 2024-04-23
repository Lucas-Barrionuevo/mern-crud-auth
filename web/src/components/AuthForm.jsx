// AuthForm.js
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

function AuthForm({ onSubmit, buttonText, errorMessage, fields }) {
  const { register: formRegister, handleSubmit } = useForm();
  const [errorMessages, setErrorMessages] = useState([]);

  const clearErrorMessages = () => {
    setErrorMessages([]);
  };

  const submitForm = async (data) => {
    try {
      await onSubmit(data);
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessages([error.response.data.message]);
      } else {
        setErrorMessages(["An unexpected error occurred."]);
      }
    }
  };

  return (
    <div className="bg-gray-800 max-w-md w-full p-10 rounded-md">
      {errorMessages.map((error, index) => (
        <div key={index} className="bg-red-500 p-2 text-white my-2">
          {error}
        </div>
      ))}
      <h1 className="text-3xl font-bold my-2 text-white">{buttonText}</h1>
      <form onSubmit={handleSubmit(submitForm)}>
        {fields.map((field, index) => (
          <input
            key={index}
            type={field.type}
            {...formRegister(field.name, { required: true })}
            className="w-full bg-gray-700 text-white px-4 py-2 rounded-md my-2"
            placeholder={field.placeholder}
            onFocus={clearErrorMessages}
          />
        ))}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md my-2"
        >
          {buttonText}
        </button>
      </form>
      <p className="flex gap-x-2 justify-between text-white">
        {errorMessage}
      </p>
    </div>
  );
}

export default AuthForm;
