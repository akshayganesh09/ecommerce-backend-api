import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError.util";

export const authorize = (role: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = (req as any).user;

        if (user.role !== role) {
            throw new AppError("Forbidden: Not allowed!", 403);
        };

        next();
    };
};