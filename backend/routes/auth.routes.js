import { Router } from "express";
import { register } from "../controllers/auth/register.controller.js";
import { login } from "../controllers/auth/login.controller.js";
import { logout } from "../controllers/auth/logout.controller.js";
import { profile } from "../controllers/auth/profile.controller.js";
import { verifyToken } from "../controllers/auth/verifyToken.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { loginSchema, registerSchema } from "../schemas/auth.schema.js";

const router = Router();

router.post("/register", validateSchema(registerSchema), register);
router.post("/login", validateSchema(loginSchema), login);
router.post("/logout", logout);
router.get("/profile", authRequired, profile);
router.get("/verify", verifyToken);

export default router;
