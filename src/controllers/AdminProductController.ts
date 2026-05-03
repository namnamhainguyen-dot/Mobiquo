import type { Category } from "../models/Category.js";
import type { Product } from "../models/Product.js";
import { ProductService } from "../services/ProductService.js";
import { CategoryService } from "../services/CategoryService.js";
import { AdminProductView } from "../views/AdminProductView.js";

export class AdminProductController {
    private view = new AdminProductView();
    private productService = new ProductService();
    private categoryService = new CategoryService();

    private allProducts: Product[] = [];
    private allCategories: Category[] = [];

    public async init() {
        await this.loadData();
        this.renderFilters();  
        this.applyFilter();    
        this.attachEvents();
    }

    private async loadData() {
        try {
            const [categories, products] = await Promise.all([
                this.categoryService.getAll(),
                this.productService.getAll()
            ]);
            this.allCategories = categories;
            this.allProducts = products;
        } catch (error) {
            console.error("Lỗi tải dữ liệu:", error);
        }
    }

    private renderFilters() {
        const catSelect = document.getElementById('filterCategory') as HTMLSelectElement;
        if (catSelect && this.allCategories.length > 0) {
            catSelect.innerHTML = `<option value="all">Tất cả danh mục</option>` + 
                this.allCategories.map(c => `<option value="${c.id}">${c.name}</option>`).join('');
        }
    }

    private applyFilter() {
        const searchInput = document.getElementById('searchInput') as HTMLInputElement;
        const catSelect = document.getElementById('filterCategory') as HTMLSelectElement;
        // 1. Lấy thêm element lọc giá
        const priceSelect = document.getElementById('filterPrice') as HTMLSelectElement;

        const keyword = searchInput?.value.toLowerCase().trim() || "";
        const selectedCat = catSelect?.value || "all";
        const selectedPrice = priceSelect?.value || "all";

        const filtered = this.allProducts.filter(p => {
            // Lọc theo tên
            const matchesSearch = p.name.toLowerCase().includes(keyword);
            
            // Lọc theo danh mục
            const pCatId = (p.category_id && typeof p.category_id === 'object') 
                ? (p.category_id as any).id || (p.category_id as any)._id 
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
                } else {
                    // Trường hợp "Trên x triệu" (không có giá trị max)
                    matchesPrice = pPrice >= min;
                }
            }

            return matchesSearch && matchesCat && matchesPrice;
        });

        this.renderTable(filtered);
    }

    private renderTable(products: Product[]) {
        const container = document.querySelector("table tbody");
        if (container) {
            container.innerHTML = this.view.renderProducts(products, this.allCategories);
        }
    }

    attachEvents(): void {
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
            if (searchInput) (searchInput as HTMLInputElement).value = "";
            if (catSelect) (catSelect as HTMLSelectElement).value = "all";
            if (priceSelect) (priceSelect as HTMLSelectElement).value = "all";
            this.applyFilter();
        });

        document.querySelector('table tbody')?.addEventListener('click', async (e: Event) => {
            const target = e.target as HTMLElement;
            const deleteBtn = target.closest('.btn-delete') as HTMLButtonElement;
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