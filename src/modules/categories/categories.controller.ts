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

  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await service.getAllCategory();

      res.status(200).json({ message: "", success: true, category: result })
    } catch (error) {
      next(error);
    }
  }

    async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await service.getCategoryById(req.params.id as string);

      res.status(200).json({ message: "", success: true, category: result })
    } catch (error) {
      next(error);
    }
  }

    async update(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await service.updateCategory(req.params.id as string, req.body);

      res.status(200).json({ message: "", success: true, category: result })
    } catch (error) {
      next(error);
    }
  }

    async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await service.deleteCategory(req.params.id as string);

      res.status(200).json({ message: "", success: true, category: result })
    } catch (error) {
      next(error);
    }
  }
}
