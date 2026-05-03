import  type { CartItem } from "./CartItem.js";
import { User } from "./User.js";
export class Order{
    id:string|undefined;
    createdDate:Date;
    total:number;
    user:User;
    items:CartItem[];
    status: 'pending' | 'shipping' | 'success' | 'cancel';
    constructor(id:string|undefined, createdDate:Date, total:number, user:User, 
        items:CartItem[], status:'pending' | 'shipping' | 'success' | 'cancel'){
        this.id = id;
        this.createdDate = createdDate;
        this.total = total;
        this.user = user;
        this.items = items;
        this.status = status;
    }
}