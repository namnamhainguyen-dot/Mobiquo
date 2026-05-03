import { Product } from "./Product.js";
import type { Bonus } from "./Bonus.js";

export class CartItem {
    public product: Product;
    public bonuses: Bonus[];
    public quantity: number;
    image: any;

    constructor (product: Product, bonuses: Bonus[], quantity: number = 1) {
        this.product = product;
        this.bonuses = bonuses;
        this.quantity = quantity;
    }
    
    getTotal(): number {
        const bonusPrice = this.bonuses.reduce((sum:number, t:Bonus) => sum + t.price, 0);
        return (this.product.price + bonusPrice) * this.quantity;
    }

    getBonusNames(): string {
        return this.bonuses.length === 0 ? 'Không có đồ đi kèm' : this.bonuses.map((t:Bonus) => t.name).join(', ');
    }

    static isTheSame(item1:CartItem, item2:CartItem){
        // trường hợp 1: 2 sản phẩm khác nhau (khác id)
        if (item1.product.id != item2.product.id) return false;
        // trường hợp 2: 2 sản phẩm có số lượng topping khác nhau
        if (item1.bonuses.length != item2.bonuses.length) return false;
        // trường hợp 3: 2 sản phẩm giống nhau về số lượng topping -> kiểm tra từng loại topping có giống nhau không
        for (const t1 of item1.bonuses) {
            // Trà đào ( trân châu đen + trân châu trắng) != trà đào ( trân châu đen + thạch lá dứa) >> return false
            if (!item2.bonuses.some((t2: Bonus) =>t2.id == t1.id)) return false; 
        }
        // Trà đào ( trân châu đen + trân châu trắng) != trà đào ( trân châu trắng + trân châu đen) >> return true 
        return true;
    }
}
