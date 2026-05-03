import { OrderService } from "../services/OrderService.js";
import type { Order } from "../models/Order.js";
import { AdminOrderDetailView } from "../views/AdminOrderDetailView.js";

export class AdminOrderDetailController {
    private view = new AdminOrderDetailView();
    private orderService = new OrderService();
    

    public async init(){
        const urlParams:URLSearchParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
        if(!id){
            alert("Ma don hang khong ton tai");
            window.location.href = "admin_orders.html";
        }else{
        await this.render(id);
        this.attackEvent();
        }
    }

    async render(id:string){
        const container = document.querySelector("#main");
        if (!container) return;
        try {
            let order:Order = await this.orderService.getById(id);
            container.innerHTML = this.view.renderOrder(order);
        } catch (error) {
            console.error("Lỗi:", error);
            container.innerHTML = `<div class="alert alert-danger">Không tìm thấy đơn hàng hoặc có lỗi máy chủ.</div>`;
        }
    }


    attackEvent():void{
    }
}