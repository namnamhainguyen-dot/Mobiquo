import type { CartItem } from "./CartItem.js";
import { User } from "./User.js";
export declare class Order {
    id: string | undefined;
    createdDate: Date;
    total: number;
    user: User;
    items: CartItem[];
    status: 'pending' | 'shipping' | 'success' | 'cancel';
    constructor(id: string | undefined, createdDate: Date, total: number, user: User, items: CartItem[], status: 'pending' | 'shipping' | 'success' | 'cancel');
}
//# sourceMappingURL=Order.d.ts.map