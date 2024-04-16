import jwt from "jsonwebtoken";
import User from "../../models/user.model.js";
import { TOKEN_SECRET } from "../../config.js";

export async function verifyToken(req, res) {
  const { token } = req.cookies;

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, TOKEN_SECRET, async (err, user) => {
    if (err) return res.status(401).json({ message: "Unauthorized" });

    const userFound = await User.findById(user.id);
    if (!userFound) return res.status(401).json({ message: "User does not exist" });

    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
    });
  });
}
