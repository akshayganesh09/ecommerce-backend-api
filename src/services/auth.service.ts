import bcrypt from "bcrypt";
import { prisma } from "../config/db"
import { generateToken } from "../utils/jwt";
import { AppError } from "../utils/AppError.util";

export const registerUser = async (email: string, password: string, role: "USER" | "ADMIN" = "USER") => {

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
        throw new AppError("User already exist.", 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            email,
            password: hashedPassword,
            role: role
        }
    });

    const token = generateToken(user.id);
    const registeredInUser = {
        id: user.id,
        email: user.email
    }

    return { registeredInUser, token };
};

export const loginUser = async (email: string, password: string) => {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
        throw new AppError("Invalid user credentials.", 401);
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new AppError("Invalid user credentials: Password.", 401);
    }

    const token = generateToken(user?.id);
    const loggedInUser = {
        id: user.id,
        role: user.role
    }

    return { loggedInUser, token };
};