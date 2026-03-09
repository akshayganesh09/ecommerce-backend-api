import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware";
import { authorize } from "../../middlewares/role.middleware";
import { ProductController } from "./products.controller";

const router = Router();
const controller = new ProductController();

router.post("/", authenticate, authorize("ADMIN"), controller.create.bind(controller));

export default router;