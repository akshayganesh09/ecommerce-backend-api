import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import { authorize } from "../middlewares/role.middleware";

const router = Router();

router.get("/user", authenticate, (req, res) => {
    res.status(200).json({ message: "User route accessed" })
});

router.get("/admin", authenticate, authorize("ADMIN"), (req, res) => {
    res.status(200).json({ message: "Admin route accessed" })
});

export default router;