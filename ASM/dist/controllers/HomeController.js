import { ProductService } from "../services/ProductService.js";
import { CategoryService } from "../services/CategoryService.js";
import { HomeView } from "../views/HomeView.js";
import { CartItem } from "../models/CartItem.js";
import { ProductDetailView } from "../views/ProductDetailView.js";
import { BonusService } from "../services/BonusService.js";
import { CartService } from "../services/CartService.js";
export class HomeController {
    constructor() {
        this.view = new HomeView();
        this.productService = new ProductService();
        this.categoryService = new CategoryService();
        this.cartService = CartService.getInstance();
        this.products = [];
    }
    init() {
        this.renderHome();
        this.attachEvents();
    }
    async renderHome() {
        try {
            const categories = await this.categoryService.getAll();
            this.products = await this.productService.getAll();
            const main = document.querySelector("#main");
            if (main) {
                main.innerHTML = this.view.renderCategories(categories, this.products);
            }
        }
        catch (error) {
            console.error("Lỗi tải trang chủ:", error);
        }
    }
    attachEvents() {
        document.querySelector("#main")?.addEventListener('click', (e) => {
            const target = e.target;
            if (target.classList.contains('add-to-cart') || target.classList.contains('buy-now')) {
                const id = target.dataset.id;
                const product = this.products.find(p => p.id === id);
                if (product) {
                    const item = new CartItem(product, [], 1);
                    this.cartService.addItem(item);
                    if (target.classList.contains('buy-now')) {
                        window.location.href = "cart.html";
                    }
                    else {
                        alert(`Đã thêm "${product.name}" vào giỏ hàng!`);
                    }
                }
            }
        });
    }
}
//# sourceMappingURL=HomeController.js.map