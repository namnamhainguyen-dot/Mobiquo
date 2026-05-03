import { OrderService } from "../services/OrderService.js";
import { AdminOrderFormView } from "../views/AdminOrderFormView.js";
export class AdminOrderFormController {
    constructor() {
        this.view = new AdminOrderFormView();
        this.orderService = new OrderService();
        this.orderId = null;
    }
    async init() {
        const urlParams = new URLSearchParams(window.location.search);
        this.orderId = urlParams.get('id');
        if (!this.orderId) {
            alert("Không tìm thấy mã đơn hàng");
            window.location.href = "admin_orders.html";
            return;
        }
        await this.render();
        this.attachEvents();
    }
    async render() {
        try {
            const order = await this.orderService.getById(this.orderId);
            const container = document.getElementById("main");
            if (container) {
                container.innerHTML = this.view.renderForm(order);
                const header = document.getElementById('orderHeader');
                if (header)
                    header.innerText = `Chỉnh sửa đơn hàng #${this.orderId}`;
            }
        }
        catch (error) {
            console.error("Lỗi khi tải đơn hàng:", error);
            alert("Có lỗi xảy ra khi lấy thông tin đơn hàng.");
        }
    }
    attachEvents() {
        const form = document.getElementById("orderForm");
        form?.addEventListener("submit", async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            // Chuẩn bị dữ liệu cập nhật
            // Lưu ý: Tùy vào cấu trúc API của bạn, thường là update status
            const data = {
                status: formData.get('status'),
                // Nếu backend cho phép update thông tin user trong bill:
                user: {
                    name: formData.get('userName'),
                    phone: formData.get('phone'),
                    address: formData.get('address')
                }
            };
            try {
                await this.orderService.updateStatus(this.orderId, data.status);
                alert("Cập nhật trạng thái đơn hàng thành công!");
                window.location.href = "admin_orders.html";
            }
            catch (error) {
                alert("Lỗi khi cập nhật đơn hàng.");
            }
        });
        const btnDelete = document.getElementById("btnDeleteOrder");
        btnDelete?.addEventListener("click", async () => {
            if (confirm("Bạn có chắc chắn muốn hủy/xóa đơn hàng này?")) {
                try {
                    await this.orderService.removeOrder(this.orderId);
                    alert("Xóa đơn hàng thành công!");
                    window.location.href = "admin_orders.html";
                }
                catch (error) {
                    alert("Lỗi khi xóa đơn hàng.");
                }
            }
        });
    }
}
//# sourceMappingURL=AdminOrderFormController.js.map