import express from "express";
import authRoutes from "./routes/auth.routes";
import productRoutes from "./modules/products/products.routes";
import categoryRoutes from "./modules/categories/categories.routes";
import orderRoutes from "./modules/orders/order.routes";

import { errorMiddleware } from "./middlewares/error.middleware";
import { httpLogger } from "./middlewares/logger.middleware";

const app = express();

app.use(express.json());

app.use(httpLogger);

app.use("/auth", authRoutes);
app.use("/categories", categoryRoutes);
app.use("/products", productRoutes);
app.use("/orders", orderRoutes)

app.get("/health", (req: any, res: any) => {
    res.json({ message: "API is running..."})
});

app.use(errorMiddleware);

export default app;