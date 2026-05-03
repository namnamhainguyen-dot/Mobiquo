import type { Category } from "../models/Category.js";
import type { Product } from "../models/Product.js";

export class HomeView {
    renderProducts(products: Product[]): string{
        if (products.length==0) {
            return `<div>Đang tải sản phẩm...</div>`
        }

        return products.map((p:Product)=> `
            <div class="product-card">
                    <div class="product-image-wrapper">
                        <a href="productDetail.html?id=${p.id}" class="product-image-link">
                            <img src="public/img/${p.image}" alt="Laptop">
                        </a>
                    </div>
                    <div class="product-info">
                        <h3>${p.name}</h3>
                        <div class="product-rating">★★★★★ (124)</div>
                        <p class="product-price">${p.price.toLocaleString('vi-VN')}đ</p>
                        <div class="product-actions-grid">
                            <button class="btn btn-sm btn-outline add-to-cart" data-id="${p.id}">Giỏ hàng</button>
                            <button class="btn btn-sm btn-primary buy-now" data-id="${p.id}">Mua ngay</button>
                        </div>
                    </div>
                </div>
        `).join('');
    }

    renderCategories(categories: Category[], products: Product[]): string{
        if (categories.length==0) {
            return `<div>Đang tải danh mục sản phẩm...</div>`
        }
        return categories.map((c:Category)=>{
            let productInCategory: Product[] = products.filter((p:Product) => p.category_id == c.id);
        return`
            <section>
        <div class="container">
            <div class="section-header">
                <h2>${c.name}</h2>
                <a href="#">XEM TẤT CẢ →</a>
            </div>
            <div class="product-grid">
            ${this.renderProducts(productInCategory)}
        </div>
        </div>
    </section>
        `}).join('');
    }
}