import { Request, Response, NextFunction } from "express";
import { registerUser, loginUser } from "../services/auth.service";

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password, role } = req?.body;
        const result = await registerUser(email, password, role);

        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req?.body;
        const result = await loginUser(email, password);

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};