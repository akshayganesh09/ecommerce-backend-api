import express from "express";
import authRoutes from "./routes/auth.routes";
import v1Routes from "./routes/v1.routes";
import healthRoutes from "./health/health.routes";
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

app.use("/api/v1", v1Routes);

app.use("/health", healthRoutes);

app.use(errorMiddleware);

export default app;