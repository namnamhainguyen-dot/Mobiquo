import { Category } from "../models/Category.js";
import { ApiService } from "./ApiService.js";
export declare class CategoryService extends ApiService {
    getAll(): Promise<Category[]>;
    create(name: string, description: string): Promise<Category>;
    updateCategory(id: string, name: string, description: string): Promise<Category>;
    deleteCategory(id: string): Promise<void>;
}
//# sourceMappingURL=CategoryService.d.ts.map