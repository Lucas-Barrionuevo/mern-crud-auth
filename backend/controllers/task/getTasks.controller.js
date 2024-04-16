import Task from "../../models/task.model.js";

export async function getTasks(req, res) {
  try {
    const tasks = await Task.find({ user: req.user.id }).populate("user");
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
}
