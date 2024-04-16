import User from "../../models/user.model.js";
import { decrypt } from "../../libs/encryption.js";
import { createAccessToken } from "../../libs/jwt.js";

export async function login(req, res) {
  const { email, password } = req.body;
  try {
    const userFound = await User.findOne({ email });
    if (!userFound) return res.status(400).json({ message: "User not found" });

    const isMatch = await decrypt(password, userFound.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = await createAccessToken({ id: userFound._id });
    res.cookie("token", token);

    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      createdAt: userFound.createdAt,
      updateAt: userFound.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
