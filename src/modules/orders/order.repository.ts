import { prisma } from "../../config/db";

export class OrderRepository {
    async findProductsByTds(tx: typeof prisma, productsIds: string[]) {
        return tx.product.findMany({
            where: {
                id: {
                    in: productsIds
                }
            }
        });
    }

    async createOrder(tx: typeof prisma, userId: string, total: number) {
        return tx.order.create({
            data: {
                userId,
                total
            }
        });
    }

    async createOrderItem(tx: typeof prisma, data: any) {
        return tx.orderItem.create({
            data
        });
    }

    async decrementProductStock(tx: typeof prisma, productID: string, quantity: number) {
        return tx.product.update({
            where: {
                id: productID
            },
            data: {
                stock: {
                    decrement: quantity
                }
            }
        });
    }
}