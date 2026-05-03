import { CartItem } from "../models/CartItem.js";
export declare class CartService {
    private static instance;
    private items;
    constructor();
    getItems(): CartItem[];
    static getInstance(): CartService;
    addItem(item: CartItem): void;
    removeItem(id: string): void;
    updateQuantity(id: string, quantity: number): void;
    getTotalPrice(): number;
    clearCart(): void;
    private saveToStorage;
    private loadFromStorage;
}
//# sourceMappingURL=CartService.d.ts.map