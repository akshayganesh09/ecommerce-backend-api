import { AppError } from "../../utils/AppError.util";
import { CategoryRepository } from "./categories.repository";

const categoryRepository = new CategoryRepository();

export class CategoryService{
    async createCategory(data: any) {
        if(!data.name) {
            throw new AppError("Category name is required", 400);
        }

        return await categoryRepository.create(data);
    }

    async getAllCategory() {
        return await categoryRepository.findAll();
    }

    async getCategoryById(id: string) {
        const result = await categoryRepository.findById(id);

        if(!result) {
            throw new AppError("Category not found", 404);
        }

        return result;
    }

    async updateCategory(id: string, data: any) {
        const category = await categoryRepository.findById(id);

        if (!category) {
            throw new AppError("category not found", 404);
        }

        const result = await categoryRepository.update(id, data);
        return result;
    }

    async deleteCategory(id: string) {
        const category = await categoryRepository.findById(id);

        if (!category) {
            throw new AppError("category not found", 404);
        }

        const result = await categoryRepository.delete(id);
        return result;
    }
}