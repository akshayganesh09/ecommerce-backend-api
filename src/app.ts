import express from "express";
import authRoutes from "./routes/auth.routes";
import productRoutes from "./modules/products/products.routes";
import categoryRoutes from "./modules/categories/categories.routes";
import orderRoutes from "./modules/orders/order.routes";
import helmet from "helmet";
import morgan from "morgan";

import { apiLimiter } from "./middlewares/ratelimit.middleware";
import { errorMiddleware } from "./middlewares/error.middleware";
import { httpLogger } from "./middlewares/logger.middleware";

const app = express();

app.use(helmet());
app.use(morgan("dev"));

app.use(express.json());

app.use(httpLogger);

app.use("/api", apiLimiter);

app.use("/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes)

app.get("/health", (req: any, res: any) => {
    res.json({ message: "API is running..."})
});

app.use(errorMiddleware);

export default app;