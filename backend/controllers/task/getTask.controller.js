import Task from "../../models/task.model.js";

export async function getTask(req, res) {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (error) {
    res.status(404).json({ message: "Task not found" });
  }
}
