import { Product } from "../models/Product.js";
import { ProductService } from "../services/ProductService.js";
import { CategoryService } from "../services/CategoryService.js";
import { AdminProductFormView } from "../views/AdminProductFormView.js";
export class AdminProductFormController {
    constructor() {
        this.view = new AdminProductFormView();
        this.productService = new ProductService();
        this.categoryService = new CategoryService();
    }
    /**
     * Khởi tạo Form: Xác định chế độ Thêm mới hay Chỉnh sửa dựa vào ID trên URL
     */
    async init() {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');
        console.log("Khởi tạo Form cho ID:", productId);
        await this.render(productId);
        this.attachEvents(productId);
    }
    /**
     * Render giao diện Form
     */
    async render(id) {
        try {
            // Lấy danh mục để đổ vào dropdown
            const categories = await this.categoryService.getAll();
            const mainContainer = document.querySelector("#main");
            if (!mainContainer)
                return;
            if (!id) {
                // Chế độ THÊM MỚI
                mainContainer.innerHTML = this.view.renderForm(null, categories);
            }
            else {
                // Chế độ CHỈNH SỬA
                const product = await this.productService.getById(id);
                mainContainer.innerHTML = this.view.renderForm(product, categories);
                this.updateImagePreview(product.image);
            }
        }
        catch (error) {
            console.error("Lỗi render form:", error);
            alert("Không thể tải dữ liệu sản phẩm từ máy chủ.");
        }
    }
    /**
     * Xử lý các sự kiện Submit và Preview ảnh
     */
    attachEvents(id) {
        const form = document.querySelector('#product-form');
        form?.addEventListener('submit', async (e) => {
            e.preventDefault();
            // Thu thập dữ liệu từ Form
            const name = document.querySelector('#name').value;
            const price = Number(document.querySelector('#price').value);
            const image = document.querySelector('#image').value;
            const category_id = document.querySelector('#category_id').value;
            const description = document.querySelector('#description').value;
            try {
                if (!id) {
                    // Gọi API Thêm mới
                    const newProduct = new Product(undefined, name, price, image, description, category_id);
                    await this.productService.create(newProduct);
                    alert('Thêm sản phẩm thành công!');
                }
                else {
                    // Gọi API Cập nhật
                    const updatedProduct = new Product(id, name, price, image, description, category_id);
                    await this.productService.edit(updatedProduct);
                    alert('Lưu thông tin thành công!');
                }
                location.href = 'admin_products.html';
            }
            catch (error) {
                alert("Lỗi lưu trữ: " + (error.message || "Vui lòng kiểm tra lại kết nối"));
            }
        });
        // Xử lý xem trước ảnh khi thay đổi input
        const imageInput = document.querySelector('#image');
        imageInput?.addEventListener('input', () => {
            this.updateImagePreview(imageInput.value);
        });
    }
    /**
     * Cập nhật ảnh Preview
     */
    updateImagePreview(src) {
        const previewImg = document.querySelector('#imgPreview');
        const fileInfo = document.querySelector('#fileInfo');
        if (previewImg) {
            if (src) {
                previewImg.src = src.startsWith('http') ? src : `public/img/${src}`;
                if (fileInfo)
                    fileInfo.textContent = "Tên ảnh: " + src;
            }
            else {
                previewImg.src = "https://placehold.co/400x400?text=Chưa+có+ảnh";
            }
        }
    }
}
//# sourceMappingURL=AdminProductFormController.js.map