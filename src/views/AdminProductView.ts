import type { Category } from "../models/Category.js";
import type { Product } from "../models/Product.js";

export class AdminProductView {
    /**
     * @param products Danh sách sản phẩm
     * @param categories Danh sách danh mục (để lookup tên nếu cần)
     * @param brands Danh sách thương hiệu (truyền thêm vào để lấy tên brand)
     */
    renderProducts(products: Product[], categories: Category[], brands: any[] = []): string {
        // Nếu mảng rỗng (thường do lọc không ra kết quả)
        if (products.length === 0) {
            return `<tr><td colspan="6" class="text-center py-4 text-muted">Không tìm thấy sản phẩm nào...</td></tr>`;
        }

        return products.map((p: any) => {
            // Tìm tên danh mục (đề phòng trường hợp p.category_id chỉ là string ID)
            const catName = typeof p.category_id === 'object' 
                ? p.category_id.name 
                : (categories.find(c => c.id === p.category_id)?.name || "N/A");

            // Tìm tên thương hiệu (tương tự danh mục)
            const brandName = typeof p.brand_id === 'object'
                ? p.brand_id.name
                : (brands.find(b => b.id === p.brand_id)?.name || "N/A");

            return `
                <tr>
                    <td class="ps-4">
                        <img src="${p.image.startsWith('http') ? p.image : 'public/img/' + p.image}" 
                             alt="${p.name}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 4px;">
                    </td>
                    <td>
                        <div class="fw-bold">${p.name}</div>
                        <small class="text-muted">ID: ${p.id}</small>
                    </td>
                    <td>
                        <div class="mb-1"><span class="badge bg-light text-dark border">${catName}</span></div>
                        <div><span class="brand-badge" style="font-size: 0.75rem;">${brandName}</span></div>
                    </td>
                    <td class="fw-bold text-primary">${p.price.toLocaleString('vi-VN')}đ</td>
                    <td>
                        <span class="status-badge ${p.status !== false ? 'bg-success-subtle text-success' : 'bg-secondary-subtle text-secondary'}">
                            ${p.status !== false ? 'Đang bán' : 'Tạm ẩn'}
                        </span>
                    </td>
                    <td class="text-end pe-4">
                        <a href="admin_variants.html?product_id=${p.id}" class="btn btn-sm btn-outline-info me-1" title="Biến thể">
                            <i class="bi bi-layers"></i>
                        </a>
                        <a href="admin_productForm.html?id=${p.id}" class="btn btn-sm btn-outline-primary me-1" title="Sửa">
                            <i class="bi bi-pencil"></i>
                        </a> 
                        <button class="btn btn-sm btn-delete btn-outline-danger" data-id="${p.id}" title="Xóa">
                            <i class="bi bi-trash"></i>
                        </button>
                    </td>
                </tr>
            `;
        }).join('');
    }
}