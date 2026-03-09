import { AppError } from "../../utils/AppError.util";
import { CategoryRepository } from "./categories.repository";

const categoryRepository = new CategoryRepository();

export class CategoryService{
    async createCategory(data: any) {
        if(!data.name) {
            throw new AppError("Category name is required", 400);
        }

        return categoryRepository.create(data);
    }
}