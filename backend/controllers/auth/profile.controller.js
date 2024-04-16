import User from "../../models/user.model.js";

export async function profile(req, res) {
  const userFound = await User.findById(req.user.id);

  if (!userFound) return res.status(400).json({ message: "User not found" });

  res.json({
    id: userFound._id,
    username: userFound.username,
    email: userFound.email,
    createdAt: userFound.createdAt,
    updateAt: userFound.updatedAt,
  });
}
