import { Request, Response, NextFunction } from "express";
import { ProductService } from "./products.service";

const productService = new ProductService();

export class ProductController {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await productService.createProduct(req.body);

            res.status(201).json({ message: "Product created", product: result });
        } catch (error) {
            next(error);
        }
    }

    async findAll(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await productService.findAllProduct();

            res.status(200).json({ message: "Product fetched successfully", product: result });
        } catch (error) {
            next(error);
        }
    }

    async findById(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await productService.findProductById(req.params.id as string);

            res.status(200).json({ message: "Product fetched successfully", product: result });
        } catch (error) {
            next(error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await productService.updateProduct(req.params.id as string, req.body);

            res.status(204).json({ message: "Product updated successfully", product: {} });
        } catch (error) {
            next(error);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await productService.deleteProduct(req.params.id as string);

            res.status(200).json({ message: "Product deleted successfully", product: result });
        } catch (error) {
            next(error);
        }
    }
};