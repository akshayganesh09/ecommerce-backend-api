import { ProductRepository } from "./products.repository";
import { AppError } from "../../utils/AppError.util";
import { prisma } from "../../config/db";

const productRepository = new ProductRepository();

export class ProductService {
  async createProduct(data: any) {

    if (!data.categoryId) {
      throw new AppError("Category is required", 400);
    }

    const category = await prisma.category.findUnique({
      where: { id: data.categoryId },
    });

    if (!category) {
      throw new AppError("Category not found", 404);
    }

    return productRepository.create(data);
  }
}
