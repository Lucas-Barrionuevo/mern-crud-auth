import React, { useEffect } from "react";
import TaskCard from "../components/TaskCard";
import { useTasks } from "../context/TasksContext";
import TaskCardSkeleton from "../components/TaskCardSkeleton";

function TaskPage() {
  const { getTasks, tasks, loading } = useTasks();

  useEffect(() => {
    getTasks();
  }, []);

  if (loading) return <TaskCardSkeleton />;

  if (tasks.length === 0) return <h1>No tasks</h1>;

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
      {tasks.map((task) => (
        <TaskCard task={task} key={task._id} />
      ))}
    </div>
  );
}

export default TaskPage;
