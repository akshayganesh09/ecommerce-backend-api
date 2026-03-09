import express from "express";
import authRoutes from "./routes/auth.routes";
import { errorMiddleware } from "./middlewares/error.middleware";
import { httpLogger } from "./middlewares/logger.middleware";
import testRoute from "./routes/test.routes";

const app = express();

app.use(express.json());

app.use(httpLogger);

app.use("/auth", authRoutes);
app.use("/test", testRoute);

app.get("/health", (req: any, res: any) => {
    res.json({ message: "API is running..."})
});

app.use(errorMiddleware);

export default app;