import type { Category } from "../models/Category.js";
import type { Product } from "../models/Product.js";
import { ProductService } from "../services/ProductService.js";
import { CategoryService } from "../services/CategoryService.js";
import { HomeView } from "../views/HomeView.js";
import { CartItem } from "../models/CartItem.js";
import type { Bonus } from "../models/Bonus.js";
import { ProductDetailView } from "../views/ProductDetailView.js";
import { BonusService } from "../services/BonusService.js";
import { CartService } from "../services/CartService.js";

export class HomeController {
    private view = new HomeView();
    private productService = new ProductService();
    private categoryService = new CategoryService();
    private cartService = CartService.getInstance();
    private products: Product[] = [];

    public init() {
        this.renderHome();
        this.attachEvents();
    }

    async renderHome() {
        try {
            const categories: Category[] = await this.categoryService.getAll();
            this.products = await this.productService.getAll();
            const main = document.querySelector("#main");
            if (main) {
                main.innerHTML = this.view.renderCategories(categories, this.products);
            }
        } catch (error) {
            console.error("Lỗi tải trang chủ:", error);
        }
    }

    private attachEvents() {
        document.querySelector("#main")?.addEventListener('click', (e: Event) => {
            const target = e.target as HTMLElement;

            if (target.classList.contains('add-to-cart') || target.classList.contains('buy-now')) {
                const id = target.dataset.id;
                const product = this.products.find(p => p.id === id);

                if (product) {
                    const item = new CartItem(product, [], 1);
                    this.cartService.addItem(item);

                    if (target.classList.contains('buy-now')) {
                        window.location.href = "cart.html";
                    } else {
                        alert(`Đã thêm "${product.name}" vào giỏ hàng!`);
                    }
                }
            }
        });
    }
}