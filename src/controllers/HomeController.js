import { ProductService } from "../services/ProductService.js";
import { CategoryService } from "../services/CategoryService.js";
import { HomeView } from "../views/HomeView.js";
export class HomeController {
    view = new HomeView();
    productService = new ProductService();
    categoryService = new CategoryService();
    init() {
        this.renderHome();
    }
    async renderHome() {
        let categories = await this.categoryService.getAll(); // Xây dựng thêm CategoryService kế thừa từ ApiService để tạo và gọi hàm getAll()
        let products = await this.productService.getAll(); // Xây dựng thêm ProductService kế thừa từ ApiService để tạo và gọi hàm getAll()
        document.querySelector("#main").innerHTML = this.view.renderCategories(categories, products);
    }
}
