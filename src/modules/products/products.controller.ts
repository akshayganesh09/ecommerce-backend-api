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
};