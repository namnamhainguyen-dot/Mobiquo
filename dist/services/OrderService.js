import { ApiService } from "./ApiService.js";
import { Order } from "../models/Order.js";
import { Product } from "../models/Product.js";
import { CartItem } from "../models/CartItem.js";
export class OrderService extends ApiService {
    static getInstance() {
        if (!OrderService.instance) {
            OrderService.instance = new OrderService();
        }
        return OrderService.instance;
    }
    async getAll() {
        const data = await this.get('/bills');
        return data.map((o) => new Order(o.id || o._id, o.createdDate, o.total, o.user, o.items, o.status));
    }
    async getById(id) {
        const data = await this.get(`/bills/${id}`);
        return new Order(data.id || data._id, data.createdDate, data.total, data.user, data.items, data.status);
    }
    async updateStatus(id, status) {
        return await this.update(`/bills/${id}`, { status });
    }
    async removeOrder(id) {
        return await this.delete(`/bills/${id}`);
    }
    async create(order) {
        const data = await this.post('/bills', order);
        return new Order(data.id || data._id, data.createdDate, data.total, data.user, data.items, data.status);
    }
}
//# sourceMappingURL=OrderService.js.map