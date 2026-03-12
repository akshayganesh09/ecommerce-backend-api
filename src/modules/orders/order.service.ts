import { prisma } from "../../config/db";
import { AppError } from "../../utils/AppError.util";
import { OrderRepository } from "./order.repository";

const orderRepo = new OrderRepository();

export class OrderService {
    async createOrder(userId: string, items: any[]) {

        return prisma.$transaction(async (tx: any) => {
            let total = 0;

            // Fetch all the id's from the user selection.
            const productsId = items.map(item => item.productId);

            // Fetch all the products from the db based on the products id selected by user.
            const products = await orderRepo.findProductsByTds(tx, productsId);

            // This will create Order based on the Product items selected. (One to Many)
            for (const item of items) {
                const product = products.find((p: any) => p.id === item.productId);

                if (!product) {
                    throw new AppError("Product not found", 404);
                };

                if (product.stock < item.quantity) {
                    throw new AppError("Insufficient stock", 400);
                };

                total = total + product.price * item.quantity
            }

            const order = await orderRepo.createOrder(tx, userId, total);

            // This will create OrderItems based on the products selected in an Order (Many to One)
            for (const item of items) {
                const product = products.find((p: any) => p.id === item.productId);

                await orderRepo.createOrderItem(tx, {
                    orderId: order.id,
                    productId: item.productId,
                    quantity: item.quantity,
                    price: product?.price
                });

                await orderRepo.decrementProductStock(tx, item.productId, item.quantity);
            }

            return order;
        });
    }
}