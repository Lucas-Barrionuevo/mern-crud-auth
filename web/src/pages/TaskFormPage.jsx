import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTasks } from "../context/TasksContext";
import { useNavigate, useParams } from "react-router-dom";
import ButtonSkeleton from "../components/ButtonSkeleton";
import { formatDateForBackend, formatDateForUI } from "../hooks/dateUtils"; // Importa las nuevas funciones

function TaskFormPage() {
  const { register, handleSubmit, setValue } = useForm();
  const { createTask, getTask, updateTask } = useTasks();
  const navigate = useNavigate();
  const params = useParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadTask = async () => {
      if (params.id) {
        const task = await getTask(params.id);
        setValue("title", task.title);
        setValue("description", task.description);
        setValue("date", formatDateForUI(task.date)); // Utiliza la función para formatear la fecha para la interfaz de usuario
      }
    };
    loadTask();
  }, [getTask, params.id, setValue]);

  const onSubmit = async (data) => {
    setLoading(true);
    const dataValid = {
      ...data,
      date: formatDateForBackend(data.date), // Utiliza la función para formatear la fecha para el backend
    };
    try {
      if (params.id) {
        await updateTask(params.id, dataValid);
      } else {
        await createTask(dataValid);
      }
      navigate("/tasks");
    } catch (error) {
      console.error("An error occurred while submitting:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="bg-gray-800 max-w-md w-full p-10 rounded-md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="title" className="text-white">
            title
          </label>
          <input
            type="text"
            placeholder="Title"
            {...register("title")}
            className="w-full bg-gray-700 text-white px-4 py-2 rounded-md my-2"
            autoFocus
          />
          <label htmlFor="description" className="text-white">
            description
          </label>
          <textarea
            rows="3"
            placeholder="Description"
            {...register("description")}
            className="w-full bg-gray-700 text-white px-4 py-2 rounded-md my-2"
          ></textarea>
          <input
            type="date"
            {...register("date")}
            className="w-full bg-gray-700 text-white px-4 py-2 rounded-md my-2"
          />

          {loading ? (
            <ButtonSkeleton />
          ) : (
            <button type="submit" className="bg-blue-500 px-3 py-2 rounded-md text-white">
              Save
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default TaskFormPage;
