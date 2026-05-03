import type { Product } from "../models/Product.js";
import type { Bonus } from "../models/Bonus.js";

export class ProductDetailView {
    render(product: Product, bonuses: Bonus[]): string {
        return `
            <div class="product-gallery">
                <div class="main-image-slot">
                    <img src="public/img/${product.image}" alt="${product.name}">
                </div>
            </div>

            <div class="product-config">
                <div class="product-header">
                    <h1>${product.name}</h1>
                    <div class="price-tag">${product.price.toLocaleString('vi-VN')}đ</div>
                </div>

                <p class="description">${product.description}</p>
                
                <div class="config-section">
                    <span class="config-label">Linh kiện đi kèm</span>
                    <div class="config-grid">
                        ${bonuses.map((t: Bonus) => `
                            <div class="config-option">
                                <input type="checkbox" id="bonus${t.id}" class="form-check-input me-2 bonus-checkbox"
                                    data-id="${t.id}"
                                    data-name="${t.name}"
                                    data-price="${t.price}"/>
                                <label for="bonus${t.id}" class="option-details">
                                    <span class="option-name">${t.name}</span>
                                </label>
                                <span class="option-price">+${t.price.toLocaleString('vi-VN')}₫</span>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div class="product-actions mt-4">
                    <h4 class="mb-3">Tổng cộng: <span id="product-price" class="text-primary">${product.price.toLocaleString('vi-VN')}đ</span></h4>
                    <button id="add-to-cart" class="btn btn-primary btn-lg w-100">Thêm vào giỏ hàng</button>
                </div>
            </div>
        `;
    }
}