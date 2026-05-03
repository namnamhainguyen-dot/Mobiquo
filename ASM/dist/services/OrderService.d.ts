import { ApiService } from "./ApiService.js";
import { Order } from "../models/Order.js";
export declare class OrderService extends ApiService {
    private static instance;
    static getInstance(): OrderService;
    getAll(): Promise<Order[]>;
    getById(id: string): Promise<Order>;
    updateStatus(id: string, status: string): Promise<any>;
    removeOrder(id: string): Promise<any>;
    create(order: Order): Promise<Order>;
}
//# sourceMappingURL=OrderService.d.ts.map