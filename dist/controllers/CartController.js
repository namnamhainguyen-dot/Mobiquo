import { CartService } from "../services/CartService.js";
import { CartView } from "../views/CartView.js";
import { CartItem } from "../models/CartItem.js";
import { OrderService } from "../services/OrderService.js";
import { Order } from "../models/Order.js";
import { User } from "../models/User.js";
export class CartController {
    constructor() {
        this.cartService = CartService.getInstance();
        this.orderService = OrderService.getInstance();
        this.view = new CartView();
    }
    init() {
        this.render();
        this.attachEvents();
    }
    render() {
        const items = this.cartService.getItems();
        const total = this.cartService.getTotalPrice();
        const container = document.querySelector("#cart-container");
        if (container) {
            container.innerHTML = this.view.render(items, total);
        }
    }
    attachEvents() {
        document.addEventListener('click', (e) => {
            const target = e.target;
            if (target.classList.contains("qty-btn")) {
                const id = target.dataset.id;
                const action = target.dataset.action;
                const input = target.parentNode?.querySelector('.qty-input');
                if (id && input) {
                    let currentQty = Number(input.value);
                    if (action === "increase") {
                        currentQty++;
                        this.cartService.updateQuantity(id, currentQty);
                        this.render();
                    }
                    else if (action === "decrease") {
                        if (currentQty > 1) {
                            // Nếu lớn hơn 1 thì giảm bình thường
                            currentQty--;
                            this.cartService.updateQuantity(id, currentQty);
                            this.render();
                        }
                        else {
                            // Nếu đang là 1 mà vẫn bấm giảm
                            const confirmDelete = confirm("Bạn có muốn xóa sản phẩm này khỏi giỏ hàng không?");
                            if (confirmDelete) {
                                this.cartService.removeItem(id);
                                this.render();
                            }
                            // Nếu chọn 'Cancel' thì không làm gì cả, số lượng vẫn giữ là 1
                        }
                    }
                }
            }
            if (target.classList.contains("remove-item")) {
                let id = target.dataset.id;
                if (id) {
                    // Thêm thông báo xác nhận trước khi thực hiện xóa
                    const confirmDelete = confirm("Bạn chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?");
                    if (confirmDelete) {
                        this.cartService.removeItem(id);
                        this.render();
                    }
                    // Nếu chọn 'Cancel', hàm sẽ kết thúc tại đây và không có gì thay đổi
                }
            }
            if (target.id == "clear-cart") {
                this.cartService.clearCart();
                this.render();
            }
        });
        document.querySelector('#order-form')?.addEventListener('submit', async (e) => {
            e.preventDefault();
            let name = document.querySelector('#fullname').value;
            let phone = document.querySelector('#phone').value;
            let address = document.querySelector('#address').value;
            const items = this.cartService.getItems();
            const total = this.cartService.getTotalPrice();
            try {
                const res = await this.orderService.create(new Order(undefined, new Date(), total, new User("", name, phone, "", "", address, "user"), items, 'pending'));
                if (res) {
                    alert('Đặt hàng thành công!');
                    this.cartService.clearCart();
                    window.location.href = "index.html"; // Chuyển về trang chủ sau khi thanh toán
                }
            }
            catch (error) {
                console.error("Lỗi đặt hàng:", error);
                alert("Có lỗi xảy ra trong quá trình đặt hàng: " + (error.message || "Vui lòng thử lại"));
            }
        });
    }
}
//# sourceMappingURL=CartController.js.map