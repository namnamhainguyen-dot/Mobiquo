import { ApiService } from "./ApiService.js";
import { Order } from "../models/Order.js";
export class OrderService extends ApiService {
    static instance;
    static getInstance() {
        if (!OrderService.instance) {
            OrderService.instance = new OrderService();
        }
        return OrderService.instance;
    }
    async getAll() {
        const data = await this.get('/bills');
        return data.map((o) => new Order(o.id, o.createdDate, o.total, o.user, o.items, o.status));
    }
    async getById(id) {
        const data = await this.get(`/bills/${id}`);
        return new Order(data.id, data.createdDate, data.total, data.user, data.items, data.status);
    }
    async create(order) {
        const data = await this.post('/bills', order);
        return new Order(data.id, data.createdDate, data.total, data.user, data.items, data.status);
    }
}
