import { ApiService } from "./ApiService.js";
import { Order } from "../models/Order.js";
import { Product } from "../models/Product.js";
import { CartItem } from "../models/CartItem.js";

export class OrderService  extends ApiService{
    private static instance:OrderService;
    static getInstance():OrderService{
        if(!OrderService.instance){
            OrderService.instance = new OrderService();
        }
        return OrderService.instance;
    }

    async getAll(): Promise<Order[]> {
        const data: any[] = await this.get<any[]>('/bills');
        return data.map((o: any) => new Order(
            o.id || o._id,
            o.createdDate,
            o.total,
            o.user,
            o.items,
            o.status
        ));
    }

    async getById(id: string): Promise<Order> {
        const data: any = await this.get<any>(`/bills/${id}`);
        return new Order(
            data.id || data._id,
            data.createdDate,
            data.total,
            data.user,
            data.items,
            data.status
        );
    }

    async updateStatus(id: string, status: string): Promise<any> {
        return await this.update(`/bills/${id}`, { status });
    }

    async removeOrder(id: string): Promise<any> {
        return await this.delete(`/bills/${id}`);
    }

    async create(order: Order): Promise<Order> {
        const data = await this.post<any>('/bills', order);
        return new Order(
            data.id || data._id,
            data.createdDate,
            data.total,
            data.user,
            data.items,
            data.status
        );
    }
}