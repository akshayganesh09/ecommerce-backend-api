import { Router } from "express";

import productsRoutes from "../modules/products/products.routes";
import categoryRoutes from "../modules/categories/categories.routes";
import orderRoutes from "../modules/orders/order.routes";

const router = Router();

router.use("/products", productsRoutes);
router.use("/categories", categoryRoutes);
router.use("/orders", orderRoutes);

export default router;