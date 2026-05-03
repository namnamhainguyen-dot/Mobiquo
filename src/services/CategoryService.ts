import { Category } from "../models/Category.js";
import { ApiService } from "./ApiService.js"; 

export class CategoryService extends ApiService {
    
    async getAll(): Promise<Category[]> {
        const data = await this.get<any[]>('/categories');
        return data.map((c) => new Category(c._id || c.id, c.name, c.description || ""));
    }

    // SỬA: Hàm này nhận 2 tham số (name, description) thay vì 1
    async create(name: string, description: string): Promise<Category> {
        const body = { name, description };
        const c = await this.post<any>('/categories', body);
        return new Category(c._id || c.id, c.name, c.description || "");
    }

    async updateCategory(id: string, name: string, description: string): Promise<Category> {
        const body = { name, description };
        // Gọi endpoint bắt đầu bằng dấu gạch chéo
        return await this.update<Category>(`/categories/${id}`, body);
    }

    async deleteCategory(id: string): Promise<void> {
        await this.delete<any>(`/categories/${id}`);
    }
}