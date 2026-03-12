import { Request, Response, NextFunction } from "express";
import { prisma } from "../config/db"
import { env } from "../config/env";
import { AppError } from "../utils/AppError.util";

import jwt from "jsonwebtoken";

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const autHeader = req.headers.authorization;

        if (!autHeader) {
            throw new AppError("Token missing.", 401);
        }

        const token = autHeader.split(" ")[1];

        const decode: any = jwt.verify(token, env.jwtSecret);

        const user = await prisma.user.findUnique({ where: { id: decode?.userId }});

        if (!user) {
            throw new AppError("User not found", 404);
        }

        (req as any).user = user;
        next();
    } catch (error) {
        next(error);
    };
};