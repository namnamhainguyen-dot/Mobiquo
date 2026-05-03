import { OrderService } from "../services/OrderService.js";
import type { Order } from "../models/Order.js";
import { AdminOrderView } from "../views/AdminOrderView.js";

export class AdminOrderController {
    private view = new AdminOrderView();
    private orderService = new OrderService();
    

    public async init(){
        await this.render();
        this.attackEvent();
    }

    async render() {
        const container = document.querySelector("table tbody");
        if (!container) return;
        try {
            let orders: Order[] = await this.orderService.getAll();
            container.innerHTML = this.view.renderOrders(orders);
        } catch (error) {
            console.error("Lỗi khi tải đơn hàng:", error);
            container.innerHTML = `<tr><td colspan="6" class="text-center text-danger">Lỗi kết nối hoặc không tìm thấy Đơn hàng.</td></tr>`;
        }
    }

    attackEvent():void{
    }
}