import { CartItem } from "../models/CartItem.js";
export class CartService {
    constructor() {
        this.items = [];
        this.loadFromStorage();
    }
    getItems() {
        return this.items;
    }
    static getInstance() {
        if (!CartService.instance) {
            CartService.instance = new CartService();
        }
        return CartService.instance;
    }
    addItem(item) {
        let inCart = false;
        // Trường hợp 1: Đã có sản phẩm >> Tăng quantity thêm 1 
        this.items.forEach((i) => {
            if (CartItem.isTheSame(item, i)) {
                i.quantity++;
                inCart = true;
            }
        });
        // Trường hợp 2: Chưa có sản phẩm >> Thêm vào với quantity = 1
        if (!inCart) {
            this.items.push(item);
        }
        // Lưu lại vào localStorage     
        this.saveToStorage();
    }
    removeItem(id) {
        this.items = this.items.filter((item) => item.product.id != id);
        this.saveToStorage();
    }
    updateQuantity(id, quantity) {
        if (quantity <= 0) {
            //this.removeItem(id);
        }
        else {
            this.items.find((item) => item.product.id == id).quantity = quantity;
        }
        this.saveToStorage();
    }
    getTotalPrice() {
        return this.items.reduce((sum, item) => sum + item.getTotal(), 0);
    }
    clearCart() {
        this.items = [];
        this.saveToStorage();
    }
    saveToStorage() {
        localStorage.setItem('cart-TS', JSON.stringify(this.items));
    }
    loadFromStorage() {
        const data = localStorage.getItem('cart-TS');
        if (data) {
            this.items = JSON.parse(data).map((item) => new CartItem(item.product, item.bonuses, item.quantity));
        }
    }
}
//# sourceMappingURL=CartService.js.map