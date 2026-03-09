import { prisma } from "../../config/db";

export class CategoryRepository {
    async create(data: any) {
        return prisma.category.create({ data });
    }
};
