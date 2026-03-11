import { prisma } from "../../config/db";

export class CategoryRepository {
    async create(data: any) {
        return prisma.category.create({ data });
    }

    async findAll() {
        return prisma.category.findMany({
            include: {
                products: true
            }
        });
    }

    async findById(id: string) {
        return prisma.category.findUnique({
            where: { id },
            include: {
                products: true
            }
        });
    }

    async update(id: string, data: any) {
        return prisma.category.update({
            where: { id },
            data
        });
    }

    async delete(id: string) {
        return prisma.category.delete({
            where: { id }
        });
    }
};
