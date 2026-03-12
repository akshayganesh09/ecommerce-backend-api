import rateLimit from "express-rate-limit";

export const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15min
    max: 100,
    message: {
        success: false,
        message: "Too many requests. Please try again later."
    }
});

export const loginApiLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1min
    max: 3,
    message: {
        success: false,
        message: "Too many requests. Please try again in a minute."
    }
});