export class CartView {
    render(items, total) {
        if (items.length == 0) {
            return `<div class="empty-cart">
            <h2>Giỏ hàng trống</h2>
            <p>Hãy chọn sản phẩm và thêm vào giỏ hàng</p>
            <a href="index.html" class="btn">Về trang chủ</a>
            </div>`;
        }
        return `${items.map((item) => `<div class="cart-items-list">
            <div class="cart-item">
                    <div class="item-thumb">
                        <img src="public/img/${item.product.image}" alt="${item.product.name}">
                    </div>
                    <div class="item-info">
                        <h3>${item.product.name}</h3>
                        <p>${item.product.price.toLocaleString('vi-VN')}đ</p>
                         <p><strong>Hàng tặng kèm đã chọn:</strong></p>
                <ul>
                ${item.bonuses.map((bonus) => `
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
        

        <aside class="cart-sidebar">
                <h2 class="summary-header">Tóm tắt đơn hàng</h2>

                <div class="summary-line grand-total">
                    <span>Tổng cộng</span>
                    <span>${(total * 1.1).toLocaleString('vi-VN')}₫</span>
                </div>
                    
                <div class="checkout-actions" style="margin-top: 1.5rem;">
                    <a href="checkout.html" class="btn btn-primary" style="display: block; text-align: center;">Tiến hành thanh toán</a>
                    <a href="index.html" class="back-link" style="display: block; margin-top: 1rem; text-align: center;">← Quay lại cửa hàng</a>
                </div>
            </aside>`;
    }
}