import { OrderService } from "../services/OrderService.js";
import { AdminOrderDetailView } from "../views/AdminOrderDetailView.js";
export class AdminOrderDetailController {
    view = new AdminOrderDetailView();
    orderService = new OrderService();
    async init() {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
        if (!id) {
            alert("Ma don hang khong ton tai");
            window.location.href = "admin_orders.html";
        }
        else {
            await this.render(id);
            this.attackEvent();
        }
    }
    async render(id) {
        const container = document.querySelector("#main");
        if (!container)
            return;
        try {
            let order = await this.orderService.getById(id);
            container.innerHTML = this.view.renderOrder(order);
        }
        catch (error) {
            console.error("Lỗi:", error);
            container.innerHTML = `<div class="alert alert-danger">Không tìm thấy đơn hàng hoặc có lỗi máy chủ.</div>`;
        }
    }
    attackEvent() {
    }
}
