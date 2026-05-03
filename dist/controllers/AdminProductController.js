import { ProductService } from "../services/ProductService.js";
import { CategoryService } from "../services/CategoryService.js";
import { AdminProductView } from "../views/AdminProductView.js";
export class AdminProductController {
    constructor() {
        this.view = new AdminProductView();
        this.productService = new ProductService();
        this.categoryService = new CategoryService();
        this.allProducts = [];
        this.allCategories = [];
    }
    async init() {
        await this.loadData();
        this.renderFilters();
        this.applyFilter();
        this.attachEvents();
    }
    async loadData() {
        try {
            const [categories, products] = await Promise.all([
                this.categoryService.getAll(),
                this.productService.getAll()
            ]);
            this.allCategories = categories;
            this.allProducts = products;
        }
        catch (error) {
            console.error("Lỗi tải dữ liệu:", error);
        }
    }
    renderFilters() {
        const catSelect = document.getElementById('filterCategory');
        if (catSelect && this.allCategories.length > 0) {
            catSelect.innerHTML = `<option value="all">Tất cả danh mục</option>` +
                this.allCategories.map(c => `<option value="${c.id}">${c.name}</option>`).join('');
        }
    }
    applyFilter() {
        const searchInput = document.getElementById('searchInput');
        const catSelect = document.getElementById('filterCategory');
        // 1. Lấy thêm element lọc giá
        const priceSelect = document.getElementById('filterPrice');
        const keyword = searchInput?.value.toLowerCase().trim() || "";
        const selectedCat = catSelect?.value || "all";
        const selectedPrice = priceSelect?.value || "all";
        const filtered = this.allProducts.filter(p => {
            // Lọc theo tên
            const matchesSearch = p.name.toLowerCase().includes(keyword);
            // Lọc theo danh mục
            const pCatId = (p.category_id && typeof p.category_id === 'object')
                ? p.category_id.id || p.category_id._id
                : p.category_id;
            const matchesCat = selectedCat === "all" || pCatId === selectedCat;
            // 2. Logic lọc theo giá
            let matchesPrice = true;
            if (selectedPrice !== "all") {
                const [min = 0, max = 0] = selectedPrice.split('-').map(Number);
                // Ép kiểu p.price về số (phòng trường hợp data từ API là string)
                const pPrice = Number(p.price);
                if (max) {
                    matchesPrice = pPrice >= min && pPrice <= max;
                }
                else {
                    // Trường hợp "Trên x triệu" (không có giá trị max)
                    matchesPrice = pPrice >= min;
                }
            }
            return matchesSearch && matchesCat && matchesPrice;
        });
        this.renderTable(filtered);
    }
    renderTable(products) {
        const container = document.querySelector("table tbody");
        if (container) {
            container.innerHTML = this.view.renderProducts(products, this.allCategories);
        }
    }
    attachEvents() {
        const searchInput = document.getElementById('searchInput');
        const catSelect = document.getElementById('filterCategory');
        const priceSelect = document.getElementById('filterPrice'); // Lấy element giá
        const btnReset = document.getElementById('btnResetFilter');
        // Lắng nghe sự kiện
        searchInput?.addEventListener('input', () => this.applyFilter());
        catSelect?.addEventListener('change', () => this.applyFilter());
        // 3. Gán sự kiện thay đổi cho ô lọc giá
        priceSelect?.addEventListener('change', () => this.applyFilter());
        btnReset?.addEventListener('click', () => {
            if (searchInput)
                searchInput.value = "";
            if (catSelect)
                catSelect.value = "all";
            if (priceSelect)
                priceSelect.value = "all";
            this.applyFilter();
        });
        document.querySelector('table tbody')?.addEventListener('click', async (e) => {
            const target = e.target;
            const deleteBtn = target.closest('.btn-delete');
            if (deleteBtn && confirm("Xóa sản phẩm này?")) {
                const id = deleteBtn.dataset.id;
                if (id) {
                    await this.productService.remove(id);
                    this.allProducts = this.allProducts.filter(p => p.id !== id);
                    this.applyFilter();
                }
            }
        });
    }
}
//# sourceMappingURL=AdminProductController.js.map