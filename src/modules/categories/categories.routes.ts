import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware";
import { authorize } from "../../middlewares/role.middleware";
import { CategoryController } from "./categories.controller";

const router = Router();
const controller = new CategoryController();

router.post("/", authenticate, authorize("ADMIN"), controller.create.bind(controller));

export default router;