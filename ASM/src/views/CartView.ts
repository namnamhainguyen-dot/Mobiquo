import type { CartItem } from "../models/CartItem.js";
import type { Bonus } from "../models/Bonus.js";
export class CartView {
    render(items: CartItem[], total: number): string {
        if (items.length == 0) {
            return `<div class="empty-cart">
            <h2>Giỏ hàng trống</h2>
            <p>Hãy chọn sp và thêm vào giỏ hàng</p>
            <a href="index.html" class="btn">Về trang chủ</a>
            </div>`
        }

        return `<!-- Sản phẩm 1 -->
        ${items.map((item: CartItem) => `<div class="cart-items-list">
            <div class="cart-item">
                    <div class="item-thumb">
                        <img src="public/img/${item.product.image}" alt="${item.product.name}">
                    </div>
                    <div class="item-info">
                        <h3>${item.product.name}</h3>
                        <p>${item.product.price}đ</p>
                         <p><strong>Hàng tặng kèm đã chọn:</strong></p>
                <ul>
                ${item.bonuses.map((bonus: Bonus) => `
                    <li>${bonus.name} (+${bonus.price.toLocaleString('vi-VN')}đ)</li>`).join('')}                    
                </ul>
                    </div>
                    <div class="qty-picker">
                        <button class="qty-btn" data-action="decrease" data-id="${item.product.id}">-</button>
                        
                        <input data-id="${item.product.id}" type="number" class="qty-input" value="${item.quantity}" min="1" readonly>
                        
                        <button class="qty-btn" data-action="increase" data-id="${item.product.id}">+</button>
                    </div>
                    <div class="item-total-price">
                        
                        <button class="remove-item-btn remove-item" data-id="${item.product.id}" title="Xóa">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                        </button>
                    </div>
                </div>
                </div>`).join('')}
        

        <!-- Tổng tiền + nút xóa hết -->
       <aside class="cart-sidebar">
                <h2 class="summary-header">Tóm tắt đơn hàng</h2>
                
                
                

                

                <div class="summary-line grand-total">
                    <span>Tổng cộng</span>
                    <span>${(total * 1.1).toLocaleString('vi-VN')}₫</span>
                </div>
                    
                <form id="order-form" action="" class="checkout-form">
                    <div class="mb-3">
                        <label for="fullname" class="form-label">Họ và tên</label>
                        <input type="text" class="form-control" id="fullname" placeholder="Nhập họ tên đầy đủ">
                    </div>
                    <div class="mb-3">
                        <label for="phone" class="form-label">Số điện thoại</label>
                        <input type="tel" class="form-control" id="phone" placeholder="09xxxxxxxx">
                    </div>
                    <div class="mb-3">
                        <label for="address" class="form-label">Địa chỉ giao hàng</label>
                        <textarea id="address" class="form-control" rows="3" required></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary " style="margin-top: 1.5rem;">Xác nhận đặt hàng</button>
                <a href="index.html" class="back-link">← Quay lại cửa hàng</a>
                </form>
                
                
            </aside>`
    }
}