import { Request, Response, NextFunction } from "express";
import { CategoryService } from "./categories.service";

const service = new CategoryService();

export class CategoryController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
        const result = await service.createCategory(req.body);

        res.status(201).json({ message: "Category created", success: true, category: result })
    } catch (error) {
        next(error);
    }
  }
}
