import { Request, Response, NextFunction } from "express";
import { OrderService } from "./order.service";

const service = new OrderService();

export class OrderController {
    async createOrder(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = (req as any)?.user?.id;
            const { items } = req.body;

            const result = await service.createOrder(userId, items);
            res.status(200).send({ message: "success", order: result });
        } catch (error) {
            next(error);
        }
    }
}