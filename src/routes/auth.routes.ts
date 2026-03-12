import { Router } from "express";
import { login, register } from "../controllers/auth.controller";
import { loginApiLimiter } from "../middlewares/ratelimit.middleware";

const router = Router();

router.post("/register", register);
router.post("/login", loginApiLimiter, login);

export default router;