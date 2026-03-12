import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware";
import { authorize } from "../../middlewares/role.middleware";
import { ProductController } from "./products.controller";

const router = Router();
const controller = new ProductController();

router.get("/", authenticate, controller.findAll.bind(controller));
router.get("/:id", authenticate, controller.findById.bind(controller));
router.post("/", authenticate, authorize("ADMIN"), controller.create.bind(controller));
router.put("/:id", authenticate, authorize("ADMIN"), controller.update.bind(controller));
router.delete("/:id", authenticate, authorize("ADMIN"), controller.delete.bind(controller));

export default router;