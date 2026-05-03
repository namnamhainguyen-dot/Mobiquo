import { Category } from "../models/Category.js";
import { ApiService } from "./ApiService.js";
export class CategoryService extends ApiService {
    async getAll() {
        const data = await this.get('/categories');
        return data.map((c) => new Category(c._id || c.id, c.name, c.description || ""));
    }
    // SỬA: Hàm này nhận 2 tham số (name, description) thay vì 1
    async create(name, description) {
        const body = { name, description };
        const c = await this.post('/categories', body);
        return new Category(c._id || c.id, c.name, c.description || "");
    }
    async updateCategory(id, name, description) {
        const body = { name, description };
        // Gọi endpoint bắt đầu bằng dấu gạch chéo
        return await this.update(`/categories/${id}`, body);
    }
    async deleteCategory(id) {
        await this.delete(`/categories/${id}`);
    }
}
//# sourceMappingURL=CategoryService.js.map