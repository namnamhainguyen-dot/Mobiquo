import { Product } from "./Product.js";
import type { Bonus } from "./Bonus.js";
export declare class CartItem {
    product: Product;
    bonuses: Bonus[];
    quantity: number;
    image: any;
    constructor(product: Product, bonuses: Bonus[], quantity?: number);
    getTotal(): number;
    getBonusNames(): string;
    static isTheSame(item1: CartItem, item2: CartItem): boolean;
}
//# sourceMappingURL=CartItem.d.ts.map