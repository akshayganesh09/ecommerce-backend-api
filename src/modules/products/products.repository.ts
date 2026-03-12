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

    async findAll(page: number = 1, limit: number = 10) {
        const skip = (page - 1) * limit;

        const products =  await prisma.product.findMany({
            skip,
            take: limit,
            include: {
                category: true
            }
        });

        const total = await prisma.product.count();
        return { products, total };
    }

    async findById(id: string) {
        return prisma.product.findUnique({
            where: { id },
            include: {
                category: true
            }
        });
    }

    async update(id: string, data: any) {
        return prisma.product.update({ 
            where: {id},
            data
        });
    }

    async delete(id: string) {
        return prisma.product.delete({ 
            where: {id}
        });
    }
};