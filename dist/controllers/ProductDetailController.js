import { ProductService } from "../services/ProductService.js";
import { ProductDetailView } from "../views/ProductDetailView.js";
import { BonusService } from "../services/BonusService.js";
import { CartService } from "../services/CartService.js";
import { CartItem } from "../models/CartItem.js";
import { Bonus } from "../models/Bonus.js";
import { Product } from "../models/Product.js";
export class ProductDetailController {
    constructor() {
        this.productService = new ProductService();
        this.view = new ProductDetailView();
        this.bonusService = new BonusService();
        this.cartService = CartService.getInstance();
        this.product = null;
        this.bonuses = [];
        this.selectedBonuses = [];
    }
    /**
     * Khởi tạo trang chi tiết sản phẩm
     */
    async init() {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');
        if (!productId) {
            window.location.href = "index.html";
            return;
        }
        try {
            // Lấy thông tin sản phẩm (Bắt buộc)
            this.product = await this.productService.getById(productId);
            // Lấy danh sách quà tặng (Nếu lỗi thì vẫn cho hiện sản phẩm)
            try {
                this.bonuses = await this.bonusService.getAll();
            }
            catch (e) {
                console.warn("Không tải được danh sách quà tặng:", e);
                this.bonuses = [];
            }
            this.render();
            this.addEvents();
        }
        catch (error) {
            console.error("Lỗi tải chi tiết sản phẩm:", error);
            const main = document.querySelector("#main");
            if (main)
                main.innerHTML = `<div class="container py-5 text-center"><h3>Sản phẩm không tồn tại hoặc lỗi kết nối.</h3></div>`;
        }
    }
    /**
     * Render dữ liệu ra HTML
     */
    render() {
        const container = document.querySelector("#main");
        if (container && this.product) {
            container.innerHTML = this.view.render(this.product, this.bonuses);
        }
    }
    /**
     * Gán các sự kiện tương tác
     */
    addEvents() {
        if (!this.product)
            return;
        // Xử lý chọn quà tặng và cập nhật giá hiển thị
        const checkboxes = document.querySelectorAll('.bonus-checkbox');
        checkboxes.forEach((cb) => {
            cb.addEventListener('change', (e) => {
                const input = e.target;
                const bId = input.dataset.id || "";
                const bName = input.dataset.name || "";
                const bPrice = Number(input.dataset.price || 0);
                if (input.checked) {
                    // Thêm vào danh sách đã chọn
                    this.selectedBonuses.push(new Bonus(bId, bName, bPrice));
                }
                else {
                    // Loại bỏ khỏi danh sách
                    this.selectedBonuses = this.selectedBonuses.filter(b => b.id !== bId);
                }
                this.updateTotalPriceDisplay();
            });
        });
        // Xử lý nút "Thêm vào giỏ hàng"
        const addBtn = document.querySelector('#add-to-cart');
        addBtn?.addEventListener('click', () => {
            if (this.product) {
                // Tạo item mới (Quan trọng: selectedBonuses phải là mảng mới để tránh tham chiếu)
                const item = new CartItem(this.product, [...this.selectedBonuses], 1);
                // Lưu vào service (Service này sẽ lưu vào localStorage)
                this.cartService.addItem(item);
                alert(`Đã thêm "${this.product.name}" vào giỏ hàng thành công!`);
            }
        });
    }
    /**
     * Cập nhật hiển thị tổng tiền dựa trên sản phẩm và quà tặng đã chọn
     */
    updateTotalPriceDisplay() {
        if (!this.product)
            return;
        const bonusTotal = this.selectedBonuses.reduce((sum, b) => sum + b.price, 0);
        const finalTotal = this.product.price + bonusTotal;
        const priceElement = document.querySelector('#product-price');
        if (priceElement) {
            priceElement.innerHTML = finalTotal.toLocaleString('vi-VN') + 'đ';
        }
    }
}
//# sourceMappingURL=ProductDetailController.js.map