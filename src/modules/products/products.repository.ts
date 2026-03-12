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

    async findAll() {
        return prisma.product.findMany({
            include: {
                category: true
            }
        });
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