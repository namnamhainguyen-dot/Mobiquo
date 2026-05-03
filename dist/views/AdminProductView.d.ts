import type { Category } from "../models/Category.js";
import type { Product } from "../models/Product.js";
export declare class AdminProductView {
    /**
     * @param products Danh sách sản phẩm
     * @param categories Danh sách danh mục (để lookup tên nếu cần)
     * @param brands Danh sách thương hiệu (truyền thêm vào để lấy tên brand)
     */
    renderProducts(products: Product[], categories: Category[], brands?: any[]): string;
}
//# sourceMappingURL=AdminProductView.d.ts.map