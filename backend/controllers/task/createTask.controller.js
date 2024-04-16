import Task from "../../models/task.model.js";

export async function createTask(req, res) {
  try {
    const { title, description, date } = req.body;
    const newTask = new Task({
      title,
      description,
      date,
      user: req.user.id,
    });
    const savedTask = await newTask.save();
    res.json(savedTask);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
}
