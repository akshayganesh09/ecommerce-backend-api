import app from "./app";
import { env } from "./config/env";
import { logger } from "./config/logger";
import { prisma } from "./config/db";

const server = app.listen(env?.port, () => {
    logger.info(`Server running on port ${env?.port}`);
});

const shutDown = async () => {
    logger.info("Shutdown signal received");

    server.close(async () => {
        logger.info("HTTP server closed");

        await prisma.$disconnect();

        logger.info("Database disconnected");

        process.exit(0);
    });
};

process.on("SIGINT", shutDown);
process.on("SIGTERM", shutDown);