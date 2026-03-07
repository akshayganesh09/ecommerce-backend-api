import express from "express";
import { errorMiddleware } from "./middlewares/error.middleware";
import { httpLogger } from "./middlewares/logger.middleware";
import { prisma } from "./config/db";

const app = express();

app.use(express.json());

app.use(httpLogger);

app.get("/health", (req: any, res: any) => {
    res.json({ message: "API is running..."})
});

app.get("/", async (req: any, res: any, next: any) => {
    const users = await prisma.user.findMany();
    
    return res.status(200).json(users);
});

app.use(errorMiddleware);

export default app;