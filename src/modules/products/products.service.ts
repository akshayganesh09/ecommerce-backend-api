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

    return await productRepository.create(data);
  }

  async findAllProduct(page?: number, limit?: number) {
    const products = await productRepository.findAll(page, limit);
    return products;
  }

  async findProductById(id: string) {
    const product = await productRepository.findById(id);

    if (!product) {
      throw new AppError("Product not found", 404);
    }

    return product;
  }

  async updateProduct(id: string, data: any) {
    const product = await productRepository.findById(id);

    if (!product) {
      throw new AppError("Product not found", 404);
    }

    const result = await productRepository.update(id, data);
    return result;
  }

  async deleteProduct(id: string) {
    const product = await productRepository.findById(id);

    if (!product) {
      throw new AppError("Product not found", 404);
    }

    const result = await productRepository.delete(id);
    return result;
  }
}
