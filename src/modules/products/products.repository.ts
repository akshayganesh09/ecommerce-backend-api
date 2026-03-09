import { prisma } from "../../config/db";

export class ProductRepository {
    async create(data: any) {
        return prisma.product.create({
            data: data,
            include: {
                category: true
            }
        });
    }
};