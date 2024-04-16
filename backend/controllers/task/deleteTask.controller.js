import Task from "../../models/task.model.js";

export async function deleteTask(req, res) {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    if (task.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "You are not allowed to delete this task" });
    }

    await Task.deleteOne({ _id: task._id });
    return res.sendStatus(204);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
