import { Router } from "express";
import { OrderController } from "./order.controller";
import { authenticate } from "../../middlewares/auth.middleware";

const controller = new OrderController();

const router = Router();

router.post("/", authenticate, controller.createOrder);

export default router;