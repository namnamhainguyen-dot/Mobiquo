import { Product } from "../models/Product.js";
import { ApiService } from "./ApiService.js";
export class ProductService extends ApiService {
    async getAll() {
        // Lấy data từ API (đã bao gồm populate brand và category từ Backend)
        const data = await this.get('/products');
        return data.map((p) => {
            const catId = p.category_id ? (p.category_id._id || p.category_id) : undefined;
            // Sử dụng Object.assign để copy toàn bộ thuộc tính từ API vào Model
            // Giúp giữ lại các trường mới như brand_id, status, ...
            const product = new Product(p.id || p._id, p.name, p.price, p.image, p.description, catId);
            // Gán thêm các dữ liệu mở rộng (nếu Model Product chưa có trong constructor)
            return Object.assign(product, p, { id: p._id || p.id, category_id: catId });
        });
    }
    async getById(id) {
        const data = await this.get(`/products/${id}`);
        const product = new Product(data._id, data.name, data.price, data.image, data.description, data.category_id);
        return Object.assign(product, data, { id: data._id });
    }
    async create(p) {
        // Loại bỏ ID cũ để MongoDB tự tạo mới
        const { id, ...dataToSend } = p;
        return await this.post('/products', dataToSend);
    }
    async edit(p) {
        // Lấy ID từ object để làm URL, phần còn lại gửi vào body
        const { id, ...dataToSend } = p;
        return await this.update(`/products/${id}`, dataToSend);
    }
    async remove(id) {
        return await this.delete(`/products/${id}`);
    }
    async search(query, catId, brandId) {
        // Tạo URL: /products?q=iphone&categoryId=...
        const url = `/products?q=${query}&categoryId=${catId}&brandId=${brandId}`;
        return await this.get(url);
    }
}
